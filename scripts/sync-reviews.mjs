/**
 * Refresh shared/googleReviews.json and the review photos in client/public/images/reviews/.
 *
 * Source: the Google Business Profile API (the shop's own listing), read-only:
 *   - every review: reviewer name and profile photo, star rating, exact text, date, the owner's reply
 *   - the photos customers uploaded to the listing (v4 media/customers)
 * A customer photo belongs to a review when it was uploaded by the same reviewer (same display name) within a day
 * of the review. Only those photos are used: never the owner's uploads, never a photo that matches no review.
 * Matched photos are downloaded and converted to WebP (1000 px and 320 px wide) so the site never needs Google
 * credentials at runtime and the images never expire.
 *
 * Fallback when the GBP credentials are not set: the Places API (up to 10 recent reviews, no photos) is merged into
 * the existing snapshot; nothing is removed.
 *
 * Needs: GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN (OAuth refresh token for the listing's manager), or
 * GOOGLE_PLACES_API_KEY for the fallback. ImageMagick (`convert`) for WebP; without it the JPEG is saved as is.
 *
 *   node scripts/sync-reviews.mjs            # write the snapshot and photos
 *   node scripts/sync-reviews.mjs --check    # print what would change, write nothing
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import "dotenv/config";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "shared/googleReviews.json");
const PHOTO_DIR = path.join(ROOT, "client/public/images/reviews");
const PHOTO_URL = "/images/reviews";
const check = process.argv.includes("--check");
const DAY = 864e5;

const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { reviews: [] };
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const norm = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "review";
const hasConvert = (() => { try { execFileSync("convert", ["-version"], { stdio: "ignore" }); return true; } catch { return false; } })();

async function gbpToken() {
  const { GBP_CLIENT_ID: id, GBP_CLIENT_SECRET: secret, GBP_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return null;
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: "refresh_token" }) });
  const j = await r.json().catch(() => ({}));
  if (!j.access_token) throw new Error(`GBP token refused (HTTP ${r.status})`);
  return j.access_token;
}

async function fromGbp(token) {
  const g = async (u) => {
    const r = await fetch(u, { headers: { authorization: `Bearer ${token}` } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`GBP HTTP ${r.status} on ${u.replace(/\?.*/, "")}`);
    return j;
  };
  let loc;
  for (const a of (await g("https://mybusinessaccountmanagement.googleapis.com/v1/accounts")).accounts ?? []) {
    const ls = (await g(`https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title&pageSize=100`)).locations ?? [];
    const hit = ls.find((l) => /skyline customs/i.test(l.title));
    if (hit) { loc = `${a.name}/${hit.name}`; break; }
  }
  if (!loc) throw new Error("Skyline Customs location not found on the GBP account");
  const reviews = []; let pt = "", total, average;
  do {
    const r = await g(`https://mybusiness.googleapis.com/v4/${loc}/reviews?pageSize=50&orderBy=updateTime%20desc${pt ? `&pageToken=${pt}` : ""}`);
    total ??= r.totalReviewCount; average ??= r.averageRating;
    reviews.push(...(r.reviews ?? []));
    pt = r.nextPageToken ?? "";
  } while (pt);
  const media = []; let mt = "";
  do {
    const m = await g(`https://mybusiness.googleapis.com/v4/${loc}/media/customers?pageSize=100${mt ? `&pageToken=${mt}` : ""}`);
    media.push(...(m.mediaItems ?? []));
    mt = m.nextPageToken ?? "";
  } while (mt);
  return { reviews, media, total, average };
}

