import { desc, eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts, InsertBlogPost, InsertPromo, InsertPromoSlot, InsertPromoWaitlist, InsertUser, promos, promoSlots, promoWaitlist, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(eq(blogPosts.status, 'published')).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published'))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.insert(blogPosts).values(post);
}

export async function blogPostSlugExists(slug: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0;
}

// Promo helpers
export async function getActivePromo(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promos).where(eq(promos.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Get the currently active promo (active=1), most recently created
export async function getActivePromoByActive() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promos)
    .where(eq(promos.active, 1))
    .orderBy(desc(promos.createdAt))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Insert a new promo record
export async function insertPromo(promo: InsertPromo) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.insert(promos).values(promo);
}

// Deactivate all promos (used when creating a new one)
export async function deactivateAllPromos() {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(promos).set({ active: 0 });
}

export async function getPromoSlots(promoId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promoSlots).where(eq(promoSlots.promoId, promoId)).orderBy(promoSlots.slotNumber);
}

export async function addPromoSlot(slot: InsertPromoSlot) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.insert(promoSlots).values(slot);
}

// Waitlist helpers
export async function addToWaitlist(entry: InsertPromoWaitlist) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.insert(promoWaitlist).values(entry);
}

export async function getWaitlistForPromo(promoId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promoWaitlist)
    .where(eq(promoWaitlist.promoId, promoId))
    .orderBy(desc(promoWaitlist.createdAt));
}

export async function getWaitlistCount(promoId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(promoWaitlist).where(eq(promoWaitlist.promoId, promoId));
  return result.length;
}

// Get an archived promo by its archivedSlug (e.g. "june-special")
export async function getArchivedPromoBySlug(archivedSlug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promos)
    .where(and(eq(promos.isArchived, 1), eq(promos.archivedSlug, archivedSlug)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Get the most recently archived promo (for the "Last Month" strip on /promo)
export async function getLastArchivedPromo() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promos)
    .where(eq(promos.isArchived, 1))
    .orderBy(desc(promos.createdAt))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}
