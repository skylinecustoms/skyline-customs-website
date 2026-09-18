/**
 * Run pending Drizzle migrations against DATABASE_URL, then exit.
 * Used by `pnpm start:railway` before the server boots.
 *
 * Deliberately never blocks startup: if the database is unreachable or a
 * migration fails, the error is logged and the site still comes up (the
 * server already tolerates a missing database).
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn("[migrate] DATABASE_URL is not set; skipping migrations");
  process.exit(0);
}

const db = drizzle(url);
try {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] database is up to date");
} catch (err) {
  console.error("[migrate] FAILED (site will still start):", err?.message ?? err);
} finally {
  try { db.$client.end(() => {}); } catch { /* ignore */ }
  process.exit(0);
}
