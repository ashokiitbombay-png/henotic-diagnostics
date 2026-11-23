import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { services } from '@/config/services';
import { getFAQsForService, UNIVERSAL_FAQS } from '@/config/faqs';
import { SERVICE_PRICING } from '@/config/pricing';
import { CITY_MICRO_NEIGHBORHOODS, LOCATION_DATABASE } from '@/config/locations';

const ROOT = process.cwd();

function walkTsxFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsxFiles(full, out);
    } else if (entry.name.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

describe('P3 Content Depth, Accessibility & Hygiene', () => {
  it('removes mock-trashed-service from failsafe-cache.json and keeps valid JSON', () => {
    const cachePath = path.join(ROOT, 'src/lib/wordpress/failsafe-cache.json');
    const raw = fs.readFileSync(cachePath, 'utf8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    expect(parsed).not.toHaveProperty('mock-trashed-service');
    expect(Object.keys(parsed).length).toBeGreaterThanOrEqual(40);
  });

  it('matches every service in services (399/399) to a category-specific FAQ template', () => {
    const unmatched: string[] = [];
    for (const slug of services) {
      const faqs = getFAQsForService(slug, slug.replace(/-/g, ' '));
      if (faqs.length <= UNIVERSAL_FAQS.length) {
        unmatched.push(slug);
      }
    }
    expect(unmatched).toEqual([]);
  });

  it('aligns FAQ pricing answers with SERVICE_PRICING with zero stale contradictions', () => {
    const text = (slug: string) =>
      getFAQsForService(slug, slug)
        .map((f) => `${f.question} ${f.answer}`)
        .join(' ');

    const fibro = text('fibroscan');
    expect(fibro).toContain('₹4,500');
    expect(fibro).not.toContain('₹2,000');

    const dexa = text('dexa-bone-scan');
    expect(dexa).toContain('₹4,000');
    expect(dexa).not.toContain('₹1,200');

    const echo = text('2d-echo');
    expect(echo).toContain('₹3,000');
    expect(echo).toContain('₹2,800');
    expect(echo).toContain('₹6,500');

    const anomaly = text('anomaly-scan');
    expect(anomaly).toContain('₹2,500');
    expect(anomaly).toContain('₹4,500');

    const ctBrain = text('ct-brain');
    expect(ctBrain).toContain('₹3,500');

    const usg = text('ultrasound');
    expect(usg).toContain('₹1,800');

    const pet = text('pet-ct');
    expect(pet).toContain('₹14,500');
  });

  it('expands SERVICE_PRICING cleanly with exact mathematical savings', () => {
    const slugs = SERVICE_PRICING.map((item) => item.serviceSlug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(SERVICE_PRICING.length);
    expect(SERVICE_PRICING.length).toBeGreaterThanOrEqual(150);

    for (const item of SERVICE_PRICING) {
      expect(item.henoticPrice).toBeLessThan(item.marketPrice);
      const expectedSavings = Math.round(
        ((item.marketPrice - item.henoticPrice) / item.marketPrice) * 100
      );
      expect(item.savings).toBe(expectedSavings);
    }

    const categories = new Set(SERVICE_PRICING.map((item) => item.category));
    expect(categories.has('Urology & Urodynamics')).toBe(true);
    expect(categories.has('Genomic Sequencing')).toBe(true);
    expect(categories.has('Gut Microbiome')).toBe(true);
    expect(categories.has('Interventional Diagnostics')).toBe(true);
  });

  it('expands CITY_MICRO_NEIGHBORHOODS cleanly without breaking LOCATION_DATABASE integrity', () => {
    const keys = Object.keys(CITY_MICRO_NEIGHBORHOODS);
    expect(keys.length).toBeGreaterThanOrEqual(140);

    const locationSlugs = new Set(LOCATION_DATABASE.map((loc) => loc.slug));
    for (const key of keys) {
      expect(locationSlugs.has(key)).toBe(true);
      expect(CITY_MICRO_NEIGHBORHOODS[key].length).toBeGreaterThanOrEqual(3);
    }

    for (const loc of LOCATION_DATABASE) {
      if (loc.region === 'eastern-suburbs' || loc.region === 'raigad') {
        expect(CITY_MICRO_NEIGHBORHOODS[loc.slug]?.length ?? 0).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('ensures only root layout.tsx contains a <main> landmark across app and components', () => {
    const files = [
      ...walkTsxFiles(path.join(ROOT, 'src/app')),
      ...walkTsxFiles(path.join(ROOT, 'src/components')),
    ];
    const filesWithMain = files
      .filter((file) => {
        const stripped = fs
          .readFileSync(file, 'utf8')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/^\s*\/\/.*$/gm, '');
        return /<main[\s>]/.test(stripped);
      })
      .map((file) => path.relative(ROOT, file).replace(/\\/g, '/'))
      .sort();

    expect(filesWithMain).toEqual(['src/app/layout.tsx']);
  });
});
