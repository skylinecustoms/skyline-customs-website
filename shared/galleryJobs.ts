/**
 * Turns a gallery photo record into a "job" with a stable URL slug and parsed
 * car/services, shared by the server (sitemap, meta, 404s) and the client
 * (job pages, gallery links).
 *
 * Alt text formats in the gallery:
 *   "BMW M340i - Full Front PPF + Ceramic Coating"
 *   "PPF on 2018 Ford Shelby GT350 - Skyline Custom Shop Chantilly VA"
 */
export interface GalleryPhotoLike {
  id: number;
  photoUrl: string;
  alt: string;
  category: string;
  carDescription?: string | null;
  createdAt?: Date | string | null;
}

export interface GalleryJob extends GalleryPhotoLike {
  slug: string;
  car: string;
  services: string[];
  brandSlug?: "tesla" | "bmw" | "porsche" | "corvette" | "rivian" | "bronco";
  bodyType: "truck" | "suv" | "sports" | "ev" | "sedan";
}

const CAR_FIXES: Record<string, string> = { cx90: "CX-90", wrangler: "Wrangler", gtr: "GT-R", "gt-r": "GT-R" };

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function parseJob(alt: string, carDescription?: string | null): { car: string; services: string[] } {
  const ppfOn = alt.match(/^PPF on (.+?)\s+-\s+Skyline/i);
  let car: string;
  let services: string[];
  if (ppfOn) {
    car = ppfOn[1];
    services = ["Full Front PPF"];
  } else {
    const [first, ...rest] = alt.split(" - ");
    car = carDescription?.trim() || first;
    services = rest.join(" - ").split("+").map((s) => s.trim()).filter(Boolean);
    if (services.length === 0) services = ["Full Front PPF"];
  }
  car = car
    .split(/\s+/)
    .map((w) => CAR_FIXES[w.toLowerCase()] ?? (w === w.toLowerCase() && /^[a-z]+$/.test(w) ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
    .trim();
  return { car, services };
}

export function brandSlugFor(car: string): GalleryJob["brandSlug"] {
  const c = car.toLowerCase();
  if (/tesla|cybertruck|model [3sxy]\b/.test(c)) return "tesla";
  if (/\bbmw\b/.test(c)) return "bmw";
  if (/porsche|911|cayenne|macan|taycan/.test(c)) return "porsche";
  if (/corvette|stingray|z06|e-ray|eray/.test(c)) return "corvette";
  if (/rivian|r1t|r1s/.test(c)) return "rivian";
  if (/bronco/.test(c)) return "bronco";
  return undefined;
}

export function bodyTypeFor(car: string): GalleryJob["bodyType"] {
  const c = car.toLowerCase();
  if (/cybertruck|tacoma|tundra|f-150|silverado|rubicon|wrangler|bronco|r1t|raptor/.test(c)) return "truck";
  if (/corvette|stingray|z06|gt-r|gtr|supra|shelby|mustang|z4|type s|type r|911|cayman|m2\b|m3\b|m4\b|integra/.test(c)) return "sports";
  if (/tesla|model [3sxy]\b|lucid|\bix\b|taycan|rivian|lyriq|ioniq|ev\b/.test(c)) return "ev";
  if (/x5|x3|x7|gle|glc|g63|mdx|rdx|pilot|seltos|cherokee|escalade|4runner|highlander|cx-90|cx90|tahoe|suburban|countryman|cayenne|macan|suv|q5|q7|rx\b|gx\b|telluride|palisade/.test(c)) return "suv";
  return "sedan";
}

/** Adds a unique slug to each photo, in the given order (so slugs are stable for a fixed list). */
export function withJobSlugs<T extends GalleryPhotoLike>(photos: T[]): (T & GalleryJob)[] {
  const seen = new Map<string, number>();
  return photos.map((p) => {
    const { car, services } = parseJob(p.alt, p.carDescription);
    const base = slugify(`${car} ${services.join(" ")}`);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const slug = n === 1 ? base : `${base}-${n}`;
    return { ...p, slug, car, services, brandSlug: brandSlugFor(car), bodyType: bodyTypeFor(car) };
  });
}

/** Descriptive image file name for a job photo (used by scripts/rename-gallery-images.mjs). */
export const jobImageName = (alt: string, carDescription: string | null | undefined, ext: string) =>
  `${slugify(`${parseJob(alt, carDescription).car} ${parseJob(alt, carDescription).services.join(" ")}`)}-chantilly-va${ext}`;
