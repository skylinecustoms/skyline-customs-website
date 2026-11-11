/**
 * Live Google rating, review count, and reviews for the shop, via the Places API.
 *
 * The Places API only ever returns 5 newest + 5 most relevant reviews, so on its own a new review pushes an
 * older one off the site. Every review it returns is therefore kept in an archive (one siteSettings row),
 * and the site shows the whole archive: each new Google review is added on the next refresh and stays.
 * Checked once an hour (24 Places calls a day at most). Returns null when GOOGLE_PLACES_API_KEY is not set.
 */
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";

/** A photo the reviewer posted to the shop's Google listing (Places API photos, matched to the review by author name). */
export interface ReviewJobPhoto { url: string; width: number; height: number }
export interface GoogleReview { author: string; rating: number; when: string; text: string; time: number; /** Reviewer profile picture (Google-hosted). */ photo?: string; /** Their photo of the car, when they posted one on Google. */ jobPhoto?: ReviewJobPhoto }
export interface GoogleReviewSummary { rating: number; total: number; reviews: GoogleReview[]; fetchedAt: number }

const TTL_MS = 60 * 60 * 1000;
const ARCHIVE_KEY = "google:reviews-archive";

export { relativeWhen } from "../shared/reviewTime";
import { relativeWhen, compareReviews } from "../shared/reviewTime";

async function readArchive(): Promise<GoogleReview[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, ARCHIVE_KEY)).limit(1);
  try { return rows.length ? (JSON.parse(rows[0].value) as GoogleReview[]) : []; } catch { return []; }
}

async function writeArchive(list: GoogleReview[]): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(list);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, ARCHIVE_KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, ARCHIVE_KEY));
  else await db.insert(siteSettings).values({ key: ARCHIVE_KEY, value });
}
let cache: { at: number; data: GoogleReviewSummary | null } | null = null;

const norm = (n: string) => n.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

/**
 * Photos reviewers posted to the listing, keyed by author name. Places API (New) lists the listing's photos with
 * who posted each; a photo whose author is also a reviewer is that customer's own picture of their car, so it is
 * shown on their review. The media URL comes from the photo's media endpoint (skipHttpRedirect, so the key never
 * reaches the browser) and is refreshed with every hourly check. Owner photos ("Skyline Customs") are never used.
 */
export async function fetchReviewerPhotos(authors: string[], key = ENV.googlePlacesApiKey, placeId = ENV.googlePlaceId): Promise<Map<string, ReviewJobPhoto>> {
  const out = new Map<string, ReviewJobPhoto>();
  const wanted = new Set(authors.map(norm));
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, { headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "photos" } });
    if (!r.ok) throw new Error(`Places photos: HTTP ${r.status}`);
    const j = (await r.json()) as { photos?: { name: string; widthPx: number; heightPx: number; authorAttributions?: { displayName?: string }[] }[] };
    for (const p of j.photos ?? []) {
      const who = norm(p.authorAttributions?.[0]?.displayName ?? "");
      if (!who || !wanted.has(who) || out.has(who)) continue;
      const m = await fetch(`https://places.googleapis.com/v1/${p.name}/media?maxWidthPx=800&skipHttpRedirect=true`, { headers: { "X-Goog-Api-Key": key } });
      const mj = (await m.json().catch(() => ({}))) as { photoUri?: string };
      if (!m.ok || !mj.photoUri?.startsWith("https://")) continue;
      const scale = Math.min(1, 800 / (p.widthPx || 800));
      out.set(who, { url: mj.photoUri, width: Math.round((p.widthPx || 800) * scale), height: Math.round((p.heightPx || 600) * scale) });
    }
  } catch (err) {
    console.warn("[googleReviews] reviewer photos skipped:", (err as Error).message);
  }
  return out;
}

