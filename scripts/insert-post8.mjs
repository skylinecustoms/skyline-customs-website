import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const content = JSON.stringify([
  {
    type: "paragraph",
    content: "If you've ever climbed into a parked car on a July afternoon in Northern Virginia, you already know the problem. Steering wheels that burn your hands. Seats that feel like they've been sitting in an oven. A blast of heat that takes ten minutes to clear even with the AC running full blast. Window tint helps — but not all tint is created equal, and the difference between a basic film and a premium ceramic option is significant enough to matter in Virginia's climate."
  },
  {
    type: "paragraph",
    content: "At Skyline Custom Shop in Chantilly, VA, we install all three major types of window film: dyed, carbon, and ceramic. Here's an honest breakdown of each so you can make the right call for your car and your budget."
  },
  {
    type: "heading",
    content: "Dyed Window Tint: The Entry-Level Option"
  },
  {
    type: "paragraph",
    content: "Dyed tint is the most affordable film on the market, and it does the job it's designed for — it blocks visible light and gives your windows a dark, uniform appearance. What it doesn't do particularly well is block heat. Dyed film works primarily by absorbing solar energy, which means the heat gets into the film itself and then radiates inward into your cabin. On a 95°F day in Chantilly, that's a meaningful limitation."
  },
  {
    type: "paragraph",
    content: "Dyed tint also tends to fade over time, especially under the intense UV exposure that comes with Virginia summers. After a few years, it can take on a purple or brownish tint that looks worn and unprofessional. For drivers on a tight budget who prioritize appearance over heat rejection, it's a reasonable starting point — but most of our customers who go with dyed film end up upgrading within a few years."
  },
  {
    type: "heading",
    content: "Carbon Window Tint: The Mid-Range Sweet Spot"
  },
  {
    type: "paragraph",
    content: "Carbon tint is a significant step up. It uses carbon particles rather than dye to block solar energy, which means it doesn't fade the same way dyed film does. More importantly, carbon tint blocks infrared radiation — the part of the solar spectrum responsible for the heat you feel inside your car — far more effectively than dyed film."
  },
  {
    type: "paragraph",
    content: "In practical terms, a car with carbon tint installed will be noticeably cooler when you get in after it's been parked in the sun. Carbon film also has a clean, matte finish that looks excellent on most vehicles. For the majority of our customers in Northern Virginia who want a real improvement in heat rejection without going to the top of the price range, carbon tint is often the right answer."
  },
  {
    type: "heading",
    content: "Ceramic Window Tint: The Premium Choice for Virginia Summers"
  },
  {
    type: "paragraph",
    content: "Ceramic tint is the top tier, and the performance difference over carbon is real — particularly in the kind of heat Northern Virginia sees from June through September. Ceramic film uses nano-ceramic particles that block up to 99% of UV radiation and reject significantly more infrared heat than carbon, all without interfering with cell signals, GPS, or radar detectors the way older metallic films sometimes did."
  },
  {
    type: "paragraph",
    content: "The result is a cabin that stays meaningfully cooler even on the hottest days, less strain on your AC system, and better protection for your interior — leather seats, dashboards, and trim all degrade faster under UV exposure. Ceramic tint also maintains its clarity and appearance for years without fading or discoloration."
  },
  {
    type: "paragraph",
    content: "At Skyline, we install XPEL and other premium ceramic films. If you drive a newer vehicle with a light-colored interior, a luxury car, or simply spend a lot of time in your car during Virginia summers, ceramic tint is worth the investment."
  },
  {
    type: "heading",
    content: "Which Tint Is Right for You?"
  },
  {
    type: "paragraph",
    content: "The honest answer depends on your priorities. If budget is the primary concern, carbon tint gives you the best performance-per-dollar ratio. If you want the best possible heat rejection and UV protection for a Virginia summer — and you want a film that will still look great in five years — ceramic is the right choice."
  },
  {
    type: "paragraph",
    content: "Virginia law limits front side windows to 50% VLT (visible light transmission) and rear windows to any darkness, so there's real flexibility in how dark you can go on most of the car. Our team will walk you through the legal limits and help you find the right shade for your vehicle."
  },
  {
    type: "paragraph",
    content: "Skyline Custom Shop is located in Chantilly, VA and serves drivers across Northern Virginia including Centreville, Herndon, Fairfax, and Ashburn. Whether you're looking for a basic tint job or a full ceramic upgrade, we'll give you an honest recommendation based on your car and your budget."
  },
  {
    type: "cta",
    content: "Request a free quote today or call us at (703) 775-4383."
  }
]);

const now = new Date();

const [result] = await conn.execute(
  `INSERT INTO blogPosts (slug, title, excerpt, date, readTime, category, heroImage, heroImageAlt, content, status, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    "best-window-tint-virginia-summer",
    "Best Window Tint for Hot Virginia Summers: Ceramic vs. Carbon vs. Dyed",
    "Not all window tint is equal when Virginia summer heat hits. Skyline Custom Shop in Chantilly, VA breaks down ceramic, carbon, and dyed tint so you can choose the right film for your car.",
    "May 8, 2026",
    "5 min read",
    "Window Tinting",
    "/images/tint_3_c25f4b4e.webp",
    "Window tint installation on white Cadillac Lyriq at Skyline Custom Shop in Chantilly VA",
    content,
    "published",
    now,
    now
  ]
);

console.log(`Post #8 inserted. ID: ${result.insertId}`);

// Verify
const [rows] = await conn.execute(
  "SELECT id, slug, title, heroImage FROM blogPosts WHERE slug = ?",
  ["best-window-tint-virginia-summer"]
);
console.log("Verification:", JSON.stringify(rows[0], null, 2));

await conn.end();
console.log("Done.");
