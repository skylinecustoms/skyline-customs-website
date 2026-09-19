/**
 * Video sitemap (https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps)
 * for the YouTube Shorts embedded on the site. Instagram reels are left out because
 * their media URLs expire.
 */
import { VIDEOS, videoThumb, videoMetaFor } from "../../client/src/lib/videos";

const BASE_URL = "https://www.skylinecustomshop.com";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isoToSeconds = (iso?: string) => {
  const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  return m ? (+(m[1] ?? 0)) * 3600 + (+(m[2] ?? 0)) * 60 + (+(m[3] ?? 0)) : undefined;
};

export function buildVideoSitemap(): string {
  const pages: { path: string; videos: typeof VIDEOS }[] = [
    { path: "/videos", videos: VIDEOS },
    { path: "/services/ppf", videos: VIDEOS.filter((v) => v.service === "ppf") },
    { path: "/services/window-tinting", videos: VIDEOS.filter((v) => v.service === "tint") },
  ];
  const urls = pages
    .filter((p) => p.videos.length > 0)
    .map((p) => {
      const entries = p.videos.map((v) => {
        const m = videoMetaFor(v.id);
        const secs = isoToSeconds(m.duration);
        return `    <video:video>
      <video:thumbnail_loc>${esc(videoThumb(v.id))}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.blurb)}</video:description>
      <video:player_loc>${esc(`https://www.youtube.com/embed/${v.id}`)}</video:player_loc>${secs ? `\n      <video:duration>${secs}</video:duration>` : ""}${m.uploadDate ? `\n      <video:publication_date>${m.uploadDate}</video:publication_date>` : ""}
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`;
      }).join("\n");
      return `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n${entries}\n  </url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls.join("\n")}\n</urlset>\n`;
}
