/** "in the last week", "3 weeks ago", "2 months ago", "a year ago": Google's wording, worked out from the review's date so archived and snapshot reviews stay right. */
export function relativeWhen(timeSec: number, now = Date.now()): string {
  const days = Math.max(0, (now / 1000 - timeSec) / 86400);
  if (days < 7) return "in the last week";
  if (days < 30) { const w = Math.floor(days / 7); return w === 1 ? "a week ago" : `${w} weeks ago`; }
  if (days < 365) { const m = Math.floor(days / 30); return m === 1 ? "a month ago" : `${m} months ago`; }
  const y = Math.floor(days / 365);
  return y === 1 ? "a year ago" : `${y} years ago`;
}

/** "Recent" for the photo group: the last two months. */
export const RECENT_PHOTO_DAYS = 61;

/** A review from the last two months that has customer photos attached: these lead every review list. */
export function isRecentWithPhotos(r: { time?: number; photos?: unknown[] }, now = Date.now()): boolean {
  return !!r.photos?.length && !!r.time && now / 1000 - r.time <= RECENT_PHOTO_DAYS * 86400;
}

/**
 * The one review order on the site (owner's call): reviews from the last two months with the customer's own
 * photos first, newest first; then every other review, newest first. Used by the server (so the
 * server-rendered page matches) and by every review block on the client.
 */
export function compareReviews(a: { time?: number; photos?: unknown[] }, b: { time?: number; photos?: unknown[] }, now = Date.now()): number {
  return (isRecentWithPhotos(a, now) ? 0 : 1) - (isRecentWithPhotos(b, now) ? 0 : 1) || (b.time ?? 0) - (a.time ?? 0);
}
