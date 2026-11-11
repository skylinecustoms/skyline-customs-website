/**
 * Unfinished-quote alert.
 *
 * When a half-finished quote form is saved (contact.partial: name + phone typed, tagged website-partial
 * in GHL) and no full submit from the same phone arrives within PARTIAL_LEAD_ALERT_MINUTES (default 15),
 * the shop owners get one Telegram card:
 *
 *   Started a 2023 Tesla Model Y full front PPF quote 15 min ago, didn't finish
 *   [Call Sam] [Open in GHL]
 *
 * It goes to every owner chat (notifyOwners: TELEGRAM_OWNER_ID + TELEGRAM_OWNER_IDS + TELEGRAM_CHAT_IDS).
 * Nothing is ever sent to the lead: they have not given text consent yet (the consent line is on submit).
 *
 * One alert per partial lead (keyed by phone), none if they finish. Pending alerts live in one siteSettings
 * row, so a restart or deploy does not drop them (the scheduler picks overdue ones up on boot). Without
 * DATABASE_URL they are kept in memory only and a restart loses the pending ones (logged once).
 *
 * Off switch: PARTIAL_LEAD_ALERTS=off (also "0", "false", "no").
 */
import type { Express } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";

export interface PartialAlertInput {
  phone: string;
  firstName: string;
  year?: string;
  make?: string;
  model?: string;
  service?: string;
  contactId?: string | null;
  formId: string;
  page?: string;
}

export interface PendingAlert {
  /** Last 10 digits of the phone: the key that matches a later full submit. */
  phone: string;
  firstName: string;
  vehicle: string;
  service: string;
  contactId: string | null;
  formId: string;
  page: string;
  startedAt: number;
  dueAt: number;
  status: "pending" | "sent" | "finished";
  doneAt?: number;
}

export type InlineButton = { text: string; url: string };
export type SendFn = (html: string, buttons: InlineButton[][]) => Promise<{ ok: boolean; results: string[] }>;

const KEY = "partial-lead-alerts";
/** Sent and finished entries are kept this long, so the same phone is not alerted twice in a day. */
const KEEP_MS = 24 * 60 * 60 * 1000;
const SITE = "https://www.skylinecustomshop.com";

export function alertsEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return !/^(off|0|false|no)$/i.test((env.PARTIAL_LEAD_ALERTS ?? "").trim());
}
export function alertDelayMs(env: NodeJS.ProcessEnv = process.env): number {
  const m = Number(env.PARTIAL_LEAD_ALERT_MINUTES);
  return (Number.isFinite(m) && m > 0 ? m : 15) * 60 * 1000;
}
/** US phone -> last 10 digits ("+1 (703) 555-0101" -> "7035550101"); "" when it is not a phone. */
export const phoneKey = (p: string | undefined | null) => { const d = String(p ?? "").replace(/\D/g, ""); return d.length >= 10 ? d.slice(-10) : ""; };
const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const prettyPhone = (k: string) => `(${k.slice(0, 3)}) ${k.slice(3, 6)}-${k.slice(6)}`;

/** "PPF" -> "full front PPF", "Tints" -> "window tint"; what the card says they were pricing. */
export function serviceWords(service: string | undefined): string {
  const s = (service ?? "").toLowerCase();
  if (/ppf|film|paint protection/.test(s)) return "full front PPF";
  if (/tint/.test(s)) return "window tint";
  if (/ceramic|coat/.test(s)) return "ceramic coating";
  if (/multiple|bundle/.test(s)) return "bundle";
  return "";
}

