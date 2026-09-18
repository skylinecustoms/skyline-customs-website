import "dotenv/config";
import express from "express";
import compression from "compression";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { buildSitemap } from "./sitemap";
import { handleTelegramWebhook } from "../telegramWebhook";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.disable("x-powered-by");
  // gzip/brotli responses (the client bundle is ~1.8 MB raw, ~300 KB compressed)
  app.use(compression());
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Server-side 301 redirects for legacy/dead URLs — registered FIRST so they fire on ALL hosts
  // (before the canonical redirect, so /home on non-www also gets a clean 301 to https://www.../)
  const legacyRedirects: Record<string, string> = {
    "/disconnected": "/",
    "/booking-page": "/get-a-quote",
    "/home": "/",
    "/contact-us": "/contact",
    "/thank-you": "/",
    "/_preview": "/",
    "/_preview/": "/",
    "/privacy-policy-112467": "/privacy-policy",
  };
  // Vinyl wraps are no longer offered: send old wrap URLs to the closest live page.
  app.get("/services/vinyl-wraps", (_req, res) => res.redirect(301, "/services"));
  app.get(/^\/vinyl-wraps-([a-z-]+-va)$/, (req, res) => res.redirect(301, `/ppf-${req.params[0]}`));
  Object.entries(legacyRedirects).forEach(([from, to]) => {
    // Always redirect to the canonical www+https destination regardless of incoming host
    app.get(from, (req, _res, next) => {
      const rawHost = (req.headers.host || "").toLowerCase().split(":")[0];
      const isSkyline = rawHost.includes("skylinecustomshop.com");
      if (isSkyline && process.env.NODE_ENV !== "development") {
        return _res.redirect(301, `https://www.skylinecustomshop.com${to}`);
      }
      return _res.redirect(301, to);
    });
  });

  // Block /tmp/* and /_preview/* paths — return 404 immediately so Googlebot stops crawling them
  app.use(["/tmp", "/_preview"], (_req, res) => {
    res.status(404).send("Not found");
  });

  // In production: enforce canonical https://www.skylinecustomshop.com for all 4 URL variants
  // Handles: http://www., http://non-www., https://non-www., and mixed cases
  // Runs AFTER legacy redirects so those paths get a single clean hop to the canonical destination
  if (process.env.NODE_ENV !== "development") {
    app.use((req, res, next) => {
      const rawHost = (req.headers.host || "").toLowerCase();
      const host = rawHost.split(":")[0]; // strip port if present
      // x-forwarded-proto may be a comma-separated list from some proxies
      const forwardedProto = req.headers["x-forwarded-proto"];
      const proto = (Array.isArray(forwardedProto)
        ? forwardedProto[0]
        : typeof forwardedProto === "string"
          ? forwardedProto.split(",")[0].trim()
          : req.protocol);
      const isHttps = proto === "https";
      const isWww = host.startsWith("www.");
      const isSkyline = host.includes("skylinecustomshop.com");
      // Redirect any non-canonical form to https://www.skylinecustomshop.com
      if (isSkyline && (!isHttps || !isWww)) {
        const canonicalHost = isWww ? host : `www.${host}`;
        return res.redirect(301, `https://${canonicalHost}${req.url}`);
      }
      next();
    });
  }

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Telegram bot webhook — receives slot updates from @skyline_minato_bot
  app.post("/api/telegram/webhook", handleTelegramWebhook);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Sitemap generated from routes + database (registered before static files so it wins)
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const xml = await buildSitemap();
      res.set({ "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }).send(xml);
    } catch (err) {
      console.error("[sitemap] failed to build:", err);
      res.status(500).send("sitemap unavailable");
    }
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
