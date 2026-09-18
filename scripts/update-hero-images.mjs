import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Post #6 (Apr 30): PPF vs Ceramic Coating
// Use ppf_bmw_ix_grey_front.jpg — clean full-car hero shot, great for comparison post
const POST6_SLUG = "ppf-vs-ceramic-coating-chantilly-va";
const POST6_HERO = "/images/ppf_bmw_ix_grey_front_864328f5.jpg";
const POST6_ALT = "PPF installation on grey BMW iX at Skyline Custom Shop in Chantilly VA";

// Post #7 (May 4): Self-Healing PPF Explained
// Use ppf_bmw_ix_navy_install1.jpg — action shot of technician applying PPF, perfect for "how it works"
const POST7_SLUG = "self-healing-ppf-northern-virginia";
const POST7_HERO = "/images/ppf_bmw_ix_navy_install1_0b4cdfa9.jpg";
const POST7_ALT = "Technician applying self-healing PPF to BMW iX at Skyline Custom Shop in Chantilly VA";

const [r1] = await conn.execute(
  "UPDATE blogPosts SET heroImage = ?, heroImageAlt = ? WHERE slug = ?",
  [POST6_HERO, POST6_ALT, POST6_SLUG]
);
console.log(`Post #6 (${POST6_SLUG}): ${r1.affectedRows} row(s) updated`);

const [r2] = await conn.execute(
  "UPDATE blogPosts SET heroImage = ?, heroImageAlt = ? WHERE slug = ?",
  [POST7_HERO, POST7_ALT, POST7_SLUG]
);
console.log(`Post #7 (${POST7_SLUG}): ${r2.affectedRows} row(s) updated`);

// Verify
const [rows] = await conn.execute(
  "SELECT slug, heroImage, heroImageAlt FROM blogPosts WHERE slug IN (?, ?)",
  [POST6_SLUG, POST7_SLUG]
);
console.log("\nVerification:");
for (const row of rows) {
  console.log(`  ${row.slug}`);
  console.log(`    heroImage: ${row.heroImage}`);
  console.log(`    heroImageAlt: ${row.heroImageAlt}`);
}

await conn.end();
console.log("\nDone.");
