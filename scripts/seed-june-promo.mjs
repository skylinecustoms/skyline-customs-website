import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

await conn.execute(
  `INSERT INTO promos (slug, title, tagline, dealDescription, totalSlots, startDate, endDate, active)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE title=VALUES(title)`,
  [
    "june-2026",
    "June Special",
    "Full Front PPF + Free Paint Correction + Ceramic Coating — Only 21 Cars",
    "Full Front PPF (STEK DYNOshield) + complimentary single-stage paint correction + full ceramic coating — all included at the standard Full Front PPF price of $2,400. Limited to 21 vehicles for June 2026.",
    21,
    "June 1, 2026",
    "June 30, 2026",
    1,
  ]
);

const [rows] = await conn.execute("SELECT id FROM promos WHERE slug = 'june-2026'");
console.log("June Special promo seeded. ID:", rows[0].id);
await conn.end();
