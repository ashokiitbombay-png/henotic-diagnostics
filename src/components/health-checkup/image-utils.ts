/**
 * Image URL helpers for health checkup components.
 *
 * `next.config.js` configures `images: { unoptimized: true }` to avoid CPU/RAM
 * spikes on the GCP VM during large Googlebot crawls, which disables the
 * `/_next/image` endpoint (requests return HTTP 404). All CDN WebP images
 * under `https://cdn.henoticdiagnostics.com/` are already pre-optimized, so
 * components serve canonical CDN URLs directly without `/_next/image`.
 */

export function optimisedUrl(src: string, _width?: number): string {
  return src;
}

/**
 * Returns `undefined` so `<img srcSet={...} />` is omitted while Next.js
 * image optimization is disabled (`images.unoptimized = true`).
 */
export function cdnSrcSet(_src: string, _intrinsicWidth?: number): string | undefined {
  return undefined;
}
