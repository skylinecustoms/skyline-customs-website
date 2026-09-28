/**
 * One review list for every review block on the site.
 *
 * Sources, merged and de-duplicated by reviewer name:
 *   1. Live Google reviews from the server (trpc.site.googleReviews: the Places
 *      API returns the 5 newest and 5 most relevant, cached for 6 hours).
 *   2. The curated list in components/Testimonials.tsx (older reviews the
 *      Places API no longer returns).
 *
 * Ordering: reviews that mention the page's focus (full front PPF and ceramic
 * coating by default) come first, newest first; then everything else, newest
 * first. Live reviews outrank curated ones of the same age because their dates
 * are current, while the curated dates were captured months ago.
 */
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { ALL_REVIEWS, type Review } from "@/components/Testimonials";

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

export interface Rankable { text: string; date: string; live?: boolean }

/** Sort key: focus match first, then newest. Curated (non-live) dates are stale, so they sit behind live ones. */
export function reviewSortKey(r: Rankable, focus: ReviewFocus[]): [number, number] {
  const topical = focus.some((f) => TOPIC[f].test(r.text)) ? 0 : 1;
  return [topical, ageDays(r.date) + (r.live ? 0 : 180)];
}

export function rankReviews<T extends Rankable>(reviews: T[], focus: ReviewFocus[] = ["ppf", "ceramic"]): T[] {
  return [...reviews].sort((a, b) => {
    const [ta, da] = reviewSortKey(a, focus), [tb, db] = reviewSortKey(b, focus);
    return ta - tb || da - db;
  });
}

const COLORS = ["#7C3AED", "#0891B2", "#D97706", "#DB2777", "#16A34A", "#2563EB"];
const initialsOf = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export interface SiteReview extends Review { live?: boolean }

/** Live + curated reviews, ranked for the given focus, with the live rating and total when available. */
export function useSiteReviews(focus: ReviewFocus[] = ["ppf", "ceramic"]): { reviews: SiteReview[]; rating?: number; total?: number } {
  const { data: live } = trpc.site.googleReviews.useQuery(undefined, { staleTime: 60 * 60 * 1000, retry: false });
  return useMemo(() => {
    const fromLive: SiteReview[] = (live?.reviews ?? [])
      .filter((r) => r.rating >= 4 && r.text?.trim())
      .map((r, i) => ({ name: r.author, initials: initialsOf(r.author), avatarColor: COLORS[i % COLORS.length], rating: r.rating, date: r.when, service: serviceTag(r.text), text: r.text.trim(), live: true }));
    const names = new Set(fromLive.map((r) => r.name.toLowerCase()));
    const fromStatic: SiteReview[] = ALL_REVIEWS.filter((r) => !names.has(r.name.toLowerCase())).map((r) => ({ ...r, service: serviceTag(r.text, r.service) }));
    return { reviews: rankReviews([...fromLive, ...fromStatic], focus), rating: live?.rating, total: live?.total };
  }, [live, focus.join(",")]);
}
