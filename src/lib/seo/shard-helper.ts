/**
 * ⚡ Deterministic Build Sharding Helper for Programmatic SEO Pages
 * Slices static parameter arrays across parallel CI workers using env variables:
 * - BUILD_SHARD_INDEX (0..N-1)
 * - BUILD_SHARD_TOTAL (N)
 *
 * Example: With 4 workers, shard 0 gets indices 0, 4, 8...
 * shard 1 gets 1, 5, 9... creating 0 overlapping builds across workers.
 */
export function filterShardParams<T>(items: T[]): T[] {
  const shardIndexEnv = process.env.BUILD_SHARD_INDEX;
  const shardTotalEnv = process.env.BUILD_SHARD_TOTAL;

  if (!shardIndexEnv || !shardTotalEnv) {
    return items; // Standard single-worker build
  }

  const shardIndex = parseInt(shardIndexEnv, 10);
  const shardTotal = parseInt(shardTotalEnv, 10);

  if (isNaN(shardIndex) || isNaN(shardTotal) || shardTotal <= 1) {
    return items;
  }

  return items.filter((_, index) => index % shardTotal === shardIndex);
}
