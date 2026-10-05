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
  /** What the video covers, in text: shown under the carousel on /videos and used as the schema description. */
  summary?: string;
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
  "n5mQVftEwfA", "LQ1iXlQpXGc", "P2zyuOrWiDA", "dI6_E2HSmmE", "C3k3BF33d7o", "ZvVdjXH06ug", "kfzGx2IROLg", "DVYvaVEy2-4", "yFTB2S3bZbw", "JCxngvQnTP0", "U0hjC5pdMZM", "aap8dfKLi98", "rdVAc15KQAI", "E7F20ZOd2Hw", "pxpi-uF0eO0", "1IwJDOhB4qA", "4lEwQEgETJA", "DNzlj5V40UQ", "_PCNkjLfG7Y", "A6AptHNL5kc", "tdSO-c8EZS0", "SugVScEKEWM", "cZ7Ky48mnss", "lZ-OYZqM5PE", "GIRnLzO2tMU", "dChKOZmEEEw", "f3J7UyIaQmM", "PnUbqFepdKQ", "284uuWTiKAg", "FsQ8yZxh4Es", "Y3vHmqfYowo", "z6_IRT__rHo", "o_fR-fJssVE", "lIIlOv42sZc", "M-4dznrTTVY", "nrzZ-3V3Rak",
];

