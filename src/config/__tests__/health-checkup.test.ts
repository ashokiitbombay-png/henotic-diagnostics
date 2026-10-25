import { describe, it, expect } from 'vitest';
import {
  STATIC_HEALTH_CHECKUP_PAGES,
  STATIC_HEALTH_PACKAGES,
  HEALTH_CHECKUP_SLUGS,
  isHealthCheckupAuthoritySlug,
  buildTokenResolver,
  resolvePageTokens,
  orderPackagesForPage,
} from '@/config/health-checkup';
import { services } from '@/config/services';

const EXPECTED_SLUGS = [
  'health-checkup', 'full-body-check-up', 'master-health-checkup', 'executive-health-checkup',
  'executive-health-screening', 'preventive-health-checkup', 'preventive-health-screening',
  'annual-health-checkup', 'corporate-health-checkup', 'employee-health-checkup',
  'pre-employment-health-checkup', 'wellness-screening', 'health-screening', 'women-health-checkup',
  'women-health-screening', 'men-health-checkup', 'men-health-screening',
  'senior-citizen-health-checkup', 'senior-health-checkup', 'family-health-checkup',
  'heart-health-checkup', 'cardiac-health-checkup', 'diabetes-health-checkup',
  'diabetes-health-screening', 'cancer-screening', 'cancer-screening-package',
];

const resolved = STATIC_HEALTH_CHECKUP_PAGES.map((p) =>
  resolvePageTokens(p, buildTokenResolver(STATIC_HEALTH_PACKAGES, p.featuredPackageCodes)),
);
const packageCodes = new Set(STATIC_HEALTH_PACKAGES.map((p) => p.code));

describe('health checkup authority pages config', () => {
  it('covers exactly the 26 keyword slugs, in order', () => {
    expect(HEALTH_CHECKUP_SLUGS).toEqual(EXPECTED_SLUGS);
  });

  it('every slug is a valid service route (passes slug validator set)', () => {
    for (const slug of EXPECTED_SLUGS) {
      expect(services, slug).toContain(slug);
      expect(isHealthCheckupAuthoritySlug(slug)).toBe(true);
    }
    expect(isHealthCheckupAuthoritySlug('mri-scan')).toBe(false);
  });

  it('has unique meta titles, descriptions and H1s', () => {
    for (const field of ['metaTitle', 'metaDescription', 'h1'] as const) {
      const values = resolved.map((p) => p[field]);
      expect(new Set(values).size, field).toBe(values.length);
    }
  });

  it('keeps meta titles ≤ 65 chars and descriptions 110–175 chars after token resolution', () => {
    for (const p of resolved) {
      expect(p.metaTitle.length, `${p.slug} title: ${p.metaTitle}`).toBeLessThanOrEqual(65);
      expect(p.metaDescription.length, `${p.slug} desc`).toBeGreaterThanOrEqual(110);
      expect(p.metaDescription.length, `${p.slug} desc`).toBeLessThanOrEqual(175);
    }
  });

  it('includes the primary keyword in title, H1 and quick answer (case-insensitive)', () => {
    for (const p of resolved) {
      const kw = p.keyword.toLowerCase();
      expect(p.metaTitle.toLowerCase(), p.slug).toContain(kw);
      expect(p.h1.toLowerCase(), p.slug).toContain(kw);
      expect(p.quickAnswer.toLowerCase(), p.slug).toContain(kw);
    }
  });

  it('resolves all copy tokens', () => {
    for (const p of resolved) {
      expect(JSON.stringify(p), p.slug).not.toMatch(/\{(minPrice|packageCount|maxDiscount)\}/);
    }
  });

  it('keeps quick answers in the 30–75 word AEO range', () => {
    for (const p of resolved) {
      const words = p.quickAnswer.split(/\s+/).length;
      expect(words, p.slug).toBeGreaterThanOrEqual(30);
      expect(words, p.slug).toBeLessThanOrEqual(75);
    }
  });

  it('has ≥ 5 FAQs, ≥ 2 sections and references only existing packages and pages', () => {
    for (const p of STATIC_HEALTH_CHECKUP_PAGES) {
      expect(p.faqs.length, p.slug).toBeGreaterThanOrEqual(5);
      expect(p.sections.length, p.slug).toBeGreaterThanOrEqual(2);
      for (const code of p.featuredPackageCodes) expect(packageCodes.has(code), `${p.slug}→${code}`).toBe(true);
      for (const rel of p.relatedSlugs) {
        expect(EXPECTED_SLUGS, `${p.slug}→${rel}`).toContain(rel);
        expect(rel, p.slug).not.toBe(p.slug);
      }
    }
  });

  it('uses absolute https CDN primary images with dimensions and descriptive alt text', () => {
    for (const p of STATIC_HEALTH_CHECKUP_PAGES) {
      expect(p.primaryImage.url, p.slug).toMatch(/^https:\/\/cdn\.henoticdiagnostics\.com\//);
      expect(p.primaryImage.width, p.slug).toBeGreaterThanOrEqual(600);
      expect(p.primaryImage.height, p.slug).toBeGreaterThanOrEqual(500);
      expect(p.primaryImage.alt.length, p.slug).toBeGreaterThan(40);
      expect(p.primaryImage.caption.length, p.slug).toBeGreaterThan(20);
    }
  });
});

describe('health packages config', () => {
  it('has 17 packages with unique codes and valid pricing', () => {
    expect(STATIC_HEALTH_PACKAGES).toHaveLength(17);
    expect(packageCodes.size).toBe(17);
    for (const p of STATIC_HEALTH_PACKAGES) {
      expect(p.offerPrice, p.code).toBeGreaterThan(0);
      expect(p.offerPrice, p.code).toBeLessThan(p.mrp);
      expect(p.imageWidth * p.imageHeight, p.code).toBeGreaterThan(0);
    }
  });

  it('flags non-fasting panels correctly', () => {
    for (const p of STATIC_HEALTH_PACKAGES) {
      const saysNoFasting = p.notes.some((n) => /fasting not mandatory/i.test(n));
      expect(p.fastingRequired, p.code).toBe(!saysNoFasting);
    }
  });

  it('orders featured packages first without dropping any', () => {
    const ordered = orderPackagesForPage(STATIC_HEALTH_PACKAGES, ['TUMOR-M', 'CHP-85']);
    expect(ordered.map((p) => p.code).slice(0, 2)).toEqual(['TUMOR-M', 'CHP-85']);
    expect(ordered).toHaveLength(STATIC_HEALTH_PACKAGES.length);
  });
});
