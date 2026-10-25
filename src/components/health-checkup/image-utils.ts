/**
 * Responsive image helpers for health checkup components.
 *
 * Strategy: keep the canonical CDN URL in `src` (the same URL used in
 * og:image, JSON-LD and the image sitemap, so search engines see one
 * consistent image URL), while `srcSet` offers Next.js-optimised AVIF/WebP
 * renditions for smaller viewports to protect mobile LCP.
 *
 * Widths/qualities must match `images.deviceSizes` / `images.qualities`
 * in next.config.js, otherwise the optimiser rejects the request.
 */

const OPTIMISER_WIDTHS = [384, 640, 828, 1080, 1200] as const;
const QUALITY = 75;

export function optimisedUrl(src: string, width: number, quality: number = QUALITY): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * Builds a srcset with optimiser renditions below the intrinsic width and the
 * original CDN asset as the largest candidate.
 */
export function cdnSrcSet(src: string, intrinsicWidth: number): string {
  const candidates = OPTIMISER_WIDTHS.filter((w) => w < intrinsicWidth).map((w) => `${optimisedUrl(src, w)} ${w}w`);
  candidates.push(`${src} ${intrinsicWidth}w`);
  return candidates.join(', ');
}
