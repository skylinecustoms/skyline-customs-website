import { describe, expect, it, vi, beforeEach } from "vitest";

const now = Date.UTC(2026, 10, 11);
const day = 86400;
const t = (daysAgo: number) => Math.floor(now / 1000) - daysAgo * day;
const pic = { src: "/images/reviews/x-1000.webp", thumb: "/images/reviews/x-320.webp", width: 1000, height: 750 };

// The Places archive lives in one siteSettings row; here it is an in-memory value behind a fake db.
let stored: string | null = null;
vi.mock("./db", () => ({
  getDb: async () => ({
    select: () => ({ from: () => ({ where: () => ({ limit: async () => (stored === null ? [] : [{ id: 1, value: stored }]) }) }) }),
    update: () => ({ set: (v: { value: string }) => ({ where: async () => { stored = v.value; } }) }),
    insert: () => ({ values: async (v: { value: string }) => { stored = v.value; } }),
  }),
}));
let placesKey = "";
vi.mock("./_core/env", () => ({ ENV: { get googlePlacesApiKey() { return placesKey; }, googlePlaceId: "place" } }));

describe("google reviews", () => {
  beforeEach(() => { stored = null; placesKey = ""; vi.resetModules(); vi.useFakeTimers(); vi.setSystemTime(now); vi.unstubAllGlobals(); });

  it("relativeWhen matches Google's wording", async () => {
    const { relativeWhen } = await import("./googleReviews");
    expect(relativeWhen(t(2), now)).toBe("in the last week");
    expect(relativeWhen(t(8), now)).toBe("a week ago");
    expect(relativeWhen(t(20), now)).toBe("2 weeks ago");
    expect(relativeWhen(t(65), now)).toBe("2 months ago");
    expect(relativeWhen(t(400), now)).toBe("a year ago");
  });

  it("orders recent reviews with photos first (newest first), then everything else newest first", async () => {
    const { mergeReviews } = await import("./googleReviews");
    const base = [
      { author: "New No Photo", rating: 5, text: "a", time: t(1) },
      { author: "Recent Photo Older", rating: 5, text: "b", time: t(40), photos: [pic] },
      { author: "Recent Photo Newer", rating: 5, text: "c", time: t(20), photos: [pic, pic] },
      { author: "Old Photo", rating: 5, text: "d", time: t(200), photos: [pic] },
      { author: "Mid No Photo", rating: 5, text: "e", time: t(30) },
    ];
    expect(mergeReviews(base, [], now).map((r) => r.author)).toEqual(["Recent Photo Newer", "Recent Photo Older", "New No Photo", "Mid No Photo", "Old Photo"]);
    // Two months later the photo reviews are no longer recent: plain newest-first.
    const later = now + 70 * day * 1000;
    expect(mergeReviews(base, [], later).map((r) => r.author)).toEqual(["New No Photo", "Recent Photo Newer", "Mid No Photo", "Recent Photo Older", "Old Photo"]);
  });

  it("adds live reviews the snapshot does not have, without duplicating ones it has", async () => {
    const { mergeReviews } = await import("./googleReviews");
    const base = [{ author: "Steven Kim", rating: 5, text: "snapshot text", time: t(25), photos: [pic] }];
    const live = [
      { author: "Steven Kim", rating: 5, text: "places text", time: t(25) + 3600, when: "" },
      { author: "Brand New", rating: 5, text: "just posted", time: t(0), when: "" },
    ];
    const out = mergeReviews(base, live, now);
    expect(out.map((r) => r.author)).toEqual(["Steven Kim", "Brand New"]);
    expect(out[0].text).toBe("snapshot text");
    expect(out[0].photos).toHaveLength(1);
  });

  it("without a Places key: the synced snapshot, a 24-review summary, and the full count", async () => {
    const snap = (await import("../shared/googleReviews.json")).default as { total: number; reviews: unknown[] };
    const { getGoogleReviews, getAllGoogleReviews, SUMMARY_SIZE } = await import("./googleReviews");
    const s = await getGoogleReviews();
    expect(s.total).toBe(snap.total);
    expect(s.reviews.length).toBe(Math.min(SUMMARY_SIZE, snap.reviews.length));
    expect(s.count).toBe(snap.reviews.length);
    const all = await getAllGoogleReviews();
    expect(all.reviews.length).toBe(snap.reviews.length);
    // Every photo is a local file: nothing points at Google at runtime.
    for (const r of all.reviews) for (const p of r.photos ?? []) expect(p.src.startsWith("/images/reviews/")).toBe(true);
  });

  it("with a Places key: live count when higher, newer reviews merged in and archived", async () => {
    placesKey = "test";
    vi.stubGlobal("fetch", vi.fn(async () => ({ json: async () => ({ status: "OK", result: { rating: 5, user_ratings_total: 9999, reviews: [{ author_name: "Fresh Review", rating: 5, relative_time_description: "x", text: "great", time: t(0) }] } }) })));
    const { getAllGoogleReviews } = await import("./googleReviews");
    const all = await getAllGoogleReviews();
    expect(all.total).toBe(9999);
    expect(all.reviews.some((r) => r.author === "Fresh Review")).toBe(true);
    expect(stored).toContain("Fresh Review");
  });
});
