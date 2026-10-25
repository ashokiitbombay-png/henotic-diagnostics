import { NextResponse } from 'next/server';
import { STATIC_HEALTH_CHECKUP_PAGES, STATIC_HEALTH_PACKAGES, orderPackagesForPage } from '@/config/health-checkup';

/**
 * Image sitemap for the 26 health checkup authority pages.
 *
 * Lists, per canonical URL, the page's primary image first followed by the
 * featured package images rendered on that page. Uses the static config
 * (the canonical image set); Payload overrides of images should keep the
 * same CDN host so these URLs remain valid.
 *
 * Spec: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */

export const revalidate = 86400;

const BASE_URL = 'https://www.henoticdiagnostics.com';

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ];

  for (const page of STATIC_HEALTH_CHECKUP_PAGES) {
    const featured = orderPackagesForPage(STATIC_HEALTH_PACKAGES, page.featuredPackageCodes).slice(0, page.featuredPackageCodes.length);
    const images = Array.from(new Set([page.primaryImage.url, ...featured.map((p) => p.imageUrl)]));

    parts.push('<url>');
    parts.push(`<loc>${BASE_URL}/services/${page.slug}</loc>`);
    parts.push(`<lastmod>${page.lastReviewed}</lastmod>`);
    for (const src of images) {
      parts.push(`<image:image><image:loc>${xmlEscape(src)}</image:loc></image:image>`);
    }
    parts.push('</url>');
  }

  parts.push('</urlset>');

  return new NextResponse(parts.join('\n'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
