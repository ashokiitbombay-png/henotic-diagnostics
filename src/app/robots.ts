import { MetadataRoute } from 'next';
import { services } from '@/config/services';

const CHUNK_SIZE = 20;

export default function robots(): MetadataRoute.Robots {
  const totalChunks = Math.ceil(services.length / CHUNK_SIZE);
  const sitemapUrls: string[] = [];

  // Segment 0 = static pages + base services + categories + GMC
  // Segments 1..N = service × region × location combos
  for (let i = 0; i <= totalChunks; i++) {
    sitemapUrls.push(`https://www.henoticdiagnostics.com/sitemap/${i}.xml`);
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrls,
  };
}