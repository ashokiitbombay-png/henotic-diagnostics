import { describe, it, expect } from 'vitest';
import { services } from '../../config/services';

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
});