export const VIDEOS: Video[] = [
  { id: "n5mQVftEwfA", category: "learn", service: "ppf", title: "The 3-Step Prep Before PPF", blurb: "A rare Mustang GT California Special goes through the prep every car gets before film: masking the trim, a paint enhancement pass, and the alcohol wipe that makes the film bond.", summary: "Before any film touches a car, three things happen. First the trim, badges, and panel gaps are masked so no adhesive or polish ends up where it should not. Then a paint enhancement pass with a machine polisher removes the light swirls and haze that would otherwise be sealed under the film forever. Last comes an alcohol wipe on every panel, which strips polish oils so the STEK DYNOshield adhesive bonds to bare clear coat. This Mustang GT California Special, one of fifteen built, got the same prep every car gets." },
  { id: "LQ1iXlQpXGc", category: "learn", service: "ppf", title: "Where Rock Chips Actually Land", blurb: "A walk through the body shop showing why the hood, fenders, bumper, and headlights take the hits, and why full front PPF covers exactly those panels.", summary: "A walk through the body shop next door shows where the damage actually lands: the leading edge of the hood, the front bumper, the fronts of both fenders, the mirror caps, and the headlights. Rock chips come from the car ahead throwing gravel, so the panels facing the airstream take almost all of it. That is exactly the set of panels a full front PPF package covers, which is why we recommend full front for daily drivers on I-66 and Route 28 rather than partial coverage that stops halfway up the hood." },
  { id: "P2zyuOrWiDA", category: "learn", service: "ppf", title: "Can You Spot the PPF?", blurb: "Two cars, both filmed. A proper install is wrapped under the hood edges and tucked into the bumper, so there is no line to find.", summary: "Two cars, both filmed, and the challenge is to find the film. A proper install wraps the edge of the film under the hood lip and tucks it into the bumper and fender gaps, so there is no visible line, no dirt trap, and no lifted corner. We use computer-cut patterns for the exact year and trim and never cut film on the car. The video also mentions the current special: every full front install includes a ceramic coating at no charge." },
  // ---- Learn ----
  { id: "C3k3BF33d7o", category: "learn", service: "tint", title: "Dyed Factory Tint vs Ceramic Tint", blurb: "What actually separates cheap dyed film from ceramic film: heat rejection, fading, and how long each lasts.", summary: "Factory tint on most SUVs and trucks is dyed glass, which gives privacy but almost no heat rejection. Ceramic film like GeoShield Pro Nano Ceramic blocks infrared heat and 99% of UV, so the cabin stays cooler and the dashboard and leather last longer. Dyed aftermarket film fades and turns purple within a few years; ceramic film holds its color and carries a lifetime warranty. The short explains the difference in heat, fading, and lifespan so you know what you are paying for." },
  { id: "284uuWTiKAg", category: "learn", service: "tint", title: "Is Window Tint More Than Just Looks?", blurb: "UV protection, heat, glare, and privacy broken down in under a minute.", summary: "Window tint is more than a look. In under a minute this short covers the four things ceramic film does for a car in Northern Virginia: it blocks 99% of UV so the interior does not fade and crack, it rejects infrared heat so the AC works less in summer traffic, it cuts glare on the morning commute, and it adds privacy for whatever is on the seats. Each benefit is shown on a real customer car." },
  { id: "FsQ8yZxh4Es", category: "learn", service: "tint", title: "How We Tint a Bronco, Legally", blurb: "Choosing a shade that looks right and still passes Virginia inspection.", summary: "A Ford Bronco gets tinted, and the question is what shade is legal. Virginia allows 50% on the front doors and 35% on the rear side and back glass of a sedan, while SUVs and trucks like the Bronco can go darker behind the front doors. The short shows how we pick a shade that looks right against the Bronco's trim, still passes Virginia inspection, and matches front to back so nothing looks mismatched." },
  { id: "dChKOZmEEEw", category: "learn", service: "tint", title: "Tint Isn't Just for Summer", blurb: "Why winter drivers still get glare relief, UV protection, and privacy from ceramic tint.", summary: "Tint is not a summer-only upgrade. In winter the sun sits lower, so glare on I-66 and the Toll Road is worse at commute time, and the UV that fades a dashboard does not stop in December. Ceramic film cuts both, keeps the cabin more private on dark evenings, and adds a layer that helps hold heat in. This short walks through why winter drivers still get real value from GeoShield ceramic tint." },
  { id: "pxpi-uF0eO0", category: "customers", service: "tint", title: "Light, Medium, or Dark?", blurb: "One shade change, a whole new mood. See the three most common levels side by side.", summary: "Light, medium, or dark: the same car with three shade levels side by side. The short shows what each looks like from outside and from the driver's seat, so you can see how much the cabin darkens before you commit. Most Northern Virginia customers choose a medium shade on the rear glass and the lightest legal film on the front doors. We bring sample cards to every appointment so you can hold them against your own glass." },
  { id: "M-4dznrTTVY", category: "learn", service: "tint", title: "Dark, Clean, and Legal", blurb: "No bubbles, no shortcuts. What a proper tint install looks like up close.", summary: "No bubbles, no shortcuts. This close-up shows what a proper tint install looks like: film cut by computer to the exact window, edges that run to the glass edge without gaps, and a finish with no dust or water pockets. The shade is dark on the rear glass and still legal for Virginia. A good install is the difference between film that looks factory for ten years and film that peels in two." },
  { id: "dI6_E2HSmmE", category: "learn", service: "ppf", title: "Does Tesla Give Away Free PPF Kits?", blurb: "What Tesla owners should know before relying on a factory kit for paint protection.", summary: "Tesla sometimes includes a small paint protection kit at delivery, and owners ask whether that replaces a real install. The short explains what those kits cover, usually a few small pieces for high-wear spots, and why a Model Y or Model 3 driven on Route 28 and the Toll Road still chips on the hood, bumper, and fenders. Full front STEK film, cut for the exact year including the Juniper and Highland refreshes, is what protects the paint Tesla owners actually worry about." },
  { id: "ZvVdjXH06ug", category: "learn", service: "ppf", title: "Even BMW Doesn't Trust BMW Paint", blurb: "Why manufacturers recommend film on the front end, and what a full-front install costs at Skyline.", summary: "BMW's own dealers recommend film on the front end of a new car, and this short explains why: modern water-based paint is thin, the front bumper and hood edge take every stone on the highway, and a chip on a dark BMW shows the gray primer underneath. The video walks through a full front STEK DYNOshield install on a BMW and what the package covers, with a note on what the shop's current special includes." },
  { id: "SugVScEKEWM", category: "customers", service: "tint", title: "Tesla Ceramic Tint: More Shade, Less Heat", blurb: "How ceramic film keeps a glass-roof Tesla cooler without touching signal or range.", summary: "A glass-roof Tesla heats up fast in a Fairfax parking lot. This short shows a ceramic tint install on a Tesla and explains how GeoShield Pro Nano Ceramic film rejects infrared heat so the cabin cools faster and the AC draws less from the battery. Because the film has no metal in it, it does not interfere with the phone key, Supercharger handshake, GPS, or cellular signal the way older metallic films could." },
  { id: "_PCNkjLfG7Y", category: "learn", service: "tint", title: "Smoked Taillight Tint Options", blurb: "Light, medium, and dark smoke finishes, and what stays street-legal.", summary: "Smoked taillights, three ways. The short shows light, medium, and dark smoke finishes applied as a vinyl film over the taillight lens, so the look can be reversed later without touching the lens. It also covers what stays street-legal: the lights still have to be visible and the color still has to read red, so most customers choose the light or medium smoke for a daily driver." },

  // ---- Customer stories ----
  { id: "nrzZ-3V3Rak", category: "customers", title: "What Davinci Said About Us", blurb: "A customer's take on the experience from drop-off to pickup.", summary: "Davinci describes his experience at Skyline Customs from the first call to picking the car up: the walk-around at drop-off, updates during the job, and the inspection before paying. It is a straight customer account of how the shop works, filmed in the bay with his finished car." },
  { id: "GIRnLzO2tMU", category: "customers", title: "Don't Take Our Word for It, Take Ken's", blurb: "Ken on why he chose Skyline and how the finished car turned out.", summary: "Ken explains why he chose Skyline over other shops he quoted in Northern Virginia and what the finished car looked like when he picked it up. He talks about the questions he had going in and how the install turned out, in his own words, standing next to the car." },
  { id: "cZ7Ky48mnss", category: "customers", title: "Christian Came In With a Vision", blurb: "Christian's build, from the idea he walked in with to the finish he drove out with.", summary: "Christian came in with a specific look in mind for his car. This short follows the job from the idea he described at the counter to the finished result he drove out with, and ends with his reaction to the car. A good example of how we plan a build around what the owner actually wants." },
  { id: "kfzGx2IROLg", category: "customers", service: "ppf", title: "John's Full Front PPF + Ceramic Coating", blurb: "John trusted us with his ride: full-front film plus a ceramic coating on top.", summary: "John's car got the package most of our customers choose: full front STEK DYNOshield film on the hood, bumper, fenders, mirrors, and headlights, then a Gtechniq ceramic coating over the film and the rest of the paint. The short shows the finished car and John's take on the result. The coating keeps the film and paint hydrophobic and makes washing a rinse-and-dry job." },

  // ---- Recent work ----
  { id: "DVYvaVEy2-4", category: "work", service: "ppf", title: "Mercedes-AMG G63 PPF", blurb: "Big square panels, zero visible edges.", summary: "A Mercedes-AMG G63 in the bay for paint protection film. The G-Class has big, flat, square panels, so any edge or seam in the film would be easy to spot. The short shows the finished front end with the film wrapped under every edge and no visible lines, which is the standard for every car that leaves the shop." },
  { id: "yFTB2S3bZbw", category: "work", service: "ppf", title: "2026 Honda Civic Type R Full Front", blurb: "Bumper, hood, fenders, mirrors, and headlights protected before the first road trip.", summary: "A 2026 Honda Civic Type R gets full front PPF before its first road trip: front bumper, full hood, both fenders, mirror caps, and headlights in STEK DYNOshield. The Type R's low, wide bumper and the hood vents make the pattern work interesting, and the short shows the car finished and ready to drive." },
  { id: "JCxngvQnTP0", category: "work", service: "tint", title: "Lexus: Window Tint + Ceramic Coating", blurb: "Fresh tint for a smooth private look plus a ceramic coat for the paint.", summary: "A Lexus leaves the shop with two services: ceramic window tint for a smooth, private look and a ceramic coating on the paint for gloss and easy washing. The short shows both, with the tint matched across every window and the coated paint beading water. A common pairing for daily drivers that live outside." },
  { id: "U0hjC5pdMZM", category: "customers", service: "tint", title: "Corvette Stingray Ceramic Tint", blurb: "From showroom clean to street lethal.", summary: "A Corvette Stingray goes from showroom clean to street-ready with ceramic tint on every window. The short shows the shade against the car's color and how the finished tint changes the look of the whole car, while GeoShield ceramic film keeps the cabin cooler on a car with that much glass." },
  { id: "A6AptHNL5kc", category: "customers", service: "tint", title: "Genesis G70 Privacy Tint", blurb: "Privacy on max, comfort on lock.", summary: "A blue Genesis G70 gets privacy tint on the rear glass and side windows. The short shows the finished car and the darker rear shade that most sedan owners choose for privacy and heat, with the front doors kept at a Virginia-legal shade so the car still passes inspection." },
  { id: "tdSO-c8EZS0", category: "customers", service: "tint", title: "Alfa Romeo: Factory Clear to Luxury Dark", blurb: "A clean, even shade across every window.", summary: "An Alfa Romeo goes from factory clear glass to a dark, even tint across every window. The short shows the finished result from several angles, with the shade matched front to back and no visible seams or light gaps at the edges, which is what a computer-cut ceramic tint install should look like." },
];

// Ids not yet in CHANNEL_ORDER are the newest (they are added at the top of VIDEOS), so they lead.
const rank = (id: string) => { const i = CHANNEL_ORDER.indexOf(id); return i === -1 ? VIDEOS.findIndex((v) => v.id === id) - VIDEOS.length : i; };

/** Videos in a category, newest first. */
export const videosByCategory = (category: VideoCategory) =>
  VIDEOS.filter((v) => v.category === category).sort((a, b) => rank(a.id) - rank(b.id));
export const videoThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Upload date + ISO 8601 duration per YouTube id (from the YouTube Data API; scripts/fetch-video-meta.mjs). */
import videoMeta from "./videoMeta.json";
export const videoMetaFor = (id: string): { uploadDate?: string; duration?: string } =>
  (videoMeta as Record<string, { uploadDate: string; duration?: string }>)[id] ?? {};

/** schema.org VideoObject for a YouTube Short. */
export const videoObject = (v: Video) => {
  const m = videoMetaFor(v.id);
  return {
    "@type": "VideoObject",
    "name": v.title,
    "description": v.summary ?? v.blurb,
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
