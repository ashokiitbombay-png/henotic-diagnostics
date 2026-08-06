/**
 * ⚡ Build Priority Manifest Generator
 * 
 * Generates src/config/build-priorities.json — the manifest that controls
 * which URLs are pre-rendered at build time via generateStaticParams().
 * 
 * Run: npx tsx scripts/generate-build-priorities.ts
 */
import fs from 'fs';
import path from 'path';
import { services } from '../src/config/services';
import { REGION_LOCATIONS } from '../src/config/locations';
import { CONDITIONS } from '../src/config/conditions';

// ============================================================
// TIER DEFINITIONS
// ============================================================

const T1_SERVICES = new Set([
  'mri-scan', 'ct-scan', 'pet-scan', 'ultrasound', 'blood-test',
  '2d-echo', 'dexa-bone-scan', 'full-body-check-up', 'nipt-test', 'ecg',
  'tmt-test', 'holter-monitoring', 'mammography', 'pregnancy-sonography',
  'anomaly-scan', 'nt-scan', 'color-doppler', 'fibroscan', 'angiography',
  'angioplasty', 'hrct-scan', 'whole-body-pet-ct', 'cardiac-ct-scan',
  'thyroid-test', 'liver-function-test', 'kidney-function-test',
  'master-health-checkup', 'health-checkup', 'preventive-health-checkup',
  'cancer-screening', 'cbc-test', 'lipid-profile', 'hba1c-test',
  'vitamin-d-test', 'vitamin-b12-test', 'hsg-test', 'abdominal-ultrasound',
  'pelvic-ultrasound', 'breast-ultrasound', 'mri-brain', 'mri-knee',
  'mri-spine', 'ct-brain', 'hrct-chest', 'pet-ct', 'spect-scan',
  'bone-scan', 'cardiac-mri', 'fetal-echo', 'genetic-test',
]);

// Priority-ordered regions (by traffic volume)
const REGION_PRIORITY = [
  'navi-mumbai', 'thane', 'western-suburbs', 'pune',
  'central-suburbs', 'south-mumbai', 'eastern-suburbs',
  'raigad', 'mumbai-suburban',
];

// Top 20 metro locations (highest booking volume)
const TOP_LOCATIONS = [
  { city: 'kharghar', region: 'navi-mumbai' },
  { city: 'panvel', region: 'navi-mumbai' },
  { city: 'vashi', region: 'navi-mumbai' },
  { city: 'nerul', region: 'navi-mumbai' },
  { city: 'cbd-belapur', region: 'navi-mumbai' },
  { city: 'kamothe', region: 'navi-mumbai' },
  { city: 'kalamboli', region: 'navi-mumbai' },
  { city: 'taloja', region: 'navi-mumbai' },
  { city: 'kopar-khairane', region: 'navi-mumbai' },
  { city: 'airoli', region: 'navi-mumbai' },
  { city: 'thane-west', region: 'thane' },
  { city: 'dombivli', region: 'thane' },
  { city: 'kalyan', region: 'thane' },
  { city: 'andheri', region: 'western-suburbs' },
  { city: 'bandra', region: 'western-suburbs' },
  { city: 'borivali', region: 'western-suburbs' },
  { city: 'ghatkopar', region: 'central-suburbs' },
  { city: 'pune-city', region: 'pune' },
  { city: 'hinjewadi', region: 'pune' },
  { city: 'hadapsar', region: 'pune' },
];

// ============================================================
// BUILD MANIFEST
// ============================================================

interface ServiceEntry { service: string; tier: number }
interface RegionEntry { service: string; region: string; tier: number }
interface LocationEntry { service: string; region: string; location: string; tier: number }
interface ConditionEntry { condition: string; tier: number }

// 1. Service priorities (all 401, tiered)
const serviceEntries: ServiceEntry[] = [];
const t2Services: string[] = [];
const t3Services: string[] = [];

// T1 first (in order from T1_SERVICES, filtered to actual services array)
for (const s of services) {
  if (T1_SERVICES.has(s)) {
    serviceEntries.push({ service: s, tier: 1 });
  }
}

// T2: next 150 services not in T1
let t2Count = 0;
for (const s of services) {
  if (!T1_SERVICES.has(s) && t2Count < 150) {
    serviceEntries.push({ service: s, tier: 2 });
    t2Services.push(s);
    t2Count++;
  }
}

// T3: remaining services
for (const s of services) {
  if (!T1_SERVICES.has(s) && !t2Services.includes(s)) {
    serviceEntries.push({ service: s, tier: 3 });
    t3Services.push(s);
  }
}

// 2. Region priorities
const regionEntries: RegionEntry[] = [];

// T1: T1 services × all regions
const t1ServiceList = services.filter(s => T1_SERVICES.has(s));
for (const s of t1ServiceList) {
  for (const r of REGION_PRIORITY) {
    regionEntries.push({ service: s, region: r, tier: 1 });
  }
}

// T2: T2 services × top 5 regions
const top5Regions = REGION_PRIORITY.slice(0, 5);
for (const s of t2Services) {
  for (const r of top5Regions) {
    regionEntries.push({ service: s, region: r, tier: 2 });
  }
}

// T3: T3 services × top 3 regions
const top3Regions = REGION_PRIORITY.slice(0, 3);
for (const s of t3Services) {
  for (const r of top3Regions) {
    regionEntries.push({ service: s, region: r, tier: 3 });
  }
}

// 3. Location priorities
const locationEntries: LocationEntry[] = [];

// T1: T1 services × top 20 locations
for (const s of t1ServiceList) {
  for (const loc of TOP_LOCATIONS) {
    locationEntries.push({
      service: s,
      region: loc.region,
      location: loc.city,
      tier: 1,
    });
  }
}

// T2: T2 services × top 10 locations
const top10Locations = TOP_LOCATIONS.slice(0, 10);
for (const s of t2Services) {
  for (const loc of top10Locations) {
    locationEntries.push({
      service: s,
      region: loc.region,
      location: loc.city,
      tier: 2,
    });
  }
}

// 4. Condition priorities
const conditionEntries: ConditionEntry[] = CONDITIONS.map((c, i) => ({
  condition: c.id,
  tier: i < 30 ? 1 : 2,
}));

// ============================================================
// OUTPUT
// ============================================================

const manifest = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  totalPreBuild: {
    service: serviceEntries.length,
    region: regionEntries.length,
    location: locationEntries.length,
    condition: conditionEntries.length,
  },
  service: serviceEntries,
  region: regionEntries,
  location: locationEntries,
  condition: conditionEntries,
};

const outputPath = path.join(__dirname, '..', 'src', 'config', 'build-priorities.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('✅ Generated build-priorities.json');
console.log(`   Services:   ${serviceEntries.length} (T1: ${t1ServiceList.length}, T2: ${t2Services.length}, T3: ${t3Services.length})`);
console.log(`   Regions:    ${regionEntries.length} (T1: ${t1ServiceList.length * 9}, T2: ${t2Services.length * 5}, T3: ${t3Services.length * 3})`);
console.log(`   Locations:  ${locationEntries.length} (T1: ${t1ServiceList.length * 20}, T2: ${t2Services.length * 10})`);
console.log(`   Conditions: ${conditionEntries.length}`);
console.log(`   Total pre-build paths: ${serviceEntries.length + regionEntries.length + locationEntries.length + conditionEntries.length}`);
