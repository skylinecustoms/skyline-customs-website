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
    // No giveaway this season: the finished-car grid runs on its own (see JuneSpecial.tsx).
    // heroVideo: { youtubeId: "XXXXXXXXXXX", caption: "Watch this first (90 seconds)" },
  },
};

export const promoExtrasFor = (slug: string | undefined): PromoExtras => (slug && PROMO_EXTRAS[slug]) || {};