/** The listing's name, website, phone and address as Google currently has them (health diagnostic, not cached). */
export async function getGoogleListing(): Promise<{ name?: string; website?: string; phone?: string; address?: string; status: string } | null> {
  if (!ENV.googlePlacesApiKey) return null;
  try {
    const r = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(ENV.googlePlaceId)}&fields=name,website,formatted_phone_number,formatted_address&key=${ENV.googlePlacesApiKey}`);
    const j = (await r.json()) as { status: string; result?: { name?: string; website?: string; formatted_phone_number?: string; formatted_address?: string } };
    return { status: j.status, name: j.result?.name, website: j.result?.website, phone: j.result?.formatted_phone_number, address: j.result?.formatted_address };
  } catch (err) {
    return { status: (err as Error).message };
  }
}

export async function getGoogleReviews(): Promise<GoogleReviewSummary | null> {
  if (!ENV.googlePlacesApiKey) return null;
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const base = "https://maps.googleapis.com/maps/api/place/details/json";
    const q = (sort: string) =>
      `${base}?place_id=${encodeURIComponent(ENV.googlePlaceId)}&fields=rating,user_ratings_total,reviews&reviews_sort=${sort}&key=${ENV.googlePlacesApiKey}`;
    const [newest, relevant] = await Promise.all([fetch(q("newest")), fetch(q("most_relevant"))]);
    const a = (await newest.json()) as { status: string; result?: { rating?: number; user_ratings_total?: number; reviews?: unknown[] } };
    const b = (await relevant.json()) as { status: string; result?: { reviews?: unknown[] } };
    if (a.status !== "OK" || !a.result) throw new Error(`Places API: ${a.status}`);
    type Raw = { author_name: string; rating: number; relative_time_description: string; text?: string; time: number; profile_photo_url?: string };
    const seen = new Set<string>();
    const reviews: GoogleReview[] = [];
    for (const r of [...(a.result.reviews ?? []), ...(b.result?.reviews ?? [])] as Raw[]) {
      const key = `${r.author_name}|${r.time}`;
      if (seen.has(key) || !r.text?.trim() || r.rating < 4) continue;
      seen.add(key);
      reviews.push({ author: r.author_name, rating: r.rating, when: r.relative_time_description, text: r.text.trim(), time: r.time, photo: r.profile_photo_url || undefined });
    }
    // Add what Google returned to the archive (newer text and photo win), so no review drops off the site.
    const archive = await readArchive().catch((err) => { console.warn("[googleReviews] archive read failed:", (err as Error).message); return [] as GoogleReview[]; });
    const byKey = new Map(archive.map((r) => [`${r.author}|${r.time}`, r]));
    let added = 0;
    for (const r of reviews) { const k = `${r.author}|${r.time}`; if (!byKey.has(k)) added++; byKey.set(k, r); }
    const all = Array.from(byKey.values()).sort((x, y) => y.time - x.time);
    // Each reviewer's own photo of their car, when they posted one (fresh URL every refresh; old ones dropped).
    const jobPhotos = await fetchReviewerPhotos(all.map((r) => r.author));
    for (const r of all) { const p = jobPhotos.get(norm(r.author)); if (p) r.jobPhoto = p; else delete r.jobPhoto; }
    // Site order: reviews with a car photo first, newest first; then the rest (a review that gains or loses a photo moves).
    all.sort(compareReviews);
    if (added || all.length !== archive.length) {
      await writeArchive(all).catch((err) => console.warn("[googleReviews] archive write failed:", (err as Error).message));
      if (added) console.log(`[googleReviews] ${added} new review(s) added; ${all.length} on the site`);
    }
    const now = Date.now();
    const data = { rating: a.result.rating ?? 5, total: a.result.user_ratings_total ?? 0, reviews: all.map((r) => ({ ...r, when: relativeWhen(r.time, now) })), fetchedAt: now };
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.warn("[googleReviews] fetch failed:", (err as Error).message);
    cache = { at: Date.now(), data: cache?.data ?? null };
    return cache.data;
  }
}
