/**
 * Gallery jobs for the server: the active gallery photos (database, or the
 * seeded content file when there is no database) with their page slugs.
 * Cached for 10 minutes; used by meta, 404 detection, the sitemap and SSR preload.
 */
import { asc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { galleryPhotos } from "../drizzle/schema";
import seeded from "../content/galleryPhotos.json";
import { withJobSlugs, type GalleryJob } from "../shared/galleryJobs";

const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; jobs: GalleryJob[]; rows: unknown[] } | null = null;

export async function getGalleryRows(): Promise<unknown[]> {
  return (await loadJobs()).rows;
}

export async function getGalleryJobs(): Promise<GalleryJob[]> {
  return (await loadJobs()).jobs;
}

export async function findGalleryJob(slug: string): Promise<GalleryJob | undefined> {
  return (await getGalleryJobs()).find((j) => j.slug === slug);
}

async function loadJobs() {
  if (cache && Date.now() - cache.at < TTL_MS) return cache;
  let rows: unknown[] = [];
  try {
    const db = await getDb();
    if (db) rows = await db.select().from(galleryPhotos).where(eq(galleryPhotos.active, 1)).orderBy(asc(galleryPhotos.sortOrder));
  } catch (err) {
    console.warn("[gallery] db unavailable, using seeded photos:", (err as Error).message);
  }
  if (rows.length === 0) {
    rows = (seeded as { id: number; photoUrl: string; alt: string; category: string; carDescription?: string | null; sortOrder?: number; active?: number; createdAt?: string }[])
      .filter((p) => (p.active ?? 1) === 1)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((p) => ({ ...p, createdAt: p.createdAt ? new Date(p.createdAt) : new Date() }));
  }
  const jobs = withJobSlugs(rows as GalleryJob[]);
  cache = { at: Date.now(), jobs, rows };
  return cache;
}

/** Old upload URLs -> new descriptive image URLs (from content/galleryPhotos.json). */
export const GALLERY_IMAGE_REDIRECTS: Record<string, string> = Object.fromEntries(
  (seeded as { photoUrl: string; previousUrl?: string }[]).filter((p) => p.previousUrl).map((p) => [p.previousUrl as string, p.photoUrl])
);
