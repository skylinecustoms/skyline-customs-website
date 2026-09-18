/**
 * Curated @skylinecustomshop Instagram reels, grouped into the same three
 * buckets as the YouTube videos (lib/videos.ts):
 *   customers - testimonials and customers in front of their car
 *   learn     - educational / explainer content
 *   work      - b-roll of finished jobs set to music
 * `code` is the reel shortcode from the permalink (instagram.com/reel/<code>/).
 * Thumbnails come from the live feed (trpc.site.instagram) when available; the
 * official Instagram embed opens on click, so no token is needed on the client.
 * Newest first within each bucket.
 *
 * Reels that are the same video as a YouTube Short in lib/videos.ts are NOT
 * listed here (the YouTube card autoplays, so it wins). Those pairs:
 *   DTgiluzAGfi -> YouTube GIRnLzO2tMU
 *   DTnicqFAJ02 -> YouTube cZ7Ky48mnss
 *   DYGCGHNAncQ -> YouTube kfzGx2IROLg
 *   DUTx1C3Ejm2 -> YouTube pxpi-uF0eO0
 *   DTss57hgLDU -> YouTube SugVScEKEWM
 *   DTvWxRwABwc -> YouTube tdSO-c8EZS0
 *   DUjT9uckjy4 -> YouTube U0hjC5pdMZM
 *   DTyIOrKERTP -> YouTube A6AptHNL5kc
 *   DU_EjoKgG0K -> YouTube JCxngvQnTP0
 *   DXtufBOAFT8 -> YouTube euOKAH_QStE
 *   DYDHS2UvJY0 -> YouTube DVYvaVEy2-4
 *   DX4o-FKAtan -> YouTube yFTB2S3bZbw
 *   DZIZnpZN8vW -> YouTube C3k3BF33d7o
 *   DTDwZnEADDt -> YouTube 284uuWTiKAg
 *   DTddowJAP_0 -> YouTube dChKOZmEEEw
 *   DdJ1ikghvb6 -> YouTube dI6_E2HSmmE
 *   DY2okS-Qzlv -> YouTube ZvVdjXH06ug
 */
import type { VideoCategory } from "@/lib/videos";

export interface InstagramReel { code: string; category: VideoCategory; title: string; type?: "reel" | "p" }

export const INSTAGRAM_REELS: InstagramReel[] = [
  // Customer stories (list supplied by the shop)
  { code: "DUbXd7zkakv", category: "customers", title: "Silverado Owner: Stock to Statement" },
  { code: "DUY54ygEfbl", category: "customers", title: "Clean Tint Always Wins" },
  { code: "DULs16kAJMr", category: "customers", title: "Ceramic Tint for Comfort and Clarity" },
  { code: "DUJF556gF3R", category: "customers", title: "Clean Installs, Consistent Results" },
  { code: "DTk1JObgJx4", category: "customers", title: "One Detail, Whole New Attitude" },

  // Learn before you buy
  { code: "DdbjO5OpW1W", category: "learn", title: "One of These Cars Has PPF. Which One?" },
  { code: "DaNiBH6u8Y4", category: "learn", title: "Hacksaw, Razor, Gravel vs. Our PPF" },
  { code: "DY7LdQYBugZ", category: "learn", title: "What's Protecting the Paint Under Your Ceramic?" },
  { code: "DRPrdVTAPOP", category: "learn", title: "Our Full Ceramic Coating Process" },

  // Recent work (b-roll)
  { code: "DbLfyt_vQSA", category: "work", title: "2026 Stingray: Full Front PPF + Ceramic" },
  { code: "DbIvcUdB7HT", category: "work", title: "Black GT-R Full Body PPF" },
  { code: "DbGbLzwBEqg", category: "work", title: "Cybertruck: Matte Black PPF + Ceramic Tint" },
  { code: "DbBHdDiO-GM", category: "work", title: "White Supra: Full Front PPF + Ceramic" },
  { code: "DadOvluBAu_", category: "work", title: "Brand-New Escalade Full Front PPF" },
  { code: "DaQD_3Dun6S", category: "work", title: "Sanremo Green Z4: Full Front PPF + Ceramic" },
  { code: "DZC-YMhAog0", category: "work", title: "2026 Stingray Full Body PPF" },
  { code: "DYIFA9IgpJQ", category: "work", title: "BMW M2 Ceramic Window Tint" },
  { code: "DXy68SxgpDf", category: "work", title: "2026 BMW iX PPF Track Package" },
  { code: "DVjMobOgOpG", category: "work", title: "Dealer Fresh to Fully Protected" },
  { code: "DUWQ5alkado", category: "work", title: "Privacy With Purpose" },
  { code: "DURYnlOgEhQ", category: "work", title: "Mercedes: Luxury Done Right" },
  { code: "DUG8WOCEqkA", category: "work", title: "Audi: Quiet Luxury, Darker Intentions" },
  { code: "DT3K5ThAMBa", category: "work", title: "When the Tint Matches the Badge" },
  { code: "DTN2gFeACXR", category: "work", title: "Fresh Film, Clean Finish" },
  { code: "DS8WiTYEX1s", category: "work", title: "Built for Trails, Protected From the Sun" },
  { code: "DS6GtkvAGCi", category: "work", title: "GT-R at Skyline Customs" },
  { code: "DSvbcM3kmrm", category: "work", title: "Subtle Upgrade, Flawless Finish" },
  { code: "DSk_kLzEWVa", category: "work", title: "Tesla Ceramic Coating, Perfected" },
  { code: "DSk9jMSkdW0", category: "work", title: "Mercedes Tint Transformation" },
  { code: "DRVKEFYEYyH", category: "work", title: "Ceramic Locked In, Gloss on Max" },
  { code: "DRSbnP2gPPh", category: "work", title: "Prepped. Coated. Protected." },
  { code: "DQRyHyrgF8l", category: "work", title: "Headlight Restoration + Ceramic Coating" },
  { code: "DQFJGU4APpR", category: "work", title: "Audi S5 Paint Correction + Ceramic" },
];

export const reelUrl = (r: InstagramReel) => `https://www.instagram.com/${r.type ?? "reel"}/${r.code}/`;
export const reelsByCategory = (category: VideoCategory) => INSTAGRAM_REELS.filter((r) => r.category === category);
