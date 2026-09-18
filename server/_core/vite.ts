import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { resolveMetaForPath, injectMetaIntoHtml } from "./ssrMeta";

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

  app.use(express.static(distPath));

  // fall through to index.html — inject SSR meta tags before sending
  app.use("*", async (req, res) => {
    if (!indexHtml) {
      return res.status(500).send("Build not found");
    }
    try {
      const meta = await resolveMetaForPath(req.originalUrl);
      const page = injectMetaIntoHtml(indexHtml, meta);
      res.set("Content-Type", "text/html").send(page);
    } catch {
      res.sendFile(indexHtmlPath);
    }
  });
}
