/**
 * Every car we have done on a monthly special, in one list.
 *
 * Two sources: the finished-car slots of each archived special (the recent
 * ones, with the owner in the photo), and the gallery photos of the special's
 * package (full front PPF plus the free ceramic coating) from the months before
 * slots existed. A car that appears in both is shown once.
 */

export interface PastSpecialCar {
  key: string;
  photoUrl: string;
  name: string;
  description: string;
  /** Which special it came from, or "Past special" for gallery-era cars. */
  badge: string;
  alt: string;
}

interface Slot { id: number; customerName: string; carDescription: string; photoUrl: string | null }
interface Special { title: string | null; slots: Slot[] }
interface GalleryPhoto { id: number; photoUrl: string; alt: string; carDescription: string | null; createdAt?: string | Date }

const SPECIAL_PACKAGE = /full front ppf \+ ceramic coating/i;

/** "2026 Corvette C8 Z06 - Full Front PPF + Ceramic Coating" -> "corvettec8z06" */
export const carKey = (s: string) =>
  s.toLowerCase()
    .replace(/\s*[-—]\s*full front ppf.*$/i, "")
    .replace(/\b(19|20)\d{2}\b/g, "")
    .replace(/\b(coupe|sedan|convertible|elite|trd|new)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const sameCar = (a: string, b: string) => a.length > 0 && b.length > 0 && (a === b || a.includes(b) || b.includes(a));

export function pastSpecialCars(specials: Special[] | undefined, gallery: GalleryPhoto[] | undefined): PastSpecialCar[] {
  const out: PastSpecialCar[] = [];
  const fromSlots: PastSpecialCar[] = [];
  for (const sp of specials ?? []) {
    for (const s of sp.slots ?? []) {
      if (!s.photoUrl) continue;
      const badge = sp.title ?? "Past special";
      fromSlots.push({ key: carKey(s.customerName), photoUrl: s.photoUrl, name: s.customerName, description: s.carDescription, badge, alt: `${s.carDescription} -- Skyline Customs ${badge}` });
    }
  }
  out.push(...fromSlots);
  // A gallery photo is dropped only when a slot already shows that car; two different gallery cars
  // with similar names (BMW X5 and BMW X5 2026) are both real and both stay.
  const push = (car: PastSpecialCar) => { if (!fromSlots.some((c) => sameCar(c.key, car.key))) out.push(car); };
  const galleryCars = (gallery ?? [])
    .filter((g) => SPECIAL_PACKAGE.test(g.alt))
    .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
  for (const g of galleryCars) {
    const name = g.alt.replace(/\s*[-—]\s*full front ppf.*$/i, "").trim();
    push({ key: carKey(g.alt), photoUrl: g.photoUrl, name, description: g.carDescription?.trim() || "Full front STEK DYNOshield PPF + free full-car ceramic coating", badge: "Past special", alt: `${g.alt} at Skyline Customs in Chantilly, VA` });
  }
  return out;
}
