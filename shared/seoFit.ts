/**
 * Google shows about 60-65 characters of a title and about 155-160 of a description,
 * then cuts the rest mid-word. These trim at natural breaks instead, so the part
 * people see ends cleanly. Used by the server (ssrMeta) and the browser (SEO.tsx),
 * so the title Google reads before and after JavaScript runs is the same.
 */
export const TITLE_MAX = 65;
export const DESCRIPTION_MAX = 160;

/** Drops trailing " | " / " · " parts, then a trailing " in Chantilly, VA", until the title fits. */
export function fitTitle(title: string): string {
  let t = title.trim();
  while (t.length > TITLE_MAX) {
    const cut = Math.max(t.lastIndexOf(" | "), t.lastIndexOf(" · "));
    if (cut <= 0) break;
    t = t.slice(0, cut);
  }
  if (t.length > TITLE_MAX && / in Chantilly, VA$/.test(t)) t = t.replace(/ in Chantilly, VA$/, "");
  return t;
}

// Filler that can go first when a description runs long; the specific part stays.
const FILLER = [/,? and what each package covers/, / Free quotes?\.$/, / Free quotes? in Chantilly, VA\.$/];

/**
 * Removes filler, then whole trailing sentences, until the description fits. Never cuts
 * mid-sentence, and never shortens below 120 characters: a long specific description
 * beats a short generic one.
 */
export function fitDescription(description: string): string {
  let d = description.replace(/\s+/g, " ").trim();
  for (const f of FILLER) if (d.length > DESCRIPTION_MAX) d = d.replace(f, "");
  while (d.length > DESCRIPTION_MAX) {
    // Last sentence end that is followed by another sentence.
    let cut: number | undefined;
    const re = /(?<!\b(?:vs|St|Mt|Dr|No))[.!?](?= [A-Z0-9$])/g;
    for (let m = re.exec(d); m; m = re.exec(d)) cut = m.index;
    if (cut === undefined || cut < 120) break;
    d = d.slice(0, cut + 1);
  }
  return d;
}

/**
 * Shorter search titles for pages whose headline is too long for Google (about 65 characters).
 * The page's own headline stays as it is.
 */
export const SEO_TITLES: Record<string, string> = {
  "/blog/best-window-tint-virginia-summer": "Best Window Tint for Virginia Summer Heat, Window by Window",
  "/blog/how-to-wash-and-care-for-ppf": "How to Wash and Care for PPF: The First 7 Days and After",
  "/blog/ppf-vs-ceramic-coating-chantilly-va": "PPF vs. Ceramic Coating: Which Is Right for Your Car?",
  "/blog/spring-ceramic-coating-northern-virginia": "Why Ceramic Coating Before Spring in Northern Virginia",
  "/blog/window-tinting-near-me-chantilly-va": "Window Tinting Near Me in Chantilly, VA | Skyline Customs",
};
