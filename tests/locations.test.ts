import { describe, it, expect } from 'vitest';
import {
  LOCATION_DATABASE,
  getLocationBySlug,
  getLocationsByPincode,
  getLocationsByCity,
  getLocationsByRegion,
  searchLocations,
  REGION_LOCATIONS,
  REGION_NAMES
} from '@/config/locations';
import { generateLocationClinicSchema } from '@/lib/seo/medical-schema-generator';
import { isValidLocationForRegion, isValidLocationSlug } from '@/lib/seo/slug-validator';

describe('Geographical Location Database & Local PSEO Matrix', () => {
  it('contains all 353 locations in database', () => {
    expect(LOCATION_DATABASE).toHaveLength(353);
  });

  it('every location has valid id, name, slug, city, region, pincode, and coordinates', () => {
    for (const loc of LOCATION_DATABASE) {
      expect(loc.id).toBeGreaterThan(0);
      expect(loc.name).toBeTruthy();
      expect(loc.slug).toBeTruthy();
      expect(loc.city).toBeTruthy();
      expect(loc.region).toBeTruthy();
      expect(loc.pincode).toMatch(/^\d{6}(?:\s*\/\s*\d{6})?$/);
      expect(typeof loc.latitude).toBe('number');
      expect(typeof loc.longitude).toBe('number');
      expect(loc.latitude).toBeGreaterThan(15);
      expect(loc.latitude).toBeLessThan(22);
      expect(loc.longitude).toBeGreaterThan(70);
      expect(loc.longitude).toBeLessThan(76);
      expect(loc.hasHomeCollection).toBe(true);
      expect(loc.sameDayReportDelivery).toBe(true);
      expect(loc.nearestPartnerHub).toBeTruthy();
    }
  });

  it('correctly looks up locations by slug', () => {
    const colaba = getLocationBySlug('colaba');
    expect(colaba).toBeDefined();
    expect(colaba?.name).toBe('Colaba');
    expect(colaba?.pincode).toBe('400005');
    expect(colaba?.latitude).toBeCloseTo(18.9145, 3);
    expect(colaba?.longitude).toBeCloseTo(72.8241, 3);

    const kharghar = getLocationBySlug('kharghar');
    expect(kharghar).toBeDefined();
    expect(kharghar?.name).toBe('Kharghar');
    expect(kharghar?.pincode).toBe('410210');
  });

  it('correctly disambiguates locations when regionSlug is provided', () => {
    const panvelNavi = getLocationBySlug('old-panvel', 'navi-mumbai');
    expect(panvelNavi).toBeDefined();
    expect(panvelNavi?.region).toBe('navi-mumbai');

    const panvelRaigad = getLocationBySlug('old-panvel', 'raigad');
    expect(panvelRaigad).toBeDefined();
    expect(panvelRaigad?.region).toBe('raigad');
  });

  it('looks up locations by postal PIN code', () => {
    const southMumbaiPins = getLocationsByPincode('400005');
    expect(southMumbaiPins.length).toBeGreaterThanOrEqual(4);
    const names = southMumbaiPins.map(l => l.name);
    expect(names).toContain('Colaba');
    expect(names).toContain('Cuffe Parade');
    expect(names).toContain('Colaba Causeway');
    expect(names).toContain('Sassoon Dock');

    const khargharPins = getLocationsByPincode('410210');
    expect(khargharPins.length).toBeGreaterThanOrEqual(5);
  });

  it('filters locations by city and region', () => {
    const puneLocations = getLocationsByRegion('pune');
    expect(puneLocations.length).toBe(75);

    const thaneLocations = getLocationsByRegion('thane');
    expect(thaneLocations.length).toBe(51);

    const naviMumbaiLocations = getLocationsByRegion('navi-mumbai');
    expect(naviMumbaiLocations.length).toBe(84);
  });

  it('supports universal search query', () => {
    const bandraResults = searchLocations('bandra');
    expect(bandraResults.length).toBeGreaterThan(3);

    const pinResults = searchLocations('411057'); // Hinjewadi PIN
    expect(pinResults.length).toBeGreaterThanOrEqual(4);
    expect(pinResults.some(l => l.name.includes('Hinjewadi'))).toBe(true);
  });

  it('validates slugs with slug-validator', () => {
    expect(isValidLocationSlug('colaba')).toBe(true);
    expect(isValidLocationSlug('vashi-sector-17')).toBe(true);
    expect(isValidLocationSlug('hinjewadi-phase-1')).toBe(true);
    expect(isValidLocationSlug('non-existent-xyz')).toBe(false);

    expect(isValidLocationForRegion('south-mumbai', 'colaba')).toBe(true);
    expect(isValidLocationForRegion('pune', 'hinjewadi-phase-1')).toBe(true);
    expect(isValidLocationForRegion('south-mumbai', 'hinjewadi-phase-1')).toBe(false);
  });

  it('generates MedicalClinic JSON-LD schema with exact pincode and geo-coordinates', () => {
    const schema = generateLocationClinicSchema({
      regionSlug: 'south-mumbai',
      locationSlug: 'colaba',
      serviceSlug: 'mri-scan',
      serviceName: 'MRI Scan'
    });

    expect(schema['@type']).toBe('MedicalClinic');
    expect(schema.name).toBe('Henotic Diagnostics - Colaba');
    expect((schema.address as any).postalCode).toBe('400005');
    expect((schema.geo as any).latitude).toBe(18.9145);
    expect((schema.geo as any).longitude).toBe(72.8241);
    expect(schema.areaServed).toBeDefined();
  });
});
