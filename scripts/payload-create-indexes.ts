#!/usr/bin/env node
/**
 * Payload CMS — MongoDB Index Management Script
 *
 * Creates all required indexes for Payload CMS collections.
 * Safe to run multiple times (idempotent via createIndex).
 *
 * Usage:
 *   npx tsx scripts/payload-create-indexes.ts
 *
 * Environment:
 *   MONGODB_URI — MongoDB connection string for the Payload database
 *
 * What it does:
 *   1. Connects to MongoDB
 *   2. Creates indexes defined in src/lib/payload/indexes.ts
 *   3. Reports index sizes and validates with explain plans
 *   4. Disconnects cleanly
 */

/* eslint-disable no-console */

interface IndexDefinition {
  name: string;
  key: Record<string, 1 | -1 | 'text'>;
  unique?: boolean;
  background: boolean;
  sparse?: boolean;
  purpose: string;
}

interface CollectionIndexes {
  collection: string;
  payloadSlug: string;
  indexes: IndexDefinition[];
}

// ── Index Definitions (inline to avoid import path issues in scripts) ────────

const PAYLOAD_INDEXES: CollectionIndexes[] = [
  {
    collection: 'services',
    payloadSlug: 'services',
    indexes: [
      { name: 'idx_services_slug', key: { slug: 1 }, unique: true, background: true, purpose: 'O(1) service lookup by slug' },
      { name: 'idx_services_regions_slug', key: { 'regions.slug': 1 }, background: true, purpose: 'Regional grid queries' },
      { name: 'idx_services_category_slug', key: { 'category.slug': 1, slug: 1 }, background: true, purpose: 'Category listing pages' },
      { name: 'idx_services_updatedAt', key: { updatedAt: -1 }, background: true, purpose: 'Webhook processing order' },
      { name: 'idx_services_isActive_slug', key: { isActive: 1, slug: 1 }, background: true, purpose: 'Active service enumeration' },
      { name: 'idx_services_text_search', key: { slug: 'text', title: 'text' }, background: true, purpose: 'Full-text search' },
    ],
  },
  {
    collection: 'regions',
    payloadSlug: 'regions',
    indexes: [
      { name: 'idx_regions_slug', key: { slug: 1 }, unique: true, background: true, purpose: 'O(1) region lookup' },
      { name: 'idx_regions_locations_slug', key: { 'locations.slug': 1 }, background: true, purpose: 'Reverse location lookup' },
      { name: 'idx_regions_compound_routing', key: { slug: 1, 'locations.slug': 1 }, background: true, purpose: 'PSEO routing compound' },
      { name: 'idx_regions_isActive', key: { isActive: 1, slug: 1 }, background: true, purpose: 'Active region enumeration' },
    ],
  },
  {
    collection: 'conditions',
    payloadSlug: 'conditions',
    indexes: [
      { name: 'idx_conditions_slug', key: { slug: 1 }, unique: true, background: true, purpose: 'O(1) condition lookup' },
      { name: 'idx_conditions_related_services', key: { relatedServices: 1 }, background: true, purpose: 'Service cross-reference' },
      { name: 'idx_conditions_isActive', key: { isActive: 1, slug: 1 }, background: true, purpose: 'Active condition enumeration' },
      { name: 'idx_conditions_text_search', key: { slug: 'text', title: 'text' }, background: true, purpose: 'Full-text search' },
    ],
  },
  {
    collection: 'categories',
    payloadSlug: 'categories',
    indexes: [
      { name: 'idx_categories_slug', key: { slug: 1 }, unique: true, background: true, purpose: 'O(1) category lookup' },
      { name: 'idx_categories_parent', key: { parentCategory: 1 }, background: true, sparse: true, purpose: 'Category hierarchy' },
    ],
  },
  {
    collection: 'locations',
    payloadSlug: 'locations',
    indexes: [
      { name: 'idx_locations_slug', key: { slug: 1 }, unique: true, background: true, purpose: 'O(1) location lookup' },
      { name: 'idx_locations_isActive', key: { isActive: 1, slug: 1 }, background: true, purpose: 'Active location enumeration' },
    ],
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is required.');
    console.error('   Usage: MONGODB_URI="mongodb://..." npx tsx scripts/payload-create-indexes.ts');
    process.exit(1);
  }

  // Dynamic import — mongodb may not be in the main project deps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let MongoClient: any;
  try {
    // @ts-ignore — dynamic optional import
    const mongodb = await import('mongodb');
    MongoClient = mongodb.MongoClient;
  } catch {
    console.error('❌ "mongodb" package not found. Install it:');
    console.error('   npm install -D mongodb');
    process.exit(1);
  }

  console.log('🔗 Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(); // Uses the database from the URI

    console.log(`📦 Database: ${db.databaseName}\n`);

    let totalCreated = 0;
    let totalSkipped = 0;

    for (const collectionDef of PAYLOAD_INDEXES) {
      const { collection, indexes } = collectionDef;
      console.log(`\n── ${collection.toUpperCase()} ──────────────────────────────────`);

      const col = db.collection(collection);

      for (const idx of indexes) {
        try {
          const options: Record<string, unknown> = {
            name: idx.name,
            background: idx.background,
          };
          if (idx.unique) options.unique = true;
          if (idx.sparse) options.sparse = true;

          await col.createIndex(idx.key as Record<string, 1 | -1 | 'text'>, options);
          console.log(`  ✅ ${idx.name} — ${idx.purpose}`);
          totalCreated++;
        } catch (error: unknown) {
          const errMsg = error instanceof Error ? error.message : String(error);
          if (errMsg.includes('already exists')) {
            console.log(`  ⏭️  ${idx.name} — already exists (skipped)`);
            totalSkipped++;
          } else {
            console.error(`  ❌ ${idx.name} — FAILED: ${errMsg}`);
          }
        }
      }

      // Report collection stats
      try {
        const stats = await col.stats();
        console.log(`  📊 Documents: ${stats.count}, Index Size: ${formatBytes(stats.totalIndexSize)}`);
      } catch {
        console.log(`  📊 Collection may not exist yet (will be created on first insert)`);
      }
    }

    // ── Validation: Run explain on key queries ────────────────────────────

    console.log('\n── QUERY PLAN VALIDATION ──────────────────────────────────');

    const validations = [
      {
        collection: 'services',
        query: { slug: 'mri-scan' },
        label: 'Service by slug',
      },
      {
        collection: 'services',
        query: { 'regions.slug': 'navi-mumbai' },
        label: 'Services by region',
      },
      {
        collection: 'regions',
        query: { slug: 'navi-mumbai', 'locations.slug': 'kharghar' },
        label: 'Region + location compound',
      },
      {
        collection: 'conditions',
        query: { slug: 'diabetes' },
        label: 'Condition by slug',
      },
    ];

    for (const v of validations) {
      try {
        const col = db.collection(v.collection);
        const explain = await col.find(v.query).explain('executionStats');
        const stage = explain.queryPlanner?.winningPlan?.inputStage?.stage
          || explain.queryPlanner?.winningPlan?.stage
          || 'UNKNOWN';
        const execTimeMs = explain.executionStats?.executionTimeMillis ?? 'N/A';
        const passed = stage === 'IXSCAN' || stage === 'FETCH';
        console.log(
          `  ${passed ? '✅' : '⚠️'} ${v.label}: ${stage} (${execTimeMs}ms)`
        );
      } catch {
        console.log(`  ⏭️  ${v.label}: Collection not found (OK for fresh installs)`);
      }
    }

    console.log(`\n📋 Summary: ${totalCreated} indexes created, ${totalSkipped} already existed`);
    console.log('✅ Index management complete.\n');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

main();
