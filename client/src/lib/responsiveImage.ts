/**
 * srcset/sizes for gallery photos that have WebP variants (generated into
 * /images/w by scripts, listed in shared/imageVariants.json). Photos without
 * variants (new bot uploads) fall back to the plain JPEG.
 */
import manifest from "@shared/imageVariants.json";

const VARIANTS = manifest as Record<string, { width: number; height: number; widths: number[] }>;

export function responsiveImage(photoUrl: string): { srcSet?: string; width?: number; height?: number } {
  const m = photoUrl.match(/^\/images\/([^/]+)\.jpe?g$/i);
  const v = m ? VARIANTS[m[1]] : undefined;
  if (!v) return {};
  return { srcSet: v.widths.map((w) => `/images/w/${m![1]}-${w}.webp ${w}w`).join(", "), width: v.width, height: v.height };
}

/** Largest WebP variant at or above the given width, for preloads and og:image. */
export function variantUrl(photoUrl: string, minWidth: number): string | undefined {
  const m = photoUrl.match(/^\/images\/([^/]+)\.jpe?g$/i);
  const v = m ? VARIANTS[m[1]] : undefined;
  if (!v) return undefined;
  const w = v.widths.find((x) => x >= minWidth) ?? v.widths[v.widths.length - 1];
  return `/images/w/${m![1]}-${w}.webp`;
}
