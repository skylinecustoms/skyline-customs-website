import { describe, expect, it, vi, beforeEach } from "vitest";

const now = Date.UTC(2026, 9, 24);
const day = 86400;
const t = (daysAgo: number) => Math.floor(now / 1000) - daysAgo * day;

// The archive lives in one siteSettings row; here it is an in-memory value behind a fake db.
let stored: string | null = null;
vi.mock("./db", () => ({
  getDb: async () => ({
    select: () => ({ from: () => ({ where: () => ({ limit: async () => (stored === null ? [] : [{ id: 1, value: stored }]) }) }) }),
    update: () => ({ set: (v: { value: string }) => ({ where: async () => { stored = v.value; } }) }),
    insert: () => ({ values: async (v: { value: string }) => { stored = v.value; } }),
  }),
}));
vi.mock("./_core/env", () => ({ ENV: { googlePlacesApiKey: "test", googlePlaceId: "place" } }));

const review = (author: string, daysAgo: number, rating = 5) => ({ author_name: author, rating, relative_time_description: "x", text: `Great work from ${author}`, time: t(daysAgo) });
function placesReturns(reviews: ReturnType<typeof review>[]) {
  vi.stubGlobal("fetch", vi.fn(async () => ({ json: async () => ({ status: "OK", result: { rating: 5, user_ratings_total: 150, reviews } }) })));
}

describe("google reviews archive", () => {
  beforeEach(() => { stored = null; vi.resetModules(); vi.useFakeTimers(); vi.setSystemTime(now); });

  it("relativeWhen matches Google's wording", async () => {
    const { relativeWhen } = await import("./googleReviews");
    expect(relativeWhen(t(2), now)).toBe("in the last week");
    expect(relativeWhen(t(8), now)).toBe("a week ago");
    expect(relativeWhen(t(20), now)).toBe("2 weeks ago");
    expect(relativeWhen(t(65), now)).toBe("2 months ago");
    expect(relativeWhen(t(400), now)).toBe("a year ago");
  });

  it("keeps older reviews when newer ones push them out of the Places API", async () => {
    placesReturns([review("Ann", 30), review("Bob", 60), review("Low", 5, 3)]);
    let mod = await import("./googleReviews");
    expect((await mod.getGoogleReviews())!.reviews.map((r) => r.author)).toEqual(["Ann", "Bob"]);

    // An hour later Google only returns a new review; Ann and Bob must still be on the site.
    vi.resetModules(); vi.setSystemTime(now + 2 * 3600_000);
    placesReturns([review("Cara", 0)]);
    mod = await import("./googleReviews");
    const out = (await mod.getGoogleReviews())!;
    expect(out.reviews.map((r) => r.author)).toEqual(["Cara", "Ann", "Bob"]);
    expect(out.reviews[0].when).toBe("in the last week");
    expect(out.total).toBe(150);
  });

  it("puts a reviewer's own listing photo on their review, never the owner's photos", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      const u = String(url);
      const json = (j: unknown) => ({ ok: true, json: async () => j });
      if (u.includes("maps.googleapis.com")) return json({ status: "OK", result: { rating: 5, user_ratings_total: 156, reviews: [review("Clara Kim", 10), review("Steven Kim", 20), review("Bob", 30)] } });
      if (u.endsWith("/media?maxWidthPx=800&skipHttpRedirect=true")) return json({ photoUri: `https://lh3.googleusercontent.com/${u.split("/photos/")[1].split("/")[0]}` });
      if (u.includes("places.googleapis.com/v1/places/")) return json({ photos: [
        { name: "places/p/photos/owner1", widthPx: 1200, heightPx: 1600, authorAttributions: [{ displayName: "Skyline Customs" }] },
        { name: "places/p/photos/clara", widthPx: 3600, heightPx: 4800, authorAttributions: [{ displayName: "Clara Kim" }] },
        { name: "places/p/photos/steven", widthPx: 3608, heightPx: 3000, authorAttributions: [{ displayName: "Steven Kim" }] },
      ] });
      throw new Error(`unexpected ${u}`);
    }));
    const { getGoogleReviews } = await import("./googleReviews");
    const out = (await getGoogleReviews())!;
    const by = Object.fromEntries(out.reviews.map((r) => [r.author, r.jobPhoto]));
    expect(by["Clara Kim"]).toEqual({ url: "https://lh3.googleusercontent.com/clara", width: 800, height: 1067 });
    expect(by["Steven Kim"]?.url).toBe("https://lh3.googleusercontent.com/steven");
    expect(by["Bob"]).toBeUndefined();
    expect(JSON.stringify(out)).not.toContain("owner1");
    // The API key never reaches the browser.
    expect(JSON.stringify(out)).not.toContain("key=");
  });
});
