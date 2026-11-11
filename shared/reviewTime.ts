/** "in the last week", "3 weeks ago", "2 months ago", "a year ago": Google's wording, worked out from the review's date so archived and snapshot reviews stay right. */
export function relativeWhen(timeSec: number, now = Date.now()): string {
  const days = Math.max(0, (now / 1000 - timeSec) / 86400);
  if (days < 7) return "in the last week";
  if (days < 30) { const w = Math.floor(days / 7); return w === 1 ? "a week ago" : `${w} weeks ago`; }
  if (days < 365) { const m = Math.floor(days / 30); return m === 1 ? "a month ago" : `${m} months ago`; }
  const y = Math.floor(days / 365);
  return y === 1 ? "a year ago" : `${y} years ago`;
}
