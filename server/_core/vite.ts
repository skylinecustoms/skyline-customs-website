import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { resolveMetaForPath, injectMetaIntoHtml, isKnownPath } from "./ssrMeta";
import { pathToFileURL } from "node:url";
import { getBlogPostBySlug } from "../db";
import { getGalleryRows } from "../galleryJobs";

/**
 * Server-side rendering of the React app (dist/ssr/entry-server.js).
 * Rendered HTML is cached per path for a while; pages are mostly static and the
 * live bits (promo, gallery, reviews, feeds) load on the client after hydration.
 * Set SSR=0 to serve the empty shell instead.
 */
type Renderer = { render: (url: string, preload?: { blogPost?: { slug: string; post: unknown }; gallery?: unknown[] }) => Promise<{ html: string; state: string }> };
let renderer: Promise<Renderer | null> | null = null;
const ssrCache = new Map<string, { html: string; state: string; at: number }>();
const SSR_TTL_MS = 10 * 60 * 1000;

function loadRenderer(distPath: string): Promise<Renderer | null> {
  if (!renderer) {
    renderer = (async () => {
      if (process.env.SSR === "0") return null;
      const file = path.resolve(distPath, "..", "ssr", "entry-server.js");
      if (!fs.existsSync(file)) { console.warn("[ssr] bundle not found, serving client-only shell"); return null; }
      try {
        return (await import(pathToFileURL(file).href)) as Renderer;
      } catch (err) {
        console.warn("[ssr] failed to load renderer:", (err as Error).message);
        return null;
      }
    })();
  }
  return renderer;
}

export async function renderPage(urlPath: string, distPath = path.resolve(import.meta.dirname, "public")): Promise<string | null> {
  return (await renderPageWithState(urlPath, distPath))?.html ?? null;
}

export async function renderPageWithState(urlPath: string, distPath = path.resolve(import.meta.dirname, "public")): Promise<{ html: string; state: string } | null> {
  const r = await loadRenderer(distPath);
  if (!r) return null;
  const hit = ssrCache.get(urlPath);
  if (hit && Date.now() - hit.at < SSR_TTL_MS) return hit;
  try {
    const preload: { blogPost?: { slug: string; post: unknown }; gallery?: unknown[] } = {};
    // Gallery pages and every page with a "recent installs" strip render with the photo list.
    if (/^\/gallery(\/|$)|^\/services\/ppf$|-ppf$|^\/ppf-/.test(urlPath)) preload.gallery = await getGalleryRows().catch(() => undefined);
    const blog = urlPath.match(/^\/blog\/([a-z0-9-]+)$/);
    if (blog) {
      const post = await getBlogPostBySlug(blog[1]).catch(() => null);
      if (post) preload.blogPost = { slug: blog[1], post };
    }
    const out = await r.render(urlPath, preload);
    const entry = { ...out, at: Date.now() };
    ssrCache.set(urlPath, entry);
    return entry;
  } catch (err) {
    console.warn(`[ssr] ${urlPath}:`, (err as Error).message);
    return null;
  }
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      let page = await vite.transformIndexHtml(url, template);

      // Inject SSR meta tags so Google sees correct title/canonical/description
      const meta = await resolveMetaForPath(url);
      page = injectMetaIntoHtml(page, meta);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Read the index.html once at startup for production serving
  const indexHtmlPath = path.resolve(distPath, "index.html");
  const indexHtml = fs.existsSync(indexHtmlPath)
    ? fs.readFileSync(indexHtmlPath, "utf-8")
    : null;

  // Hashed build assets never change: cache for a year.
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), { immutable: true, maxAge: "1y", index: false })
  );
  // Self-hosted fonts never change without a filename change.
  app.use("/fonts", express.static(path.join(distPath, "fonts"), { immutable: true, maxAge: "1y", index: false }));
  // Other static files (images, favicons, robots.txt): cache for 30 days.
  // index: false so "/" goes through the meta-injecting handler below.
  app.use(express.static(distPath, { maxAge: "30d", index: false }));

  // fall through to index.html — inject SSR meta tags before sending
  app.use("*", async (req, res) => {
    if (!indexHtml) {
      return res.status(500).send("Build not found");
    }

    // Canonicalize trailing slashes: /ppf-chantilly-va/ -> /ppf-chantilly-va
    const [pathOnly, query] = req.originalUrl.split("?");
    if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
      const target = pathOnly.replace(/\/+$/, "") + (query ? `?${query}` : "");
      return res.redirect(301, target);
    }

    try {
      const [meta, known] = await Promise.all([resolveMetaForPath(req.originalUrl), isKnownPath(pathOnly)]);
      let page = injectMetaIntoHtml(indexHtml, meta);
      if (known) {
        const rendered = await renderPageWithState(pathOnly);
        if (rendered) {
          const state = `<script>window.__RQ_STATE__=${JSON.stringify(rendered.state).replace(/</g, "\\u003c")}</script>`;
          page = page.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>${state}`);
        }
      }
      // Unknown URLs render the app's Not Found page with a real 404 status,
      // so search engines don't index "soft 404" pages.
      res
        .status(known ? 200 : 404)
        .set({ "Content-Type": "text/html", "Cache-Control": "no-cache" })
        .send(page);
    } catch {
      res.sendFile(indexHtmlPath);
    }
  });
}
