import { describe, it, expect } from 'vitest';
import { CITIES, getCityBySlug } from '@/config/cities';
import { LOCATION_BY_SLUG } from '@/config/locations';
import { INDEXNOW_KEY, INDEXNOW_HOST, INDEXNOW_KEY_LOCATION, INDEXNOW_ENDPOINTS } from '@/config/indexnow';

describe('City Hubs & IndexNow Integration', () => {
  it('contains all 9 city hubs', () => {
    expect(CITIES).toHaveLength(9);
    const slugs = CITIES.map(c => c.slug);
    expect(slugs).toContain('mumbai');
    expect(slugs).toContain('navi-mumbai');
    expect(slugs).toContain('thane');
    expect(slugs).toContain('pune');
    expect(slugs).toContain('panvel');
    expect(slugs).toContain('kalyan-dombivli');
    expect(slugs).toContain('mira-bhayandar');
    expect(slugs).toContain('pimpri-chinchwad');
    expect(slugs).toContain('raigad');
  });

  it('every city has valid metadata and popular services', () => {
    for (const city of CITIES) {
      expect(city.slug).toBeTruthy();
      expect(city.name).toBeTruthy();
      expect(city.description.length).toBeGreaterThan(20);
      expect(city.regions.length).toBeGreaterThan(0);
      expect(city.popularServices.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('every explicit locationSlug in focused city hubs exists in locations database', () => {
    const focusedCities = CITIES.filter(c => c.locationSlugs && c.locationSlugs.length > 0);
    expect(focusedCities.length).toBe(4);

    for (const city of focusedCities) {
      for (const locSlug of city.locationSlugs!) {
        const loc = LOCATION_BY_SLUG[locSlug];
        expect(loc, `Locality '${locSlug}' in city '${city.name}' must exist`).toBeDefined();
      }
    }
  });

  it('getCityBySlug resolves existing cities and undefined for non-existent', () => {
    const kd = getCityBySlug('kalyan-dombivli');
    expect(kd).toBeDefined();
    expect(kd?.name).toBe('Kalyan-Dombivli');

    const pcmc = getCityBySlug('pimpri-chinchwad');
    expect(pcmc).toBeDefined();
    expect(pcmc?.name).toBe('Pimpri-Chinchwad');

    const unknown = getCityBySlug('unknown-city-xyz');
    expect(unknown).toBeUndefined();
  });

  it('IndexNow configuration contains valid keys and endpoints', () => {
    expect(INDEXNOW_KEY).toBeTruthy();
    expect(INDEXNOW_KEY.length).toBeGreaterThanOrEqual(16);
    expect(INDEXNOW_HOST).toBe('www.henoticdiagnostics.com');
    expect(INDEXNOW_KEY_LOCATION).toContain(INDEXNOW_KEY);
    expect(INDEXNOW_ENDPOINTS.length).toBeGreaterThanOrEqual(2);
    expect(INDEXNOW_ENDPOINTS).toContain('https://api.indexnow.org/indexnow');
  });
});
