import fs from 'fs';
import path from 'path';
import { services } from '../src/config/services';
import { REGION_LOCATIONS } from '../src/config/locations';
import { CITIES } from '../src/config/cities';
import { COMPARISONS } from '../src/config/comparisons';
import { CONDITIONS } from '../src/config/conditions';
import { DOCTORS } from '../src/config/doctors';
import { SERVICE_CATEGORIES } from '../src/config/categories';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const CHUNK_SIZE = 10000;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAPS_DIR = path.join(PUBLIC_DIR, 'sitemaps');

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Top high-priority services
const TOP_SERVICES = new Set([
  'mri-scan', 'ct-scan', 'pet-scan', 'ultrasound', 'blood-test',
  '2d-echo', 'full-body-check-up', 'mammography', 'pregnancy-sonography',
  'dexa-bone-scan', 'ecg', 'hrct-scan', 'whole-body-pet-ct'
]);

const GMC_SLUGS = [
  'mri-brain-plain', 'ct-brain-plain', 'pet-ct-whole-body',
  'cbc-test', 'hba1c-test', 'crp-test', 'digital-mammography',
  'bmd-dexa-scan', 'nt-scan', 'anomaly-scan', 'abdomen-ultrasound',
  'fetal-2d-echo', '2d-echo-test'
];

/**
 * Helper to write a sitemap chunk file using Node.js Streams for memory efficiency.
 */
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
        } else {
          ok = stream.write(entry);
        }
      }

      if (i < urls.length) {
        stream.once('drain', writeNext);
      }
    }

    writeNext();
  });
}

/**
 * Helper to write the master sitemap index XML file.
 */
async function writeSitemapIndex(filePath: string, chunkFilenames: string[], lastmod: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, { encoding: 'utf8' });

    stream.on('error', reject);

    stream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    stream.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

    for (const file of chunkFilenames) {
      stream.write(`  <sitemap>\n    <loc>${BASE_URL}/sitemaps/${file}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`);
    }

    stream.write('</sitemapindex>\n', () => resolve());
  });
}

/**
 * Generator function yielding all sitemap URLs sequentially.
 */
function* generateAllUrls(today: string): Generator<SitemapUrl> {
  // 1. Core Static Pages
  const staticRoutes = [
    '', '/about-us', '/contact', '/services', '/doctors', '/conditions',
    '/blog', '/privacy', '/terms', '/cancellation-policy', '/delivery-policy',
    '/disclaimers', '/grievance-policy', '/medical-disclaimer', '/refund-returns',
    '/refund-policy', '/return-policy'
  ];

  for (const route of staticRoutes) {
    yield {
      loc: `${BASE_URL}${route}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: route === '' ? 1.0 : ['/services', '/doctors', '/conditions'].includes(route) ? 0.9 : 0.7,
    };
  }

  // 2. Base Services
  for (const service of services) {
    yield {
      loc: `${BASE_URL}/services/${service}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    };
  }

  // 3. Service Categories
  for (const category of SERVICE_CATEGORIES) {
    yield {
      loc: `${BASE_URL}/services/category/${category.id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    };
  }

  // 4. GMC Products
  for (const slug of GMC_SLUGS) {
    yield {
      loc: `${BASE_URL}/gmc/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    };
  }

  // 5. City Hubs
  yield { loc: `${BASE_URL}/city`, lastmod: today, changefreq: 'weekly', priority: 0.85 };
  for (const city of CITIES) {
    yield {
      loc: `${BASE_URL}/city/${city.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    };
  }

  // 6. Comparison Pages
  yield { loc: `${BASE_URL}/compare`, lastmod: today, changefreq: 'weekly', priority: 0.85 };
  for (const comp of COMPARISONS) {
    yield {
      loc: `${BASE_URL}/compare/${comp.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    };
  }

  // 7. Medical Conditions Pages
  for (const cond of CONDITIONS) {
    yield {
      loc: `${BASE_URL}/conditions/${cond.id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.75,
    };
  }

  // 8. Doctor Profiles
  for (const doc of DOCTORS) {
    yield {
      loc: `${BASE_URL}/doctors/${doc.id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.75,
    };
  }

  // 9. Regional & Location Service Pages
  for (const service of services) {
    const isTopService = TOP_SERVICES.has(service);

    for (const [region, locationsList] of Object.entries(REGION_LOCATIONS)) {
      // Regional Hub
      yield {
        loc: `${BASE_URL}/services/${service}/${region}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: isTopService ? 0.8 : 0.7,
      };

      // Hyper-local Location Pages
      for (const location of locationsList) {
        yield {
          loc: `${BASE_URL}/services/${service}/${region}/${location}`,
          lastmod: today,
          changefreq: 'monthly',
          priority: isTopService ? 0.7 : 0.5,
        };
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting streaming sitemap generation...');
  const startTime = Date.now();
  const today = new Date().toISOString().split('T')[0];

  // Ensure output directories exist
  if (!fs.existsSync(SITEMAPS_DIR)) {
    fs.mkdirSync(SITEMAPS_DIR, { recursive: true });
  }

  let totalUrls = 0;
  let chunkIndex = 1;
  let currentChunk: SitemapUrl[] = [];
  const chunkFilenames: string[] = [];

  for (const urlObj of generateAllUrls(today)) {
    totalUrls++;
    currentChunk.push(urlObj);

    if (currentChunk.length >= CHUNK_SIZE) {
      const filename = `sitemap-${chunkIndex}.xml`;
      const filePath = path.join(SITEMAPS_DIR, filename);
      await writeChunkFile(filePath, currentChunk);
      console.log(`  ✓ Generated ${filename} (${currentChunk.length} URLs)`);
      chunkFilenames.push(filename);
      chunkIndex++;
      currentChunk = [];
    }
  }

  // Write remaining URLs in last chunk
  if (currentChunk.length > 0) {
    const filename = `sitemap-${chunkIndex}.xml`;
    const filePath = path.join(SITEMAPS_DIR, filename);
    await writeChunkFile(filePath, currentChunk);
    console.log(`  ✓ Generated ${filename} (${currentChunk.length} URLs)`);
    chunkFilenames.push(filename);
  }

  // Write Master sitemap-index.xml to public/sitemap.xml
  const masterIndexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  await writeSitemapIndex(masterIndexPath, chunkFilenames, today);
  console.log(`  ✓ Generated master sitemap.xml (${chunkFilenames.length} sitemap chunks indexed)`);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Finished generating sitemaps in ${duration}s. Total URLs: ${totalUrls.toLocaleString()}`);
}

main().catch((err) => {
  console.error('❌ Error generating sitemaps:', err);
  process.exit(1);
});
