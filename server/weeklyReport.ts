/**
 * Monday morning SEO and lead report, sent to the owners' Telegram chat.
 *
 * Pulls the last 7 days (against the 7 before) from Search Console and GA4
 * with the same service account the indexing sweep uses, adds the indexing
 * sweep status and the posts published that week, and sends one Telegram
 * message. Scheduled for Mondays at 8:00 AM Eastern; /report in the bot
 * sends it on demand.
 */
import { eq, gte } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, siteSettings } from "../drizzle/schema";
import { googleToken } from "../scripts/lib/search-ping.mjs";
import { lastIndexingSweep } from "./searchIndexing";
import { notifyOwners } from "./routers";

const SITE = "sc-domain:skylinecustomshop.com";
const GA4_PROPERTY = process.env.GA4_PROPERTY_ID ?? "524799502";
const SENT_KEY = "report:weekly-last-sent";
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly", "https://www.googleapis.com/auth/analytics.readonly"];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const day = (offset: number) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
const pct = (now: number, before: number) => (before === 0 ? (now > 0 ? "new" : "0%") : `${now >= before ? "+" : ""}${Math.round(((now - before) / before) * 100)}%`);
const n = (v: number) => v.toLocaleString("en-US");
const plural = (v: number, word: string) => `${n(v)} ${word}${v === 1 ? "" : "s"}`;
const pathOf = (url: string) => url.replace(/^https?:\/\/(www\.)?skylinecustomshop\.com/, "").split("?")[0].replace(/\/$/, "") || "/";

/** Page rows merged by path so www, non-www and tagged URLs count as one page. */
function mergeByPath(rows: GscRow[]): { path: string; clicks: number; impressions: number }[] {
  const m = new Map<string, { path: string; clicks: number; impressions: number }>();
  for (const r of rows) {
    const path = pathOf(r.keys![0]);
    const cur = m.get(path) ?? { path, clicks: 0, impressions: 0 };
    cur.clicks += r.clicks; cur.impressions += r.impressions;
    m.set(path, cur);
  }
  return Array.from(m.values()).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
}

interface GscRow { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function gsc(token: string, body: Record<string, unknown>): Promise<GscRow[]> {
  const r = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Search Console ${r.status}`);
  return ((await r.json()) as { rows?: GscRow[] }).rows ?? [];
}

async function ga4(token: string, body: Record<string, unknown>): Promise<{ dimensionValues: { value: string }[]; metricValues: { value: string }[] }[]> {
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Analytics ${r.status}`);
  return ((await r.json()) as { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] }).rows ?? [];
}

