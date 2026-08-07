import { NextResponse } from 'next/server';
import { getTotalUrlsCount, CHUNK_SIZE, BASE_URL } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET() {
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
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
