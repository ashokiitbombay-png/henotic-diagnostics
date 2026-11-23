import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { LOCATION_DATABASE, REGION_LOCATIONS } from '@/config/locations';
import { services } from '@/config/services';
import blogRedirects from '@/config/blog-redirects.json';
import { normalizeWordPressHtml } from '@/components/content/WordPressRenderer';
import {
  BASE_URL,
  CANONICAL_PRIMARY_SERVICES,
  DEPRECATED_REGIONS,
  DUPLICATE_RAIGAD_LOCATIONS,
  MICRO_SECTOR_SLUG_RE,
  SITEMAP_LASTMOD,
  TIER1B_CLINICAL_SERVICES,
  TIER2_CORE_SERVICES,
  getCanonicalServiceSlug,
  getCoveredSectorsForLocation,
  getL1IndexingDirective,
  getL2IndexingDirective,
  getL3IndexingDirective,
  getLocationTier,
  getNearestIndexableLocations,
  isMicroSectorLocation,
} from '@/lib/seo/indexing-policy';
import { isValidLocationForRegion, isValidRegionSlug, isValidServiceSlug } from '@/lib/seo/slug-validator';
import { KHARGHAR_HUB, getDistanceFromHubKm } from '@/lib/seo/geo-utils';
import { buildLocalLogistics } from '@/lib/seo/local-content-builder';
import { buildLocationFAQs } from '@/lib/seo/location-faqs';
import robots from '@/app/robots';
import { proxy } from '@/proxy';
import { GET as getNiptSitemap } from '@/app/sitemap-nipt-tests.xml/route';
import { GET as getLegacyNumberedSitemap } from '@/app/sitemap/[id]/route';

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const { pathToRegexp, compile } = require(
  path.join(ROOT, 'node_modules/next/dist/compiled/path-to-regexp')
);

function collectSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(full, out);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

