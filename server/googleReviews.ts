/**
 * Live Google rating, review count, and newest reviews for the shop, via the
 * Places API. Cached in memory for 6 hours so the key is used a few times a
 * day at most. Returns null when GOOGLE_PLACES_API_KEY is not configured.
 */
import { ENV } from "./_core/env";

export interface GoogleReview { author: string; rating: number; when: string; text: string; time: number }
export interface GoogleReviewSummary { rating: number; total: number; reviews: GoogleReview[]; fetchedAt: number }

const TTL_MS = 6 * 60 * 60 * 1000;
let cache: { at: number; data: GoogleReviewSummary | null } | null = null;

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
    type Raw = { author_name: string; rating: number; relative_time_description: string; text?: string; time: number };
    const seen = new Set<string>();
    const reviews: GoogleReview[] = [];
    for (const r of [...(a.result.reviews ?? []), ...(b.result?.reviews ?? [])] as Raw[]) {
      const key = `${r.author_name}|${r.time}`;
      if (seen.has(key) || !r.text?.trim() || r.rating < 4) continue;
      seen.add(key);
      reviews.push({ author: r.author_name, rating: r.rating, when: r.relative_time_description, text: r.text.trim(), time: r.time });
    }
    reviews.sort((x, y) => y.time - x.time);
    const data = { rating: a.result.rating ?? 5, total: a.result.user_ratings_total ?? 0, reviews, fetchedAt: Date.now() };
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.warn("[googleReviews] fetch failed:", (err as Error).message);
    cache = { at: Date.now(), data: cache?.data ?? null };
    return cache.data;
  }
}
