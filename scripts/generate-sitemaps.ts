import fs from 'fs';
import path from 'path';
import { services } from '../src/config/services';
import { REGION_LOCATIONS } from '../src/config/locations';
import { CITIES } from '../src/config/cities';
import { COMPARISONS } from '../src/config/comparisons';
import { CONDITIONS } from '../src/config/conditions';
import { DOCTORS } from '../src/config/doctors';
import { SERVICE_CATEGORIES } from '../src/config/categories';
import { GMC_PRODUCTS } from '../src/config/gmc-products';
import { STATIC_BLOG_ARTICLES } from '../src/config/blog-articles';
import {
  BASE_URL,
  DEPRECATED_REGIONS,
  DUPLICATE_RAIGAD_LOCATIONS,
  SITEMAP_LASTMOD,
  getL1IndexingDirective,
  getL2IndexingDirective,
  getL3IndexingDirective,
} from '../src/lib/seo/indexing-policy';

const CHUNK_SIZE = 10000;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAPS_DIR = path.join(PUBLIC_DIR, 'sitemaps');

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const TOP_SERVICES = new Set([
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

async function writeChunkFile(filePath: string, urls: SitemapUrl[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, { encoding: 'utf8' });
    stream.on('error', reject);
    stream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    stream.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

    let i = 0;
    function writeNext() {
      let ok = true;
      while (i < urls.length && ok) {
        const urlObj = urls[i];
        let entry = `  <url>\n    <loc>${urlObj.loc}</loc>\n    <lastmod>${urlObj.lastmod}</lastmod>\n`;
        if (urlObj.changefreq) {
          entry += `    <changefreq>${urlObj.changefreq}</changefreq>\n`;
        }
        if (urlObj.priority !== undefined) {
          entry += `    <priority>${urlObj.priority.toFixed(2)}</priority>\n`;
        }
        entry += `  </url>\n`;

        i++;
        if (i === urls.length) {
          stream.write(entry + '</urlset>\n', () => resolve());
          return;
        }
        ok = stream.write(entry);
      }

      if (i < urls.length) {
        stream.once('drain', writeNext);
      }
    }

    writeNext();
  });
}

async function writeSitemapIndex(
  filePath: string,
  chunkFilenames: string[],
  lastmod: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, { encoding: 'utf8' });
    stream.on('error', reject);

    stream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    stream.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

    for (const file of chunkFilenames) {
      stream.write(
        `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/${file}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`
      );
    }

    stream.write(
      `  <sitemap>\n    <loc>${BASE_URL}/sitemap-health-checkups.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`
    );
    stream.write(
      `  <sitemap>\n    <loc>${BASE_URL}/sitemap-nipt-tests.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`
    );

    stream.write('</sitemapindex>\n', () => resolve());
  });
}

async function writeTierChunks(
  prefix: string,
  urls: SitemapUrl[],
  writtenFiles: string[]
): Promise<void> {
  if (urls.length === 0) return;
  if (urls.length <= CHUNK_SIZE) {
    const filename = `${prefix}.xml`;
    await writeChunkFile(path.join(SITEMAPS_DIR, filename), urls);
    console.log(`  [ok] ${filename} (${urls.length.toLocaleString()} URLs)`);
    writtenFiles.push(filename);
    return;
  }

  let part = 1;
  for (let offset = 0; offset < urls.length; offset += CHUNK_SIZE) {
    const slice = urls.slice(offset, offset + CHUNK_SIZE);
    const filename = `${prefix}-${part}.xml`;
    await writeChunkFile(path.join(SITEMAPS_DIR, filename), slice);
    console.log(`  [ok] ${filename} (${slice.length.toLocaleString()} URLs)`);
    writtenFiles.push(filename);
    part++;
  }
}

