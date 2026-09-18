import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load DATABASE_URL from .env manually
const envPath = resolve(__dirname, "../.env");
let DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  try {
    const envContent = readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const match = line.match(/^DATABASE_URL=(.+)$/);
      if (match) {
        DATABASE_URL = match[1].replace(/^["']|["']$/g, "");
        break;
      }
    }
  } catch {}
}

if (!DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

// Inline schema definition
const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  date: varchar("date", { length: 64 }).notNull(),
  readTime: varchar("readTime", { length: 32 }).notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  heroImage: text("heroImage").notNull(),
  heroImageAlt: text("heroImageAlt").notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["published", "draft"]).default("published").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

const content = [
  { type: "p", content: "Paint protection film is one of the best investments you can make for your car — but before you commit, the most common question we hear at Skyline Custom Shop is: how long does PPF actually last? The honest answer depends on the film quality, the installation, and how Northern Virginia's specific climate affects it. This guide breaks down what to expect, what shortens PPF lifespan, and how to get the most out of your investment." },
  { type: "h2", content: "What Is the Average Lifespan of PPF?" },
  { type: "p", content: "Most professional-grade PPF films carry manufacturer warranties of 5 to 10 years, and high-end films like STEK DYNOshield can last well beyond that with proper care. Entry-level films — often used by budget shops — may start yellowing, peeling, or losing their self-healing properties within 3 to 4 years. The difference comes down to the urethane chemistry, UV stabilizers, and the thickness of the film." },
  { type: "p", content: "At Skyline Custom Shop, we install STEK films exclusively. STEK's top-tier products carry a 10-year warranty against yellowing, cracking, peeling, and staining — and in our experience, properly installed STEK PPF on a well-maintained vehicle holds up for the full warranty period and beyond." },
  { type: "h2", content: "How Northern Virginia's Climate Affects PPF" },
  { type: "p", content: "Northern Virginia is harder on car paint than most drivers realize. The combination of humid summers, road salt in winter, UV exposure, and heavy highway debris creates a challenging environment for any protective coating." },
  { type: "p", content: "Summer heat and UV: Northern Virginia regularly sees temperatures above 90°F from June through August, with high humidity. UV radiation is the primary cause of PPF yellowing over time. Lower-quality films without adequate UV inhibitors will start to discolor within 2 to 3 years in this climate. Premium films with UV-blocking technology maintain optical clarity significantly longer." },
  { type: "p", content: "Road salt and winter chemicals: The Virginia DOT applies road salt and brine to highways from November through March. Salt is highly corrosive and can work its way into micro-scratches in unprotected paint. PPF creates a physical barrier against salt penetration — but if the film has any lifting edges or installation defects, salt can get underneath and cause adhesion failure. This is why professional installation matters as much as film quality." },
  { type: "p", content: "Highway debris: Commuters on Route 50, I-66, and the Dulles Toll Road face constant rock chip exposure. PPF absorbs these impacts and self-heals minor scratches with heat — but heavy or repeated impacts in the same area will eventually wear through any film. Full-front coverage (hood, fenders, bumper, mirrors, A-pillars) is the most effective defense for Northern Virginia highway driving." },
  { type: "blockquote", content: "In Northern Virginia's climate — summer UV, winter road salt, and daily highway debris — premium PPF film can realistically protect your paint for 8 to 10 years with proper care." },
  { type: "h2", content: "What Shortens PPF Lifespan?" },
  { type: "p", content: "Several factors can reduce how long your PPF lasts, regardless of film quality:" },
  { type: "ul", content: [
    "Poor installation: Lifting edges, bubbles, or contamination trapped under the film accelerate failure. Always choose an installer with verifiable experience and a clean facility.",
    "Automatic car washes: Brush-style car washes can catch film edges and cause peeling. Touchless washes or hand washing are strongly recommended.",
    "Harsh chemicals: Using abrasive polishes, solvent-based cleaners, or high-pressure washers directly on film edges will degrade the adhesive over time.",
    "Neglected maintenance: PPF is not maintenance-free. Annual inspections, occasional ceramic coating top-coats, and prompt repair of any lifting edges extend the film's life significantly.",
    "Parking habits: Extended outdoor parking in direct sun accelerates UV degradation. Garage parking or a car cover adds years to your film's life."
  ]},
  { type: "h2", content: "Signs It's Time to Replace Your PPF" },
  { type: "p", content: "Even the best PPF eventually needs replacement. Watch for these signs:" },
  { type: "ul", content: [
    "Yellowing or hazing: The film has lost its UV inhibitors and is no longer optically clear.",
    "Lifting edges: Film that has separated from the paint at edges or seams is no longer protecting those areas and can trap moisture.",
    "Loss of self-healing: If minor scratches are no longer disappearing with heat, the topcoat has worn through.",
    "Permanent scratches or impact damage: Deep scratches or rock chip craters that have penetrated through the film need to be replaced to maintain protection."
  ]},
  { type: "p", content: "If your PPF is showing any of these signs, the good news is that removal and reinstallation is straightforward. PPF is designed to be removed cleanly without damaging the paint underneath — one of its key advantages over paint or vinyl wraps." },
  { type: "h2", content: "Frequently Asked Questions" },
  { type: "h3", content: "How long does PPF last on a daily driver in Northern Virginia?" },
  { type: "p", content: "On a daily driver exposed to highway debris, summer heat, and winter road salt, you can expect 7 to 10 years from a premium film like STEK with proper care. Budget films may need replacement in 3 to 5 years." },
  { type: "h3", content: "Does PPF need to be replaced all at once?" },
  { type: "p", content: "No. You can replace individual panels as needed. The most common replacement areas are the hood, front bumper, and side mirrors — the panels that take the most rock chip and debris impact. Skyline Custom Shop can replace individual sections without disturbing the rest of your film." },
  { type: "h3", content: "Can I wax or coat my PPF?" },
  { type: "p", content: "Yes — and we recommend it. Applying a ceramic coating over your PPF adds UV protection, makes the surface easier to clean, and enhances gloss. At Skyline Custom Shop, we offer PPF + ceramic coating packages that maximize both protection and longevity." },
  { type: "h3", content: "Is PPF worth it for an older car?" },
  { type: "p", content: "It depends on the paint condition. PPF is best applied to paint in excellent condition — it seals in the current state of the paint. If your paint has significant swirl marks, oxidation, or chips, a paint correction before PPF installation is recommended. For cars with compromised paint, ceramic coating alone may be a more cost-effective option." },
  { type: "p", content: "Ready to protect your vehicle? Get a free quote from Skyline Custom Shop in Chantilly, VA at /get-a-quote — we'll recommend the right PPF coverage for your car, your driving habits, and your budget." }
];

const post = {
  slug: "how-long-does-ppf-last-northern-virginia",
  title: "How Long Does PPF Last? A Northern Virginia Driver's Guide",
  excerpt: "How long does PPF last in Northern Virginia? Learn what affects paint protection film lifespan, when to replace it, and how Skyline Custom Shop in Chantilly, VA makes it last longer.",
  date: "April 27, 2026",
  readTime: "5 min read",
  category: "Paint Protection Film",
  heroImage: "/images/ppf_1_c7c64665.webp",
  heroImageAlt: "Full body paint protection film installation on a green Chevrolet Corvette C8 at Skyline Custom Shop in Chantilly, VA",
  content: JSON.stringify(content),
  status: "published",
};

async function main() {
  const connection = await createConnection(DATABASE_URL);
  const db = drizzle(connection);

  const existing = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, post.slug)).limit(1);
  if (existing.length > 0) {
    console.log("Post already exists with slug:", post.slug);
    await connection.end();
    return;
  }

  await db.insert(blogPosts).values(post);
  console.log("Blog post inserted successfully:", post.slug);
  await connection.end();
}

main().catch(err => {
  console.error("Error inserting blog post:", err);
  process.exit(1);
});
