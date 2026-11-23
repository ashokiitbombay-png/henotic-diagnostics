import { services } from '@/config/services';
import { REGION_LOCATIONS } from '@/config/locations';
import { CITIES } from '@/config/cities';
import { CONDITIONS } from '@/config/conditions';
import { COMPARISONS } from '@/config/comparisons';
import { DOCTORS } from '@/config/doctors';
import { SERVICE_CATEGORIES } from '@/config/categories';
import { GMC_PRODUCTS } from '@/config/gmc-products';
import { STATIC_BLOG_ARTICLES } from '@/config/blog-articles';
import {
  BASE_URL,
  DEPRECATED_REGIONS,
  DUPLICATE_RAIGAD_LOCATIONS,
  SITEMAP_LASTMOD,
  getL1IndexingDirective,
  getL2IndexingDirective,
  getL3IndexingDirective,
} from '@/lib/seo/indexing-policy';

export const CHUNK_SIZE = 10000;
export { BASE_URL };

const topServices = new Set([
  'mri-scan',
  'ct-scan',
  'pet-ct',
  'ultrasound',
  'blood-test',
  '2d-echo',
  'full-body-check-up',
  'mammography',
  'pregnancy-sonography',
  'dexa-bone-scan',
  'ecg',
  'hrct-chest',
  'whole-body-pet-ct',
  'nipt-test',
]);

// Legal & informational pages that should be in the sitemap (canonical routes only)
const STATIC_PAGES = [
  { path: '/leadership', priority: '0.5' },
  { path: '/pricing', priority: '0.6' },
  { path: '/video/corporate-overview', priority: '0.5' },
  { path: '/cancellation-policy', priority: '0.3' },
  { path: '/delivery-policy', priority: '0.3' },
  { path: '/grievance-policy', priority: '0.3' },
  { path: '/medical-disclaimer', priority: '0.3' },
  { path: '/privacy', priority: '0.3' },
  { path: '/refund-policy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
];

export type SitemapUrl = { loc: string; priority: string; lastmod: string };

export function* generateUrls(): Generator<SitemapUrl> {
  const lastmod = SITEMAP_LASTMOD;

  yield { loc: `${BASE_URL}/`, priority: '1.0', lastmod };
  yield { loc: `${BASE_URL}/services`, priority: '0.9', lastmod };
  yield { loc: `${BASE_URL}/locations`, priority: '0.9', lastmod };
  yield { loc: `${BASE_URL}/city`, priority: '0.85', lastmod };
  yield { loc: `${BASE_URL}/compare`, priority: '0.85', lastmod };
  yield { loc: `${BASE_URL}/doctors`, priority: '0.8', lastmod };
  yield { loc: `${BASE_URL}/conditions`, priority: '0.8', lastmod };
  yield { loc: `${BASE_URL}/blog`, priority: '0.8', lastmod };
  yield { loc: `${BASE_URL}/about-us`, priority: '0.5', lastmod };
  yield { loc: `${BASE_URL}/contact`, priority: '0.5', lastmod };
  yield { loc: `${BASE_URL}/gallery`, priority: '0.5', lastmod };

  for (const page of STATIC_PAGES) {
    yield { loc: `${BASE_URL}${page.path}`, priority: page.priority, lastmod };
  }

  for (const product of GMC_PRODUCTS) {
    yield { loc: `${BASE_URL}/gmc/${product.slug}`, priority: '0.7', lastmod };
  }

  for (const service of services) {
    if (!getL1IndexingDirective(service).includeInSitemap) continue;
    const priority = topServices.has(service) ? '0.85' : '0.7';
    yield { loc: `${BASE_URL}/services/${service}`, priority, lastmod };

    for (const region of Object.keys(REGION_LOCATIONS)) {
      if (DEPRECATED_REGIONS.has(region)) continue;

      if (getL2IndexingDirective(service, region).includeInSitemap) {
        yield { loc: `${BASE_URL}/services/${service}/${region}`, priority: '0.75', lastmod };
      }

      for (const location of REGION_LOCATIONS[region]) {
        if (region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(location)) continue;
        const l3 = getL3IndexingDirective(service, region, location);
        if (!l3.includeInSitemap) continue;
        const locPriority = l3.tier === '1A' ? '0.7' : l3.tier === '1B' ? '0.65' : '0.6';
        yield { loc: l3.canonicalUrl, priority: locPriority, lastmod };
      }
    }
  }

  for (const city of CITIES) {
    yield { loc: `${BASE_URL}/city/${city.slug}`, priority: '0.8', lastmod };
  }

  for (const condition of CONDITIONS) {
    yield { loc: `${BASE_URL}/conditions/${condition.id}`, priority: '0.75', lastmod };
  }

  for (const comp of COMPARISONS) {
    yield { loc: `${BASE_URL}/compare/${comp.slug}`, priority: '0.75', lastmod };
  }

  for (const doc of DOCTORS) {
    yield { loc: `${BASE_URL}/doctors/${doc.id}`, priority: '0.75', lastmod };
  }

  for (const cat of SERVICE_CATEGORIES) {
    yield { loc: `${BASE_URL}/services/category/${cat.id}`, priority: '0.8', lastmod };
  }

  for (const article of STATIC_BLOG_ARTICLES) {
    yield { loc: `${BASE_URL}/blog/${article.slug}`, priority: '0.75', lastmod };
  }
}

export function getTotalUrlsCount(): number {
  let count = 0;
  for (const _url of generateUrls()) {
    count++;
  }
  return count;
}
