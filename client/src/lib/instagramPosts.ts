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
 */
import type { VideoCategory } from "@/lib/videos";

export interface InstagramReel { code: string; category: VideoCategory; title: string; type?: "reel" | "p" }

export const INSTAGRAM_REELS: InstagramReel[] = [
  // Customer stories (list supplied by the shop)
  { code: "DYGCGHNAncQ", category: "customers", title: "John's Full Front PPF + Ceramic Coating" },
  { code: "DUjT9uckjy4", category: "customers", title: "Stingray Owner: Ceramic Tint" },
  { code: "DUbXd7zkakv", category: "customers", title: "Silverado Owner: Stock to Statement" },
  { code: "DUY54ygEfbl", category: "customers", title: "Clean Tint Always Wins" },
  { code: "DUTx1C3Ejm2", category: "customers", title: "Light, Medium, or Dark: A Customer's Pick" },
  { code: "DULs16kAJMr", category: "customers", title: "Ceramic Tint for Comfort and Clarity" },
  { code: "DUJF556gF3R", category: "customers", title: "Clean Installs, Consistent Results" },
  { code: "DTvWxRwABwc", category: "customers", title: "Alfa Romeo Owner: Factory Clear to Luxury Dark" },
  { code: "DTss57hgLDU", category: "customers", title: "Tesla Owner: More Shade, Less Heat" },
  { code: "DTnicqFAJ02", category: "customers", title: "Christian Came In With a Vision" },
  { code: "DTk1JObgJx4", category: "customers", title: "One Detail, Whole New Attitude" },
  { code: "DTgiluzAGfi", category: "customers", title: "Don't Take Our Word for It, Take Ken's" },

  // Learn before you buy
  { code: "DdbjO5OpW1W", category: "learn", title: "One of These Cars Has PPF. Which One?" },
  { code: "DdJ1ikghvb6", category: "learn", title: "Why Would Tesla Give Away PPF Kits for Free?" },
  { code: "DaNiBH6u8Y4", category: "learn", title: "Hacksaw, Razor, Gravel vs. Our PPF" },
  { code: "DZIZnpZN8vW", category: "learn", title: "Your Tint Is Lying to You" },
  { code: "DY7LdQYBugZ", category: "learn", title: "What's Protecting the Paint Under Your Ceramic?" },
  { code: "DY2okS-Qzlv", category: "learn", title: "Even BMW Doesn't Trust BMW Paint" },
  { code: "DTddowJAP_0", category: "learn", title: "Tint Isn't Just for Summer" },
  { code: "DTDwZnEADDt", category: "learn", title: "Think Tint Is Only for Style?" },
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
  { code: "DYDHS2UvJY0", category: "work", title: "AMG G63 PPF + Ceramic Tint" },
  { code: "DX4o-FKAtan", category: "work", title: "2026 Civic Type R Full Front PPF" },
  { code: "DXy68SxgpDf", category: "work", title: "2026 BMW iX PPF Track Package" },
  { code: "DXtufBOAFT8", category: "work", title: "2026 E-Ray: Full Body PPF + Ceramic Tint" },
  { code: "DVjMobOgOpG", category: "work", title: "Dealer Fresh to Fully Protected" },
  { code: "DU_EjoKgG0K", category: "work", title: "Lexus: Tint + Ceramic Coating" },
  { code: "DUWQ5alkado", category: "work", title: "Privacy With Purpose" },
  { code: "DURYnlOgEhQ", category: "work", title: "Mercedes: Luxury Done Right" },
  { code: "DUG8WOCEqkA", category: "work", title: "Audi: Quiet Luxury, Darker Intentions" },
  { code: "DT3K5ThAMBa", category: "work", title: "When the Tint Matches the Badge" },
  { code: "DTyIOrKERTP", category: "work", title: "Genesis G70 Privacy Tint" },
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
