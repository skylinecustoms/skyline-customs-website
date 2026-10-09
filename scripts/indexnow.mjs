#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, DuckDuckGo, Yandex, ...).
 *   node scripts/indexnow.mjs                 # every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/x /faq    # specific paths
 * For Google as well, use scripts/notify-search.mjs.
 */
import { HOST, pingIndexNow } from "./lib/search-ping.mjs";

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const r = await pingIndexNow(urls);
console.log(`IndexNow: HTTP ${r.status} for ${r.count} url(s)`);
if (r.status !== 200 && r.status !== 202) process.exit(1);
