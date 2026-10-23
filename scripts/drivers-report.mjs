#!/usr/bin/env node
/**
 * The data behind /northern-virginia-car-protection-report: what drivers who asked Skyline for a quote
 * want protected, on which cars, and how soon. Reads GoHighLevel contacts since go-live and writes
 * totals only (no names, phone numbers, emails or message text) to client/src/data/driversReport.json.
 *
 *   node scripts/drivers-report.mjs
 *
 * Needs GHL_SKYLINE_TOKEN and GHL_SKYLINE_LOCATION_ID (read-only use). Fails loudly if GHL doesn't answer.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "client/src/data/driversReport.json");
const START = "2026-02-01T00:00:00Z"; // the system went live in February 2026
const API = "https://services.leadconnectorhq.com";
const env = (k) => { const v = process.env[k]; if (!v) throw new Error(`${k} is not set`); return v; };
const TOKEN = env("GHL_SKYLINE_TOKEN"), LOC = env("GHL_SKYLINE_LOCATION_ID");
const headers = { Authorization: `Bearer ${TOKEN}`, Version: "2021-07-28", Accept: "application/json", "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, body) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(`${API}${path}`, body ? { method: "POST", headers, body: JSON.stringify(body) } : { headers });
    if (r.status === 429) { await sleep(3000); continue; }
    if (!r.ok) throw new Error(`GHL ${path.split("?")[0]}: ${r.status} ${(await r.text()).slice(0, 200)}`);
    return r.json();
  }
  throw new Error(`GHL ${path.split("?")[0]}: still rate limited`);
}

// Same filter as the agency's leads.mjs: spam, tests, suppliers and installers asking for work aren't leads.
const NOT_LEAD = /^(scam call|scam|spam likely|test-contact|internal|internal-test-contact|b2b supplier|supplier|applicant-supplier|ppf-installer|tint installer|tint-installer|installer|contractor|bodyshop|out-of-scope|duplicate-pending-merge)$/;

const fields = (await api(`/locations/${LOC}/customFields`)).customFields || [];
const fieldId = (name) => fields.find((f) => f.name.trim().toLowerCase() === name.toLowerCase())?.id;
const F = { make: fieldId("Make"), model: fieldId("Model"), ymm: fieldId("Vehicle (YMM)"), ymm2: fieldId("What's the year, make, and model of your vehicle?"), year: fieldId("Year") };

console.log("Contacts since go-live...");
const contacts = [];
for (let page = 1; ; page++) {
  const j = await api("/contacts/search", { locationId: LOC, pageLimit: 100, page, sort: [{ field: "dateAdded", direction: "desc" }],
    filters: [{ field: "dateAdded", operator: "range", value: { gte: START, lte: new Date().toISOString() } }] });
  contacts.push(...(j.contacts || []));
  if ((j.contacts || []).length < 100) break;
  await sleep(250);
}
// Counted the same way as runonsystems.com's numbers (design/ros-previews/showcase/leads.mjs): contacts of type "lead".
const leads = contacts.filter((c) => c.type === "lead" && !(c.tags || []).some((t) => NOT_LEAD.test(t)));
console.log(`${contacts.length} contacts, ${leads.length} leads`);

const val = (c, id) => (id ? String((c.customFields || []).find((f) => f.id === id)?.value ?? "").trim() : "");
const MAKES = ["Tesla", "BMW", "Mercedes-Benz", "Porsche", "Toyota", "Lexus", "Audi", "Honda", "Ford", "Chevrolet", "Rivian", "Jeep", "Hyundai", "Kia", "Subaru", "Acura", "Nissan", "Volkswagen", "Land Rover", "Cadillac", "GMC", "Ram", "Genesis", "Volvo", "Lucid", "Mazda", "Dodge", "Infiniti", "Lamborghini", "Ferrari", "McLaren", "Maserati", "Bentley", "Polestar", "Mini", "Lincoln", "Alfa Romeo"];
const ALIASES = { "mercedes": "Mercedes-Benz", "benz": "Mercedes-Benz", "merc": "Mercedes-Benz", "vw": "Volkswagen", "chevy": "Chevrolet", "range rover": "Land Rover", "landrover": "Land Rover" };
function makeOf(c) {
  const text = [val(c, F.make), val(c, F.ymm), val(c, F.ymm2)].join(" ").toLowerCase();
  if (!text.trim()) return "";
  for (const [k, v] of Object.entries(ALIASES)) if (new RegExp(`\\b${k}\\b`).test(text)) return v;
  return MAKES.find((m) => text.includes(m.toLowerCase())) || "";
}
// The service they asked about, from the lead tags the site and GHL set.
function servicesOf(c) {
  const t = (c.tags || []).join("|");
  const s = [];
  if (/ppf|paint protection/.test(t)) s.push("Paint protection film");
  if (/ceramic coating|cc qualified|cc unqualified/.test(t)) s.push("Ceramic coating");
  if (/tint/.test(t)) s.push("Window tint");
  return s;
}
const count = (items) => Object.entries(items.reduce((a, k) => (k ? ((a[k] = (a[k] || 0) + 1), a) : a), {})).sort((a, b) => b[1] - a[1]);
const tagGroup = (prefix, map) => count(leads.flatMap((c) => (c.tags || []).filter((t) => t.startsWith(prefix)).map((t) => map[t.slice(prefix.length).trim()] || null)));

const makes = count(leads.map(makeOf));
const withMake = makes.reduce((a, [, n]) => a + n, 0);
const services = count(leads.flatMap(servicesOf));
const withService = leads.filter((c) => servicesOf(c).length).length;
const paint = tagGroup("paint:", { "like new": "Like new", "some swirls/scratches": "Some swirls or scratches", "needs major help": "Needs major help", "not sure": "Not sure" });
const timing = tagGroup("intent:", { "asap": "As soon as possible", "this week": "This week", "couple weeks": "In a couple of weeks", "this month": "This month", "1-3 months": "In 1 to 3 months", "just looking": "Just looking", "not picked up yet": "Car not picked up yet" });

const data = {
  shop: "Skyline Customs", place: "Chantilly, VA", source: "GoHighLevel (quote requests)",
  updated: new Date().toISOString().slice(0, 10), since: START.slice(0, 7),
  leads: leads.length,
  services: { answered: withService, counts: services.map(([name, n]) => ({ name, n })) },
  makes: { answered: withMake, top: makes.slice(0, 12).map(([name, n]) => ({ name, n })) },
  paint: { answered: paint.reduce((a, [, n]) => a + n, 0), counts: paint.map(([name, n]) => ({ name, n })) },
  timing: { answered: timing.reduce((a, [, n]) => a + n, 0), counts: timing.map(([name, n]) => ({ name, n })) },
};
if (data.makes.answered < 50) throw new Error(`Only ${data.makes.answered} leads with a car make: check the GHL field names`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(data, null, 2) + "\n");
console.log(JSON.stringify(data, null, 2));
