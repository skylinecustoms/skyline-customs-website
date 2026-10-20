/**
 * Google index status for every sitemap URL, read at /api/seo/index-status.
 *
 * Asks the Search Console URL Inspection API about each page in the live
 * sitemap and groups the answers by coverage state ("Submitted and indexed",
 * "Crawled - currently not indexed", "Discovered - currently not indexed", ...)
 * so an unindexed page is a known fact, not a guess. Inspection has a daily
 * quota of 2,000 URLs, so the result is cached for 12 hours in siteSettings.
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";
import { googleToken } from "../scripts/lib/search-ping.mjs";
import { sitemapEntries } from "./searchIndexing";

const KEY = "seo:index-status";
const TTL_MS = 12 * 60 * 60 * 1000;
const SITE = "sc-domain:skylinecustomshop.com";
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
const CONCURRENCY = 4;

export interface UrlIndexStatus {
  url: string;
  lastmod: string;
  verdict: string;          // PASS, NEUTRAL, FAIL, VERDICT_UNSPECIFIED
  coverageState: string;    // Google's wording, e.g. "Submitted and indexed"
  indexingState: string;    // INDEXING_ALLOWED, BLOCKED_BY_META_TAG, ...
  robotsTxtState: string;
  pageFetchState: string;
  lastCrawlTime: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  crawledAs: string | null;
  error?: string;
}

export interface IndexStatusReport {
  generatedAt: string;
  total: number;
  byState: { state: string; count: number }[];
  /** Everything that is not indexed, most recently changed first. */
  notIndexed: UrlIndexStatus[];
  /** Indexed under a different canonical than the page declares. */
  canonicalMismatch: UrlIndexStatus[];
  urls: UrlIndexStatus[];
  note?: string;
}

async function readCache(): Promise<IndexStatusReport | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  try { return rows[0]?.value ? (JSON.parse(rows[0].value) as IndexStatusReport) : null; } catch { return null; }
}

async function writeCache(v: IndexStatusReport) {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(v);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, KEY));
  else await db.insert(siteSettings).values({ key: KEY, value });
}

async function inspect(token: string, url: string, lastmod: string): Promise<UrlIndexStatus> {
  const base: UrlIndexStatus = { url, lastmod, verdict: "", coverageState: "", indexingState: "", robotsTxtState: "", pageFetchState: "", lastCrawlTime: null, googleCanonical: null, userCanonical: null, crawledAs: null };
  try {
    const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
    });
    if (!r.ok) return { ...base, error: `HTTP ${r.status}: ${(await r.text()).slice(0, 200)}` };
    const j = (await r.json()) as { inspectionResult?: { indexStatusResult?: Record<string, string | undefined> } };
    const s = j.inspectionResult?.indexStatusResult ?? {};
    return {
      ...base,
      verdict: s.verdict ?? "",
      coverageState: s.coverageState ?? "",
      indexingState: s.indexingState ?? "",
      robotsTxtState: s.robotsTxtState ?? "",
      pageFetchState: s.pageFetchState ?? "",
      lastCrawlTime: s.lastCrawlTime ?? null,
      googleCanonical: s.googleCanonical ?? null,
      userCanonical: s.userCanonical ?? null,
      crawledAs: s.crawledAs ?? null,
    };
  } catch (err) {
    return { ...base, error: (err as Error).message };
  }
}

/** The inspection runs in the background: a full pass takes a few minutes, longer than the edge keeps a request open. */
let job: { startedAt: string; done: number; total: number; promise: Promise<IndexStatusReport> } | null = null;

export type IndexStatusAnswer = IndexStatusReport | { status: "running"; startedAt: string; done: number; total: number };

export async function getIndexStatus(force = false): Promise<IndexStatusAnswer> {
  if (job) return { status: "running", startedAt: job.startedAt, done: job.done, total: job.total };
  const cached = force ? null : await readCache();
  if (cached && Date.now() - Date.parse(cached.generatedAt) < TTL_MS) return cached;
  const started = { startedAt: new Date().toISOString(), done: 0, total: 0 };
  const promise = runInspection(started).finally(() => { job = null; });
  job = { ...started, promise };
  // Let the caller see progress; the result lands in the cache when the pass completes.
  return { status: "running", ...started };
}

async function runInspection(progress: { done: number; total: number }): Promise<IndexStatusReport> {
  const token = await googleToken(SCOPES);
  if (!token) return { generatedAt: new Date().toISOString(), total: 0, byState: [], notIndexed: [], canonicalMismatch: [], urls: [], note: "Google key not configured (GOOGLE_INDEXING_SA_JSON)." };

  const entries = await sitemapEntries();
  progress.total = entries.length;
  if (job) job.total = entries.length;
  const urls: UrlIndexStatus[] = new Array(entries.length);
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < entries.length) {
      const i = next++;
      urls[i] = await inspect(token, entries[i].url, entries[i].lastmod);
      progress.done++;
      if (job) job.done = progress.done;
    }
  }));

  const counts = new Map<string, number>();
  for (const u of urls) counts.set(u.error ? `error: ${u.error.slice(0, 60)}` : u.coverageState || "(no result)", (counts.get(u.error ? `error: ${u.error.slice(0, 60)}` : u.coverageState || "(no result)") ?? 0) + 1);
  const report: IndexStatusReport = {
    generatedAt: new Date().toISOString(),
    total: urls.length,
    byState: Array.from(counts.entries()).map(([state, count]) => ({ state, count })).sort((a, b) => b.count - a.count),
    notIndexed: urls.filter((u) => u.verdict !== "PASS").sort((a, b) => b.lastmod.localeCompare(a.lastmod)),
    canonicalMismatch: urls.filter((u) => u.verdict === "PASS" && u.googleCanonical && u.googleCanonical !== u.url),
    urls,
  };
  await writeCache(report);
  return report;
}