// ---- Call button --------------------------------------------------------------------------------
// Telegram inline buttons only accept http(s) and tg:// links, not tel:. The button opens a tiny page on
// this site that hands the phone to the dialer (302 to tel:), signed so it cannot be used as an open redirect.
const secret = () => process.env.PARTIAL_ALERT_LINK_SECRET || process.env.JWT_SECRET || process.env.TELEGRAM_BOT_TOKEN || "";
const sign = (digits: string) => createHmac("sha256", secret()).update(`call:${digits}`).digest("base64url").slice(0, 22);
export function callUrl(phone10: string, base = SITE): string {
  return `${base}/api/call/${phone10}.${sign(phone10)}`;
}
export function verifyCallToken(token: string): string | null {
  const m = /^(\d{10})\.([A-Za-z0-9_-]{22})$/.exec(token);
  if (!m || !secret()) return null;
  const want = Buffer.from(sign(m[1])), got = Buffer.from(m[2]);
  return want.length === got.length && timingSafeEqual(want, got) ? m[1] : null;
}

// ---- The card -----------------------------------------------------------------------------------
export function buildAlertCard(a: PendingAlert, now: number, locationId = process.env.GHL_LOCATION_ID ?? ""): { html: string; buttons: InlineButton[][] } {
  const mins = Math.max(1, Math.round((now - a.startedAt) / 60000));
  const what = [a.vehicle, serviceWords(a.service)].filter(Boolean).join(" ");
  const name = a.firstName.trim() || "Someone";
  const html =
    `<b>⏳ Unfinished quote</b>\n` +
    `${esc(name)} started a${/^[aeiou8]/i.test(what) ? "n" : ""} ${esc(what || "quote")}${what ? " quote" : ""} ${mins} min ago, didn't finish.\n` +
    `📞 ${prettyPhone(a.phone)}` +
    (a.page ? `\n📄 ${esc(a.page)}` : "") +
    `\n\nThey have not agreed to texts yet: call, don't text first.`;
  const row: InlineButton[] = [{ text: `📞 Call ${name}`.slice(0, 40), url: callUrl(a.phone) }];
  if (a.contactId && locationId) row.push({ text: "Open in GHL", url: `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${a.contactId}` });
  return { html, buttons: [row] };
}

// ---- Store (one siteSettings row; memory when there is no database) -------------------------------
export interface AlertStore { load(): Promise<PendingAlert[]>; save(list: PendingAlert[]): Promise<void> }

let memory: PendingAlert[] = [];
let warnedNoDb = false;
export const dbStore: AlertStore = {
  async load() {
    const db = await getDb();
    if (!db) {
      if (!warnedNoDb) { warnedNoDb = true; console.warn("[partial-alerts] no DATABASE_URL: pending unfinished-quote alerts are kept in memory and a restart drops them"); }
      return memory;
    }
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
    try { return rows.length ? (JSON.parse(rows[0].value) as PendingAlert[]) : []; } catch { return []; }
  },
  async save(list) {
    const db = await getDb();
    if (!db) { memory = list; return; }
    const value = JSON.stringify(list);
    const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
    if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, KEY));
    else await db.insert(siteSettings).values({ key: KEY, value });
  },
};

const defaultSend: SendFn = async (html, buttons) => (await import("./routers")).notifyOwners(html, { inline_keyboard: buttons });

export interface Deps { store?: AlertStore; send?: SendFn; now?: () => number; env?: NodeJS.ProcessEnv }

/** Every read-modify-write of the list runs one at a time (a partial and a submit can land together). */
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

const prune = (list: PendingAlert[], now: number) => list.filter((a) => a.status === "pending" || now - (a.doneAt ?? a.startedAt) < KEEP_MS);

