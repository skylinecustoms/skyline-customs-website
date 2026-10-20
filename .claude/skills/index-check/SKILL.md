---
name: index-check
description: Check which pages of www.skylinecustomshop.com Google has indexed, find out why the rest are not, fix what is on our side, push the URLs, and report. Use when asked about indexing, "not indexed" pages, Search Console coverage, or after shipping new pages.
---

# Index check and fix

The site inspects every sitemap URL through the Search Console URL Inspection
API once a day (`server/indexStatus.ts`) and the daily push sends unindexed
pages first (`server/searchIndexing.ts`). This skill reads that report, works
out why each unindexed page is stuck, fixes what can be fixed in the repo,
pushes the URLs, and reports in plain language.

## Steps

1. **Get the report.** Run `node scripts/index-check.mjs`. Add `--refresh` if
   the report is older than a day or new pages shipped since it ran (a fresh
   inspection takes 3 to 5 minutes; inspection quota is 2,000 URLs a day, the
   sitemap is about 260). The script prints every unindexed page with a
   verdict and a fix plan.

2. **Fix each verdict in the repo.**
   - **BROKEN** (live status is not 200): the route is missing or redirects.
     Find the page in `client/src/App.tsx` and `server/_core/ssrMeta.ts`; add
     the route or a redirect in `legacyRedirects` in `server/_core/index.ts`.
     If the page was removed on purpose, drop it from the sitemap source
     (`STATIC_META` in ssrMeta.ts or the data file that generates it).
   - **NOINDEX**: only gallery pages without a note are meant to be noindex
     (`shared/galleryJobNotes.ts`). Anything else with noindex is a bug.
   - **CANONICAL points elsewhere**: the page's `<SEO canonical>` disagrees
     with its URL. Fix the canonical or remove the duplicate.
   - **NO INTERNAL LINKS**: add a link from a page that already ranks. Use the
     existing blocks: `VehicleLinks` for model and body-type pages,
     `CompareLinks` for comparison pages, `ServiceCityLinks` and `NearbyAreas`
     for city pages, the footer in `client/src/components/Footer.tsx`, the
     hub at `client/src/pages/ServiceAreas.tsx`, or a sentence with a link in
     a related blog post (`client/src/lib/blogData.ts` or
     `content/blogPosts.json`). One link from a relevant, indexed page is
     enough; do not add link lists for their own sake.
   - **fine on our side**: Google has not got to it yet. Push and wait.
   - **Duplicate, Google chose different canonical**: usually an archived
     promo (`/september-special`) or an intended alias. Leave it.

3. **Validate and ship.** `pnpm exec tsc --noEmit`, `pnpm run build`, commit
   with the standard trailers, push to `main`, wait for `/api/health`
   `startedAt` to change.

4. **Push the URLs.** `node scripts/index-check.mjs --push` sends the fixable
   pages to IndexNow and the Google Indexing API now. Google allows about 200
   publish calls a day; if the output shows HTTP 429, the server's daily push
   sends the rest after midnight Pacific. Do not loop on it.

5. **Report.** Counts by state, what was fixed and where, what was pushed, and
   what is simply waiting on Google. Re-run the skill in a week to confirm the
   indexed count moved.

## Rules that still apply

No prices outside each promo's own banner, no full-body PPF wording, three
PPF packages only, STEK DYNOshield 12-year, Gtechniq Light 5-year and Ultra
7-year, GeoShield tint, "140+ five-star Google reviews" in prose. Never
commit keys. Commits end with the Co-Authored-By and Claude-Session trailers
used in this repo's history.
