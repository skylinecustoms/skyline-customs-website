/**
 * GA4 behavior report for the site, read at /api/seo/behavior.
 *
 * What visitors do once they land: which landing pages produce leads, how
 * phones compare with desktops, which pages the calls and form submits happen
 * on, the form funnel (started vs submitted), and when and where visitors come
 * from. Built for the optimization reviews, next to /api/seo/topics (what
 * people search for). Recomputed at most every 6 hours; cached in siteSettings.
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";
import { googleToken } from "../scripts/lib/search-ping.mjs";
import { ga4 } from "./weeklyReport";

const KEY = "seo:behavior";
const TTL_MS = 6 * 60 * 60 * 1000;
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const LEAD_EVENTS = ["phone_call", "sms_click", "generate_lead", "lead_partial", "get_directions", "booking_service_select"];
const FUNNEL_EVENTS = ["lead_form_start", "generate_lead", "lead_partial", "exit_prompt_shown", "cta_click", "chat_open", "booking_open", "faq_open", "video_open"];

type Row = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };
const num = (v: string | undefined) => Number(v ?? 0) || 0;

export interface BehaviorReport {
  generatedAt: string;
  window: { start: string; end: string; days: number };
  totals: { sessions: number; engagedSessions: number; keyEvents: number; engagementRate: number; avgSessionSec: number };
  /** Landing pages by sessions with engagement and lead counts; leadRate = keyEvents per 100 sessions. */
  landingPages: { page: string; sessions: number; engagementRate: number; avgSessionSec: number; keyEvents: number; leadRate: number }[];
  devices: { device: string; sessions: number; engagementRate: number; keyEvents: number; leadRate: number }[];
  channels: { channel: string; sessions: number; keyEvents: number; leadRate: number }[];
  /** Where each lead action happens (page path x event). */
  leadPages: { page: string; event: string; count: number }[];
  /** Lead and engagement events, whole site. */
  events: { event: string; count: number }[];
  /** Form funnel per page: starts, submits, abandoned-but-saved. */
  funnel: { page: string; starts: number; submits: number; partials: number }[];
  hours: { hour: number; sessions: number; keyEvents: number }[];
  days: { day: string; sessions: number; keyEvents: number }[];
  cities: { city: string; sessions: number; keyEvents: number }[];
  note?: string;
}

async function readCache(): Promise<BehaviorReport | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  try { return rows[0]?.value ? (JSON.parse(rows[0].value) as BehaviorReport) : null; } catch { return null; }
}

async function writeCache(v: BehaviorReport) {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(v);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, KEY));
  else await db.insert(siteSettings).values({ key: KEY, value });
}

