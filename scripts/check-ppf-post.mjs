import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  try {
    const envContent = readFileSync(resolve(__dirname, "../.env"), "utf8");
    for (const line of envContent.split("\n")) {
      const match = line.match(/^DATABASE_URL=(.+)$/);
      if (match) { DATABASE_URL = match[1].replace(/^["']|["']$/g, ""); break; }
    }
  } catch {}
}

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

async function main() {
  const connection = await createConnection(DATABASE_URL);
  const db = drizzle(connection);

  // Check current state
  const posts = await db.select({ id: blogPosts.id, slug: blogPosts.slug, heroImage: blogPosts.heroImage }).from(blogPosts);
  console.log("All DB posts:");
  posts.forEach(p => console.log(`  id=${p.id} slug=${p.slug}`));
  console.log(`  heroImage=${posts.find(p => p.slug === 'how-long-does-ppf-last-northern-virginia')?.heroImage}`);

  // Force update
  const result = await db.update(blogPosts)
    .set({
      heroImage: "/images/ppf_3_ad42a27b.webp",
      heroImageAlt: "Paint protection film installation detail on a green Chevrolet Corvette C8 at Skyline Custom Shop in Chantilly, VA",
    })
    .where(eq(blogPosts.slug, "how-long-does-ppf-last-northern-virginia"));

  console.log("Update result:", result);

  // Verify
  const updated = await db.select({ heroImage: blogPosts.heroImage, heroImageAlt: blogPosts.heroImageAlt })
    .from(blogPosts)
    .where(eq(blogPosts.slug, "how-long-does-ppf-last-northern-virginia"))
    .limit(1);
  console.log("After update:", updated[0]);

  await connection.end();
}

main().catch(err => { console.error(err); process.exit(1); });
