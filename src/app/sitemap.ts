import { MetadataRoute } from 'next';
import { services } from '@/lib/constants/services';
import { REGION_LOCATIONS } from '@/lib/constants/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  // Enforcing strict canonical URL matching the layout.tsx metadataBase
  const baseUrl = 'https://www.henoticdiagnostics.com';

  // 1. Core Static Pages
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
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Generate Dynamic Combinations (Pyramid Structure)
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  services.forEach((service) => {
    // A. Top Level Service Hubs (Priority: 0.9)
    dynamicRoutes.push({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    });

    Object.entries(REGION_LOCATIONS).forEach(([region, locations]) => {
      // B. Mid Level Regional Hubs (Priority: 0.8)
      dynamicRoutes.push({
        url: `${baseUrl}/services/${service}/${region}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });

      // C. Deep Local Hubs (Priority: 0.6)
      locations.forEach((location) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service}/${region}/${location}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        });
      });
    });
  });

  // Return the master array combining static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}