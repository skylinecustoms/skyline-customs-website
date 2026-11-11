/**
 * One review list for every review block on the site.
 *
 * Sources, merged and de-duplicated by reviewer and date:
 *   1. Live Google reviews from the server (trpc.site.googleReviews: every review
 *      the Places API has returned since the archive started, checked hourly, with
 *      reviewers' own car photos from the listing).
 *   2. The snapshot in shared/googleReviews.json (the same real reviews, for the
 *      first render without the live feed; scripts/sync-reviews.mjs refreshes it).
 *
 * Ordering: reviews with the customer's photo of their car first, newest first;
 * then the rest, newest first (shared/reviewTime.ts compareReviews, the same
 * order the server sends).
 */
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { ALL_REVIEWS, type Review } from "@/components/Testimonials";
import { compareReviews } from "@shared/reviewTime";

export type ReviewFocus = "ppf" | "ceramic" | "tint";

const TOPIC: Record<ReviewFocus, RegExp> = {
  ppf: /\bppf\b|paint protection|full[- ]front|\bfilm\b|clear bra/i,
  ceramic: /ceramic coat|\bcoating\b|\bcoated\b/i,
  tint: /\btint/i,
};

/** "in the last week" -> 3, "a week ago" -> 7, "2 months ago" -> 60, "a year ago" -> 365. */
export function ageDays(when: string | undefined): number {
  const w = (when ?? "").toLowerCase();
  if (!w) return 9999;
  if (/last week|today|yesterday|days? ago/.test(w)) { const d = w.match(/(\d+) days? ago/); return d ? Number(d[1]) : 3; }
  const m = w.match(/(\d+|a|an)\s+(week|month|year)/);
  if (!m) return 9999;
  const n = m[1] === "a" || m[1] === "an" ? 1 : Number(m[1]);
  return n * (m[2] === "week" ? 7 : m[2] === "month" ? 30 : 365);
}

/** Service label for a review card, from what the customer wrote. */
export function serviceTag(text: string, fallback = "Google Review"): string {
  const ppf = TOPIC.ppf.test(text), ceramic = TOPIC.ceramic.test(text), tint = TOPIC.tint.test(text);
  const ppfLabel = /full[- ]front/i.test(text) ? "Full Front PPF" : "PPF";
  if (ppf && ceramic) return `${ppfLabel} + Ceramic Coating`;
  if (ppf && tint) return `${ppfLabel} + Window Tint`;
  if (ppf) return ppfLabel;
  if (ceramic && tint) return "Ceramic Coating + Tint";
  if (ceramic) return "Ceramic Coating";
  if (tint) return "Window Tint";
  return fallback;
}

export interface Rankable { text: string; date: string; time?: number; jobPhoto?: unknown; live?: boolean }

/** Sort key, kept for callers: [no car photo, age in days]. */
export function reviewSortKey(r: Rankable, _focus?: ReviewFocus[]): [number, number] {
  return [r.jobPhoto ? 0 : 1, r.time ? Math.floor((Date.now() / 1000 - r.time) / 86400) : ageDays(r.date)];
}

/**
 * Every review list on the site: reviews with the customer's photo of their car first (newest first), then the
 * rest (newest first). `focus` no longer changes the order (owner: "recent reviews with photos first"); service
 * labels on the cards still say what each review is about.
 */
export function rankReviews<T extends Rankable>(reviews: T[], _focus: ReviewFocus[] = ["ppf", "ceramic"]): T[] {
  return [...reviews].sort((a, b) => {
    if (a.time !== undefined && b.time !== undefined) return compareReviews(a, b);
    const [pa, da] = reviewSortKey(a), [pb, db] = reviewSortKey(b);
    return pa - pb || da - db;
  });
}

const COLORS = ["#7C3AED", "#0891B2", "#D97706", "#DB2777", "#16A34A", "#2563EB"];
const initialsOf = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export interface SiteReview extends Review { live?: boolean }

/** Live + snapshot reviews (same review = same author and date), ranked for the given focus, with the live rating and total when available. */
export function useSiteReviews(focus: ReviewFocus[] = ["ppf", "ceramic"]): { reviews: SiteReview[]; rating?: number; total?: number } {
  const { data: live } = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000, retry: false });
  return useMemo(() => {
    const fromLive: SiteReview[] = (live?.reviews ?? [])
      .filter((r) => r.rating >= 4 && r.text?.trim())
      .map((r, i) => ({ name: r.author, initials: initialsOf(r.author), avatarColor: COLORS[i % COLORS.length], rating: r.rating, date: r.when, service: serviceTag(r.text), text: r.text.trim(), time: r.time, photo: r.photo, jobPhoto: r.jobPhoto, live: true }));
    const seen = new Set(fromLive.map((r) => `${r.name}|${r.time}`));
    // Snapshot reviews carry real dates too, so they rank as live ones do.
    const fromStatic: SiteReview[] = ALL_REVIEWS.filter((r) => !seen.has(`${r.name}|${r.time}`)).map((r) => ({ ...r, service: serviceTag(r.text), live: true }));
    return { reviews: rankReviews([...fromLive, ...fromStatic], focus), rating: live?.rating, total: live?.total };
  }, [live, focus.join(",")]);
}

/**
 * The shop's Google rating and review count, live from the Places API (trpc.site.googleReviews, refreshed
 * hourly on the server and server-rendered on most pages). Undefined while loading or when the API is
 * unavailable: callers then leave the number out instead of showing one that has drifted.
 */
export function useGoogleRating(): { rating?: number; total?: number } {
  const { data } = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000, retry: false });
  return { rating: data?.rating, total: data?.total };
}
