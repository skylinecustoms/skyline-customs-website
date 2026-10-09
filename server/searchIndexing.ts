/**
 * Keeps Google and IndexNow told about every page on the site.
 *
 * Once a day (and shortly after each deploy) the server reads its own sitemap,
 * compares each URL's lastmod with what was last submitted (kept in the
 * siteSettings table), and pushes the new and changed URLs to the Google
 * Indexing API and IndexNow. Google allows about 200 publish calls a day, so a
 * sweep sends at most MAX_PER_SWEEP and the rest go the next day; a brand-new
 * page is always submitted on the first sweep after it ships.
 *
 * Needs GOOGLE_INDEXING_SA_JSON (service-account key, Owner in Search Console).
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";
import { buildSitemap } from "./_core/sitemap";
import { googleIndexingConfigured, pingGoogleIndexing, pingIndexNow } from "../scripts/lib/search-ping.mjs";

const SUBMITTED_KEY = "search:google-submitted"; // JSON { [url]: lastmod submitted }
const MAX_PER_SWEEP = 180;
const DAY_MS = 24 * 60 * 60 * 1000;

export interface SweepSummary { at: string; submitted: number; failed: number; pending: number; total: number; note?: string }
let lastSweep: SweepSummary | null = null;
let running = false;
export const lastIndexingSweep = () => lastSweep;

async function readSubmitted(): Promise<Record<string, string>> {
  const db = await getDb();
  if (!db) return {};
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, SUBMITTED_KEY)).limit(1);
  try { return rows[0] ? (JSON.parse(rows[0].value) as Record<string, string>) : {}; } catch { return {}; }
}

async function writeSubmitted(map: Record<string, string>) {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(map);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, SUBMITTED_KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, SUBMITTED_KEY));
  else await db.insert(siteSettings).values({ key: SUBMITTED_KEY, value });
}

/** Every URL in the live sitemap with its lastmod. */
export async function sitemapEntries(): Promise<{ url: string; lastmod: string }[]> {
  const xml = await buildSitemap();
  return Array.from(xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g), (m) => ({ url: m[1], lastmod: m[2] }));
}

/** Submits new and changed URLs. Returns what happened; never throws. */
export async function runIndexingSweep(opts: { max?: number; log?: (m: string) => void } = {}): Promise<SweepSummary> {
  const log = opts.log ?? ((m: string) => console.log(m));
  const max = opts.max ?? MAX_PER_SWEEP;
  if (running) return lastSweep ?? { at: new Date().toISOString(), submitted: 0, failed: 0, pending: 0, total: 0, note: "already running" };
  running = true;
  try {
    const entries = await sitemapEntries();
    const submitted = await readSubmitted();
    const fresh = entries.filter((e) => !submitted[e.url]);
    const changed = entries.filter((e) => submitted[e.url] && e.lastmod > submitted[e.url]);
    const due = [...fresh, ...changed];
    const batch = due.slice(0, max);
    const summary: SweepSummary = { at: new Date().toISOString(), submitted: 0, failed: 0, pending: due.length - batch.length, total: entries.length };
    if (batch.length === 0) { summary.note = "nothing new or changed"; lastSweep = summary; log(`[search] sweep: ${entries.length} urls, nothing new or changed`); return summary; }

    // IndexNow takes the whole batch in one request and has no meaningful quota.
    try { const r = await pingIndexNow(batch.map((b) => b.url)); log(`[search] IndexNow: HTTP ${r.status} for ${r.count} url(s)`); }
    catch (err) { log(`[search] IndexNow failed: ${(err as Error).message}`); }

    if (!googleIndexingConfigured()) {
      summary.note = "GOOGLE_INDEXING_SA_JSON not set";
      log(`[search] Google Indexing API not configured; ${batch.length} url(s) waiting`);
      summary.pending = due.length;
      lastSweep = summary;
      return summary;
    }
    const results = (await pingGoogleIndexing(batch.map((b) => b.url))) ?? [];
    const quotaHit = results.some((r) => r.status === 429);
    for (const r of results) {
      const entry = batch.find((b) => b.url === r.url);
      if (r.status === 200 && entry) { submitted[r.url] = entry.lastmod; summary.submitted++; }
      else { summary.failed++; if (summary.failed <= 5) log(`[search] Google ${r.status} ${r.url}${r.detail ? ` (${r.detail})` : ""}`); }
    }
    if (quotaHit) summary.note = "daily quota reached; the rest go tomorrow";
    summary.pending = due.length - summary.submitted;
    await writeSubmitted(submitted);
    lastSweep = summary;
    log(`[search] Google sweep: ${summary.submitted} submitted, ${summary.failed} failed, ${summary.pending} still pending of ${entries.length}`);
    return summary;
  } catch (err) {
    const summary: SweepSummary = { at: new Date().toISOString(), submitted: 0, failed: 0, pending: 0, total: 0, note: (err as Error).message };
    lastSweep = summary;
    log(`[search] sweep failed: ${(err as Error).message}`);
    return summary;
  } finally {
    running = false;
  }
}

/** First sweep ~90 s after boot (so a deploy's new pages go out right away), then daily. */
export function startIndexingScheduler() {
  if (!process.env.DATABASE_URL) return;
  setTimeout(() => { void runIndexingSweep(); }, 90 * 1000).unref();
  setInterval(() => { void runIndexingSweep(); }, DAY_MS).unref();
}
