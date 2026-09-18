import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { resolveMetaForPath, injectMetaIntoHtml, isKnownPath } from "./ssrMeta";

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
  // Other static files (images, favicons, robots.txt): cache for a week.
  // index: false so "/" goes through the meta-injecting handler below.
  app.use(express.static(distPath, { maxAge: "7d", index: false }));

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
      const page = injectMetaIntoHtml(indexHtml, meta);
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
