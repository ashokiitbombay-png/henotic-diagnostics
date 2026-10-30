/**
 * Seed / sync Payload CMS with the 350+ geographical locations database.
 *
 * Upserts:
 *   - 353 locations → collection `locations` (matched by `slug`)
 *
 * SAFE BY DEFAULT: runs as a dry run and only prints the planned operations.
 * Pass `--apply` to write to Payload. Existing documents are updated (PATCH) — never deleted.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/payload-seed-locations.ts            # dry run
 *   npx tsx --env-file=.env.local scripts/payload-seed-locations.ts --apply    # write
 */
import { LOCATION_DATABASE, CITY_MICRO_NEIGHBORHOODS } from '../src/config/locations';

const APPLY = process.argv.includes('--apply');
const BASE = process.env.PAYLOAD_CMS_URL?.replace(/\/+$/, '');
const API_KEY = process.env.PAYLOAD_API_KEY;

if (!BASE) {
  console.log('ℹ PAYLOAD_CMS_URL is not configured. Running dry-run verification mode.');
}

const headers: Record<string, string> = { 'Content-Type': 'application/json' };
if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

async function findOne(collection: string, field: string, value: string): Promise<{ id: string } | null> {
  const where = encodeURIComponent(JSON.stringify({ [field]: { equals: value } }));
  const out = await api<{ docs: Array<{ id: string }> }>('GET', `/api/${collection}?where=${where}&limit=1&depth=0`);
  return out.docs[0] ?? null;
}

async function upsertLocation(data: Record<string, unknown>): Promise<string | null> {
  const slug = data.slug as string;
  if (!BASE || !APPLY) {
    console.log(`  [dry-run] ${slug} (${data.name}) → PIN: ${data.pincode} [${data.latitude}, ${data.longitude}]`);
    return null;
  }
  const existing = await findOne('locations', 'slug', slug);
  if (existing) {
    await api('PATCH', `/api/locations/${existing.id}`, data);
    console.log(`  ✔ updated locations slug=${slug}`);
    return existing.id;
  }
  const created = await api<{ doc: { id: string } }>('POST', '/api/locations', data);
  console.log(`  ✔ created locations slug=${slug}`);
  return created.doc.id;
}

async function main() {
  console.log(`Payload CMS Location Sync: ${BASE || 'local offline'}`);
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Total locations in queue: ${LOCATION_DATABASE.length}\n`);

  let count = 0;
  for (const loc of LOCATION_DATABASE) {
    count++;
    const microList = CITY_MICRO_NEIGHBORHOODS[loc.slug] || [loc.name];
    const microNeighborhoods = microList.map(text => ({ text }));

    await upsertLocation({
      name: loc.name,
      slug: loc.slug,
      city: loc.city,
      region: loc.region,
      regionName: loc.regionName,
      pincode: loc.pincode,
      coordinates: {
        latitude: loc.latitude,
        longitude: loc.longitude
      },
      latitude: loc.latitude,
      longitude: loc.longitude,
      formattedAddress: loc.formattedAddress,
      section: loc.section,
      serviceTier: loc.serviceTier,
      hasHomeCollection: loc.hasHomeCollection,
      homeCollectionTurnaround: loc.homeCollectionTurnaround,
      sameDayReportDelivery: loc.sameDayReportDelivery,
      nearestPartnerHub: loc.nearestPartnerHub,
      microNeighborhoods,
      seo: {
        metaTitle: `Best Diagnostic Center & Pathology Lab in ${loc.name}, PIN ${loc.pincode} | Henotic Diagnostics`,
        metaDescription: `NABL accredited diagnostic center serving ${loc.name} (${loc.pincode}), ${loc.city}. Walk-in scans & 24/7 home blood sample collection with same-day reports.`,
        keywords: `${loc.name} diagnostic center, blood test in ${loc.name}, MRI scan ${loc.name}, pathology lab ${loc.pincode}`,
      },
      isActive: true,
    });
  }

  console.log(`\n✅ Completed processing ${count} locations.`);
}

main().catch((err) => {
  console.error('✖ Failed:', err);
  process.exit(1);
});
