/**
 * 🚀 Henotic Diagnostics — IndexNow Automated Search Engine Submission
 * 
 * Instantly notifies Bing, Yandex, Seznam, and Naver of new/updated URLs.
 * Spec: https://www.indexnow.org/documentation
 * 
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts                 # Submits core + city hubs + top priorities
 *   npx tsx scripts/submit-indexnow.ts --priorities    # Submits all 4,486 build priorities
 *   npx tsx scripts/submit-indexnow.ts --cities        # Submits only city hubs
 *   npx tsx scripts/submit-indexnow.ts --all           # Submits all URLs from sitemap chunks
 *   npx tsx scripts/submit-indexnow.ts --url <url>     # Submits a single URL
 *   npx tsx scripts/submit-indexnow.ts --dry-run       # Preview without sending
 */

import { INDEXNOW_KEY, INDEXNOW_HOST, INDEXNOW_KEY_LOCATION, INDEXNOW_ENDPOINTS } from '../src/config/indexnow';
import { CITIES } from '../src/config/cities';
import { services } from '../src/config/services';
import { CONDITIONS } from '../src/config/conditions';
import { COMPARISONS } from '../src/config/comparisons';
import { GMC_PRODUCTS } from '../src/config/gmc-products';
import { HEALTH_CHECKUP_SLUGS } from '../src/config/health-checkup';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = `https://${INDEXNOW_HOST}`;

async function collectUrls(mode: string, customUrl?: string): Promise<string[]> {
  if (customUrl) {
    return [customUrl.startsWith('http') ? customUrl : `${BASE_URL}${customUrl}`];
  }

  const urlSet = new Set<string>();

  if (mode === 'cities') {
    urlSet.add(`${BASE_URL}/city`);
    for (const city of CITIES) {
      urlSet.add(`${BASE_URL}/city/${city.slug}`);
    }
    return Array.from(urlSet);
  }

  if (mode === 'all') {
    // Collect from public/sitemaps/*.xml if present
    const sitemapsDir = path.resolve(process.cwd(), 'public/sitemaps');
    if (fs.existsSync(sitemapsDir)) {
      const files = fs.readdirSync(sitemapsDir).filter(f => f.endsWith('.xml'));
      console.log(`📦 Reading URLs from ${files.length} sitemap chunks in public/sitemaps/...`);
      for (const file of files) {
        const content = fs.readFileSync(path.join(sitemapsDir, file), 'utf8');
        const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
        for (const m of matches) {
          const u = m.replace(/<\/?loc>/g, '').trim();
          if (u) urlSet.add(u);
        }
      }
    }
    if (urlSet.size > 0) return Array.from(urlSet);
  }

  // Default / priorities mode: Core + City Hubs + Services + Build Priorities
  urlSet.add(`${BASE_URL}/`);
  urlSet.add(`${BASE_URL}/about`);
  urlSet.add(`${BASE_URL}/contact`);
  urlSet.add(`${BASE_URL}/services`);
  urlSet.add(`${BASE_URL}/city`);

  // All 9 City Hubs
  for (const city of CITIES) {
    urlSet.add(`${BASE_URL}/city/${city.slug}`);
  }

  // All Services
  for (const service of services) {
    urlSet.add(`${BASE_URL}/services/${service}`);
  }

  // Conditions & Comparisons
  for (const cond of CONDITIONS) {
    urlSet.add(`${BASE_URL}/conditions/${cond.id}`);
  }
  for (const comp of COMPARISONS) {
    urlSet.add(`${BASE_URL}/compare/${comp.slug}`);
  }

  // GMC High-Authority Product Landing Pages (17 products)
  for (const prod of GMC_PRODUCTS) {
    urlSet.add(`${BASE_URL}/gmc/${prod.slug}`);
  }

  // Health Checkup Authority Hubs (26 slugs)
  for (const slug of HEALTH_CHECKUP_SLUGS) {
    urlSet.add(`${BASE_URL}/services/${slug}`);
  }

  // Include 4,486 build priority URLs if file exists
  const prioritiesPath = path.resolve(process.cwd(), 'src/config/build-priorities.json');
  if (fs.existsSync(prioritiesPath)) {
    try {
      const priorities: Array<{ service: string; region: string; location: string }> = JSON.parse(
        fs.readFileSync(prioritiesPath, 'utf8')
      );
      for (const item of priorities) {
        urlSet.add(`${BASE_URL}/services/${item.service}/${item.region}/${item.location}`);
      }
      console.log(`🎯 Included ${priorities.length} high-priority PSEO location routes.`);
    } catch {
      // fallback
    }
  }

  return Array.from(urlSet);
}

