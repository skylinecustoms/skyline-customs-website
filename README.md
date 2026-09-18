# Skyline Customs Website

Marketing site for Skyline Customs, Chantilly VA: paint protection film, ceramic
coating, window tinting, and vinyl wraps. This is the site originally built on
Manus, moved into this repository as-is so it can be hosted and edited anywhere.

## Stack

- **Client:** React 19 + Vite 7, Tailwind CSS 4, shadcn/ui, wouter routing, framer-motion
- **Server:** Express + tRPC 11, served from a single Node process
- **Database:** MySQL via Drizzle ORM (blog, gallery, promos, site settings)
- **Integrations:** GoHighLevel (leads, SMS, booking calendars), Telegram admin bot,
  Google Analytics 4, Facebook Pixel, OpenAI-compatible LLM for the quote assistant

## Layout

```
client/            Vite app (index.html, src/pages, src/components)
client/public/     Static assets: favicons, robots.txt, sitemap.xml, images/
server/            Express entry, tRPC routers, GHL + Telegram integrations
server/_core/      Framework plumbing carried over from Manus (auth, LLM, SSR meta)
shared/            Types and constants shared by client and server
drizzle/           Database schema and SQL migrations
scripts/           One-off content scripts (blog posts, promo seeding)
```

## Local development

```bash
pnpm install
cp .env.example .env   # fill in what you have; the site runs without most keys
pnpm dev               # http://localhost:3000
```

Without `DATABASE_URL` the site still renders, but database-backed sections
(blog, gallery uploads, monthly promo, announcement banner) will be empty.

## Production

```bash
pnpm build     # builds client to dist/public and server to dist/index.js
pnpm start     # NODE_ENV=production node dist/index.js
```

Deploy to any host that runs a long-lived Node process (Railway, Render, Fly.io,
a VPS). This is not a static site and does not run on Vercel/Netlify static
hosting without changes. Set the environment variables from `.env.example` in
the host's dashboard.

In production the server 301-redirects every host variant to
`https://www.skylinecustomshop.com`.

## Database

```bash
pnpm db:push   # generate + run Drizzle migrations against DATABASE_URL
```

Tables: `users`, `blogPosts`, `promos`, `promoSlots`, `promoWaitlist`,
`siteSettings`, `galleryPhotos`. The schema is in `drizzle/schema.ts`.
Content rows from the Manus-hosted database are **not** in this repo and need to
be exported separately if you still have access to that project.

## Other commands

```bash
pnpm check     # TypeScript type check
pnpm test      # vitest (GHL tests need GHL_API_KEY / GHL_LOCATION_ID)
pnpm format    # prettier
```

## Images

Site images were originally served from Manus CDNs. They have been copied into
`client/public/images/` and every reference points at the local copy, so the
site no longer depends on Manus hosting.
