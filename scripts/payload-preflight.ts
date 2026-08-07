#!/usr/bin/env node
/**
 * Payload CMS Pre-Flight Check
 *
 * Validates all prerequisites before running the index creation script.
 * Run: npx tsx scripts/payload-preflight.ts
 */

/* eslint-disable no-console */

const CHECKS = {
  env: ['MONGODB_URI', 'PAYLOAD_CMS_URL'],
  optionalEnv: ['PAYLOAD_API_KEY', 'PAYLOAD_WEBHOOK_SECRET'],
};

async function main() {
  console.log('🔍 Payload CMS Pre-Flight Check\n');
  console.log('═'.repeat(60));

  let allPassed = true;

  // ── Check Required Env Vars ────────────────────────────────────────
  console.log('\n📋 Required Environment Variables:');
  for (const envVar of CHECKS.env) {
    const value = process.env[envVar];
    if (value) {
      const masked = value.substring(0, 12) + '...' + value.substring(value.length - 4);
      console.log(`  ✅ ${envVar} = ${masked}`);
    } else {
      console.log(`  ❌ ${envVar} — NOT SET`);
      allPassed = false;
    }
  }

  // ── Check Optional Env Vars ────────────────────────────────────────
  console.log('\n📋 Optional Environment Variables:');
  for (const envVar of CHECKS.optionalEnv) {
    const value = process.env[envVar];
    if (value) {
      console.log(`  ✅ ${envVar} — configured`);
    } else {
      console.log(`  ⚠️  ${envVar} — not set (optional)`);
    }
  }

  // ── Check MongoDB Connectivity ─────────────────────────────────────
  if (process.env.MONGODB_URI) {
    console.log('\n🔗 MongoDB Connectivity:');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mongodb = await import('mongodb') as any;
      const client = new mongodb.MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db();
      const collections = await db.listCollections().toArray();
      console.log(`  ✅ Connected to database: ${db.databaseName}`);
      console.log(`  📦 Collections found: ${collections.map((c: { name: string }) => c.name).join(', ') || '(none — fresh database)'}`);
      await client.close();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log(`  ❌ Connection failed: ${msg}`);
      allPassed = false;
    }
  }

  // ── Check Payload CMS API ──────────────────────────────────────────
  if (process.env.PAYLOAD_CMS_URL) {
    console.log('\n🌐 Payload CMS API:');
    try {
      const url = `${process.env.PAYLOAD_CMS_URL}/api`;
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        console.log(`  ✅ Payload API responding at ${url} (${res.status})`);
      } else {
        console.log(`  ⚠️  Payload API returned ${res.status} at ${url}`);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log(`  ❌ Payload API unreachable: ${msg}`);
      allPassed = false;
    }
  }

  // ── Summary ────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(60));
  if (allPassed) {
    console.log('✅ All checks passed. Ready to run:');
    console.log('   npx tsx scripts/payload-create-indexes.ts\n');
  } else {
    console.log('❌ Some checks failed. Fix the issues above, then run:');
    console.log('   npx tsx scripts/payload-preflight.ts\n');
    console.log('📖 Setup Guide:');
    console.log('   1. Set MONGODB_URI in .env.local:');
    console.log('      MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/payload-db"');
    console.log('   2. Set PAYLOAD_CMS_URL in .env.local:');
    console.log('      PAYLOAD_CMS_URL="https://payload.henoticdiagnostics.com"');
    console.log('   3. Set in Vercel dashboard: Settings → Environment Variables\n');
  }
}

main();