async function submitBatch(endpoint: string, urls: string[], dryRun: boolean): Promise<{ endpoint: string; status: number; message: string }> {
  if (dryRun) {
    return { endpoint, status: 200, message: `[DRY-RUN] ${urls.length} URLs ready to submit` };
  }

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Henotic-Diagnostics-IndexNow-Bot/1.0'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const text = await res.text().catch(() => '');
    return {
      endpoint,
      status: res.status,
      message: res.status === 200 ? 'OK - Submitted' : (res.status === 202 ? 'Accepted for indexing' : `HTTP ${res.status}: ${text.slice(0, 100)}`)
    };
  } catch (err: any) {
    return { endpoint, status: 0, message: `Network error: ${err.message}` };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const isCitiesOnly = args.includes('--cities');
  const isAll = args.includes('--all');
  const isPriorities = args.includes('--priorities');

  let customUrl: string | undefined;
  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    customUrl = args[urlIdx + 1];
  }

  const mode = isCitiesOnly ? 'cities' : (isAll ? 'all' : (isPriorities ? 'priorities' : 'default'));

  console.log(`\n🚀 HENOTIC DIAGNOSTICS — INDEXNOW SUBMISSION`);
  console.log(`══════════════════════════════════════════════════════════════`);
  console.log(`🌐 Host:         ${INDEXNOW_HOST}`);
  console.log(`🔑 Key:          ${INDEXNOW_KEY}`);
  console.log(`📄 Key Location: ${INDEXNOW_KEY_LOCATION}`);
  console.log(`⚙️ Mode:         ${mode.toUpperCase()}${dryRun ? ' (DRY RUN)' : ''}`);
  console.log(`══════════════════════════════════════════════════════════════\n`);

  const urls = await collectUrls(mode, customUrl);
  console.log(`📊 Total URLs collected: ${urls.length.toLocaleString()}`);

  if (urls.length === 0) {
    console.log(`⚠️ No URLs to submit.`);
    return;
  }

  // IndexNow allows max 10,000 URLs per batch
  const BATCH_SIZE = 10000;
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦 Split into ${batches.length} batch(es) (max ${BATCH_SIZE} URLs/batch).\n`);

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    console.log(`── Batch ${b + 1}/${batches.length} (${batch.length.toLocaleString()} URLs) ──`);
    console.log(`Sample URLs:`);
    batch.slice(0, 3).forEach(u => console.log(`  • ${u}`));
    if (batch.length > 3) {
      console.log(`  ... and ${batch.length - 3} more`);
    }

    // Submit to primary endpoints
    for (const endpoint of INDEXNOW_ENDPOINTS) {
      const result = await submitBatch(endpoint, batch, dryRun);
      const icon = result.status === 200 || result.status === 202 ? '✅' : (dryRun ? '🔍' : '⚠️');
      console.log(`${icon} [${result.status || 'ERR'}] ${result.endpoint} → ${result.message}`);
    }
    console.log('');
  }

  console.log(`🎉 IndexNow submission process completed!`);
}

main().catch(err => {
  console.error('Fatal IndexNow submission error:', err);
  process.exit(1);
});
