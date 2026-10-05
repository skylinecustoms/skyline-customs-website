/**
 * Extras for a promo that the database row does not carry: a giveaway and,
 * later, a sales video (VSL) for the hero. Keyed by the promo slug in
 * content/promos.json. A promo with no entry here renders the standard page.
 */
export interface PromoGiveaway {
  /** Short name used in badges, e.g. "Fall Giveaway". */
  name: string;
  /** What the winner gets, one plain sentence. */
  prize: string;
  /** Section heading over the entries grid. */
  entriesHeading: string;
  /** When the winner is drawn, as shown to customers. */
  drawingDate: string;
  /** Plain-language rules; the last ones cover the free entry route. */
  rules: string[];
}

export interface PromoHeroVideo {
  /** YouTube video id, or leave unset and use mp4. */
  youtubeId?: string;
  /** Direct mp4 URL (self-hosted or CDN). */
  mp4?: string;
  /** Poster image for the mp4 player. */
  poster?: string;
  /** Short label under the video. */
  caption?: string;
}

export interface PromoExtras {
  giveaway?: PromoGiveaway;
  heroVideo?: PromoHeroVideo;
}

export const PROMO_EXTRAS: Record<string, PromoExtras> = {
  "fall-2026": {
    giveaway: {
      name: "Fall Giveaway",
      prize: "A full body PPF install on the winner's car, every painted panel, at no charge.",
      entriesHeading: "WHO'S IN THE DRAWING",
      drawingDate: "November 1, 2026",
      rules: [
        "Every Fall Special job completed and paid in full between October 1 and October 31, 2026 earns one entry.",
        "One winner is drawn on November 1, 2026, announced on our Instagram, and contacted by phone and email.",
        "The prize is a full body PPF install on the winner's vehicle in STEK DYNOshield. Approximate retail value: $8,500, varying with the vehicle's size and panel count. It has no cash value and cannot be transferred or exchanged.",
        "No purchase necessary. To enter without booking, email info@skylinecustomshop.com with the subject \"Fall Giveaway\" and your name, phone number, and vehicle before October 31, 2026. One free entry per person.",
        "Open to legal residents of Virginia, Maryland, and the District of Columbia who are 18 or older. Void where prohibited.",
        "Sponsor: Skyline Customs, 4215 Walney Rd Suite 1A & B, Chantilly, VA 20151. Odds of winning depend on the number of entries received. The winner must respond within 7 days of notification or an alternate winner is drawn.",
        "This promotion is not sponsored, endorsed or administered by, or associated with Meta, Facebook or Instagram.",
      ],
    },
    // heroVideo: { youtubeId: "XXXXXXXXXXX", caption: "Watch this first (90 seconds)" },
  },
};

export const promoExtrasFor = (slug: string | undefined): PromoExtras => (slug && PROMO_EXTRAS[slug]) || {};