const pathOf = (p: string) => (p.split("?")[0].replace(/\/$/, "") || "/");
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function getBehavior(force = false, days = 28): Promise<BehaviorReport> {
  const cached = force ? null : await readCache();
  if (cached && Date.now() - Date.parse(cached.generatedAt) < TTL_MS && cached.window.days === days) return cached;

  const token = await googleToken(SCOPES);
  const window = { start: `${days}daysAgo`, end: "yesterday", days };
  const empty: BehaviorReport = { generatedAt: new Date().toISOString(), window, totals: { sessions: 0, engagedSessions: 0, keyEvents: 0, engagementRate: 0, avgSessionSec: 0 }, landingPages: [], devices: [], channels: [], leadPages: [], events: [], funnel: [], hours: [], days: [], cities: [] };
  if (!token) return { ...empty, note: "Google key not configured (GOOGLE_INDEXING_SA_JSON)." };

  const range = { dateRanges: [{ startDate: window.start, endDate: window.end }] };
  const q = (body: Record<string, unknown>): Promise<Row[]> => ga4(token, { ...range, ...body });

  const [totals, landing, devices, channels, leadPages, events, funnelRows, hours, dow, cities] = await Promise.all([
    q({ metrics: [{ name: "sessions" }, { name: "engagedSessions" }, { name: "keyEvents" }, { name: "engagementRate" }, { name: "averageSessionDuration" }] }),
    q({ dimensions: [{ name: "landingPagePlusQueryString" }], metrics: [{ name: "sessions" }, { name: "engagementRate" }, { name: "averageSessionDuration" }, { name: "keyEvents" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 60 }),
    q({ dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "sessions" }, { name: "engagementRate" }, { name: "keyEvents" }] }),
    q({ dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }, { name: "keyEvents" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 12 }),
    q({ dimensions: [{ name: "pagePath" }, { name: "eventName" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: LEAD_EVENTS } } }, orderBys: [{ metric: { metricName: "eventCount" }, desc: true }], limit: 80 }),
    q({ dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: [...LEAD_EVENTS, ...FUNNEL_EVENTS] } } }, limit: 40 }),
    q({ dimensions: [{ name: "pagePath" }, { name: "eventName" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ["lead_form_start", "generate_lead", "lead_partial"] } } }, limit: 120 }),
    q({ dimensions: [{ name: "hour" }], metrics: [{ name: "sessions" }, { name: "keyEvents" }], limit: 24 }),
    q({ dimensions: [{ name: "dayOfWeek" }], metrics: [{ name: "sessions" }, { name: "keyEvents" }], limit: 7 }),
    q({ dimensions: [{ name: "city" }], metrics: [{ name: "sessions" }, { name: "keyEvents" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 25 }),
  ]);

  const t = totals[0]?.metricValues ?? [];
  const rate = (k: number, s: number) => (s ? Math.round((k / s) * 1000) / 10 : 0);
  const funnel = new Map<string, { starts: number; submits: number; partials: number }>();
  for (const r of funnelRows) {
    const page = pathOf(r.dimensionValues[0].value), ev = r.dimensionValues[1].value, c = num(r.metricValues[0].value);
    const f = funnel.get(page) ?? { starts: 0, submits: 0, partials: 0 };
    if (ev === "lead_form_start") f.starts += c; else if (ev === "generate_lead") f.submits += c; else f.partials += c;
    funnel.set(page, f);
  }
  const mergedLanding = new Map<string, { sessions: number; eng: number; dur: number; keyEvents: number }>();
  for (const r of landing) {
    const page = pathOf(r.dimensionValues[0].value), s = num(r.metricValues[0].value);
    const m = mergedLanding.get(page) ?? { sessions: 0, eng: 0, dur: 0, keyEvents: 0 };
    m.sessions += s; m.eng += num(r.metricValues[1].value) * s; m.dur += num(r.metricValues[2].value) * s; m.keyEvents += num(r.metricValues[3].value);
    mergedLanding.set(page, m);
  }

  const report: BehaviorReport = {
    generatedAt: new Date().toISOString(),
    window,
    totals: { sessions: num(t[0]?.value), engagedSessions: num(t[1]?.value), keyEvents: num(t[2]?.value), engagementRate: Math.round(num(t[3]?.value) * 1000) / 10, avgSessionSec: Math.round(num(t[4]?.value)) },
    landingPages: Array.from(mergedLanding.entries()).map(([page, m]) => ({ page, sessions: m.sessions, engagementRate: m.sessions ? Math.round((m.eng / m.sessions) * 1000) / 10 : 0, avgSessionSec: m.sessions ? Math.round(m.dur / m.sessions) : 0, keyEvents: m.keyEvents, leadRate: rate(m.keyEvents, m.sessions) })).sort((a, b) => b.sessions - a.sessions),
    devices: devices.map((r) => ({ device: r.dimensionValues[0].value, sessions: num(r.metricValues[0].value), engagementRate: Math.round(num(r.metricValues[1].value) * 1000) / 10, keyEvents: num(r.metricValues[2].value), leadRate: rate(num(r.metricValues[2].value), num(r.metricValues[0].value)) })),
    channels: channels.map((r) => ({ channel: r.dimensionValues[0].value, sessions: num(r.metricValues[0].value), keyEvents: num(r.metricValues[1].value), leadRate: rate(num(r.metricValues[1].value), num(r.metricValues[0].value)) })),
    leadPages: leadPages.map((r) => ({ page: pathOf(r.dimensionValues[0].value), event: r.dimensionValues[1].value, count: num(r.metricValues[0].value) })),
    events: events.map((r) => ({ event: r.dimensionValues[0].value, count: num(r.metricValues[0].value) })).sort((a, b) => b.count - a.count),
    funnel: Array.from(funnel.entries()).map(([page, f]) => ({ page, ...f })).sort((a, b) => b.starts - a.starts),
    hours: hours.map((r) => ({ hour: num(r.dimensionValues[0].value), sessions: num(r.metricValues[0].value), keyEvents: num(r.metricValues[1].value) })).sort((a, b) => a.hour - b.hour),
    days: dow.map((r) => ({ day: DAYS[num(r.dimensionValues[0].value)] ?? r.dimensionValues[0].value, sessions: num(r.metricValues[0].value), keyEvents: num(r.metricValues[1].value) })),
    cities: cities.map((r) => ({ city: r.dimensionValues[0].value, sessions: num(r.metricValues[0].value), keyEvents: num(r.metricValues[1].value) })),
  };
  await writeCache(report);
  return report;
}
