#!/usr/bin/env node
/**
 * index-check: which sitemap pages Google has not indexed, why, and what to do.
 *
 *   node scripts/index-check.mjs            # read the cached report (refreshed by the server once a day)
 *   node scripts/index-check.mjs --refresh  # start a fresh inspection (a few minutes), then report
 *   node scripts/index-check.mjs --push     # also push the fixable URLs to Google and IndexNow now
 *
 * For each page that is not indexed it checks the live response, whether the
 * page declares noindex or a different canonical, and whether any other page
 * on the site links to it (the usual reason a page stays "Discovered"). The
 * output is the fix list the /index-check skill works through.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const SITE = "https://www.skylinecustomshop.com";
const args = new Set(process.argv.slice(2));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function report() {
  if (args.has("--refresh")) {
    await fetch(`${SITE}/api/seo/index-status?refresh=1`);
    for (let i = 0; i < 60; i++) {
      await sleep(10_000);
      const j = await (await fetch(`${SITE}/api/seo/index-status`)).json();
      if (!j.status) return j;
      process.stderr.write(`  inspecting ${j.done}/${j.total}\r`);
    }
    throw new Error("inspection did not finish in 10 minutes");
  }
  const j = await (await fetch(`${SITE}/api/seo/index-status`)).json();
  if (j.status === "running") { process.stderr.write("inspection running, waiting...\n"); args.add("--refresh"); return report(); }
  return j;
}

/** Every source file under client/src, read once, for the internal-link check. */
function sourceText() {
  const out = [];
  const walk = (dir) => { for (const f of readdirSync(dir)) { const p = join(dir, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(tsx?|json)$/.test(f)) out.push(readFileSync(p, "utf8")); } };
  walk("client/src"); walk("content"); walk("shared");
  return out.join("\n");
}

async function live(url) {
  try {
    const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } });
    const html = r.status === 200 ? await r.text() : "";
    const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || [])[1] || null;
    return { status: r.status, location: r.headers.get("location"), noindex, canonical, bytes: html.length };
  } catch (e) { return { status: 0, error: e.message }; }
}

const rep = await report();
const path = (u) => u.replace(SITE, "") || "/";

/**
 * Internal links as Googlebot sees them: the server-rendered HTML of the hub
 * pages, plus the pages a URL would naturally be linked from (its city's other
 * service pages, the blog index, the gallery). Source text is only a fallback,
 * since most links on this site are generated from data, not written literally.
 */
const HUBS = ["/", "/services", "/services/ppf", "/services/ceramic-coating", "/services/window-tinting", "/service-areas", "/blog", "/gallery", "/full-front-ppf", "/ceramic-coating-guide"];
const htmlCache = new Map();
async function html(p) {
  if (!htmlCache.has(p)) htmlCache.set(p, (await live(`${SITE}${p}`).then(async () => { try { return await (await fetch(`${SITE}${p}`, { headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } })).text(); } catch { return ""; } })));
  return htmlCache.get(p);
}
function siblings(p) {
  const city = p.match(/^\/(ppf|ceramic-coating|window-tinting)-(.+)$/);
  if (city) return ["ppf", "ceramic-coating", "window-tinting"].filter((s) => s !== city[1]).map((s) => `/${s}-${city[2]}`);
  if (p.startsWith("/blog/")) return ["/blog"];
  if (p.startsWith("/gallery/")) return ["/gallery"];
  if (/-ppf$/.test(p)) return ["/services/ppf", "/truck-ppf", "/suv-ppf"];
  return [];
}
async function inboundLinks(p) {
  const needle = `href="${p}"`;
  let n = 0;
  for (const h of [...HUBS, ...siblings(p)].filter((h) => h !== p)) n += (await html(h)).split(needle).length - 1;
  return n;
}
console.log(`Index status as of ${rep.generatedAt}: ${rep.total} sitemap URLs`);
for (const s of rep.byState) console.log(`  ${String(s.count).padStart(4)}  ${s.state}`);
const src = sourceText();
const problems = rep.notIndexed.filter((u) => !/^Duplicate/.test(u.coverageState));
console.log(`\n${problems.length} page(s) to look at (duplicates with a chosen canonical are excluded):\n`);
const fixes = { push: [], link: [], broken: [], noindex: [], canonical: [], wait: [] };
for (const u of problems) {
  const p = path(u.url);
  const l = await live(u.url);
  const inSource = (src.match(new RegExp(`["'\`(]${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'\`)#?]`, "g")) || []).length;
  const linked = (await inboundLinks(p)) + inSource;
  let verdict;
  if (l.status !== 200) { verdict = `BROKEN: live returns ${l.status}${l.location ? ` -> ${l.location}` : ""}`; fixes.broken.push(p); }
  else if (l.noindex) { verdict = "NOINDEX tag on the page"; fixes.noindex.push(p); }
  else if (l.canonical && l.canonical !== u.url) { verdict = `CANONICAL points elsewhere: ${l.canonical}`; fixes.canonical.push(p); }
  else if (linked === 0) { verdict = "NO INTERNAL LINKS: add a link from a related page, then push"; fixes.link.push(p); }
  else if (u.error) { verdict = `inspection error: ${u.error.slice(0, 60)}`; fixes.wait.push(p); }
  else { verdict = `fine on our side (${linked} inbound link${linked === 1 ? "" : "s"}): push and wait for Google`; fixes.push.push(p); }
  console.log(`${u.coverageState.padEnd(40)} ${p.padEnd(58)} ${verdict}`);
}
console.log("\nFix plan");
if (fixes.broken.length) console.log(`  Broken (fix the route or redirect, then push): ${fixes.broken.join(", ")}`);
if (fixes.noindex.length) console.log(`  Remove noindex if these should rank: ${fixes.noindex.join(", ")}`);
if (fixes.canonical.length) console.log(`  Canonical disagreement, decide which URL wins: ${fixes.canonical.join(", ")}`);
if (fixes.link.length) console.log(`  Add internal links (footer, hub, related-pages block), then push: ${fixes.link.join(", ")}`);
if (fixes.push.length) console.log(`  Push now (nothing wrong on the site): ${fixes.push.length} page(s)`);
if (fixes.wait.length) console.log(`  Re-run later: ${fixes.wait.join(", ")}`);

if (args.has("--push")) {
  const urls = [...fixes.push, ...fixes.link].map((p) => `${SITE}${p}`);
  if (urls.length) {
    const { notifySearchEngines } = await import("./lib/search-ping.mjs");
    await notifySearchEngines(urls);
  }
}
