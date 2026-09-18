/**
 * Seed blog posts and gallery photos exported from the original Manus
 * database (content/*.json) into DATABASE_URL. Idempotent: a blog post is
 * skipped if its slug exists, a gallery photo if its photoUrl exists.
 *
 * Runs automatically before the server starts on Railway (see
 * `start:railway`). Never blocks startup: errors are logged and ignored.
 *
 *   node scripts/seed-content.mjs            # seed
 *   node scripts/seed-content.mjs --dry-run  # show what would be inserted
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const DRY = process.argv.includes("--dry-run");
const CONTENT_DIR = path.resolve(process.cwd(), "content");

function load(name) {
  const p = path.join(CONTENT_DIR, name);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : [];
}

const blogPosts = load("blogPosts.json");
const galleryPhotos = load("galleryPhotos.json");
const promos = load("promos.json");

const url = process.env.DATABASE_URL;
if (!url && !DRY) {
  console.warn("[seed] DATABASE_URL is not set; skipping content seed");
  process.exit(0);
}

let conn = null;
try {
  if (!DRY) conn = await mysql.createConnection(url);

  // --- Blog posts (unique by slug) ---
  let blogAdded = 0, blogSkipped = 0;
  for (const p of blogPosts) {
    let exists = false;
    if (conn) {
      const [rows] = await conn.execute("SELECT id FROM blogPosts WHERE slug = ? LIMIT 1", [p.slug]);
      exists = rows.length > 0;
    }
    if (exists) { blogSkipped++; continue; }
    blogAdded++;
    if (DRY) { console.log(`[seed] would insert blog post: ${p.slug}`); continue; }
    await conn.execute(
      `INSERT INTO blogPosts (id, slug, title, excerpt, date, readTime, category, heroImage, heroImageAlt, content, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Number(p.id), p.slug, p.title, p.excerpt, p.date, p.readTime, p.category, p.heroImage, p.heroImageAlt,
       typeof p.content === "string" ? p.content : JSON.stringify(p.content), p.status ?? "published",
       new Date(p.createdAt ?? Date.now()), new Date(p.updatedAt ?? Date.now())]
    );
  }
  console.log(`[seed] blog posts: ${blogAdded} added, ${blogSkipped} already present`);

  // --- Gallery photos (unique by photoUrl) ---
  let galAdded = 0, galSkipped = 0;
  for (const g of galleryPhotos) {
    let exists = false;
    if (conn) {
      const [rows] = await conn.execute("SELECT id FROM galleryPhotos WHERE photoUrl = ? LIMIT 1", [g.photoUrl]);
      exists = rows.length > 0;
    }
    if (exists) { galSkipped++; continue; }
    galAdded++;
    if (DRY) { console.log(`[seed] would insert gallery photo: ${g.carDescription ?? g.alt} -> ${g.photoUrl}`); continue; }
    await conn.execute(
      `INSERT INTO galleryPhotos (id, photoUrl, alt, category, carDescription, sortOrder, active, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [Number(g.id), g.photoUrl, g.alt, g.category ?? "PPF", g.carDescription ?? null,
       Number(g.sortOrder ?? 0), Number(g.active ?? 1), new Date(g.createdAt ?? Date.now())]
    );
  }
  console.log(`[seed] gallery photos: ${galAdded} added, ${galSkipped} already present`);

  // --- Promos (unique by slug). A new active promo deactivates the others,
  // matching what the Telegram bot's /promo_new does. Existing slugs are left
  // untouched so the bot stays the source of truth after the first seed. ---
  let promoAdded = 0, promoSkipped = 0;
  for (const pr of promos) {
    let exists = false;
    if (conn) {
      const [rows] = await conn.execute("SELECT id FROM promos WHERE slug = ? LIMIT 1", [pr.slug]);
      exists = rows.length > 0;
    }
    if (exists) {
      // sync: true keeps the copy (title, tagline, description, price, included services)
      // in step with this file; slots, dates, and active state stay owned by the bot.
      if (pr.sync) {
        if (DRY) { console.log(`[seed] would sync promo copy: ${pr.slug}`); }
        else await conn.execute(
          "UPDATE promos SET title = ?, tagline = ?, dealDescription = ?, price = ?, includedServices = ? WHERE slug = ?",
          [pr.title, pr.tagline, pr.dealDescription, String(pr.price), pr.includedServices ? JSON.stringify(pr.includedServices) : null, pr.slug]
        );
      }
      promoSkipped++; continue;
    }
    promoAdded++;
    if (DRY) { console.log(`[seed] would insert promo: ${pr.slug} (${pr.title}, $${pr.price})`); continue; }
    if (pr.active) await conn.execute("UPDATE promos SET active = 0 WHERE active = 1");
    await conn.execute(
      `INSERT INTO promos (slug, title, tagline, dealDescription, totalSlots, startDate, endDate, price, includedServices, active, isArchived)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [pr.slug, pr.title, pr.tagline, pr.dealDescription, Number(pr.totalSlots ?? 21), pr.startDate, pr.endDate, String(pr.price),
       pr.includedServices ? JSON.stringify(pr.includedServices) : null, pr.active ? 1 : 0]
    );
  }
  console.log(`[seed] promos: ${promoAdded} added, ${promoSkipped} already present`);
} catch (err) {
  console.error("[seed] FAILED (site will still start):", err?.message ?? err);
} finally {
  if (conn) await conn.end().catch(() => {});
  process.exit(0);
}
