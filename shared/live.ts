/**
 * Instant edits from the Run On Systems client portal (runonsystems.com/portal → Update your site): this month's
 * special, hours and closures. The server fetches them every minute (server/liveEdits.ts); the server render and the
 * browser apply the same copy before rendering, so the page, Google's view and the hydrated app agree. Hours from
 * the portal replace the shop's hours in the footer, the contact page's schema and the "near me" box; hours written
 * into page copy stay as they are (change those as a site edit). With nothing set, the site shows its own content.
 */
export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export interface Hours { days: Day[]; opens: string; closes: string; other?: { days: Day[]; opens: string; closes: string }[] }
export interface LiveEdits { special?: { text: string; until: string } | null; hours?: Hours | null; closures?: { from: string; to: string; note: string }[]; updatedAt?: string }

const TZ = "America/New_York";
let live: LiveEdits = {};
export function applyLive(next: LiveEdits | null | undefined) { live = next || {}; }
export const getLive = (): LiveEdits => live;

const shopDate = (at = new Date()) => at.toLocaleDateString("en-CA", { timeZone: TZ });
export const activeSpecial = (at = new Date()) => (live.special?.text && (!live.special.until || live.special.until >= shopDate(at)) ? live.special : null);
/** A closure today or in the next 7 days (the soonest). */
export function upcomingClosure(at = new Date()) {
  const today = shopDate(at), week = shopDate(new Date(at.getTime() + 7 * 864e5));
  return (live.closures || []).filter((c) => c.to >= today && c.from <= week).sort((a, b) => a.from.localeCompare(b.from))[0] || null;
}

const WEEK: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const t = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "AM" : "PM"}`; };
/** "Mon–Fri" for a run of days, "Mon, Wed" otherwise. */
const dayRange = (days: Day[]) => { const idx = days.map((d) => WEEK.indexOf(d)).sort((a, b) => a - b); const run = idx.every((v, k) => k === 0 || v === idx[k - 1] + 1);
  return run && idx.length > 2 ? `${WEEK[idx[0]].slice(0, 3)}–${WEEK[idx.at(-1)!].slice(0, 3)}` : idx.map((i) => WEEK[i].slice(0, 3)).join(", "); };
/** "Mon–Fri: 9AM – 6PM · Sat: 10AM – 2PM" (the footer's style). */
export const hoursLine = (h: Hours) => [{ days: h.days, opens: h.opens, closes: h.closes }, ...(h.other || [])].map((g) => `${dayRange(g.days)}: ${t(g.opens)} – ${t(g.closes)}`).join(" · ");
/** schema.org openingHoursSpecification. */
export const hoursSchema = (h: Hours) => [{ days: h.days, opens: h.opens, closes: h.closes }, ...(h.other || [])].map((g) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: g.days, opens: g.opens, closes: g.closes }));
