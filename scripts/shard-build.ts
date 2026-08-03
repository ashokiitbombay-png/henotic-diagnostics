import { execSync } from 'child_process';

/**
 * 🚀 Build Shard Runner Script
 * Parses `--shard=INDEX/TOTAL` flags from command line args.
 * Sets environment variables and launches pre-build sitemap generation + next build.
 *
 * Example Usage:
 *   npx tsx scripts/shard-build.ts --shard=0/4
 *   npx tsx scripts/shard-build.ts --shard=1/4
 */
function parseShardArg(): { shardIndex: number; shardTotal: number } | null {
  const args = process.argv.slice(2);
  const shardArg = args.find(arg => arg.startsWith('--shard='));

  if (!shardArg) {
    return null;
  }

  const value = shardArg.replace('--shard=', '').trim();
  const parts = value.split('/');

  if (parts.length !== 2) {
    console.error('❌ Invalid --shard argument format. Use --shard=INDEX/TOTAL (e.g. --shard=0/4)');
    process.exit(1);
  }

  const shardIndex = parseInt(parts[0], 10);
  const shardTotal = parseInt(parts[1], 10);

  if (isNaN(shardIndex) || isNaN(shardTotal) || shardIndex < 0 || shardIndex >= shardTotal) {
    console.error(`❌ Invalid shard range: ${shardIndex}/${shardTotal}. Shard index must be between 0 and ${shardTotal - 1}`);
    process.exit(1);
  }

  return { shardIndex, shardTotal };
}

function main() {
  const shardConfig = parseShardArg();

  const env = { ...process.env };

  if (shardConfig) {
    console.log(`🧩 Launching Sharded Build: Worker ${shardConfig.shardIndex + 1} of ${shardConfig.shardTotal}`);
    env.BUILD_SHARD_INDEX = String(shardConfig.shardIndex);
    env.BUILD_SHARD_TOTAL = String(shardConfig.shardTotal);
  } else {
    console.log('⚡ Launching Monolithic Build (all routes)');
  }

  try {
    console.log('🗺️ Generating XML sitemaps...');
    execSync('npx tsx scripts/generate-sitemaps.ts', { stdio: 'inherit', env });

    console.log('🏗️ Launching Next.js build...');
    execSync('npx next build --webpack', { stdio: 'inherit', env });

    console.log('✅ Sharded build completed successfully!');
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

main();
