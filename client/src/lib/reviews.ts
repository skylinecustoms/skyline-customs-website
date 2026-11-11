/**
 * One review list for every review block on the site.
 *
 * Sources, merged and de-duplicated by reviewer and date:
 *   The server (trpc.site.googleReviews / site.allReviews): shared/googleReviews.json,
 *   synced from the Google Business Profile API with the photos customers attached
 *   to their reviews, plus reviews the Places API has seen since the last sync.
 *
 * Ordering: reviews from the last two months with customer photos first, newest
 * first; then the rest, newest first (shared/reviewTime.ts compareReviews, the
 * same order the server sends).
 */
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import type { Review } from "@/components/Testimonials";
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

export interface Rankable { text: string; date: string; time?: number; photos?: unknown[]; live?: boolean }

/**
 * Every review list on the site: reviews from the last two months with the customer's own photos first (newest
 * first), then every other review (newest first). `focus` no longer changes the order (owner: "recent reviews
 * with photos first"); the service label on each card still says what the review is about.
 */
export function rankReviews<T extends Rankable>(reviews: T[], _focus: ReviewFocus[] = ["ppf", "ceramic"]): T[] {
  const now = Date.now();
  return [...reviews].sort((a, b) => (a.time !== undefined && b.time !== undefined ? compareReviews(a, b, now) : ageDays(a.date) - ageDays(b.date)));
}

const COLORS = ["#7C3AED", "#0891B2", "#D97706", "#DB2777", "#16A34A", "#2563EB"];
const initialsOf = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export interface SiteReview extends Review { live?: boolean }

type ApiReview = { author: string; rating: number; when: string; text: string; time: number; photo?: string; photos?: Review["photos"] };
const toSite = (list: ApiReview[]): SiteReview[] =>
  list
    .filter((r) => r.rating >= 4 && (r.text?.trim() || r.photos?.length))
    .map((r, i) => ({ name: r.author, initials: initialsOf(r.author), avatarColor: COLORS[i % COLORS.length], rating: r.rating, date: r.when, service: serviceTag(r.text ?? ""), text: (r.text ?? "").trim(), time: r.time, photo: r.photo, photos: r.photos, live: true }));

/**
 * The site's Google reviews in site order, with the rating and count. Default: the first few (server-rendered
 * on every page, enough for a carousel). `{ all: true }`: every review (the /reviews page, the review wall).
 * Source: shared/googleReviews.json (Google Business Profile sync, with the customers' photos) plus anything
 * newer the Places API has seen; see server/googleReviews.ts.
 */
export function useSiteReviews(focus: ReviewFocus[] = ["ppf", "ceramic"], opts: { all?: boolean } = {}): { reviews: SiteReview[]; rating?: number; total?: number } {
  const summary = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000, retry: false });
  const full = trpc.site.allReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000, retry: false, enabled: !!opts.all });
  const data = opts.all ? full.data ?? summary.data : summary.data;
  return useMemo(() => ({ reviews: rankReviews(toSite(data?.reviews ?? []), focus), rating: data?.rating, total: data?.total }), [data, focus.join(",")]);
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
