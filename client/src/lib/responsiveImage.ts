/**
 * srcset/sizes for gallery photos that have WebP variants (generated into
 * /images/w by scripts, listed in shared/imageVariants.json). Photos without
 * variants (new bot uploads) fall back to the plain JPEG.
 */
import manifest from "@shared/imageVariants.json";
import webpManifest from "@shared/webpVariants.json";

type Variant = { width: number; height: number; widths: number[] };
const VARIANTS = manifest as Record<string, Variant>;
/** Site WebP photos (service cards, package tiles) resized into /images/w as well. */
const WEBP_VARIANTS = webpManifest as Record<string, Variant>;

function lookup(photoUrl: string): { name: string; v: Variant } | undefined {
  const jpg = photoUrl.match(/^\/images\/([^/]+)\.jpe?g$/i);
  if (jpg && VARIANTS[jpg[1]]) return { name: jpg[1], v: VARIANTS[jpg[1]] };
  const webp = photoUrl.match(/^\/images\/([^/]+)\.webp$/i);
  if (webp && WEBP_VARIANTS[webp[1]]) return { name: webp[1], v: WEBP_VARIANTS[webp[1]] };
  return undefined;
}

export function responsiveImage(photoUrl: string): { srcSet?: string; width?: number; height?: number } {
  const hit = lookup(photoUrl);
  if (!hit) return {};
  return { srcSet: hit.v.widths.map((w) => `/images/w/${hit.name}-${w}.webp ${w}w`).join(", "), width: hit.v.width, height: hit.v.height };
}

/** Largest WebP variant at or above the given width, for preloads and og:image. */
export function variantUrl(photoUrl: string, minWidth: number): string | undefined {
  const hit = lookup(photoUrl);
  if (!hit) return undefined;
  const w = hit.v.widths.find((x) => x >= minWidth) ?? hit.v.widths[hit.v.widths.length - 1];
  return `/images/w/${hit.name}-${w}.webp`;
}
