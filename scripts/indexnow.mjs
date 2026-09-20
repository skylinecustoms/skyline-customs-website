#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, DuckDuckGo, Yandex, ...).
 *   node scripts/indexnow.mjs                 # every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/x /faq    # specific paths
 */
const KEY = "38576f4b734896647704c96e87d44956";
const HOST = "www.skylinecustomshop.com";

async function main() {
  let urls = process.argv.slice(2).map((p) => (p.startsWith("http") ? p : `https://${HOST}${p}`));
  if (urls.length === 0) {
    const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  console.log(`IndexNow: HTTP ${res.status} for ${urls.length} url(s)`);
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}
main().catch((e) => { console.error(e); process.exit(1); });
