import { services } from '@/config/services';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const CHUNK_SIZE = 20;
const baseUrl = 'https://www.henoticdiagnostics.com';

/**
 * Sitemap Index endpoint — rewrites from /sitemap.xml via next.config.js
 * Lists all child sitemap segments for Google/Bing crawlers.
 */
export async function GET(_request: NextRequest) {
  const totalChunks = Math.ceil(services.length / CHUNK_SIZE);
  const lastMod = new Date().toISOString().split('T')[0];

  const sitemaps = Array.from({ length: totalChunks + 1 }, (_, i) =>
    `  <sitemap>
    <loc>${baseUrl}/sitemap/${i}.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
