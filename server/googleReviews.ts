/**
 * Google rating, review count, and reviews for the shop.
 *
 * Main source: shared/googleReviews.json, written by scripts/sync-reviews.mjs from the Google Business Profile
 * API: every review with its exact text, date, reviewer photo, and the photos the customer attached to it
 * (downloaded into client/public/images/reviews, so nothing here needs Google credentials or expires).
 *
 * Live top-up: when GOOGLE_PLACES_API_KEY is set, the Places API is checked once an hour for the current rating
 * and count and for reviews newer than the last sync (it only returns 5 newest + 5 most relevant, so what it
 * returns is kept in an archive row in siteSettings). Those are merged in until the next sync picks them up.
 *
 * Order everywhere: reviews from the last two months with customer photos first, newest first; then the rest,
 * newest first (shared/reviewTime.ts compareReviews).
 */
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";
import snapshot from "../shared/googleReviews.json";

/** A photo the customer attached to their Google review, stored on this site. */
export interface ReviewPhoto { src: string; /** 640 px */ mid?: string; thumb: string; width: number; height: number }
export interface GoogleReview {
  author: string; rating: number; when: string; text: string; time: number;
  /** Reviewer profile picture (Google-hosted). */ photo?: string;
  /** Photos the customer attached to this review (local copies). */ photos?: ReviewPhoto[];
}
export interface GoogleReviewSummary { rating: number; total: number; reviews: GoogleReview[]; fetchedAt: number; /** How many reviews the full list has (the summary carries the first few). */ count: number }

const TTL_MS = 60 * 60 * 1000;
const ARCHIVE_KEY = "google:reviews-archive";
/** Reviews in the summary every page gets (carousels); /reviews and the review wall ask for the full list. */
export const SUMMARY_SIZE = 24;

export { relativeWhen } from "../shared/reviewTime";
import { relativeWhen, compareReviews } from "../shared/reviewTime";

type SnapshotReview = { author: string; rating: number; text: string; time: number; photo?: string; photos?: ReviewPhoto[] };
const SNAPSHOT = snapshot as { rating?: number; total?: number; reviews: SnapshotReview[] };

const norm = (n: string) => n.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

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

/** Places API: current rating/count and the reviews it returns, added to the archive. Null without a key or on failure. */
async function fromPlaces(): Promise<{ rating?: number; total?: number; reviews: GoogleReview[] } | null> {
  if (!ENV.googlePlacesApiKey) return null;
  try {
    const base = "https://maps.googleapis.com/maps/api/place/details/json";
    const q = (sort: string) => `${base}?place_id=${encodeURIComponent(ENV.googlePlaceId)}&fields=rating,user_ratings_total,reviews&reviews_sort=${sort}&key=${ENV.googlePlacesApiKey}`;
    const [newest, relevant] = await Promise.all([fetch(q("newest")), fetch(q("most_relevant"))]);
    const a = (await newest.json()) as { status: string; result?: { rating?: number; user_ratings_total?: number; reviews?: unknown[] } };
    const b = (await relevant.json()) as { status: string; result?: { reviews?: unknown[] } };
    if (a.status !== "OK" || !a.result) throw new Error(`Places API: ${a.status}`);
    type Raw = { author_name: string; rating: number; text?: string; time: number; profile_photo_url?: string };
    const seen = new Set<string>();
    const reviews: GoogleReview[] = [];
    for (const r of [...(a.result.reviews ?? []), ...(b.result?.reviews ?? [])] as Raw[]) {
      const key = `${r.author_name}|${r.time}`;
      if (seen.has(key) || !r.text?.trim() || r.rating < 4) continue;
      seen.add(key);
      reviews.push({ author: r.author_name, rating: r.rating, when: "", text: r.text.trim(), time: r.time, photo: r.profile_photo_url || undefined });
    }
    // Keep everything Places has returned, so a review stays even after it leaves Places' 10.
    const archive = await readArchive().catch((err) => { console.warn("[googleReviews] archive read failed:", (err as Error).message); return [] as GoogleReview[]; });
    const byKey = new Map(archive.map((r) => [`${r.author}|${r.time}`, r]));
    let added = 0;
    for (const r of reviews) { const k = `${r.author}|${r.time}`; if (!byKey.has(k)) added++; byKey.set(k, r); }
    const all = Array.from(byKey.values()).map(({ author, rating, text, time, photo }) => ({ author, rating, text, time, photo, when: "" }));
    if (added) await writeArchive(all).catch((err) => console.warn("[googleReviews] archive write failed:", (err as Error).message));
    return { rating: a.result.rating, total: a.result.user_ratings_total, reviews: all };
  } catch (err) {
    console.warn("[googleReviews] Places check failed:", (err as Error).message);
    return null;
  }
}

/** Snapshot reviews plus live ones the snapshot does not have yet (same reviewer within two days = same review). */
export function mergeReviews(base: SnapshotReview[], live: GoogleReview[], now = Date.now()): GoogleReview[] {
  const out: GoogleReview[] = base.map((r) => ({ author: r.author, rating: r.rating, text: r.text, time: r.time, when: "", ...(r.photo ? { photo: r.photo } : {}), ...(r.photos?.length ? { photos: r.photos } : {}) }));
  for (const r of live) {
    const dup = out.some((o) => norm(o.author) === norm(r.author) && Math.abs(o.time - r.time) <= 2 * 86400);
    if (!dup) out.push(r);
  }
  return out.map((r) => ({ ...r, when: relativeWhen(r.time, now) })).sort((x, y) => compareReviews(x, y, now));
}

let cache: { at: number; data: Omit<GoogleReviewSummary, "count"> } | null = null;

/** Every review, in site order, with the current rating and count. */
export async function getAllGoogleReviews(): Promise<Omit<GoogleReviewSummary, "count">> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  const live = await fromPlaces();
  const now = Date.now();
  // Places is live; the snapshot is as of the last sync. Take whichever count is higher (reviews only accrue).
  const total = Math.max(live?.total ?? 0, SNAPSHOT.total ?? 0) || SNAPSHOT.reviews.length;
  const rating = live?.rating ?? SNAPSHOT.rating ?? 5;
  const data = { rating, total, reviews: mergeReviews(SNAPSHOT.reviews, live?.reviews ?? [], now), fetchedAt: now };
  cache = { at: now, data };
  return data;
}

/** What every page gets: rating, count, and the first SUMMARY_SIZE reviews (carousels, the thank-you review). */
export async function getGoogleReviews(): Promise<GoogleReviewSummary> {
  const all = await getAllGoogleReviews();
  return { ...all, reviews: all.reviews.slice(0, SUMMARY_SIZE), count: all.reviews.length };
}
