import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { mysqlTable, text, varchar, int, mysqlEnum, timestamp } from "drizzle-orm/mysql-core";
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

const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  readTime: varchar("readTime", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  heroImage: text("heroImage").notNull(),
  heroImageAlt: text("heroImageAlt").notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["published", "draft"]).default("published"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

const connection = await createConnection(DATABASE_URL);
const db = drizzle(connection);

// --- POST #6: PPF vs Ceramic Coating ---
const post6Content = JSON.stringify([
  {type:"p", content:"If you've been researching ways to protect your vehicle's paint, you've almost certainly come across two options: paint protection film (PPF) and ceramic coating. Both are excellent products, and both are offered at Skyline Custom Shop right here in Chantilly, VA — but they do very different things. Understanding the distinction will help you make the right investment for your specific car, driving habits, and budget."},
  {type:"h2", content:"What PPF Actually Does"},
  {type:"p", content:"Paint protection film is a thick, optically clear urethane film that bonds directly to your vehicle's painted surfaces. Think of it as a physical armor layer. When a rock chips off the highway and flies toward your hood, PPF absorbs the impact so your paint doesn't. High-quality PPF — like the STEK films we install at Skyline — is also self-healing: minor swirl marks and light scratches disappear with heat, keeping the surface looking pristine over time."},
  {type:"p", content:"PPF is the right choice when your primary concern is physical damage: rock chips, road debris, door dings from parking lots, and the kind of abrasion that Northern Virginia's highway driving routinely delivers. It's especially popular on high-impact zones like the full front end, hood, fenders, mirrors, and door edges — though many of our Chantilly clients opt for full-body coverage on luxury and sports vehicles."},
  {type:"h2", content:"What Ceramic Coating Actually Does"},
  {type:"p", content:"Ceramic coating is a liquid polymer that chemically bonds to your paint and creates a hard, hydrophobic shell. It doesn't provide meaningful protection against rock chips or physical impact, but it excels at everything else: repelling water, blocking UV rays, resisting chemical contaminants like bird droppings and tree sap, and making your car dramatically easier to wash. A properly applied ceramic coating gives your paint a deep, glassy shine that wax simply cannot match — and it lasts years, not weeks."},
  {type:"p", content:"For Northern Virginia drivers who spend a lot of time in stop-and-go traffic on Route 28 or the Dulles Toll Road, ceramic coating means less time detailing and more time enjoying a car that looks freshly washed even after a rainy commute."},
  {type:"h2", content:"Why Northern Virginia Drivers Often Choose Both"},
  {type:"p", content:"Here's the thing most shops won't tell you: PPF and ceramic coating are not competing products — they're complementary. The most comprehensive protection package we offer at Skyline Custom Shop combines a full-front or full-body PPF installation with a ceramic coating applied on top. The PPF handles physical impacts; the ceramic coating on top of the film makes it hydrophobic, easier to clean, and even more resistant to environmental contaminants."},
  {type:"p", content:"If budget is a factor, a common approach for Chantilly drivers is: PPF on the high-impact zones (front bumper, hood, fenders, mirrors) plus ceramic coating on the entire vehicle. You get targeted physical protection where you need it most, with the gloss and chemical resistance of ceramic everywhere else."},
  {type:"h2", content:"Frequently Asked Questions"},
  {type:"h3", content:"Is PPF or ceramic coating better for a new car?"},
  {type:"p", content:"For a brand-new vehicle, we typically recommend starting with PPF on the front end at minimum — ideally before the car accumulates its first rock chip. Ceramic coating can then be applied over the PPF and on the rest of the vehicle for a complete protection package."},
  {type:"h3", content:"How long does each last in Virginia's climate?"},
  {type:"p", content:"Quality PPF lasts 7–10 years with proper care. Ceramic coating typically lasts 3–5 years depending on the product tier and how the vehicle is maintained. Virginia's humidity and UV exposure are manageable with either product when professionally installed."},
  {type:"h3", content:"Can I add ceramic coating to existing PPF?"},
  {type:"p", content:"Yes — and we recommend it. Applying ceramic coating over PPF makes the film easier to clean, more resistant to water spots, and enhances the gloss significantly."},
  {type:"h3", content:"Which costs more?"},
  {type:"p", content:"PPF is generally more expensive due to the material cost and labor-intensive installation. Ceramic coating is more affordable but covers a different set of risks. The best value is often a combination package — contact Skyline Custom Shop for a custom quote based on your vehicle."},
  {type:"p", content:"Ready to protect your vehicle the right way? Get a free quote from Skyline Custom Shop in Chantilly, VA and we'll recommend the right combination for your car, budget, and driving habits."}
]);

// --- POST #7: Self-Healing PPF ---
const post7Content = JSON.stringify([
  {type:"p", content:"If you've heard the term 'self-healing PPF' and wondered whether it's marketing language or a genuine technology, you're not alone. It's one of the most common questions we get at Skyline Custom Shop in Chantilly, VA — and the answer is that self-healing paint protection film is very real, and it's one of the most compelling reasons to choose premium PPF over entry-level alternatives."},
  {type:"h2", content:"The Science Behind Self-Healing Film"},
  {type:"p", content:"Modern self-healing PPF is made from a thermoplastic urethane (TPU) elastomer with a specially engineered top coat. The top coat contains polymer chains that, when disrupted by a light scratch or swirl mark, can reflow back into their original position when heat is applied. That heat can come from direct sunlight, warm water, or even just the ambient temperature on a hot Northern Virginia summer day."},
  {type:"p", content:"The result: a light scratch that would permanently mar a standard film — or your bare paint — simply disappears within minutes to hours on self-healing PPF. The film essentially 'remembers' its original shape and returns to it. It's worth noting that self-healing applies to the film's top coat, not to deep cuts or impacts that penetrate through the film entirely. For those, the film has already done its job by absorbing the damage that would otherwise have reached your paint."},
  {type:"h2", content:"What Self-Healing PPF Protects Against in Northern Virginia"},
  {type:"p", content:"Northern Virginia's roads are particularly hard on paint. The Dulles Toll Road, I-66, and Route 28 generate significant highway debris — gravel, sand, and small rocks that create micro-abrasions and chips over time. Beyond road debris, the region's oak and maple trees deposit sap and pollen that etch into unprotected clear coats, and the humid summers accelerate oxidation."},
  {type:"p", content:"Self-healing PPF addresses the surface-level damage that accumulates from daily driving: swirl marks from automated car washes, light scratches from brushing against bushes in parking lots, and the fine abrasion from road grit. These are the marks that make a two-year-old car look five years old — and self-healing film prevents that visual degradation entirely."},
  {type:"h2", content:"STEK PPF: The Brand We Trust at Skyline Custom Shop"},
  {type:"p", content:"At Skyline Custom Shop, we install STEK paint protection film — one of the most respected brands in the industry. STEK's DYNOshield and DYNOsport lines feature their proprietary self-healing top coat technology, which activates at lower temperatures than many competing films. This matters in Northern Virginia: even on a mild spring or fall day, the film heals without needing direct summer sun."},
  {type:"p", content:"STEK films are also optically clear with a high-gloss finish that enhances your paint's depth rather than dulling it. When installed by a trained technician — as all our installs are at Skyline — the film is virtually invisible. You know it's there protecting your investment; no one else does."},
  {type:"h2", content:"Frequently Asked Questions"},
  {type:"h3", content:"How long does self-healing PPF last in Northern Virginia?"},
  {type:"p", content:"Premium self-healing PPF like STEK typically carries a 10-year manufacturer warranty. With proper care — avoiding abrasive washes and keeping the film clean — it will protect your paint for the full warranty period and beyond."},
  {type:"h3", content:"Does self-healing PPF work in cold weather?"},
  {type:"p", content:"The self-healing process slows significantly in cold temperatures. In winter, you may need to pour warm water over a scratch to activate the healing. In summer, most minor scratches heal on their own within an hour in direct sunlight."},
  {type:"h3", content:"Can self-healing PPF be combined with ceramic coating?"},
  {type:"p", content:"Absolutely — and we recommend it. Applying ceramic coating over self-healing PPF makes the film hydrophobic and easier to maintain, while the PPF continues to handle physical impacts and self-repair surface marks."},
  {type:"h3", content:"Is self-healing PPF worth the extra cost over standard film?"},
  {type:"p", content:"For most of our Chantilly clients, yes. The additional cost over entry-level film is modest relative to the long-term benefit of a film that maintains its appearance over years of daily driving. We're happy to walk you through the options during your consultation."},
  {type:"p", content:"Interested in protecting your vehicle with self-healing PPF? Get a free quote from Skyline Custom Shop in Chantilly, VA — we'll assess your vehicle and recommend the right coverage level."}
]);

try {
  // Check if posts already exist
  const existing6 = await db.select().from(blogPosts).where(eq(blogPosts.slug, "ppf-vs-ceramic-coating-chantilly-va"));
  const existing7 = await db.select().from(blogPosts).where(eq(blogPosts.slug, "self-healing-ppf-northern-virginia"));

  if (existing6.length > 0) {
    console.log("Post #6 already exists, skipping.");
  } else {
    await db.insert(blogPosts).values({
      slug: "ppf-vs-ceramic-coating-chantilly-va",
      title: "PPF vs. Ceramic Coating: Which Is Right for Your Car in Chantilly, VA?",
      excerpt: "PPF or ceramic coating — which protects your car better in Northern Virginia? Skyline Custom Shop in Chantilly, VA breaks down the differences so you can choose right.",
      date: "April 30, 2026",
      readTime: "5 min read",
      category: "Paint Protection Film",
      heroImage: "/images/ppf_4_aad672d2.webp",
      heroImageAlt: "Paint protection film installation on green Chevrolet Corvette C8 at Skyline Custom Shop in Chantilly, VA",
      content: post6Content,
      status: "published",
    });
    console.log("✅ Post #6 inserted: PPF vs. Ceramic Coating");
  }

  if (existing7.length > 0) {
    console.log("Post #7 already exists, skipping.");
  } else {
    await db.insert(blogPosts).values({
      slug: "self-healing-ppf-northern-virginia",
      title: "Self-Healing PPF Explained: How It Works and Why It Matters",
      excerpt: "Self-healing paint protection film repairs minor scratches on its own. Learn how it works and why Northern Virginia drivers are choosing it at Skyline Custom Shop in Chantilly, VA.",
      date: "May 4, 2026",
      readTime: "4 min read",
      category: "Paint Protection Film",
      heroImage: "/images/ppf_5_73db4a50.webp",
      heroImageAlt: "Self-healing paint protection film on green Chevrolet Corvette C8 at Skyline Custom Shop in Chantilly, VA",
      content: post7Content,
      status: "published",
    });
    console.log("✅ Post #7 inserted: Self-Healing PPF Explained");
  }

  console.log("Done.");
} catch (err) {
  console.error("Error:", err);
} finally {
  await connection.end();
}
