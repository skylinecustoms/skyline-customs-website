/**
 * Dynamic sitemap.xml
 *
 * Built from the server-side route list (STATIC_PATHS), the built-in blog
 * posts, and published posts in the database, so new content appears in the
 * sitemap without editing a static file. Existing pages keep the lastmod
 * values from the original sitemap (sitemapMeta.ts).
 */
import { getDb } from "../db";
import { blogPosts } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { createHash } from "node:crypto";
import { siteSettings } from "../../drizzle/schema";
import { renderPage } from "./vite";
import { getGalleryJobs } from "../galleryJobs";
import { STATIC_PATHS } from "./ssrMeta";
import { SITEMAP_META } from "./sitemapMeta";
import { blogPosts as staticBlogPosts } from "../../client/src/lib/blogData";
import { galleryJobNote } from "../../shared/galleryJobNotes";

const BASE_URL = "https://www.skylinecustomshop.com";
/** Date used for pages added after the original sitemap was written. */
const SITE_UPDATED = "2026-09-18";

interface Entry { lastmod: string; changefreq: string; priority: string }

function defaultsFor(path: string): Entry {
  if (path === "/") return { lastmod: SITE_UPDATED, changefreq: "weekly", priority: "1.0" };
  if (/-va$/.test(path)) return { lastmod: SITE_UPDATED, changefreq: "monthly", priority: "0.9" };
  if (path.startsWith("/blog/")) return { lastmod: SITE_UPDATED, changefreq: "monthly", priority: "0.8" };
  return { lastmod: SITE_UPDATED, changefreq: "monthly", priority: "0.7" };
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const LASTMOD_KEY = "sitemapLastmod";
type LastmodEntry = { hash: string; lastmod: string };
let lastmodCache: { at: number; map: Map<string, string> } | null = null;

async function pageLastmods(paths: string[]): Promise<Map<string, string>> {
  if (lastmodCache && Date.now() - lastmodCache.at < 60 * 60 * 1000) return lastmodCache.map;
  const today = new Date().toISOString().slice(0, 10);
  let stored: Record<string, LastmodEntry> = {};
  let database: Awaited<ReturnType<typeof getDb>> = null;
  try {
    database = await getDb();
    if (database) {
      const rows = await database.select().from(siteSettings).where(eq(siteSettings.key, LASTMOD_KEY)).limit(1);
      if (rows[0]) stored = JSON.parse(rows[0].value) as Record<string, LastmodEntry>;
    }
  } catch { /* fall through: dates default to SITE_UPDATED */ }

  const next: Record<string, LastmodEntry> = { ...stored };
  const map = new Map<string, string>();
  let changed = false;
  for (const path of paths) {
    const html = await renderPage(path);
    if (!html) { map.set(path, stored[path]?.lastmod ?? SITEMAP_META[path]?.lastmod ?? SITE_UPDATED); continue; }
    const hash = createHash("sha1").update(html).digest("hex");
    const prev = stored[path];
    if (!prev) {
      // First time we hash this page: it is being tracked from today.
      next[path] = { hash, lastmod: today };
      changed = true;
    } else if (prev.hash !== hash) {
      next[path] = { hash, lastmod: today };
      changed = true;
    }
    map.set(path, next[path].lastmod);
  }
  if (changed && database) {
    try {
      const value = JSON.stringify(next);
      const rows = await database.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.key, LASTMOD_KEY)).limit(1);
      if (rows[0]) await database.update(siteSettings).set({ value }).where(eq(siteSettings.id, rows[0].id));
      else await database.insert(siteSettings).values({ key: LASTMOD_KEY, value });
    } catch (err) {
      console.warn("[sitemap] could not store lastmod hashes:", (err as Error).message);
    }
  }
  lastmodCache = { at: Date.now(), map };
  return map;
}

export async function buildSitemap(): Promise<string> {
  const urls = new Map<string, Entry>();
  // PPF is the primary service: its hub and sub-pages outrank the legacy sitemap metadata.
  const ppfBoost = (path: string): Partial<Entry> | undefined => {
    if (path === "/services/ppf") return { changefreq: "weekly", priority: "1.0" };
    if (/^\/(ppf-cost|tesla-ppf|bmw-ppf|porsche-ppf|corvette-ppf|rivian-ppf|bronco-ppf|ppf-vs-ceramic-coating)$/.test(path)) return { changefreq: "weekly", priority: "0.9" };
    return undefined;
  };
  const add = (path: string, override?: Partial<Entry>) => {
    if (!urls.has(path)) urls.set(path, { ...(SITEMAP_META[path] ?? defaultsFor(path)), ...ppfBoost(path), ...override });
  };

  // lastmod per page = the last day its server-rendered HTML actually changed.
  // A hash of each page's markup is kept in siteSettings so the date only moves
  // when the content does, which is what makes lastmod useful to Google.
  const lastmods = await pageLastmods(STATIC_PATHS);
  for (const path of STATIC_PATHS) add(path, { lastmod: lastmods.get(path) ?? SITE_UPDATED });
  for (const post of staticBlogPosts) {
    const d = new Date(post.updated ?? post.date);
    add(`/blog/${post.slug}`, isNaN(d.getTime()) ? undefined : { lastmod: d.toISOString().slice(0, 10) });
  }
  try {
    for (const job of await getGalleryJobs()) {
      if (!galleryJobNote(job.slug)) continue; // template-only pages are noindex
      const d = job.createdAt ? new Date(job.createdAt) : null;
      add(`/gallery/${job.slug}`, { lastmod: d && !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : SITE_UPDATED, changefreq: "monthly", priority: "0.7" });
    }
  } catch { /* gallery pages are optional in the sitemap */ }

  try {
    const database = await getDb();
    if (database) {
      const rows = await database
        .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"));
      for (const row of rows) {
        const lastmod = row.updatedAt instanceof Date ? row.updatedAt.toISOString().slice(0, 10) : undefined;
        add(`/blog/${row.slug}`, lastmod ? { lastmod } : undefined);
      }
    }
  } catch {
    /* sitemap still works without the database */
  }

  const body = Array.from(urls.entries())
    .map(([path, e]) =>
      `  <url>\n    <loc>${escapeXml(BASE_URL + path)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
