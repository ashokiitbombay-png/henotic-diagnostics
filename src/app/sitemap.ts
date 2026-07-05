import { MetadataRoute } from 'next';
import { services } from '@/config/services';
import { REGION_LOCATIONS } from '@/config/locations';
import { CITIES } from '@/config/cities';

const baseUrl = 'https://www.henoticdiagnostics.com';
const CHUNK_SIZE = 20;

/**
 * Next.js App Router dynamic sitemap segmentation.
 * Enhanced with priority tuning for PSEO pages.
 * Includes: /conditions, /doctors, /blog, /services/category, /gmc, /city routes.
 */
export async function generateSitemaps() {
  const totalChunks = Math.ceil(services.length / CHUNK_SIZE);
  // id 0 = core static + new section pages
  // id 1..N = chunked service/region/location combos
  const sitemaps = [{ id: 0 }];
  for (let i = 1; i <= totalChunks; i++) {
    sitemaps.push({ id: i });
  }
  return sitemaps;
}

/**
 * Next.js 16 BREAKING CHANGE: `id` is now a Promise<string> (was number).
 * Must await the id and convert to number.
 */
export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Sitemap ID 0: Core Static Pages + New Section Pages
  if (id === 0) {
    const staticRoutes = [
      '',
      '/about-us',
      '/contact',
      '/services',
      '/doctors',
      '/conditions',
      '/blog',
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
      priority: route === '' ? 1.0 : 
               ['/services', '/doctors', '/conditions'].includes(route) ? 0.9 : 0.7,
    }));

    // Base service pages
    const baseServiceRoutes = services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

    // Category hub pages
    const categoryIds = [
      'diagnostic-center', 'pathology', 'ultrasound', 'pregnancy',
      'doppler', 'womens-health', 'mri', 'ct-scan', 'pet-ct',
      'bone-health', 'cardiology', 'liver', 'genetics'
    ];
    const categoryRoutes = categoryIds.map((cat) => ({
      url: `${baseUrl}/services/category/${cat}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // GMC product landing pages
    const gmcSlugs = [
      'mri-brain-plain', 'ct-brain-plain', 'pet-ct-whole-body',
      'cbc-test', 'hba1c-test', 'crp-test', 'digital-mammography',
      'bmd-dexa-scan', 'nt-scan', 'anomaly-scan', 'abdomen-ultrasound',
      'fetal-2d-echo', '2d-echo-test'
    ];
    const gmcRoutes = gmcSlugs.map((slug) => ({
      url: `${baseUrl}/gmc/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // City hub pages
    const cityListingRoute = [{
      url: `${baseUrl}/city`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }];
    const cityRoutes = CITIES.map((city) => ({
      url: `${baseUrl}/city/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

    return [...staticRoutes, ...baseServiceRoutes, ...categoryRoutes, ...gmcRoutes, ...cityListingRoute, ...cityRoutes];
  }

  // 2. Sitemap ID >= 1: Segmented chunks of regional/location combinations
  const chunkIndex = id - 1;
  const chunkServices = services.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  // Top services get higher priority
  const topServices = new Set([
    'mri-scan', 'ct-scan', 'pet-scan', 'ultrasound', 'blood-test',
    '2d-echo', 'full-body-check-up', 'mammography', 'pregnancy-sonography',
    'dexa-bone-scan', 'ecg', 'hrct-scan', 'whole-body-pet-ct'
  ]);

  chunkServices.forEach((service) => {
    const isTopService = topServices.has(service);
    
    Object.entries(REGION_LOCATIONS).forEach(([region, locations]) => {
      // Regional Hub page
      dynamicRoutes.push({
        url: `${baseUrl}/services/${service}/${region}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: isTopService ? 0.8 : 0.7,
      });

      // City-specific location pages
      locations.forEach((location) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service}/${region}/${location}`,
          lastModified: currentDate,
          changeFrequency: 'monthly' as const,
          priority: isTopService ? 0.7 : 0.5,
        });
      });
    });
  });

  return dynamicRoutes;
}