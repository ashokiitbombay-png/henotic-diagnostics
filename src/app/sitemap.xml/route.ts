import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTotalUrlsCount, CHUNK_SIZE, BASE_URL } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Check if pre-generated master sitemap.xml exists in public/
  const staticPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(staticPath)) {
    try {
      const xml = fs.readFileSync(staticPath, 'utf8');
      return new NextResponse(xml, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    } catch (e) {
      console.warn('[sitemap.xml] Error reading static master sitemap, falling back to dynamic:', e);
    }
  }

  // 2. Fallback dynamic sitemap index generation
  const totalUrls = getTotalUrlsCount();
  const chunkCount = Math.ceil(totalUrls / CHUNK_SIZE);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (let i = 0; i < chunkCount; i++) {
    xml += `
  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
  </sitemap>`;
  }

  xml += `
  <sitemap>
    <loc>${BASE_URL}/sitemap-health-checkups.xml</loc>
  </sitemap>`;

  xml += `
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
