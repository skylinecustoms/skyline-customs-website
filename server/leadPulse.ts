/**
 * Real-time social proof from the shop's own lead flow: how many quote
 * requests came in today (Eastern time) and when the last one arrived.
 * Stored as one siteSettings row; nothing personal is kept here.
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { siteSettings } from "../drizzle/schema";

const KEY = "leads:pulse";

interface Pulse { day: string; count: number; lastAt: string | null }

const todayEt = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });

async function read(): Promise<Pulse> {
  const db = await getDb();
  if (!db) return { day: todayEt(), count: 0, lastAt: null };
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  try { return rows[0] ? (JSON.parse(rows[0].value) as Pulse) : { day: todayEt(), count: 0, lastAt: null }; } catch { return { day: todayEt(), count: 0, lastAt: null }; }
}

async function write(p: Pulse) {
  const db = await getDb();
  if (!db) return;
  const value = JSON.stringify(p);
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, KEY)).limit(1);
  if (existing.length) await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, KEY));
  else await db.insert(siteSettings).values({ key: KEY, value });
}

/** Called when a lead (full form or name-and-phone partial) is received. Never throws. */
export async function recordLead(): Promise<void> {
  try {
    const p = await read();
    const day = todayEt();
    const next: Pulse = { day, count: (p.day === day ? p.count : 0) + 1, lastAt: new Date().toISOString() };
    await write(next);
  } catch (err) {
    console.warn("[leads] pulse not recorded:", (err as Error).message);
  }
}

/** What the site shows: today's count and minutes since the last request. */
export async function getLeadPulse(): Promise<{ today: number; lastMinutesAgo: number | null }> {
  try {
    const p = await read();
    const today = p.day === todayEt() ? p.count : 0;
    const lastMinutesAgo = p.lastAt ? Math.max(0, Math.round((Date.now() - new Date(p.lastAt).getTime()) / 60000)) : null;
    return { today, lastMinutesAgo };
  } catch {
    return { today: 0, lastMinutesAgo: null };
  }
}
