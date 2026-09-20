#!/usr/bin/env node
/**
 * Rename gallery photos from upload names (which include customer first names)
 * to descriptive, keyword-bearing file names, e.g.
 *   slot-1-abdul-a-bmw-m340i-1781792221953.jpg
 *   -> bmw-m340i-full-front-ppf-ceramic-coating-chantilly-va.jpg
 * Updates content/galleryPhotos.json (photoUrl + previousUrl for the 301 and the
 * database migration in seed-content.mjs). Idempotent.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const slugify = (s) => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const FIX = { cx90: "CX-90", wrangler: "Wrangler" };
function parse(alt, carDescription) {
  const m = alt.match(/^PPF on (.+?)\s+-\s+Skyline/i);
  let car, services;
  if (m) { car = m[1]; services = ["Full Front PPF"]; }
  else { const [first, ...rest] = alt.split(" - "); car = (carDescription || first).trim(); services = rest.join(" - ").split("+").map((s) => s.trim()).filter(Boolean); if (!services.length) services = ["Full Front PPF"]; }
  car = car.split(/\s+/).map((w) => FIX[w.toLowerCase()] ?? (w === w.toLowerCase() && /^[a-z]+$/.test(w) ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
  return { car, services };
}

const file = path.resolve("content/galleryPhotos.json");
const photos = JSON.parse(fs.readFileSync(file, "utf8"));
const used = new Set();
let renamed = 0;
for (const p of photos) {
  if (!p.photoUrl.startsWith("/images/slot-")) continue;
  const ext = path.extname(p.photoUrl).toLowerCase();
  const { car, services } = parse(p.alt, p.carDescription);
  let name = `${slugify(`${car} ${services.join(" ")}`)}-chantilly-va`;
  let candidate = `${name}${ext}`; let i = 2;
  while (used.has(candidate)) candidate = `${name}-${i++}${ext}`;
  used.add(candidate);
  const from = path.resolve("client/public" + p.photoUrl);
  const to = path.resolve("client/public/images/" + candidate);
  if (fs.existsSync(from)) execSync(`git mv "${from}" "${to}"`);
  else if (!fs.existsSync(to)) { console.warn("missing file:", p.photoUrl); continue; }
  p.previousUrl = p.photoUrl;
  p.photoUrl = "/images/" + candidate;
  renamed++;
}
fs.writeFileSync(file, JSON.stringify(photos, null, 2) + "\n");
console.log(`renamed ${renamed} gallery images`);
