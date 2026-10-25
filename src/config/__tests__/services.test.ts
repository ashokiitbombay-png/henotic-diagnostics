import { describe, it, expect } from 'vitest';
import { services, getHeroImageForService } from '../../config/services';

describe('Services configuration', () => {
  it('has services defined', () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it('has more than 300 services', () => {
    expect(services.length).toBeGreaterThan(300);
  });

  it('has no duplicate slugs', () => {
    const uniqueSlugs = new Set(services);
    expect(uniqueSlugs.size).toBe(services.length);
  });

  it('all slugs are URL-safe (lowercase, hyphenated)', () => {
    for (const slug of services) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('includes critical services', () => {
    const criticalServices = ['mri-scan', 'ct-scan', 'pet-ct', 'ultrasound', 'blood-test', 'ecg', '2d-echo'];
    for (const svc of criticalServices) {
      expect(services).toContain(svc);
    }
  });

  it('no slug contains spaces or uppercase', () => {
    for (const slug of services) {
      expect(slug).not.toMatch(/\s/);
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('maps correct hero images for health-checkup and full-body-check-up', () => {
    expect(getHeroImageForService('health-checkup')).toBe(
      'https://cdn.henoticdiagnostics.com/health-checkup/hero-images/Executive%20Health%20Checkup-henotic-diagnostics.webp'
    );
    expect(getHeroImageForService('full-body-check-up')).toBe(
      'https://cdn.henoticdiagnostics.com/health-checkup/hero-images/Full%20Body%20Check%20Up-henotic-diagnostics.webp'
    );
  });
});
