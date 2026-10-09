#!/usr/bin/env node
/**
 * Submit URLs to IndexNow and, when GOOGLE_INDEXING_SA_JSON is set, to the Google
 * Indexing API.
 *   node scripts/notify-search.mjs /blog/some-post /faq   # specific paths
 *   node scripts/notify-search.mjs --blog                  # every published blog post
 *   node scripts/notify-search.mjs                         # every URL in the live sitemap
 */
import "dotenv/config";
import { HOST, notifySearchEngines } from "./lib/search-ping.mjs";

const args = process.argv.slice(2);
let urls = args.filter((a) => !a.startsWith("--"));
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (args.includes("--blog")) urls = urls.filter((u) => u.includes("/blog/"));
}
await notifySearchEngines(urls);