describe('GSC Indexing Policy, Deduplication & Sitemap Integrity', () => {
  it('partitions all 350 unique canonical locations and identifies all 32 Navi Mumbai micro-sectors', () => {
    const counts = { '1A': 0, '1B': 0, '2': 0, '3': 0 };
    let microSectorCount = 0;
    for (const loc of LOCATION_DATABASE) {
      if (loc.region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(loc.slug)) continue;
      counts[getLocationTier(loc.region, loc.slug)]++;
      if (isMicroSectorLocation(loc.slug)) microSectorCount++;
    }
    expect(counts).toEqual({
      '1A': 68,
      '1B': 20,
      '2': 176,
      '3': 86,
    });
    expect(microSectorCount).toBe(32);
    expect(TIER2_CORE_SERVICES.size).toBe(49);
    expect(TIER1B_CLINICAL_SERVICES.size).toBe(120);

    const khargharSectors = getCoveredSectorsForLocation('navi-mumbai', 'kharghar');
    expect(khargharSectors.map((s) => s.label)).toEqual([
      'Sector 7',
      'Sector 10',
      'Sector 12',
      'Sector 20',
      'Sector 35',
      'Sector 36',
    ]);
    expect(khargharSectors.every((s) => s.pincode === '410210')).toBe(true);
  });

  it('enforces exact tier directives, micro-sector noindex, and 732 regional L2 hubs', () => {
    // Tier 1A main town (<=10km Kharghar) allows canonical niche services
    expect(getL3IndexingDirective('16s-rrna-sequencing', 'navi-mumbai', 'kharghar')).toMatchObject({
      tier: '1A',
      index: true,
      includeInSitemap: true,
    });

    // Tier 1A/1B micro-sectors are 200 OK noindex, follow with self-canonical and excluded from sitemaps
    for (const sectorSlug of ['kharghar-sector-12', 'vashi-sector-17', 'kalamboli-sector-10e', 'airoli-sector-20']) {
      expect(getL3IndexingDirective('mri-scan', 'navi-mumbai', sectorSlug)).toMatchObject({
        index: false,
        follow: true,
        canonicalUrl: `${BASE_URL}/services/mri-scan/navi-mumbai/${sectorSlug}`,
        includeInSitemap: false,
      });
    }

    // Tier 1B (10-24.1km Ghansoli) indexes 120 clinical services, noindexes niche single analytes
    expect(getL3IndexingDirective('mri-scan', 'navi-mumbai', 'ghansoli')).toMatchObject({
      tier: '1B',
      index: true,
      includeInSitemap: true,
    });
    expect(getL3IndexingDirective('16s-rrna-sequencing', 'navi-mumbai', 'ghansoli')).toMatchObject({
      tier: '1B',
      index: false,
      includeInSitemap: false,
    });

    // Tier 2 (South Mumbai, Thane metro, Raigad inner) indexes ONLY 49 core services
    for (const [region, loc] of [
      ['south-mumbai', 'opera-house'],
      ['raigad', 'neral'],
      ['raigad', 'karjat'],
      ['raigad', 'pen'],
      ['raigad', 'khopoli'],
    ]) {
      expect(getL3IndexingDirective('mri-scan', region, loc)).toMatchObject({
        tier: '2',
        index: true,
        includeInSitemap: true,
      });
      expect(getL3IndexingDirective('16s-rrna-sequencing', region, loc)).toMatchObject({
        tier: '2',
        index: false,
        includeInSitemap: false,
      });
    }

    // Tier 3 (Pune, rural Thane, outer Raigad) sets ALL L3 pages to noindex, follow with self-canonical
    for (const [region, loc] of [
      ['pune', 'bavdhan'],
      ['thane', 'palghar'],
      ['thane', 'shahapur'],
      ['thane', 'wada'],
      ['raigad', 'alibag'],
      ['raigad', 'mangaon'],
    ]) {
      expect(getL3IndexingDirective('mri-scan', region, loc)).toMatchObject({
        tier: '3',
        index: false,
        follow: true,
        canonicalUrl: `${BASE_URL}/services/mri-scan/${region}/${loc}`,
        includeInSitemap: false,
      });
    }

    // L2 regional hub pruning: 318 (Navi Mumbai) + 120 (Raigad) + 6*49 (other regions) = 732 hubs
    let l2HubCount = 0;
    for (const region of Object.keys(REGION_LOCATIONS)) {
      if (DEPRECATED_REGIONS.has(region)) continue;
      for (const service of CANONICAL_PRIMARY_SERVICES) {
        if (getL2IndexingDirective(service, region).includeInSitemap) l2HubCount++;
      }
    }
    expect(l2HubCount).toBe(732);

    // Non-allowed L2 hubs (empty L3) are noindex, follow with self-canonical
    expect(getL2IndexingDirective('16s-rrna-sequencing', 'south-mumbai')).toMatchObject({
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/16s-rrna-sequencing/south-mumbai`,
      includeInSitemap: false,
    });
    expect(getL2IndexingDirective('whole-transcriptome-sequencing', 'raigad')).toMatchObject({
      index: false,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/whole-transcriptome-sequencing/raigad`,
      includeInSitemap: false,
    });
    expect(getL2IndexingDirective('16s-rrna-sequencing', 'navi-mumbai')).toMatchObject({
      index: true,
      includeInSitemap: true,
    });
  });

  it('never mixes noindex with a cross-URL canonical across L1, L2, and L3', () => {
    for (const s of services) {
      const l1 = getL1IndexingDirective(s);
      if (!l1.index) {
        expect(l1.canonicalUrl).toBe(`${BASE_URL}/services/${s.toLowerCase()}`);
      }
    }

    for (const region of Object.keys(REGION_LOCATIONS)) {
      for (const s of services) {
        const l2 = getL2IndexingDirective(s, region);
        if (!l2.index) {
          expect(l2.canonicalUrl).toBe(`${BASE_URL}/services/${s.toLowerCase()}/${region}`);
        }
      }
      for (const loc of REGION_LOCATIONS[region]) {
        for (const s of ['mri-scan', 'price-of-nipt-test', 'brain-mri', '16s-rrna-sequencing', 'nippt', 'tavr']) {
          const l3 = getL3IndexingDirective(s, region, loc);
          if (!l3.index) {
            expect(l3.canonicalUrl).toBe(`${BASE_URL}/services/${s.toLowerCase()}/${region}/${loc}`);
          }
        }
      }
    }

    // Valid Tier 1A variant pages stay indexable and cross-canonicalized
    expect(getL3IndexingDirective('price-of-nipt-test', 'navi-mumbai', 'kharghar')).toMatchObject({
      index: true,
      follow: true,
      canonicalUrl: `${BASE_URL}/services/nipt-test/navi-mumbai/kharghar`,
      includeInSitemap: false,
    });
    expect(getCanonicalServiceSlug('nippt')).toBe('nipt-test');
    expect(getCanonicalServiceSlug('pet-scan')).toBe('pet-ct');
  });

  it('enforces single-hop 301 redirects with zero 308s, zero 2-hop chains, and zero 404 targets in next.config.js', async () => {
    const nextConfigModule = await import('../next.config.js');
    const nextConfig = (nextConfigModule.default || nextConfigModule) as {
      redirects: () => Promise<Array<{ source: string; destination: string; permanent?: boolean; statusCode?: number }>>;
      headers: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>>;
      rewrites: () => Promise<Array<{ source: string; destination: string }>>;
    };

    const redirects = await nextConfig.redirects();
    for (const rule of redirects) {
      expect(rule.permanent, rule.source).toBeUndefined();
      expect(rule.statusCode, rule.source).toBe(301);
    }

    const compiled = redirects.map((r) => {
      const keys: Array<{ name: string }> = [];
      const re = pathToRegexp(r.source, keys);
      const toPath = compile(r.destination);
      return { ...r, keys, re, toPath };
    });

    const matchOnce = (pathname: string) => {
      for (const r of compiled) {
        const m = r.re.exec(pathname);
        if (!m) continue;
        const params: Record<string, string> = {};
        r.keys.forEach((k, idx) => {
          if (m[idx + 1] !== undefined) params[k.name] = m[idx + 1];
        });
        return { statusCode: r.statusCode, destination: r.toPath(params) as string };
      }
      return null;
    };

    const singleHopAssertions: Array<[string, string]> = [
      ['/services/ct-brain/western-suburbs/mira-bhayandar', '/services/ct-brain/thane/mira-road'],
      ['/services/ct-brain/mumbai-suburban/mira-bhayandar', '/services/ct-brain/thane/mira-road'],
      ['/services/tavr/mumbai-suburban/mira-bhayandar', '/services/tavr'],
      ['/services/cardiac-catheterization/south-mumbai', '/services/cardiac-catheterization'],
      ['/services/angioplasty/pune', '/services/angioplasty'],
      ['/services/nippt/mumbai-suburban/mumbra', '/services/nipt-test/thane/mumbra'],
      ['/services/pet-scan/western-suburbs/mira-bhayandar', '/services/pet-ct/thane/mira-road'],
      ['/services/echo-test/mumbai-suburban/navi-mumbai-east', '/services/2d-echo/navi-mumbai/vashi'],
      ['/blog/pet-scan', '/services/pet-ct'],
      ['/blog/musculoskeletal-ultrasonography', '/services/musculoskeletal-ultrasound'],
      ['/blog/modern-healthcare-plans', '/services/health-checkup'],
    ];

    for (const [src, expectedDest] of singleHopAssertions) {
      const hop1 = matchOnce(src);
      expect(hop1, src).not.toBeNull();
      expect(hop1!.statusCode, src).toBe(301);
      expect(hop1!.destination, src).toBe(expectedDest);
      expect(matchOnce(hop1!.destination), `${src} -> 2nd hop`).toBeNull();

      // Also verify destination resolves to a valid route (no 404 target)
      const parts = hop1!.destination.split('/').filter(Boolean);
      if (parts[0] === 'services') {
        expect(isValidServiceSlug(parts[1]), hop1!.destination).toBe(true);
        if (parts.length === 3) expect(isValidRegionSlug(parts[2]), hop1!.destination).toBe(true);
        if (parts.length === 4) expect(isValidLocationForRegion(parts[2], parts[3]), hop1!.destination).toBe(true);
      }
    }

    // Verify all 27 blogRedirects resolve in 1 hop to valid non-redirected destinations
    for (const [slug, dest] of Object.entries(blogRedirects)) {
      const hop1 = matchOnce(`/blog/${slug}`);
      expect(hop1).toEqual({ statusCode: 301, destination: dest });
      expect(matchOnce(dest)).toBeNull();
    }

    // Verify X-Robots-Tag headers on /_next/static/:path* and /favicon.ico + robots.ts keeps _next/static allowed
    const headerRules = await nextConfig.headers();
    expect(headerRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: '/_next/static/:path*',
          headers: expect.arrayContaining([
            expect.objectContaining({ key: 'X-Robots-Tag', value: 'noindex, nofollow' }),
          ]),
        }),
        expect.objectContaining({
          source: '/favicon.ico',
          headers: expect.arrayContaining([
            expect.objectContaining({ key: 'X-Robots-Tag', value: 'noindex, nofollow' }),
          ]),
        }),
      ])
    );

    const nginxConf = fs.readFileSync(path.join(ROOT, 'deploy/gcp-vm/nginx-henotic.conf'), 'utf8');
    const staticBlock = nginxConf.match(/location \/_next\/static\/\s*\{[\s\S]*?\}/)?.[0] || '';
    expect(staticBlock).toContain('add_header Cache-Control "public, max-age=31536000, immutable" always;');
    expect(staticBlock).toContain('add_header X-Robots-Tag "noindex, nofollow" always;');
    expect(nginxConf).toContain('location = /favicon.ico');

    const robotsRules = robots().rules;
    const allDisallows = (Array.isArray(robotsRules) ? robotsRules : [robotsRules]).flatMap((r) =>
      Array.isArray(r.disallow) ? r.disallow : r.disallow ? [r.disallow] : []
    );
    expect(allDisallows).not.toContain('/_next/static/');
    expect(allDisallows).not.toContain('/_next/');
  });

  it('returns 410 Gone with X-Robots-Tag: noindex, nofollow for retired ambulance URLs in proxy.ts', () => {
    for (const ambPath of [
      '/services/wheelchair-ambulance/pune',
      '/services/hospital-transfer-ambulance/thane',
      '/services/bls-ambulance/navi-mumbai/sanpada',
    ]) {
      const req = new NextRequest(`https://www.henoticdiagnostics.com${ambPath}`, {
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      });
      const res = proxy(req);
      expect(res.status, ambPath).toBe(410);
      expect(res.headers.get('x-robots-tag')).toBe('noindex, nofollow');
    }
  });

  it('strips stray HTML comments and canonicalizes WP internal links', () => {
    const dirty = `
      <!-- No <script> / No <style> / No <head> -->
      <div class="wp-block"><!-- inner comment --><p>Read <a href="/pet-scan/">PET Scan</a></p></div>
    `;
    const clean = normalizeWordPressHtml(dirty);
    expect(clean).not.toContain('<!--');
    expect(clean).not.toContain('-->');
    expect(clean).toContain('href="/services/pet-ct"');
  });

  it('excludes micro-sectors from nearest siblings and differentiates sibling L3 copy & 6 FAQs', () => {
    const nearby = getNearestIndexableLocations('mri-scan', 'navi-mumbai', 'kharghar', 8);
    expect(nearby).toHaveLength(8);
    for (const loc of nearby) {
      expect(MICRO_SECTOR_SLUG_RE.test(loc.slug)).toBe(false);
    }
    for (let i = 1; i < nearby.length; i++) {
      expect((nearby[i].distanceKm ?? 0) >= (nearby[i - 1].distanceKm ?? 0)).toBe(true);
    }
    expect(getNearestIndexableLocations('mri-scan', 'pune', 'bavdhan', 8)).toEqual([]);

    const dist = getDistanceFromHubKm('kharghar', 'navi-mumbai');
    expect(dist).not.toBeNull();
    expect(dist!).toBeLessThan(2.5);
    expect(KHARGHAR_HUB.postalCode).toBe('410210');

    const logA = buildLocalLogistics({
      serviceSlug: '2d-echo',
      serviceName: '2D Echo',
      regionSlug: 'navi-mumbai',
      locationSlug: 'kamothe',
    });
    const logB = buildLocalLogistics({
      serviceSlug: '2d-echo',
      serviceName: '2D Echo',
      regionSlug: 'navi-mumbai',
      locationSlug: 'cbd-belapur',
    });
    expect(logA.fulfillmentNarrative).not.toBe(logB.fulfillmentNarrative);

    const faqsA = buildLocationFAQs({
      serviceName: '2D Echo',
      serviceSlug: '2d-echo',
      locationName: 'Kamothe',
      regionName: 'Navi Mumbai',
      price: 1500,
      locationSlug: 'kamothe',
      pincode: '410209',
    });
    expect(faqsA).toHaveLength(6);
  });

  it('emits clean tiered XML sitemaps with zero noindex, zero micro-sectors, zero empty L2 hubs, and 732 hubs', async () => {
    const masterXml = fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');
    expect(masterXml).toContain('sitemap-core.xml');
    expect(masterXml).toContain('sitemap-hubs.xml');
    expect(masterXml).toContain('sitemap-tier1a-1.xml');
    expect(masterXml).toContain('sitemap-tier1b.xml');
    expect(masterXml).toContain('sitemap-tier2.xml');
    expect(masterXml).toContain(`<lastmod>${SITEMAP_LASTMOD}</lastmod>`);

    const sitemapsDir = path.join(ROOT, 'public/sitemaps');
    const files = fs.readdirSync(sitemapsDir).filter((f) => f.endsWith('.xml'));
    expect(files).not.toContain('sitemap-1.xml');

    const hubsXml = fs.readFileSync(path.join(sitemapsDir, 'sitemap-hubs.xml'), 'utf8');
    const hubLocs = [...hubsXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(hubLocs).toHaveLength(732);

    const coreXml = fs.readFileSync(path.join(sitemapsDir, 'sitemap-core.xml'), 'utf8');
    const blogRedirectSlugs = new Set(Object.keys(blogRedirects));

    let totalLocs = 0;
    for (const file of files) {
      const xml = fs.readFileSync(path.join(sitemapsDir, file), 'utf8');
      const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      totalLocs += locs.length;

      for (const url of locs) {
        expect(url).not.toMatch(/\/services\/(pet-scan|nippt|nip-t-test|npt-test-pregnancy|2d-echo-test|ecg-test|fetal-echo)\b/);
        expect(url).not.toMatch(/\/services\/[^/]+\/pune\/[^/]+$/);
        expect(url).not.toMatch(/\/services\/[^/]+\/[^/]+\/[^/]*-sector-\d+[a-z]?$/);
        expect(url).not.toMatch(/\/services\/price-of-nipt-test\/[^/]+/);
        expect(url).not.toMatch(/\/services\/brain-mri\/[^/]+/);
        expect(url).not.toMatch(/\/services\/mumbai-suburban\b/);
        const blogMatch = url.match(/\/blog\/([^/?#]+)$/);
        if (blogMatch) {
          expect(blogRedirectSlugs.has(blogMatch[1]), url).toBe(false);
        }
      }
    }
    expect(totalLocs).toBe(24965);
    expect(coreXml).toContain('/blog/mri-3t-vs-1-5t-guide');

    // Verify dynamic NIPT image sitemap excludes typo redirects
    const niptRes = await getNiptSitemap();
    const niptXml = await niptRes.text();
    expect(niptXml).toContain('https://www.henoticdiagnostics.com/services/nipt-test');
    expect(niptXml).not.toContain('/services/nip-t-test');
    expect(niptXml).not.toContain('/services/npt-test-pregnancy');
    expect(niptXml).not.toContain('/services/nippt');

    // Verify deprecated numbered sitemap rewrites & chunks return 404
    const nextConfigModule = await import('../next.config.js');
    const nextConfig = (nextConfigModule.default || nextConfigModule) as {
      rewrites: () => Promise<Array<{ source: string; destination: string }>>;
    };
    const rewrites = await nextConfig.rewrites();
    expect(rewrites.some((r) => r.source.includes('sitemap-'))).toBe(false);

    const legacyChunkRes = await getLegacyNumberedSitemap(
      new Request('https://www.henoticdiagnostics.com/sitemap/1.xml'),
      { params: Promise.resolve({ id: '1.xml' }) }
    );
    expect(legacyChunkRes.status).toBe(404);
  });

  it('contains zero internal links to retired ambulance, redirected service, or redirected blog URLs', () => {
    const files = [
      ...collectSourceFiles(path.join(ROOT, 'src/app')),
      ...collectSourceFiles(path.join(ROOT, 'src/components')),
    ];
    const offending: string[] = [];
    for (const file of files) {
      const txt = fs.readFileSync(file, 'utf8');
      if (
        txt.includes('/services/pet-scan') ||
        txt.includes('getServiceUrl("pet-scan")') ||
        txt.includes('/services/digital-x-ray') ||
        /\/services\/[^"'`\s]*ambulance/i.test(txt) ||
        txt.includes('sitemap-tier1a-3.xml') ||
        txt.includes('/blog/pet-scan') ||
        txt.includes('/blog/musculoskeletal-ultrasonography') ||
        txt.includes('/blog/health-checkup') ||
        txt.includes('/blog/modern-healthcare-plans')
      ) {
        offending.push(path.relative(ROOT, file));
      }
    }
    expect(offending).toEqual([]);
  });
});
