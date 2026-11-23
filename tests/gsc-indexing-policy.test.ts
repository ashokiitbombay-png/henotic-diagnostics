import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { LOCATION_DATABASE } from '@/config/locations';
import { normalizeWordPressHtml } from '@/components/content/WordPressRenderer';
import {
  DUPLICATE_RAIGAD_LOCATIONS,
  SITEMAP_LASTMOD,
  TIER1B_CLINICAL_SERVICES,
  TIER2_CORE_SERVICES,
  getCanonicalServiceSlug,
  getL1IndexingDirective,
  getL2IndexingDirective,
  getL3IndexingDirective,
  getLocationTier,
  getNearestIndexableLocations,
} from '@/lib/seo/indexing-policy';
import { KHARGHAR_HUB, getDistanceFromHubKm } from '@/lib/seo/geo-utils';
import { GET as getNiptSitemap } from '@/app/sitemap-nipt-tests.xml/route';
import { GET as getLegacyNumberedSitemap } from '@/app/sitemap/[id]/route';

const ROOT = process.cwd();

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
  it('partitions all 350 unique canonical locations into exact 1A / 1B / 2 / 3 tiers', () => {
    const counts = { '1A': 0, '1B': 0, '2': 0, '3': 0 };
    for (const loc of LOCATION_DATABASE) {
      if (loc.region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(loc.slug)) continue;
      counts[getLocationTier(loc.region, loc.slug)]++;
    }
    expect(counts).toEqual({
      '1A': 68,
      '1B': 20,
      '2': 176,
      '3': 86,
    });

    expect(TIER2_CORE_SERVICES.size).toBe(49);
    expect(TIER1B_CLINICAL_SERVICES.size).toBe(120);
  });

  it('enforces exact tier & Pune L2 override directives across L2 and L3', () => {
    // Tier 1A (<=10km Kharghar) allows canonical niche services
    expect(getL3IndexingDirective('16s-rrna-sequencing', 'navi-mumbai', 'kharghar')).toMatchObject({
      tier: '1A',
      index: true,
      includeInSitemap: true,
    });

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

    // Tier 3 (Pune, rural Thane, outer Raigad) sets ALL L3 pages to noindex, follow
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
        includeInSitemap: false,
      });
    }

    // Pune L2 hub override: ONLY 49 core services remain indexable
    expect(getL2IndexingDirective('mri-scan', 'pune')).toMatchObject({
      index: true,
      includeInSitemap: true,
    });
    expect(getL2IndexingDirective('16s-rrna-sequencing', 'pune')).toMatchObject({
      index: false,
      includeInSitemap: false,
    });
    expect(getL2IndexingDirective('16s-rrna-sequencing', 'south-mumbai')).toMatchObject({
      index: true,
      includeInSitemap: true,
    });
  });

  it('consolidates NIPT and non-NIPT keyword/permutation variants without mixed noindex+canonical', () => {
    const niptPricingL3 = getL3IndexingDirective('price-of-nipt-test', 'navi-mumbai', 'kharghar');
    expect(niptPricingL3).toMatchObject({
      index: true,
      follow: true,
      canonicalUrl: 'https://www.henoticdiagnostics.com/services/nipt-test/navi-mumbai/kharghar',
      includeInSitemap: false,
    });

    const mriPermL3 = getL3IndexingDirective('brain-mri', 'navi-mumbai', 'kharghar');
    expect(mriPermL3).toMatchObject({
      index: true,
      follow: true,
      canonicalUrl: 'https://www.henoticdiagnostics.com/services/mri-brain/navi-mumbai/kharghar',
      includeInSitemap: false,
    });

    // Outstation variant points to primary L1 and sets noindex
    const outstationVariant = getL3IndexingDirective('price-of-nipt-test', 'pune', 'bavdhan');
    expect(outstationVariant).toMatchObject({
      index: false,
      follow: true,
      canonicalUrl: 'https://www.henoticdiagnostics.com/services/nipt-test',
      includeInSitemap: false,
    });

    // Redirected typo slugs are excluded at L1 and L3
    expect(getL1IndexingDirective('nippt').includeInSitemap).toBe(false);
    expect(getCanonicalServiceSlug('nippt')).toBe('nipt-test');
    expect(getCanonicalServiceSlug('pet-scan')).toBe('pet-ct');
  });

  it('configures permanent statusCode 301 redirects for NIPT typo slugs in next.config.js', async () => {
    const nextConfigModule = await import('../next.config.js');
    const nextConfig = (nextConfigModule.default || nextConfigModule) as {
      redirects: () => Promise<Array<{ source: string; destination: string; statusCode?: number }>>;
    };
    const redirects = await nextConfig.redirects();
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: '/services/nippt/:path*',
          destination: '/services/nipt-test/:path*',
          statusCode: 301,
        }),
        expect.objectContaining({
          source: '/services/nip-t-test/:path*',
          destination: '/services/nipt-test/:path*',
          statusCode: 301,
        }),
        expect.objectContaining({
          source: '/services/npt-test-pregnancy/:path*',
          destination: '/services/nipt-test/:path*',
          statusCode: 301,
        }),
      ])
    );
  });

  it('strips stray HTML comments including No <script> comments and canonicalizes WP internal links', () => {
    const dirty = `
      <!-- No <script> / No <style> / No <head> -->
      <div class="wp-block"><!-- inner comment --><p>Read <a href="/pet-scan/">PET Scan</a></p></div>
    `;
    const clean = normalizeWordPressHtml(dirty);
    expect(clean).not.toContain('<!--');
    expect(clean).not.toContain('-->');
    expect(clean).toContain('href="/services/pet-ct"');
  });

  it('returns <= 8 nearest indexable locations sorted by distance and [] for Tier 3 Pune', () => {
    const nearby = getNearestIndexableLocations('mri-scan', 'south-mumbai', 'opera-house', 8);
    expect(nearby).toHaveLength(8);
    for (let i = 1; i < nearby.length; i++) {
      expect((nearby[i].distanceKm ?? 0) >= (nearby[i - 1].distanceKm ?? 0)).toBe(true);
    }
    expect(getNearestIndexableLocations('mri-scan', 'pune', 'bavdhan', 8)).toEqual([]);

    const dist = getDistanceFromHubKm('kharghar', 'navi-mumbai');
    expect(dist).not.toBeNull();
    expect(dist!).toBeLessThan(2.5);
    expect(KHARGHAR_HUB.postalCode).toBe('410210');
  });

  it('emits clean tiered XML sitemaps with zero noindex, zero Pune L3, and zero duplicate variants', async () => {
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

    let totalLocs = 0;
    for (const file of files) {
      const xml = fs.readFileSync(path.join(sitemapsDir, file), 'utf8');
      const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      totalLocs += locs.length;

      for (const url of locs) {
        expect(url).not.toMatch(/\/services\/(pet-scan|nippt|nip-t-test|npt-test-pregnancy|2d-echo-test|ecg-test|fetal-echo)\b/);
        expect(url).not.toMatch(/\/services\/[^/]+\/pune\/[^/]+$/);
        expect(url).not.toMatch(/\/services\/price-of-nipt-test\/[^/]+/);
        expect(url).not.toMatch(/\/services\/brain-mri\/[^/]+/);
        expect(url).not.toMatch(/\/services\/mumbai-suburban\b/);
      }
    }
    expect(totalLocs).toBeGreaterThan(30000);
    expect(totalLocs).toBeLessThan(40000);

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

  it('contains zero internal <Link href="/services/pet-scan"> or "/services/digital-x-ray" links in app/components', () => {
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
        txt.includes('/services/digital-x-ray')
      ) {
        offending.push(path.relative(ROOT, file));
      }
    }
    expect(offending).toEqual([]);
  });
});
