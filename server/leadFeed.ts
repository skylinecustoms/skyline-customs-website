/**
 * A private feed of Skyline's recent leads for the Run On Systems client portal (runonsystems.com/portal shows
 * them on Skyline's dashboard). Skyline's leads live in its GHL location, so this reads the last 30 days of new
 * contacts there and passes on only what the dashboard shows: how they came in, the service, whether they
 * booked, and when. No names, phone numbers or emails. Contacts tagged as spam or scam are left out.
 *
 *   GET /api/lead-feed   Authorization: Bearer PORTAL_FEED_KEY (32+ characters, the same key the portal has)
 */
import type { Express } from "express";
import { timingSafeEqual } from "crypto";
import { GHL_HEADERS, GHL_LOCATION_ID } from "./routers";

const DAYS = 30, MAX_PAGES = 10;

export function feedAuthorized(header: string | undefined, key = process.env.PORTAL_FEED_KEY ?? ""): boolean {
  const got = Buffer.from(String(header ?? "").replace(/^Bearer /, "")), want = Buffer.from(key);
  return key.length >= 32 && got.length === want.length && timingSafeEqual(got, want);
}

export interface FeedLead { kind: "form" | "call" | "lead"; source: string; service: string; booked: boolean; website: boolean; at: string }
interface Contact { tags?: string[]; source?: string; dateAdded?: string }

/** One GHL contact as the portal shows it, or null for spam. */
export function toLead(c: Contact): FeedLead | null {
  const tags = (c.tags ?? []).map((t) => t.toLowerCase());
  if (tags.some((t) => /spam|scam/.test(t))) return null;
  // How they came in: a website lead stays a quote request even after a call (it gets "called lead" too).
  const kind = tags.some((t) => /^website-(quote|contact)$/.test(t)) ? "form" : tags.some((t) => /called lead/.test(t)) ? "call" : "lead";
  const service = tags.some((t) => /\bppf\b/.test(t)) ? "PPF" : tags.some((t) => /ceramic coating/.test(t)) ? "Ceramic coating" : tags.some((t) => /\btint\b/.test(t)) ? "Tint" : "";
  const source = c.source || (tags.includes("facebook") ? "Facebook" : tags.includes("google") ? "Google" : tags.includes("organic") ? "Organic" : "");
  // "From your website" in the portal: the leads our work brings in, tagged website-contact (or website-quote) or organic.
  const website = tags.some((t) => /^(website-(contact|quote)|organic)$/.test(t));
  return { kind, source: String(source).slice(0, 40), service, booked: tags.some((t) => /^(booked|deposit paid)$/.test(t)), website, at: c.dateAdded ?? "" };
}

export function registerLeadFeedRoutes(app: Express) {
  app.get("/api/lead-feed", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (!feedAuthorized(req.headers.authorization)) return res.status(401).json({ error: "unauthorized" });
    const since = new Date(Date.now() - DAYS * 864e5).toISOString(), leads: FeedLead[] = [];
    let searchAfter: unknown;
    try {
      for (let page = 0; page < MAX_PAGES; page++) {
        const r = await fetch("https://services.leadconnectorhq.com/contacts/search", {
          method: "POST", headers: GHL_HEADERS, signal: AbortSignal.timeout(15000),
          body: JSON.stringify({ locationId: GHL_LOCATION_ID, pageLimit: 100, ...(searchAfter ? { searchAfter } : {}),
            filters: [{ field: "dateAdded", operator: "range", value: { gt: since, lt: new Date().toISOString() } }], sort: [{ field: "dateAdded", direction: "desc" }] }),
        });
        if (!r.ok) throw new Error(`GHL contacts search ${r.status}`);
        const j = (await r.json()) as { contacts?: (Contact & { searchAfter?: unknown })[] };
        const batch = j.contacts ?? [];
        for (const c of batch) { const l = toLead(c); if (l) leads.push(l); }
        if (batch.length < 100) break;
        searchAfter = batch[batch.length - 1]?.searchAfter;
        if (!searchAfter) break;
      }
    } catch (e) {
      return res.status(502).json({ error: (e as Error).message });
    }
    const tally = (list: FeedLead[]) => {
      const counts = { form: 0, call: 0, lead: 0, booked: 0 };
      for (const l of list) { counts[l.kind]++; if (l.booked) counts.booked++; }
      return counts;
    };
    const fromSite = leads.filter((l) => l.website);
    // The list is capped, so the website leads go first: the portal's "From your website" view still fills up.
    const list = [...fromSite.slice(0, 100), ...leads.filter((l) => !l.website)].slice(0, 200).sort((a, b) => b.at.localeCompare(a.at));
    res.json({ days: DAYS, total: leads.length, counts: tally(leads), website: { total: fromSite.length, counts: tally(fromSite) }, leads: list });
  });
}