function collectTieredUrls(lastmod: string) {
  const coreUrls: SitemapUrl[] = [];
  const hubUrls: SitemapUrl[] = [];
  const tier1aUrls: SitemapUrl[] = [];
  const tier1bUrls: SitemapUrl[] = [];
  const tier2Urls: SitemapUrl[] = [];

  // 1. Core Static Pages (canonical indexable routes only)
  const staticRoutes = [
    '',
    '/services',
    '/locations',
    '/pricing',
    '/city',
    '/doctors',
    '/conditions',
    '/compare',
    '/blog',
    '/about-us',
    '/contact',
    '/gallery',
    '/leadership',
    '/video/corporate-overview',
    '/privacy',
    '/terms',
    '/cancellation-policy',
    '/delivery-policy',
    '/grievance-policy',
    '/medical-disclaimer',
    '/refund-policy',
  ];

  for (const route of staticRoutes) {
    coreUrls.push({
      loc: `${BASE_URL}${route || '/'}`,
      lastmod,
      changefreq: 'weekly',
      priority:
        route === ''
          ? 1.0
          : ['/services', '/locations', '/city'].includes(route)
            ? 0.9
            : 0.7,
    });
  }

  // 2. Canonical / Live L1 Service Pages
  for (const service of services) {
    const l1 = getL1IndexingDirective(service);
    if (!l1.includeInSitemap) continue;
    coreUrls.push({
      loc: l1.canonicalUrl,
      lastmod,
      changefreq: 'weekly',
      priority: TOP_SERVICES.has(service) ? 0.9 : 0.85,
    });
  }

  // 3. Service Categories
  for (const category of SERVICE_CATEGORIES) {
    coreUrls.push({
      loc: `${BASE_URL}/services/category/${category.id}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  // 4. Static Clinical Blog Articles
  for (const article of STATIC_BLOG_ARTICLES) {
    coreUrls.push({
      loc: `${BASE_URL}/blog/${article.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.75,
    });
  }

  // 5. GMC Products
  for (const product of GMC_PRODUCTS) {
    coreUrls.push({
      loc: `${BASE_URL}/gmc/${product.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  // 6. City Hubs
  for (const city of CITIES) {
    coreUrls.push({
      loc: `${BASE_URL}/city/${city.slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.85,
    });
  }

  // 7. Comparisons, Conditions & Doctors
  for (const comp of COMPARISONS) {
    coreUrls.push({
      loc: `${BASE_URL}/compare/${comp.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.75,
    });
  }
  for (const cond of CONDITIONS) {
    coreUrls.push({
      loc: `${BASE_URL}/conditions/${cond.id}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.75,
    });
  }
  for (const doc of DOCTORS) {
    coreUrls.push({
      loc: `${BASE_URL}/doctors/${doc.id}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.75,
    });
  }

  // 8. Regional L2 Hubs & Tiered L3 Pages (ONLY 200 OK, self-canonical, indexable URLs)
  for (const service of services) {
    const isTopService = TOP_SERVICES.has(service);

    for (const [region, locationsList] of Object.entries(REGION_LOCATIONS)) {
      if (DEPRECATED_REGIONS.has(region)) continue;

      const l2 = getL2IndexingDirective(service, region);
      if (l2.includeInSitemap) {
        hubUrls.push({
          loc: l2.canonicalUrl,
          lastmod,
          changefreq: 'weekly',
          priority: isTopService ? 0.85 : 0.75,
        });
      }

      for (const location of locationsList) {
        if (region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(location)) continue;

        const l3 = getL3IndexingDirective(service, region, location);
        if (!l3.includeInSitemap) continue;

        const entry: SitemapUrl = {
          loc: l3.canonicalUrl,
          lastmod,
          changefreq: 'monthly',
          priority: l3.tier === '1A' ? (isTopService ? 0.8 : 0.7) : l3.tier === '1B' ? 0.65 : 0.6,
        };

        if (l3.tier === '1A') tier1aUrls.push(entry);
        else if (l3.tier === '1B') tier1bUrls.push(entry);
        else if (l3.tier === '2') tier2Urls.push(entry);
      }
    }
  }

  return { coreUrls, hubUrls, tier1aUrls, tier1bUrls, tier2Urls };
}

async function main() {
  console.log('Starting tiered sitemap generation...');
  const startTime = Date.now();
  const lastmod = SITEMAP_LASTMOD;

  if (!fs.existsSync(SITEMAPS_DIR)) {
    fs.mkdirSync(SITEMAPS_DIR, { recursive: true });
  } else {
    // Clean stale sitemap chunks (e.g. old sitemap-1..14.xml) so index & disk stay 1:1
    for (const file of fs.readdirSync(SITEMAPS_DIR)) {
      if (file.endsWith('.xml')) {
        fs.unlinkSync(path.join(SITEMAPS_DIR, file));
      }
    }
  }

  const { coreUrls, hubUrls, tier1aUrls, tier1bUrls, tier2Urls } = collectTieredUrls(lastmod);
  const writtenFiles: string[] = [];

  await writeTierChunks('sitemap-core', coreUrls, writtenFiles);
  await writeTierChunks('sitemap-hubs', hubUrls, writtenFiles);
  await writeTierChunks('sitemap-tier1a', tier1aUrls, writtenFiles);
  await writeTierChunks('sitemap-tier1b', tier1bUrls, writtenFiles);
  await writeTierChunks('sitemap-tier2', tier2Urls, writtenFiles);

  const masterIndexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  await writeSitemapIndex(masterIndexPath, writtenFiles, lastmod);

  const totalUrls =
    coreUrls.length + hubUrls.length + tier1aUrls.length + tier1bUrls.length + tier2Urls.length;
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Master sitemap.xml updated (${writtenFiles.length} tiered files + 2 authority sitemaps).`);
  console.log(
    `Totals: core=${coreUrls.length}, hubs=${hubUrls.length}, tier1a=${tier1aUrls.length}, tier1b=${tier1bUrls.length}, tier2=${tier2Urls.length}, TOTAL=${totalUrls.toLocaleString()} in ${duration}s`
  );
}

main().catch((err) => {
  console.error('Error generating sitemaps:', err);
  process.exit(1);
});
