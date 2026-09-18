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

async function main() {
  const connection = await createConnection(DATABASE_URL);
  const db = drizzle(connection);

  // Update the hero image to ppf_3 (unused in any other post)
  // ppf_1 was already used by "PPF Northern Virginia Worth It" post in blogData.ts
  // ppf_2 was already used by "Spring Ceramic Coating" post in blogData.ts
  // ppf_3 is fresh — different angle of the Corvette C8 PPF job
  await db.update(blogPosts)
    .set({
      heroImage: "/images/ppf_3_ad42a27b.webp",
      heroImageAlt: "Paint protection film installation detail on a green Chevrolet Corvette C8 at Skyline Custom Shop in Chantilly, VA",
    })
    .where(eq(blogPosts.slug, "how-long-does-ppf-last-northern-virginia"));

  console.log("Hero image updated to ppf_3 for slug: how-long-does-ppf-last-northern-virginia");
  await connection.end();
}

main().catch(err => {
  console.error("Error updating blog post:", err);
  process.exit(1);
});
