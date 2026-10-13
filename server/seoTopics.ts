/**
 * Blog topic candidates from Search Console: queries where the site already
 * shows on page one or two without a dedicated page. The weekly blog routine
 * reads /api/seo/topics and writes about the best uncovered one.
 * Recomputed at most once a day; the result is cached in siteSettings.
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, siteSettings } from "../drizzle/schema";
import { googleToken } from "../scripts/lib/search-ping.mjs";
import { gsc } from "./weeklyReport";

const KEY = "seo:topics";
const TTL_MS = 24 * 60 * 60 * 1000;

export interface SeoTopic {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
  /** Which service the query is about, from its words. */
  service: "ppf" | "tint" | "ceramic" | "other";
  /** Where Google sends that query today, and how that page ranks for it. */
  page: string | null;
  pagePosition: number | null;
  /** True when a blog post title already answers this query closely. */
  covered: boolean;
  /** Why it is on the list. */
  reason: string;
}

export interface SeoTopics { generatedAt: string; window: { start: string; end: string }; topics: SeoTopic[]; note?: string }

const STOP = new Set(["a", "an", "the", "in", "on", "of", "for", "to", "is", "it", "my", "your", "and", "or", "va", "near", "me", "do", "does", "can", "i", "you", "with", "what", "how", "much", "why", "vs"]);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
const serviceOf = (q: string): SeoTopic["service"] => (/\btint|tinting|vlt\b/i.test(q) ? "tint" : /ceramic coat|coating|gtechniq|system x/i.test(q) ? "ceramic" : /\bppf\b|paint protection|clear bra|film/i.test(q) ? "ppf" : "other");
const pathOf = (url: string) => url.replace(/^https?:\/\/(www\.)?skylinecustomshop\.com/, "").split("?")[0].replace(/\/$/, "") || "/";
const day = (offset: number) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);

async function readCache(): Promise<SeoTopics | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  try { return rows[0]?.value ? (JSON.parse(rows[0].value) as SeoTopics) : null; } catch { return null; }
}

async function writeCache(v: SeoTopics) {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(v);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, KEY));
  else await db.insert(siteSettings).values({ key: KEY, value });
}

async function postTitles(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({ title: blogPosts.title }).from(blogPosts);
  return rows.map((r) => r.title);
}

/** A query counts as covered when most of its meaningful words appear in one post title. */
function coveredBy(query: string, titles: string[]): boolean {
  const q = words(query);
  if (q.length === 0) return false;
  return titles.some((t) => {
    const tw = new Set(words(t));
    const hit = q.filter((w) => tw.has(w) || tw.has(w + "s") || tw.has(w.replace(/s$/, ""))).length;
    return hit / q.length >= 0.75;
  });
}

async function compute(): Promise<SeoTopics> {
  const token = await googleToken(["https://www.googleapis.com/auth/webmasters.readonly"]);
  if (!token) throw new Error("Google service account not configured");
  const start = day(30), end = day(2);
  const rows = await gsc(token, { startDate: start, endDate: end, dimensions: ["query"], rowLimit: 1000 });
  const titles = await postTitles();
  const picked = rows
    .filter((r) => r.keys?.[0] && !/skyline/i.test(r.keys[0]))
    .filter((r) => r.impressions >= 15 && r.position >= 5 && r.position <= 30)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);
  const topics: SeoTopic[] = [];
  for (const r of picked) {
    const query = r.keys![0];
    let page: string | null = null, pagePosition: number | null = null;
    try {
      const pr = await gsc(token, { startDate: start, endDate: end, dimensions: ["page"], dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "equals", expression: query }] }], rowLimit: 1 });
      if (pr[0]?.keys?.[0]) { page = pathOf(pr[0].keys[0]); pagePosition = Math.round(pr[0].position * 10) / 10; }
    } catch { /* leave null */ }
    const service = serviceOf(query);
    const isCity = /\b(va|md|dc|virginia|maryland|fairfax|arlington|alexandria|manassas|woodbridge|tysons|stafford|chantilly|ashburn|sterling|reston|herndon|leesburg|centreville|burke|springfield|vienna|mclean|gainesville|fredericksburg)\b/i.test(query);
    const landsOnPost = !!page && page.startsWith("/blog/");
    const reason = landsOnPost ? `already lands on a post at #${pagePosition}; refresh or go deeper` : isCity ? "city query; a city page exists, a post can support it" : `lands on ${page ?? "no page"} at #${pagePosition ?? "?"}; no dedicated answer`;
    topics.push({ query, impressions: r.impressions, clicks: r.clicks, position: Math.round(r.position * 10) / 10, service, page, pagePosition, covered: coveredBy(query, titles) || landsOnPost, reason });
  }
  return { generatedAt: new Date().toISOString(), window: { start, end }, topics };
}

/** Cached topic list; recomputed when older than a day or when the cache is empty. */
export async function getSeoTopics(force = false): Promise<SeoTopics> {
  const cached = force ? null : await readCache();
  if (cached && Date.now() - new Date(cached.generatedAt).getTime() < TTL_MS) return cached;
  try {
    const fresh = await compute();
    await writeCache(fresh);
    return fresh;
  } catch (err) {
    if (cached) return { ...cached, note: `stale: ${(err as Error).message}` };
    return { generatedAt: new Date().toISOString(), window: { start: day(30), end: day(2) }, topics: [], note: (err as Error).message };
  }
}
