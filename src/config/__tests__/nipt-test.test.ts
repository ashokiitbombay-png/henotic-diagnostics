import { describe, it, expect } from 'vitest';
import {
  STATIC_NIPT_PAGES,
  STATIC_NIPT_PANELS,
  STATIC_NIPT_TRUST_CONTENT,
  NIPT_AUTHORITY_SLUGS,
  isNiptAuthoritySlug,
  isNiptService,
  buildNiptTokenResolver,
  resolveNiptPageTokens,
  orderPanelsForPage,
  localizeNiptPageData,
  type NiptPageData,
} from '@/config/nipt-test';
import { services, getHeroImageForService } from '@/config/services';
import { getCategoryById } from '@/config/categories';
import { isValidServiceSlug } from '@/lib/seo/slug-validator';

const EXPECTED_NIPT_SLUGS = [
  'nipt-test',
  'nipt-non-invasive-prenatal-testing',
  'blood-test-nipt',
  'non-invasive-prenatal-diagnosis',
  'price-of-nipt-test',
  'nipt-lab-test',
  'down-syndrome-prenatal-diagnosis',
  'nipt-test-in-pregnancy-cost',
  'non-invasive-prenatal-screening-nipt',
  'non-invasive-prenatal-test-nipt',
  'prenatal-down-syndrome',
  'nips',
  'nipt-testing-cost',
  'nipt-test-pregnancy',
  'nipt-test-for-pregnancy',
  'non-invasive-prenatal-screening-test',
  'cost-for-nipt-test',
  'nip-t-test',
  'npt-test-pregnancy',
  'pregnancy-test-nipt',
];

const resolved = STATIC_NIPT_PAGES.map((p) =>
  resolveNiptPageTokens(p, buildNiptTokenResolver(STATIC_NIPT_PANELS, p.featuredPanelCodes)),
);
const panelCodes = new Set(STATIC_NIPT_PANELS.map((p) => p.code));

