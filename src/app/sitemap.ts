import { MetadataRoute } from 'next';
import { services } from '@/config/services';
import { REGION_LOCATIONS } from '@/config/locations';

const baseUrl = 'https://www.henoticdiagnostics.com';
const CHUNK_SIZE = 20;

/**
 * Next.js App Router dynamic sitemap segmentation.
 * Generates sitemap IDs so the framework serves a sitemap index listing each sub-sitemap.
 */
export async function generateSitemaps() {
  const totalChunks = Math.ceil(services.length / CHUNK_SIZE);
  // id 0 is reserved for core static routes & top base services
  const sitemaps = [{ id: 0 }];
  for (let i = 1; i <= totalChunks; i++) {
    sitemaps.push({ id: i });
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Sitemap ID 0: Core Static Pages and base Service Pages
  if (id === 0) {
    const staticRoutes = [
      '',
      '/about-us',
      '/contact',
      '/services',
      '/privacy',
      '/terms',
      '/cancellation-policy',
      '/delivery-policy',
      '/disclaimers',
      '/grievance-policy',
      '/medical-disclaimer',
      '/refund-returns',
      '/refund-policy',
      '/return-policy'
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }));

    const baseServiceRoutes = services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...baseServiceRoutes];
  }

  // 2. Sitemap ID >= 1: Segmented chunks of regional/location combinations
  const chunkIndex = id - 1;
  const chunkServices = services.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  chunkServices.forEach((service) => {
    Object.entries(REGION_LOCATIONS).forEach(([region, locations]) => {
      // Regional Hub page
      dynamicRoutes.push({
        url: `${baseUrl}/services/${service}/${region}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });

      // City-specific location page
      locations.forEach((location) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service}/${region}/${location}`,
          lastModified: currentDate,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        });
      });
    });
  });

  return dynamicRoutes;
}