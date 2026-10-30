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
  'stress-echo', 'dobutamine-stress-echo',
]);

// Priority-ordered regions (by traffic volume)
const REGION_PRIORITY = [
  'navi-mumbai', 'thane', 'western-suburbs', 'pune',
  'central-suburbs', 'south-mumbai', 'eastern-suburbs',
  'raigad', 'mumbai-suburban',
];

// Top metro locations across all regions (highest patient booking & traffic volume)
const TOP_LOCATIONS = [
  // Navi Mumbai Hubs
  { city: 'kharghar', region: 'navi-mumbai' },
  { city: 'panvel', region: 'navi-mumbai' },
  { city: 'vashi', region: 'navi-mumbai' },
  { city: 'nerul', region: 'navi-mumbai' },
  { city: 'cbd-belapur', region: 'navi-mumbai' },
  { city: 'seawoods', region: 'navi-mumbai' },
  { city: 'kamothe', region: 'navi-mumbai' },
  { city: 'kalamboli', region: 'navi-mumbai' },
  { city: 'taloja', region: 'navi-mumbai' },
  { city: 'kopar-khairane', region: 'navi-mumbai' },
  { city: 'airoli', region: 'navi-mumbai' },
  // South Mumbai Hubs
  { city: 'colaba', region: 'south-mumbai' },
  { city: 'cuffe-parade', region: 'south-mumbai' },
  { city: 'fort', region: 'south-mumbai' },
  { city: 'marine-lines', region: 'south-mumbai' },
  { city: 'worli', region: 'south-mumbai' },
  { city: 'lower-parel', region: 'south-mumbai' },
  { city: 'dadar', region: 'south-mumbai' },
  // Western Suburbs Hubs
  { city: 'andheri', region: 'western-suburbs' },
  { city: 'bandra', region: 'western-suburbs' },
  { city: 'juhu', region: 'western-suburbs' },
  { city: 'goregaon', region: 'western-suburbs' },
  { city: 'malad', region: 'western-suburbs' },
  { city: 'kandivali', region: 'western-suburbs' },
  { city: 'borivali', region: 'western-suburbs' },
  // Central Suburbs Hubs
  { city: 'ghatkopar', region: 'central-suburbs' },
  { city: 'kurla', region: 'central-suburbs' },
  { city: 'chembur', region: 'central-suburbs' },
  { city: 'mulund', region: 'central-suburbs' },
  { city: 'powai', region: 'central-suburbs' },
  // Thane Hubs
  { city: 'thane-west', region: 'thane' },
  { city: 'dombivli', region: 'thane' },
  { city: 'kalyan', region: 'thane' },
  { city: 'mira-road', region: 'thane' },
  { city: 'bhiwandi', region: 'thane' },
  // Pune Hubs
  { city: 'pune-city', region: 'pune' },
  { city: 'kothrud', region: 'pune' },
  { city: 'baner', region: 'pune' },
  { city: 'hinjewadi', region: 'pune' },
  { city: 'hadapsar', region: 'pune' },
  { city: 'viman-nagar', region: 'pune' },
  { city: 'wakad', region: 'pune' },
  { city: 'pimpri-chinchwad', region: 'pune' },
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

// T1: T1 services × top locations
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

// T2: T2 services × top 15 locations
const top15Locations = TOP_LOCATIONS.slice(0, 15);
for (const s of t2Services) {
  for (const loc of top15Locations) {
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
console.log(`   Regions:    ${regionEntries.length}`);
console.log(`   Locations:  ${locationEntries.length} (covering ${TOP_LOCATIONS.length} top metro hubs)`);
console.log(`   Conditions: ${conditionEntries.length}`);
console.log(`   Total pre-build paths: ${serviceEntries.length + regionEntries.length + locationEntries.length + conditionEntries.length}`);
