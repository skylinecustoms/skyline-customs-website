/**
 * SKYLINE CUSTOMS — Video library
 *
 * Curated YouTube Shorts from @SkylineCustomsOfficial. Used by the home page
 * "Learn Before You Buy" carousel and the /videos page. Add a video by
 * appending an entry; the thumbnail comes from YouTube automatically.
 */

export type VideoCategory = "learn" | "customers" | "work";

export interface Video {
  /** YouTube video ID */
  id: string;
  title: string;
  blurb: string;
  category: VideoCategory;
  /** ISO date, used for VideoObject structured data when known */
  uploadDate?: string;
  /** Related service for cross-links */
  service?: "ppf" | "ceramic" | "tint";
}

export const VIDEO_CATEGORIES: Record<VideoCategory, { label: string; heading: string; intro: string }> = {
  learn: {
    label: "Learn",
    heading: "LEARN BEFORE YOU BUY",
    intro: "Short, straight answers to the questions we hear every day about tint, PPF, and ceramic coating.",
  },
  customers: {
    label: "Customer Stories",
    heading: "HEAR IT FROM OUR CUSTOMERS",
    intro: "Real Northern Virginia drivers on why they chose Skyline and what the result looked like.",
  },
  work: {
    label: "Recent Work",
    heading: "RECENT WORK",
    intro: "Fresh installs from the Chantilly shop: full-front PPF, ceramic coatings, and ceramic tint.",
  },
};

/** Channel upload order, newest first. Carousels sort by this so new videos lead. */
export const CHANNEL_ORDER: string[] = [
  "dI6_E2HSmmE", "C3k3BF33d7o", "ZvVdjXH06ug", "kfzGx2IROLg", "DVYvaVEy2-4", "yFTB2S3bZbw", "JCxngvQnTP0", "U0hjC5pdMZM", "aap8dfKLi98", "rdVAc15KQAI", "E7F20ZOd2Hw", "pxpi-uF0eO0", "1IwJDOhB4qA", "4lEwQEgETJA", "DNzlj5V40UQ", "_PCNkjLfG7Y", "A6AptHNL5kc", "tdSO-c8EZS0", "SugVScEKEWM", "cZ7Ky48mnss", "lZ-OYZqM5PE", "GIRnLzO2tMU", "dChKOZmEEEw", "f3J7UyIaQmM", "PnUbqFepdKQ", "284uuWTiKAg", "FsQ8yZxh4Es", "Y3vHmqfYowo", "z6_IRT__rHo", "o_fR-fJssVE", "lIIlOv42sZc", "M-4dznrTTVY", "nrzZ-3V3Rak",
];