/** A partial lead was saved: start (or keep) the 15-minute clock for that phone. Returns false when nothing was queued. */
export function queuePartialAlert(input: PartialAlertInput, deps: Deps = {}): Promise<boolean> {
  const { store = dbStore, now = Date.now, env = process.env } = deps;
  if (!alertsEnabled(env)) return Promise.resolve(false);
  // The exit prompt is its own request ("text me the price"), not a quote they walked away from.
  if (input.formId === "exit") return Promise.resolve(false);
  const phone = phoneKey(input.phone);
  if (!phone) return Promise.resolve(false);
  return serial(async () => {
    const t = now();
    const list = prune(await store.load(), t);
    const vehicle = [input.year, input.make, input.model].map((x) => (x ?? "").trim()).filter(Boolean).join(" ").slice(0, 60);
    const existing = list.find((a) => a.phone === phone);
    if (existing) {
      // Same person again: one alert per lead. Fill in what the newer save knows, keep the original clock.
      if (existing.status !== "pending") return false;
      existing.vehicle = vehicle || existing.vehicle;
      existing.service = input.service || existing.service;
      existing.contactId = input.contactId || existing.contactId;
      existing.firstName = input.firstName.trim() || existing.firstName;
    } else {
      list.push({ phone, firstName: input.firstName.trim().slice(0, 40), vehicle, service: (input.service ?? "").slice(0, 60), contactId: input.contactId ?? null, formId: input.formId, page: (input.page ?? "").slice(0, 120), startedAt: t, dueAt: t + alertDelayMs(env), status: "pending" });
    }
    await store.save(list);
    return true;
  });
}

/** A full submit arrived: no alert for that phone. */
export function markLeadFinished(phone: string | undefined | null, deps: Deps = {}): Promise<boolean> {
  const { store = dbStore, now = Date.now } = deps;
  const key = phoneKey(phone);
  if (!key) return Promise.resolve(false);
  return serial(async () => {
    const list = await store.load();
    const hit = list.filter((a) => a.phone === key && a.status === "pending");
    if (!hit.length) return false;
    for (const a of hit) { a.status = "finished"; a.doneAt = now(); }
    await store.save(prune(list, now()));
    return true;
  });
}

/** Send every alert that is due. Each one is marked sent before the Telegram call, so a slow send or a crash never sends it twice. */
export function runDueAlerts(deps: Deps = {}): Promise<number> {
  const { store = dbStore, send = defaultSend, now = Date.now, env = process.env } = deps;
  if (!alertsEnabled(env)) return Promise.resolve(0);
  return serial(async () => {
    const t = now();
    const list = await store.load();
    const due = list.filter((a) => a.status === "pending" && a.dueAt <= t);
    if (!due.length) { if (list.length !== prune(list, t).length) await store.save(prune(list, t)); return 0; }
    for (const a of due) { a.status = "sent"; a.doneAt = t; }
    await store.save(prune(list, t));
    for (const a of due) {
      const card = buildAlertCard(a, t);
      const r = await send(card.html, card.buttons).catch((e) => ({ ok: false, results: [String(e)] }));
      console.log(`[partial-alerts] unfinished quote alert ${r.ok ? "sent" : "FAILED"} (${a.formId} form): ${r.results.join(" | ")}`);
    }
    return due.length;
  });
}

/** Checks once a minute; the first check runs shortly after boot so alerts that came due during a deploy go out. */
export function startPartialAlertScheduler(): void {
  if (!alertsEnabled()) { console.log("[partial-alerts] off (PARTIAL_LEAD_ALERTS)"); return; }
  if (!process.env.TELEGRAM_BOT_TOKEN) return;
  const tick = () => { runDueAlerts().catch((e) => console.warn("[partial-alerts] tick failed:", (e as Error).message)); };
  setInterval(tick, 60 * 1000).unref();
  setTimeout(tick, 20 * 1000).unref();
}

/** GET /api/call/<10 digits>.<signature>: the Call button. Hands the number to the phone's dialer. */
export function registerPartialAlertRoutes(app: Express): void {
  app.get("/api/call/:token", (req, res) => {
    const digits = verifyCallToken(String(req.params.token ?? ""));
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.setHeader("Cache-Control", "no-store");
    if (!digits) { res.status(404).send("Not found"); return; }
    const tel = `tel:+1${digits}`;
    res.status(302).setHeader("Location", tel);
    res.type("html").send(`<!doctype html><meta name="viewport" content="width=device-width"><title>Call</title><p style="font:20px system-ui;padding:24px"><a href="${tel}">Call ${prettyPhone(digits)}</a></p>`);
  });
}
