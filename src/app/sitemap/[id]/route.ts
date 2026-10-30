import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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

  // 1. Check if pre-generated static file exists in public/sitemaps/
  // Supports both 0-indexed and 1-indexed requests
  const candidateFilenames = [
    `sitemap-${id}.xml`,
    `sitemap-${id + 1}.xml`,
    `sitemap${id}.xml`,
  ];

  for (const filename of candidateFilenames) {
    const staticFilePath = path.join(process.cwd(), 'public', 'sitemaps', filename);
    if (fs.existsSync(staticFilePath)) {
      try {
        const xml = fs.readFileSync(staticFilePath, 'utf8');
        return new NextResponse(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            'X-Sitemap-Source': 'static-disk',
            'X-Sitemap-File': filename,
          },
        });
      } catch (err) {
        console.warn(`[sitemap/[id]] Failed reading ${filename}:`, err);
      }
    }
  }

  // 2. Validate chunk exists dynamically
  const totalUrls = getTotalUrlsCount();
  const maxChunks = Math.ceil(totalUrls / CHUNK_SIZE);
  if (id >= maxChunks) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const startIndex = id * CHUNK_SIZE;
  const endIndex = startIndex + CHUNK_SIZE;

  // Use array for efficient XML assembly
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
      'X-Sitemap-Source': 'dynamic-stream',
      'X-Sitemap-Chunk': String(id),
      'X-Sitemap-Urls': String(currentIndex - startIndex),
    },
  });
}
