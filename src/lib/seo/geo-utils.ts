import { getLocationBySlug } from '../../config/locations';

export const KHARGHAR_HUB = {
  name: 'Henotic Diagnostics — Sector 15, Kharghar',
  streetAddress: 'Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd',
  addressLocality: 'Sector 15, Kharghar, Navi Mumbai',
  addressRegion: 'Maharashtra',
  postalCode: '410210',
  addressCountry: 'IN',
  latitude: 19.0445195,
  longitude: 73.0787376,
  mapsUrl: 'https://maps.app.goo.gl/Ex2RG9afjvuEJp7y5',
} as const;

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Computes straight-line Haversine distance in kilometers between two WGS84 points.
 */
export function calculateHaversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Returns straight-line distance in kilometers from the Sector 15 Kharghar flagship center
 * to the given neighborhood slug (returns null if coordinates are unavailable).
 */
export function getDistanceFromHubKm(
  locationSlug: string,
  regionSlug?: string
): number | null {
  const loc = getLocationBySlug(locationSlug, regionSlug);
  if (!loc) return null;
  return calculateHaversineKm(
    KHARGHAR_HUB.latitude,
    KHARGHAR_HUB.longitude,
    loc.latitude,
    loc.longitude
  );
}

/**
 * Returns factual corridor / connectivity guidance from the patient's area to Sector 15, Kharghar.
 */
export function getEstimatedTravelSummary(distanceKm: number, regionSlug: string): string {
  if (distanceKm <= 10) {
    return 'Short drive via Sion–Panvel Expressway or Harbour Line rail to Kharghar Station (~1.2 km from our Sector 15 center).';
  }
  if (distanceKm <= 25 || regionSlug === 'navi-mumbai') {
    return 'Direct road access via Sion–Panvel Expressway, Palm Beach Road, or Harbour / Trans-Harbour rail to Sector 15, Kharghar.';
  }
  if (distanceKm <= 55) {
    return 'Accessible via Sion–Panvel Expressway, Eastern Freeway / Atal Setu (MTHL), or choose 24/7 doorstep blood collection.';
  }
  return 'Outstation regional corridor via Mumbai–Pune Expressway or Konkan highway; priority morning imaging slots & doorstep blood pickup available.';
}
