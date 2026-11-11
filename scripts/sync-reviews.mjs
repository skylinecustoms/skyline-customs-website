/**
 * Refresh shared/googleReviews.json: the snapshot of real Google reviews the site falls back to when the live
 * feed (trpc.site.googleReviews) is not available, e.g. on a first render without the Places key.
 *
 * Sources, all real Google data, text never edited:
 *   1. Places API Place Details (newest + most relevant: up to 10 reviews), when GOOGLE_PLACES_API_KEY is set.
 *   2. The live site's review archive (every review the production server has seen from the Places API since
 *      the archive started), unless --no-site.
 *   3. What is already in the snapshot (so a review never drops off).
 * Reviewer photos of their cars are not stored here: their URLs are short-lived and the server refreshes them hourly.
 *
 *   node scripts/sync-reviews.mjs            # write the snapshot
 *   node scripts/sync-reviews.mjs --check    # print what would change, write nothing
 */
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const OUT = path.resolve(import.meta.dirname, "../shared/googleReviews.json");
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJNW7sCXJFtokRVBtPKs11cNI";
const KEY = process.env.GOOGLE_PLACES_API_KEY || "";
const SITE = "https://www.skylinecustomshop.com/api/trpc/site.googleReviews";
const check = process.argv.includes("--check");
const useSite = !process.argv.includes("--no-site");

const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { reviews: [] };
const byKey = new Map(prev.reviews.map((r) => [`${r.author}|${r.time}`, r]));
let rating = prev.rating, total = prev.total;
const sources = [];

const keep = (r) => r.rating >= 4 && (r.text ?? "").trim();
const put = (r) => { if (keep(r)) byKey.set(`${r.author}|${r.time}`, { author: r.author, rating: r.rating, text: r.text.trim(), time: r.time, ...(r.photo ? { photo: r.photo } : {}) }); };

if (useSite) {
  try {
    const j = await (await fetch(SITE)).json();
    const d = j?.result?.data?.json;
    if (d?.reviews?.length) {
      for (const r of d.reviews) put(r);
      rating = d.rating; total = d.total;
      sources.push(`live site archive (${d.reviews.length} reviews, fetched ${new Date(d.fetchedAt).toISOString()})`);
    }
  } catch (e) { console.warn("live site archive unavailable:", e.message); }
}

if (KEY) {
  for (const sort of ["newest", "most_relevant"]) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(PLACE_ID)}&fields=rating,user_ratings_total,reviews&reviews_sort=${sort}&key=${KEY}`;
    const j = await (await fetch(url)).json();
    if (j.status !== "OK") { console.warn(`Places API (${sort}): ${j.status}`); continue; }
    rating = j.result.rating; total = j.result.user_ratings_total;
    for (const r of j.result.reviews ?? []) put({ author: r.author_name, rating: r.rating, text: r.text, time: r.time, photo: r.profile_photo_url });
    sources.push(`Places API ${sort} (${(j.result.reviews ?? []).length} reviews)`);
  }
} else {
  console.warn("GOOGLE_PLACES_API_KEY not set: Places API skipped");
}

const reviews = [...byKey.values()].sort((a, b) => b.time - a.time);
const next = { placeId: PLACE_ID, rating, total, syncedAt: new Date().toISOString(), sources, reviews };
const added = reviews.filter((r) => !prev.reviews.some((p) => p.author === r.author && p.time === r.time));
console.log(`rating ${rating} · ${total} Google reviews · ${reviews.length} in snapshot (${added.length} new)`);
for (const r of added) console.log(`  + ${new Date(r.time * 1000).toISOString().slice(0, 10)} ${r.author}`);
if (!check) { fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n"); console.log(`wrote ${path.relative(process.cwd(), OUT)}`); }