describe('NIPT Test authority pages config', () => {
  it('covers all 20 NIPT keyword slugs without duplicates', () => {
    expect(NIPT_AUTHORITY_SLUGS).toEqual(EXPECTED_NIPT_SLUGS);
    expect(new Set(NIPT_AUTHORITY_SLUGS).size).toBe(20);
  });

  it('registers all 20 slugs in services, genetics category, slug-validator, and hero image map', () => {
    const geneticsCat = getCategoryById('genetics');
    expect(geneticsCat).toBeDefined();

    for (const slug of EXPECTED_NIPT_SLUGS) {
      expect(services, slug).toContain(slug);
      expect(geneticsCat?.services, slug).toContain(slug);
      expect(isValidServiceSlug(slug), slug).toBe(true);
      expect(isNiptAuthoritySlug(slug), slug).toBe(true);
      expect(isNiptService(slug), slug).toBe(true);
      expect(getHeroImageForService(slug), slug).toBe(
        'https://cdn.henoticdiagnostics.com/Hero%20Image/nipt-test-henotic-diagnostics_cta.webp',
      );
    }

    expect(isNiptService('nips-test')).toBe(true);
    expect(isNiptService('nippt')).toBe(true);
    expect(isNiptAuthoritySlug('mri-scan')).toBe(false);
    expect(isNiptService('mri-scan')).toBe(false);
  });

  it('has unique meta titles, meta descriptions, and H1s across all 20 pages', () => {
    for (const field of ['metaTitle', 'metaDescription', 'h1'] as const) {
      const values = resolved.map((p) => p[field]);
      expect(new Set(values).size, field).toBe(values.length);
    }
  });

  it('keeps meta titles <= 65 chars and descriptions 110-175 chars after token resolution', () => {
    for (const p of resolved) {
      expect(p.metaTitle.length, `${p.slug}: ${p.metaTitle}`).toBeLessThanOrEqual(65);
      expect(p.metaDescription.length, `${p.slug} desc`).toBeGreaterThanOrEqual(110);
      expect(p.metaDescription.length, `${p.slug} desc`).toBeLessThanOrEqual(175);
    }
  });

  it('includes the primary keyword in title, H1, and quick answer (case-insensitive)', () => {
    for (const p of resolved) {
      const kw = p.keyword.toLowerCase();
      expect(p.metaTitle.toLowerCase(), p.slug).toContain(kw);
      expect(p.h1.toLowerCase(), p.slug).toContain(kw);
      expect(p.quickAnswer.toLowerCase(), p.slug).toContain(kw);
    }
  });

  it('resolves all copy tokens cleanly', () => {
    for (const p of resolved) {
      expect(JSON.stringify(p), p.slug).not.toMatch(/\{(minPrice|panelCount|maxDiscount)\}/);
    }
  });

  it('keeps quick answers in the 30-75 word AEO range', () => {
    for (const p of resolved) {
      const words = p.quickAnswer.split(/\s+/).length;
      expect(words, `${p.slug} words=${words}`).toBeGreaterThanOrEqual(30);
      expect(words, `${p.slug} words=${words}`).toBeLessThanOrEqual(75);
    }
  });

  it('has >= 6 FAQs, >= 2 sections, and valid panel codes & related slugs', () => {
    for (const p of STATIC_NIPT_PAGES) {
      expect(p.faqs.length, p.slug).toBeGreaterThanOrEqual(6);
      expect(p.sections.length, p.slug).toBeGreaterThanOrEqual(2);
      for (const code of p.featuredPanelCodes) {
        expect(panelCodes.has(code), `${p.slug}->${code}`).toBe(true);
      }
      for (const rel of p.relatedSlugs) {
        expect(EXPECTED_NIPT_SLUGS, `${p.slug}->${rel}`).toContain(rel);
        expect(rel, p.slug).not.toBe(p.slug);
      }
    }
  });

  it('uses HTTPS primary SERP images with dimensions and descriptive alt/caption', () => {
    for (const p of STATIC_NIPT_PAGES) {
      expect(p.primaryImage.url, p.slug).toMatch(/^https:\/\//);
      expect(p.primaryImage.width, p.slug).toBeGreaterThanOrEqual(600);
      expect(p.primaryImage.height, p.slug).toBeGreaterThanOrEqual(500);
      expect(p.primaryImage.alt.length, p.slug).toBeGreaterThan(40);
      expect(p.primaryImage.caption.length, p.slug).toBeGreaterThan(20);
    }
  });
});

describe('NIPT panels & multi-tier localization', () => {
  it('defines exact 3 NIPT panels with exact prices (10000, 12500, 15000)', () => {
    expect(STATIC_NIPT_PANELS).toHaveLength(3);
    expect(STATIC_NIPT_PANELS.map((p) => [p.code, p.offerPrice, p.mrp])).toEqual([
      ['NIPT-BASIC', 10000, 12500],
      ['NIPT-COMP', 12500, 15500],
      ['NIPT-ADV', 15000, 18500],
    ]);
  });

  it('orders featured panels first without dropping any', () => {
    const ordered = orderPanelsForPage(STATIC_NIPT_PANELS, ['NIPT-COMP', 'NIPT-BASIC']);
    expect(ordered.map((p) => p.code)).toEqual(['NIPT-COMP', 'NIPT-BASIC', 'NIPT-ADV']);
  });

  it('dynamically localizes Tier 2 region hub and Tier 3 city/pincode data', () => {
    const baseData: NiptPageData = {
      routeSlug: 'down-syndrome-prenatal-diagnosis',
      page: resolved[6],
      panels: STATIC_NIPT_PANELS,
      trust: STATIC_NIPT_TRUST_CONTENT,
      source: { page: 'static', panels: 'static', trust: 'static' },
    };

    const tier2 = localizeNiptPageData(baseData, {
      regionSlug: 'navi-mumbai',
      regionName: 'Navi Mumbai',
    });
    expect(tier2.page.h1).toContain('Navi Mumbai');
    expect(tier2.page.metaTitle).toContain('Navi Mumbai');

    const tier3 = localizeNiptPageData(baseData, {
      regionSlug: 'navi-mumbai',
      regionName: 'Navi Mumbai',
      locationSlug: 'kharghar',
      locationName: 'Kharghar',
      pincode: '410210',
      homeCollectionTurnaround: '20–40 mins',
    });
    expect(tier3.page.h1).toContain('Kharghar');
    expect(tier3.page.metaDescription).toContain('410210');
    expect(tier3.page.quickAnswer).toContain('20–40 mins');
  });
});
