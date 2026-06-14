import { MetadataRoute } from 'next';

// This dynamic sitemap forces Google to crawl your programmatic SEO pages
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.henoticdiagnostics.com';

  // Core Pages
  const routes = [
    '',
    '/about-us',
    '/contact',
    '/services',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Map high-priority service categories manually to ensure Google prioritizes them
  const majorServices = [
    '/services/mri-scan',
    '/services/ct-scan',
    '/services/pet-scan',
    '/services/nt-scan',
    '/services/ultrasound',
    '/services/blood-test'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // You can expand this array or map it from your LOCATIONS/SERVICES constants
  const regionalHubs = [
    '/services/mri-scan/navi-mumbai/kharghar',
    '/services/ct-scan/navi-mumbai/kharghar',
    '/services/nt-scan/navi-mumbai/kharghar',
    '/services/ultrasound/navi-mumbai/kharghar',
    '/services/blood-test/navi-mumbai/kharghar'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...majorServices, ...regionalHubs];
}