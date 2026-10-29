/**
 * Pulls this site's instant edits from the client portal every minute (GET PORTAL_URL/api/site/live?slug=,
 * Bearer PORTAL_FEED_KEY, the key the portal already uses to read the lead feed). When they change, the cached
 * server-rendered pages are dropped so the next visit shows them. If the portal can't be reached, the last copy
 * stays; with no key or slug set, the site just shows its own content.
 */
import type { LiveEdits } from "@shared/live";

let current: LiveEdits = {};
let lastJson = "{}";

export const getLiveEdits = () => current;

export async function refreshLiveEdits(onChange: () => void) {
  const key = process.env.PORTAL_FEED_KEY || "", slug = process.env.PORTAL_SLUG || "skyline";
  if (key.length < 32 || !slug) return;
  const base = (process.env.PORTAL_URL || "https://www.runonsystems.com").replace(/\/+$/, "");
  try {
    const r = await fetch(`${base}/api/site/live?slug=${encodeURIComponent(slug)}`, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return;
    const text = JSON.stringify(await r.json());
    if (text === lastJson) return;
    lastJson = text; current = JSON.parse(text) as LiveEdits;
    onChange();
  } catch (e) { console.warn(`[live edits] ${(e as Error).message}`); }
}

export function startLiveEdits(onChange: () => void) {
  refreshLiveEdits(onChange);
  setInterval(() => refreshLiveEdits(onChange), 60_000).unref();
}
