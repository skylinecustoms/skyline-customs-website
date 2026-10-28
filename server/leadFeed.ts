/**
 * A private feed of Skyline's recent leads for the Run On Systems client portal (runonsystems.com/portal shows
 * them on Skyline's dashboard). Skyline's leads live in its GHL location, so this reads the last 30 days of new
 * contacts there and passes on only what the dashboard shows: the customer (first name and last initial), their
 * vehicle, how they came in, the service, whether they booked, what the job is worth (the Customer Value field),
 * and when. No phone numbers or emails. Contacts tagged as spam or scam are left out. The portal is Skyline's own
 * signed-in dashboard.
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

export interface FeedLead { kind: "form" | "call" | "lead"; name: string; vehicle: string; value: number; source: string; service: string; booked: boolean; website: boolean; at: string }
interface Contact { tags?: string[] | null; source?: string | null; dateAdded?: string | null; firstName?: string | null; lastName?: string | null; customFields?: { id: string; value?: unknown }[] | null }

// Skyline's GHL custom fields (ids, as the contacts API returns them; see skyline-minato CLAUDE.md).
const FIELD = { make: "2YNQZIRvWYEjqdJ2UGVw", model: "DAjqA7njYRUfAh7t67Xb", year: "n5O64Bp2FJvBK5GsVSnV", ymm: "aCeicFhtVTo4zc8ZCvBy", value: "M4ZxemI7IYUXNbK2cMMx" };
const field = (c: Contact, id: string) => String(c.customFields?.find((f) => f.id === id)?.value ?? "").trim();
/** "Dana L.": enough to know who it is on the shop's own dashboard. */
export const shortName = (first?: string | null, last?: string | null) => {
  // Names typed in all caps (or all lower case) read as "Glen", not "GLEN"; mixed case like "McKay" stays.
  const tidy = (x: string) => (x === x.toUpperCase() || x === x.toLowerCase() ? x.toLowerCase().replace(/(^|[\s'-])[a-z\u00e0-\u00ff]/g, (m) => m.toUpperCase()) : x);
  const f = tidy(String(first ?? "").trim()), l = String(last ?? "").trim();
  return [f, l ? `${l[0].toUpperCase()}.` : ""].filter(Boolean).join(" ").slice(0, 40);
};
/** "2024 BMW M4", from Year / Make / Model, or the single Vehicle (YMM) field Facebook leads fill in. */
export const vehicleOf = (c: Contact) => (field(c, FIELD.ymm) || [field(c, FIELD.year), field(c, FIELD.make), field(c, FIELD.model)].filter(Boolean).join(" ")).replace(/\s+/g, " ").slice(0, 60);

/** One GHL contact as the portal shows it, or null for spam. */
export function toLead(c: Contact): FeedLead | null {
  const tags = (c.tags ?? []).map((t) => String(t ?? "").toLowerCase());
  if (tags.some((t) => /spam|scam/.test(t))) return null;
  // How they came in: a website lead stays a quote request even after a call (it gets "called lead" too).
  const kind = tags.some((t) => /^website-(quote|contact)$/.test(t)) ? "form" : tags.some((t) => /called lead/.test(t)) ? "call" : "lead";
  const service = tags.some((t) => /\bppf\b/.test(t)) ? "PPF" : tags.some((t) => /ceramic coating/.test(t)) ? "Ceramic coating" : tags.some((t) => /\btint\b/.test(t)) ? "Tint" : "";
  const source = c.source || (tags.includes("facebook") ? "Facebook" : tags.includes("google") ? "Google" : tags.includes("organic") ? "Organic" : "");
  // "From your website" in the portal: the leads our work brings in, tagged website-contact (or website-quote) or organic.
  const website = tags.some((t) => /^(website-(contact|quote)|organic)$/.test(t));
  const value = Number(field(c, FIELD.value).replace(/[^\d.]/g, "")) || 0;
  return { kind, name: shortName(c.firstName, c.lastName), vehicle: vehicleOf(c), value, source: String(source).slice(0, 40), service,
    booked: tags.some((t) => /^(booked|deposit paid)$/.test(t)), website, at: c.dateAdded ?? "" };
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
        // One odd contact (GHL sends null for empty fields) is skipped, not the whole feed.
        for (const c of batch) { try { const l = toLead(c); if (l) leads.push(l); } catch (e) { console.warn(`lead feed: skipped a contact: ${(e as Error).message}`); } }
        if (batch.length < 100) break;
        searchAfter = batch[batch.length - 1]?.searchAfter;
        if (!searchAfter) break;
      }
    } catch (e) {
      return res.status(502).json({ error: (e as Error).message });
    }
    const tally = (list: FeedLead[]) => {
      const counts = { form: 0, call: 0, lead: 0, booked: 0, value: 0, paying: 0 };
      for (const l of list) { counts[l.kind]++; if (l.booked) counts.booked++; if (l.value > 0) { counts.value += l.value; counts.paying++; } }
      counts.value = Math.round(counts.value);
      return counts;
    };
    const fromSite = leads.filter((l) => l.website);
    // The list is capped, so the website leads go first: the portal's "From your website" view still fills up.
    const list = [...fromSite.slice(0, 100), ...leads.filter((l) => !l.website)].slice(0, 200).sort((a, b) => b.at.localeCompare(a.at));
    res.json({ days: DAYS, total: leads.length, counts: tally(leads), website: { total: fromSite.length, counts: tally(fromSite) }, leads: list });
  });
}
