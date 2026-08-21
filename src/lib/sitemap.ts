import { services } from '@/config/services';
import { REGION_LOCATIONS } from '@/config/locations';
import { CITIES } from '@/config/cities';
import { CONDITIONS } from '@/config/conditions';
import { COMPARISONS } from '@/config/comparisons';
import { DOCTORS } from '@/config/doctors';
import { SERVICE_CATEGORIES } from '@/config/categories';
import { GMC_PRODUCTS } from '@/config/gmc-products';

export const CHUNK_SIZE = 40000;
export const BASE_URL = 'https://www.henoticdiagnostics.com';

const topServices = new Set([
  'mri-scan', 'ct-scan', 'pet-scan', 'ultrasound', 'blood-test', 
  '2d-echo', 'full-body-check-up', 'mammography', 'pregnancy-sonography', 
  'dexa-bone-scan', 'ecg', 'hrct-scan', 'whole-body-pet-ct'
]);

// Legal & informational pages that should be in the sitemap
const STATIC_PAGES = [
  { path: '/leadership', priority: '0.5' },
  { path: '/pricing', priority: '0.6' },
  { path: '/video/corporate-overview', priority: '0.5' },
  { path: '/cancellation-policy', priority: '0.3' },
  { path: '/delivery-policy', priority: '0.3' },
  { path: '/disclaimers', priority: '0.3' },
  { path: '/grievance-policy', priority: '0.3' },
  { path: '/medical-disclaimer', priority: '0.3' },
  { path: '/privacy', priority: '0.3' },
  { path: '/refund-policy', priority: '0.3' },
  { path: '/refund-returns', priority: '0.3' },
  { path: '/return-policy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
];

export function getTotalUrlsCount(): number {
  let count = 7; // Home, services, blog, about-us, contact, gallery, reports
  count += STATIC_PAGES.length;
  count += GMC_PRODUCTS.length;
  count += services.length;
  count += services.length * Object.keys(REGION_LOCATIONS).length;
  
  let totalLocations = 0;
  for (const region in REGION_LOCATIONS) {
    totalLocations += REGION_LOCATIONS[region].length;
  }
  count += services.length * totalLocations;
  count += CITIES.length;
  count += CONDITIONS.length;
  count += COMPARISONS.length;
  count += DOCTORS.length;
  count += SERVICE_CATEGORIES.length;
  
  return count;
}

export type SitemapUrl = { loc: string; priority: string; lastmod: string };

export function* generateUrls(): Generator<SitemapUrl> {
  const now = new Date().toISOString().split('T')[0];
  
  yield { loc: `${BASE_URL}/`, priority: '1.0', lastmod: now };
  yield { loc: `${BASE_URL}/services`, priority: '0.9', lastmod: now };
  yield { loc: `${BASE_URL}/blog`, priority: '0.8', lastmod: now };
  yield { loc: `${BASE_URL}/about-us`, priority: '0.5', lastmod: now };
  yield { loc: `${BASE_URL}/contact`, priority: '0.5', lastmod: now };
  yield { loc: `${BASE_URL}/gallery`, priority: '0.5', lastmod: now };
  yield { loc: `${BASE_URL}/reports`, priority: '0.5', lastmod: now };

  // Static pages (legal, informational)
  for (const page of STATIC_PAGES) {
    yield { loc: `${BASE_URL}${page.path}`, priority: page.priority, lastmod: now };
  }

  // GMC product pages
  for (const product of GMC_PRODUCTS) {
    yield { loc: `${BASE_URL}/gmc/${product.slug}`, priority: '0.7', lastmod: now };
  }

  for (const service of services) {
    const priority = topServices.has(service) ? '0.85' : '0.7';
    yield { loc: `${BASE_URL}/services/${service}`, priority, lastmod: now };
    
    for (const region of Object.keys(REGION_LOCATIONS)) {
      yield { loc: `${BASE_URL}/services/${service}/${region}`, priority: '0.65', lastmod: now };
      
      for (const location of REGION_LOCATIONS[region]) {
        yield { loc: `${BASE_URL}/services/${service}/${region}/${location}`, priority: '0.5', lastmod: now };
      }
    }
  }

  for (const city of CITIES) {
    yield { loc: `${BASE_URL}/city/${city.slug}`, priority: '0.8', lastmod: now };
  }

  for (const condition of CONDITIONS) {
    yield { loc: `${BASE_URL}/conditions/${condition.id}`, priority: '0.7', lastmod: now };
  }

  for (const comp of COMPARISONS) {
    yield { loc: `${BASE_URL}/compare/${comp.slug}`, priority: '0.6', lastmod: now };
  }

  for (const doc of DOCTORS) {
    yield { loc: `${BASE_URL}/doctors/${doc.id}`, priority: '0.7', lastmod: now };
  }

  for (const cat of SERVICE_CATEGORIES) {
    yield { loc: `${BASE_URL}/services/category/${cat.id}`, priority: '0.7', lastmod: now };
  }
}
