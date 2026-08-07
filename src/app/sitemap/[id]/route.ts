import { NextResponse } from 'next/server';
import { generateUrls, CHUNK_SIZE, getTotalUrlsCount } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const idStr = rawId.replace('.xml', '');
  const id = parseInt(idStr, 10);

  if (isNaN(id) || id < 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Validate chunk exists
  const totalUrls = getTotalUrlsCount();
  const maxChunks = Math.ceil(totalUrls / CHUNK_SIZE);
  if (id >= maxChunks) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const startIndex = id * CHUNK_SIZE;
  const endIndex = startIndex + CHUNK_SIZE;

  // Use array for efficient XML assembly instead of string concatenation
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  let currentIndex = 0;
  for (const url of generateUrls()) {
    if (currentIndex >= endIndex) {
      break;
    }
    if (currentIndex >= startIndex) {
      parts.push(
        `<url><loc>${url.loc}</loc><priority>${url.priority}</priority><lastmod>${url.lastmod}</lastmod></url>`
      );
    }
    currentIndex++;
  }

  parts.push('</urlset>');

  return new NextResponse(parts.join('\n'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Sitemap-Chunk': String(id),
      'X-Sitemap-Urls': String(currentIndex - startIndex),
    },
  });
}