/** Builds the Telegram HTML message. Each section degrades on its own if a source fails. */
export async function buildWeeklyReport(): Promise<string> {
  const token = await googleToken(SCOPES);
  const lines: string[] = [];
  // Search Console data lags about two days.
  const end = day(2), start = day(8), prevEnd = day(9), prevStart = day(15);
  lines.push(`📊 <b>Weekly site report</b> · ${start} to ${end}`);

  if (!token) {
    lines.push("", "Google key not configured (GOOGLE_INDEXING_SA_JSON).");
  } else {
    // --- Search Console ---
    try {
      const [cur] = await gsc(token, { startDate: start, endDate: end, rowLimit: 1 });
      const [prev] = await gsc(token, { startDate: prevStart, endDate: prevEnd, rowLimit: 1 });
      const c = cur ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 }, p = prev ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      lines.push("", "<b>Google Search</b>",
        `Clicks: <b>${n(c.clicks)}</b> (${pct(c.clicks, p.clicks)} vs prior week)`,
        `Impressions: <b>${n(c.impressions)}</b> (${pct(c.impressions, p.impressions)})`,
        `Avg position: <b>${c.position.toFixed(1)}</b>${p.position ? ` (was ${p.position.toFixed(1)})` : ""}`);
      const queries = await gsc(token, { startDate: start, endDate: end, dimensions: ["query"], rowLimit: 6 });
      if (queries.length) lines.push("", "<b>Top searches</b>", ...queries.map((q) => `• ${esc(q.keys![0])} — ${plural(q.clicks, "click")}, ${n(q.impressions)} shown, #${q.position.toFixed(0)}`));
      const allPages = mergeByPath(await gsc(token, { startDate: start, endDate: end, dimensions: ["page"], rowLimit: 1000 }));
      lines.push("", "<b>Top pages</b>", ...allPages.slice(0, 5).map((q) => `• ${esc(q.path)} — ${plural(q.clicks, "click")}, ${n(q.impressions)} shown`));
      // Pages that got their first impressions this week.
      const prevPages = new Set(mergeByPath(await gsc(token, { startDate: day(36), endDate: prevEnd, dimensions: ["page"], rowLimit: 1000 })).map((r) => r.path));
      const fresh = allPages.filter((r) => !prevPages.has(r.path)).sort((a, b) => b.impressions - a.impressions).slice(0, 6);
      if (fresh.length) lines.push("", `<b>Newly ranking pages</b> (${allPages.length} pages showed in search, ${fresh.length} for the first time)`, ...fresh.map((r) => `• ${esc(r.path)} — ${n(r.impressions)} shown`));
    } catch (err) { lines.push("", `Search Console: ${(err as Error).message}`); }

    // --- GA4 ---
    try {
      const rows = await ga4(token, { dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }, { startDate: "14daysAgo", endDate: "8daysAgo" }], dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }, { name: "keyEvents" }], limit: 20 });
      const cur = new Map<string, [number, number]>(), prev = new Map<string, [number, number]>();
      for (const r of rows) {
        const range = r.dimensionValues[1]?.value ?? "date_range_0";
        (range === "date_range_0" ? cur : prev).set(r.dimensionValues[0].value, [Number(r.metricValues[0].value), Number(r.metricValues[1].value)]);
      }
      const sum = (m: Map<string, [number, number]>) => Array.from(m.values()).reduce((a, [s, k]) => [a[0] + s, a[1] + k], [0, 0]);
      const [cs, ck] = sum(cur), [ps, pk] = sum(prev);
      lines.push("", "<b>Website traffic (GA4)</b>", `Sessions: <b>${n(cs)}</b> (${pct(cs, ps)}) · Lead events: <b>${n(ck)}</b> (${pct(ck, pk)})`);
      const top = Array.from(cur.entries()).sort((a, b) => b[1][1] - a[1][1] || b[1][0] - a[1][0]).slice(0, 6);
      lines.push(...top.map(([ch, [s, k]]) => `• ${esc(ch)} — ${plural(s, "session")}, ${plural(k, "lead")}`));
    } catch (err) { lines.push("", `Analytics: ${(err as Error).message}`); }
  }

  // --- Indexing sweep ---
  const sweep = lastIndexingSweep();
  if (sweep) lines.push("", "<b>Google indexing</b>", sweep.note && !sweep.submitted ? esc(sweep.note) : `${sweep.submitted} URLs pushed on the last sweep, ${sweep.pending} waiting, ${sweep.total} pages in the sitemap`);

  // --- Posts this week ---
  try {
    const db = await getDb();
    if (db) {
      const posts = await db.select({ title: blogPosts.title, slug: blogPosts.slug }).from(blogPosts).where(gte(blogPosts.createdAt, new Date(Date.now() - 7 * 864e5)));
      if (posts.length) lines.push("", "<b>Published this week</b>", ...posts.map((p) => `• ${esc(p.title)}\n  skylinecustomshop.com/blog/${p.slug}`));
    }
  } catch { /* optional */ }

  lines.push("", "Reply /report any time for a fresh one.");
  return lines.join("\n").slice(0, 4000);
}

export async function sendWeeklyReport(): Promise<{ ok: boolean; results: string[] }> {
  const html = await buildWeeklyReport();
  const r = await notifyOwners(html);
  if (r.ok) {
    try {
      const db = await getDb();
      if (db) {
        const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, SENT_KEY)).limit(1);
        const value = new Date().toISOString();
        if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, SENT_KEY));
        else await db.insert(siteSettings).values({ key: SENT_KEY, value });
      }
    } catch { /* best effort */ }
  }
  return r;
}

/** Mondays at 8 AM Eastern; checks hourly and sends once per ISO week. */
export function startWeeklyReportScheduler() {
  if (!process.env.DATABASE_URL || !process.env.TELEGRAM_BOT_TOKEN) return;
  const tick = async () => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
      const weekday = parts.find((p) => p.type === "weekday")?.value, hour = Number(parts.find((p) => p.type === "hour")?.value);
      if (weekday !== "Mon" || hour !== 8) return;
      const db = await getDb();
      if (!db) return;
      const last = await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, SENT_KEY)).limit(1);
      if (last[0] && Date.now() - Date.parse(last[0].value) < 5 * 864e5) return; // already sent this week
      const r = await sendWeeklyReport();
      console.log(`[report] weekly report ${r.ok ? "sent" : "failed"}: ${r.results.join(" | ")}`);
    } catch (err) { console.warn("[report] tick failed:", (err as Error).message); }
  };
  setInterval(() => { void tick(); }, 60 * 60 * 1000).unref();
  setTimeout(() => { void tick(); }, 2 * 60 * 1000).unref();
}
