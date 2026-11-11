/** "in the last week", "3 weeks ago", "2 months ago", "a year ago": Google's wording, worked out from the review's date so archived and snapshot reviews stay right. */
export function relativeWhen(timeSec: number, now = Date.now()): string {
  const days = Math.max(0, (now / 1000 - timeSec) / 86400);
  if (days < 7) return "in the last week";
  if (days < 30) { const w = Math.floor(days / 7); return w === 1 ? "a week ago" : `${w} weeks ago`; }
  if (days < 365) { const m = Math.floor(days / 30); return m === 1 ? "a month ago" : `${m} months ago`; }
  const y = Math.floor(days / 365);
  return y === 1 ? "a year ago" : `${y} years ago`;
}

/**
 * The one review order on the site (owner's call): reviews with a customer photo of their car first, newest
 * first; then the rest, newest first. Used by the server (so the server-rendered page and the hourly photo
 * refresh agree) and by every review block on the client.
 */
export function compareReviews(a: { time?: number; jobPhoto?: unknown }, b: { time?: number; jobPhoto?: unknown }): number {
  return (a.jobPhoto ? 0 : 1) - (b.jobPhoto ? 0 : 1) || (b.time ?? 0) - (a.time ?? 0);
}
