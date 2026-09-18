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
import { STATIC_PATHS } from "./ssrMeta";
import { SITEMAP_META } from "./sitemapMeta";
import { blogPosts as staticBlogPosts } from "../../client/src/lib/blogData";

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

export async function buildSitemap(): Promise<string> {
  const urls = new Map<string, Entry>();
  const add = (path: string, override?: Partial<Entry>) => {
    if (!urls.has(path)) urls.set(path, { ...(SITEMAP_META[path] ?? defaultsFor(path)), ...override });
  };

  // Every static page's template changed on SITE_UPDATED (nav, footer, schema), so report that date.
  for (const path of STATIC_PATHS) add(path, { lastmod: SITE_UPDATED });
  for (const post of staticBlogPosts) add(`/blog/${post.slug}`);

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