export const VIDEOS: Video[] = [
  // ---- Learn ----
  { id: "C3k3BF33d7o", category: "learn", service: "tint", title: "Dyed Factory Tint vs Ceramic Tint", blurb: "What actually separates cheap dyed film from ceramic film: heat rejection, fading, and how long each lasts." },
  { id: "284uuWTiKAg", category: "learn", service: "tint", title: "Is Window Tint More Than Just Looks?", blurb: "UV protection, heat, glare, and privacy broken down in under a minute." },
  { id: "FsQ8yZxh4Es", category: "learn", service: "tint", title: "How We Tint a Bronco, Legally", blurb: "Choosing a shade that looks right and still passes Virginia inspection." },
  { id: "dChKOZmEEEw", category: "learn", service: "tint", title: "Tint Isn't Just for Summer", blurb: "Why winter drivers still get glare relief, UV protection, and privacy from ceramic tint." },
  { id: "pxpi-uF0eO0", category: "customers", service: "tint", title: "Light, Medium, or Dark?", blurb: "One shade change, a whole new mood. See the three most common levels side by side." },
  { id: "M-4dznrTTVY", category: "learn", service: "tint", title: "Dark, Clean, and Legal", blurb: "No bubbles, no shortcuts. What a proper tint install looks like up close." },
  { id: "dI6_E2HSmmE", category: "learn", service: "ppf", title: "Does Tesla Give Away Free PPF Kits?", blurb: "What Tesla owners should know before relying on a factory kit for paint protection." },
  { id: "ZvVdjXH06ug", category: "learn", service: "ppf", title: "Even BMW Doesn't Trust BMW Paint", blurb: "Why manufacturers recommend film on the front end, and what a full-front install costs at Skyline." },
  { id: "SugVScEKEWM", category: "customers", service: "tint", title: "Tesla Ceramic Tint: More Shade, Less Heat", blurb: "How ceramic film keeps a glass-roof Tesla cooler without touching signal or range." },
  { id: "_PCNkjLfG7Y", category: "learn", service: "tint", title: "Smoked Taillight Tint Options", blurb: "Light, medium, and dark smoke finishes, and what stays street-legal." },

  // ---- Customer stories ----
  { id: "nrzZ-3V3Rak", category: "customers", title: "What Davinci Said About Us", blurb: "A customer's take on the experience from drop-off to pickup." },
  { id: "GIRnLzO2tMU", category: "customers", title: "Don't Take Our Word for It, Take Ken's", blurb: "Ken on why he chose Skyline and how the finished car turned out." },
  { id: "cZ7Ky48mnss", category: "customers", title: "Christian Came In With a Vision", blurb: "Christian's build, from the idea he walked in with to the finish he drove out with." },
  { id: "kfzGx2IROLg", category: "customers", service: "ppf", title: "John's Full Front PPF + Ceramic Coating", blurb: "John trusted us with his ride: full-front film plus a ceramic coating on top." },

  // ---- Recent work ----
  { id: "DVYvaVEy2-4", category: "work", service: "ppf", title: "Mercedes-AMG G63 PPF", blurb: "Big square panels, zero visible edges." },
  { id: "yFTB2S3bZbw", category: "work", service: "ppf", title: "2026 Honda Civic Type R Full Front", blurb: "Bumper, hood, fenders, mirrors, and headlights protected before the first road trip." },
  { id: "JCxngvQnTP0", category: "work", service: "tint", title: "Lexus: Window Tint + Ceramic Coating", blurb: "Fresh tint for a smooth private look plus a ceramic coat for the paint." },
  { id: "U0hjC5pdMZM", category: "customers", service: "tint", title: "Corvette Stingray Ceramic Tint", blurb: "From showroom clean to street lethal." },
  { id: "A6AptHNL5kc", category: "customers", service: "tint", title: "Genesis G70 Privacy Tint", blurb: "Privacy on max, comfort on lock." },
  { id: "tdSO-c8EZS0", category: "customers", service: "tint", title: "Alfa Romeo: Factory Clear to Luxury Dark", blurb: "A clean, even shade across every window." },
];

const rank = (id: string) => { const i = CHANNEL_ORDER.indexOf(id); return i === -1 ? Number.MAX_SAFE_INTEGER : i; };

/** Videos in a category, newest first. */
export const videosByCategory = (category: VideoCategory) =>
  VIDEOS.filter((v) => v.category === category).sort((a, b) => rank(a.id) - rank(b.id));
export const videoThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Upload date + ISO 8601 duration per YouTube id (from the YouTube Data API; scripts/fetch-video-meta.mjs). */
import videoMeta from "./videoMeta.json";
export const videoMetaFor = (id: string): { uploadDate?: string; duration?: string } =>
  (videoMeta as Record<string, { uploadDate: string; duration: string }>)[id] ?? {};

/** schema.org VideoObject for a YouTube Short. */
export const videoObject = (v: Video) => {
  const m = videoMetaFor(v.id);
  return {
    "@type": "VideoObject",
    "name": v.title,
    "description": v.blurb,
    "thumbnailUrl": [`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`, videoThumb(v.id)],
    "contentUrl": `https://www.youtube.com/shorts/${v.id}`,
    "embedUrl": `https://www.youtube.com/embed/${v.id}`,
    ...(m.uploadDate ? { "uploadDate": m.uploadDate } : {}),
    ...(m.duration ? { "duration": m.duration } : {}),
    "publisher": { "@type": "Organization", "name": "Skyline Customs", "url": "https://www.skylinecustomshop.com" },
  };
};
export const videoEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
export const videoWatchUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
