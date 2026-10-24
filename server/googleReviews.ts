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

export interface GoogleReview { author: string; rating: number; when: string; text: string; time: number; /** Reviewer profile picture (Google-hosted). */ photo?: string }
export interface GoogleReviewSummary { rating: number; total: number; reviews: GoogleReview[]; fetchedAt: number }

const TTL_MS = 60 * 60 * 1000;
const ARCHIVE_KEY = "google:reviews-archive";

/** "in the last week", "3 weeks ago", "2 months ago", "a year ago": Google's wording, worked out from the review's date so archived ones stay right. */
export function relativeWhen(timeSec: number, now = Date.now()): string {
  const days = Math.max(0, (now / 1000 - timeSec) / 86400);
  if (days < 7) return "in the last week";
  if (days < 30) { const w = Math.floor(days / 7); return w === 1 ? "a week ago" : `${w} weeks ago`; }
  if (days < 365) { const m = Math.floor(days / 30); return m === 1 ? "a month ago" : `${m} months ago`; }
  const y = Math.floor(days / 365);
  return y === 1 ? "a year ago" : `${y} years ago`;
}

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