/** Download one customer photo and write a 1200 px and a 400 px WebP. Returns the photo record. */
async function savePhoto(item, base) {
  const src = item.googleUrl.replace(/=[^/=]*$/, "") + "=s1600";
  const r = await fetch(src);
  if (!r.ok) throw new Error(`photo download HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const tmp = path.join(PHOTO_DIR, `${base}.src.jpg`);
  fs.writeFileSync(tmp, buf);
  const out = {};
  try {
    for (const [key, w, q] of [["src", 1000, 62], ["thumb", 320, 60]]) {
      const name = `${base}-${w}.${hasConvert ? "webp" : "jpg"}`;
      if (hasConvert) execFileSync("convert", [tmp, "-auto-orient", "-strip", "-resize", `${w}x${w * 2}>`, "-quality", String(q), path.join(PHOTO_DIR, name)]);
      else fs.copyFileSync(tmp, path.join(PHOTO_DIR, name));
      out[key] = `${PHOTO_URL}/${name}`;
      if (key === "src") {
        const dims = hasConvert ? execFileSync("identify", ["-format", "%w %h", path.join(PHOTO_DIR, name)]).toString().split(" ").map(Number) : [item.dimensions?.widthPixels ?? 1200, item.dimensions?.heightPixels ?? 900];
        out.width = dims[0]; out.height = dims[1];
      }
    }
  } finally { fs.rmSync(tmp, { force: true }); }
  return out;
}

const token = await gbpToken().catch((e) => { console.warn(e.message); return null; });
let next;
if (token) {
  const { reviews, media, total, average } = await fromGbp(token);
  console.log(`GBP: ${reviews.length} reviews (Google says ${total}, average ${average}), ${media.length} customer photos`);
  if (!check) fs.mkdirSync(PHOTO_DIR, { recursive: true });
  const used = new Set();
  const out = [];
  for (const rv of reviews) {
    const author = rv.reviewer?.displayName ?? "A Google user";
    const created = Date.parse(rv.createTime);
    // The reviewer's own uploads, within a day of the review: the photos they attached to it.
    const mine = media
      .filter((m) => m.mediaFormat === "PHOTO" && norm(m.attribution?.profileName) === norm(author) && Math.abs(Date.parse(m.createTime) - created) <= DAY && !used.has(m.name))
      .sort((a, b) => Date.parse(a.createTime) - Date.parse(b.createTime));
    const text = (rv.comment ?? "").trim();
    if (!text && !mine.length) continue; // star-only reviews with nothing to show
    const photos = [];
    const base = `${slugify(author)}-${rv.createTime.slice(0, 10)}`;
    for (const [i, m] of mine.entries()) {
      used.add(m.name);
      if (check) { photos.push({ src: "(check)", thumb: "(check)", width: 0, height: 0, uploaded: m.createTime }); continue; }
      photos.push({ ...(await savePhoto(m, `${base}-${i + 1}`)), uploaded: m.createTime });
    }
    out.push({
      id: rv.reviewId,
      author,
      rating: STARS[rv.starRating] ?? 5,
      text,
      time: Math.floor(created / 1000),
      ...(rv.reviewer?.profilePhotoUrl ? { photo: rv.reviewer.profilePhotoUrl } : {}),
      ...(rv.reviewReply?.comment ? { reply: { text: rv.reviewReply.comment.trim(), time: Math.floor(Date.parse(rv.reviewReply.updateTime) / 1000) } } : {}),
      ...(photos.length ? { photos } : {}),
    });
  }
  out.sort((a, b) => b.time - a.time);
  next = { source: "Google Business Profile API", rating: average, total, syncedAt: new Date().toISOString(), reviews: out };
  // Photos from an earlier sync that no review uses any more are removed.
  if (!check && fs.existsSync(PHOTO_DIR)) {
    const keep = new Set(out.flatMap((r) => (r.photos ?? []).flatMap((p) => [p.src, p.thumb])).map((p) => path.basename(p)));
    for (const f of fs.readdirSync(PHOTO_DIR)) if (!keep.has(f)) fs.rmSync(path.join(PHOTO_DIR, f));
  }
} else {
  // Fallback: Places API, merged into what is there (no photos, nothing removed).
  const KEY = process.env.GOOGLE_PLACES_API_KEY;
  if (!KEY) { console.error("Neither GBP credentials nor GOOGLE_PLACES_API_KEY are set: nothing to sync"); process.exit(1); }
  const byKey = new Map(prev.reviews.map((r) => [`${norm(r.author)}|${Math.round(r.time / 86400)}`, r]));
  let rating = prev.rating, total = prev.total;
  for (const sort of ["newest", "most_relevant"]) {
    const j = await (await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(process.env.GOOGLE_PLACE_ID || "ChIJNW7sCXJFtokRVBtPKs11cNI")}&fields=rating,user_ratings_total,reviews&reviews_sort=${sort}&key=${KEY}`)).json();
    if (j.status !== "OK") continue;
    rating = j.result.rating; total = j.result.user_ratings_total;
    for (const r of j.result.reviews ?? []) {
      const k = `${norm(r.author_name)}|${Math.round(r.time / 86400)}`;
      if (!byKey.has(k) && r.text?.trim()) byKey.set(k, { author: r.author_name, rating: r.rating, text: r.text.trim(), time: r.time, ...(r.profile_photo_url ? { photo: r.profile_photo_url } : {}) });
    }
  }
  next = { ...prev, source: prev.source ?? "Places API", rating, total, syncedAt: new Date().toISOString(), reviews: [...byKey.values()].sort((a, b) => b.time - a.time) };
}

const before = new Set(prev.reviews.map((r) => `${r.author}|${r.time}`));
const added = next.reviews.filter((r) => !before.has(`${r.author}|${r.time}`));
const withPhotos = next.reviews.filter((r) => r.photos?.length);
console.log(`${next.rating} average · ${next.total} on Google · ${next.reviews.length} reviews in the snapshot (${added.length} new) · ${withPhotos.length} with ${withPhotos.reduce((n, r) => n + r.photos.length, 0)} photos`);
for (const r of withPhotos) console.log(`  photos: ${new Date(r.time * 1000).toISOString().slice(0, 10)} ${r.author} (${r.photos.length})`);
if (!check) { fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n"); console.log(`wrote ${path.relative(ROOT, OUT)}`); }
