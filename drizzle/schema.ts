import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  date: varchar("date", { length: 64 }).notNull(),
  readTime: varchar("readTime", { length: 32 }).notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  heroImage: text("heroImage").notNull(),
  heroImageAlt: text("heroImageAlt").notNull(),
  content: text("content").notNull(), // JSON stringified array of content blocks
  status: mysqlEnum("status", ["published", "draft"]).default("published").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Monthly promotional deal tables
export const promos = mysqlTable("promos", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(), // e.g. "june-2026"
  title: text("title").notNull(), // e.g. "June Special"
  tagline: text("tagline").notNull(), // short hook line
  dealDescription: text("dealDescription").notNull(), // what's included
  totalSlots: int("totalSlots").notNull().default(21),
  startDate: varchar("startDate", { length: 32 }).notNull(),
  endDate: varchar("endDate", { length: 32 }).notNull(),
  price: varchar("price", { length: 32 }).notNull().default("2400"), // e.g. "2400"
  includedServices: text("includedServices"), // JSON array of {name, value, isFree} objects — nullable, null means use hardcoded defaults
  active: int("active").notNull().default(1), // 1 = active, 0 = inactive
  // Archive system: when /promo_new runs, the current promo gets archived
  // archivedSlug is the URL path it will live at forever (e.g. "june-special")
  // isArchived=1 means this promo is done and visible at /archivedSlug
  archivedSlug: varchar("archivedSlug", { length: 128 }), // e.g. "june-special" -- null until archived
  isArchived: int("isArchived").notNull().default(0), // 0 = live/inactive, 1 = archived (visible at archivedSlug)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Promo = typeof promos.$inferSelect;
export type InsertPromo = typeof promos.$inferInsert;

export const promoSlots = mysqlTable("promoSlots", {
  id: int("id").autoincrement().primaryKey(),
  promoId: int("promoId").notNull(), // FK → promos.id
  slotNumber: int("slotNumber").notNull(), // 1–21
  customerName: varchar("customerName", { length: 128 }).notNull(),
  carDescription: text("carDescription").notNull(), // e.g. "2023 BMW M4 — Frozen Orange"
  photoUrl: text("photoUrl"), // CDN URL of finished car photo
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type PromoSlot = typeof promoSlots.$inferSelect;
export type InsertPromoSlot = typeof promoSlots.$inferInsert;

// Key-value store for site-wide settings managed via Telegram bot
export const siteSettings = mysqlTable("siteSettings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 128 }).notNull().unique(), // e.g. "hours", "announcement", "announcementActive"
  value: text("value").notNull(), // JSON or plain string
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

// Gallery photos managed via Telegram bot
export const galleryPhotos = mysqlTable("galleryPhotos", {
  id: int("id").autoincrement().primaryKey(),
  photoUrl: text("photoUrl").notNull(),
  alt: text("alt").notNull(),
  category: varchar("category", { length: 64 }).notNull().default("PPF"), // PPF, Tint, Ceramic Coating, Wrap
  carDescription: text("carDescription"),
  sortOrder: int("sortOrder").notNull().default(0),
  active: int("active").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = typeof galleryPhotos.$inferInsert;

// Waitlist for sold-out promos
export const promoWaitlist = mysqlTable("promoWaitlist", {
  id: int("id").autoincrement().primaryKey(),
  promoId: int("promoId").notNull(), // FK -> promos.id
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  vehicle: varchar("vehicle", { length: 255 }), // optional: what car they have
  intent: varchar("intent", { length: 32 }), // asap | this-week | this-month
  ppfReason: text("ppfReason"), // "What made you look into PPF?"
  desiredTiming: text("desiredTiming"), // "When did you want to get it done?"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PromoWaitlist = typeof promoWaitlist.$inferSelect;
export type InsertPromoWaitlist = typeof promoWaitlist.$inferInsert;