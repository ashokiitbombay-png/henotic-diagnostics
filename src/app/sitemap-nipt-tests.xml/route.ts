import { NextResponse } from 'next/server';
import {
  NIPT_HERO_BANNER_IMAGE,
  STATIC_NIPT_PAGES,
  STATIC_NIPT_PANELS,
  orderPanelsForPage,
} from '@/config/nipt-test';

/**
 * Image & Authority Sitemap for the 20 NIPT Prenatal Screening pages.
 *
 * Lists, per canonical URL, the page's primary Google SERP thumbnail image first,
 * followed by the NIPT dark hero banner and the 3 NIPT panel cut-out images.
 */
export const revalidate = 86400;

const BASE_URL = 'https://www.henoticdiagnostics.com';

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ];

  for (const page of STATIC_NIPT_PAGES) {
    const orderedPanels = orderPanelsForPage(STATIC_NIPT_PANELS, page.featuredPanelCodes);
    const images = Array.from(
      new Set([
        page.primaryImage.url,
        NIPT_HERO_BANNER_IMAGE,
        ...orderedPanels.map((p) => p.imageUrl),
      ]),
    );

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
