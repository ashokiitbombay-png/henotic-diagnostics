/**
 * Payload CMS Database Index Definitions
 *
 * Provides the exact MongoDB index schema for Payload CMS collections
 * optimized for the PSEO architecture:
 * - 400+ service slugs → O(1) lookup
 * - 9 regions × 80+ locations → compound index for routing
 * - Conditions with service cross-references
 *
 * All indexes are designed to keep API response times strictly under 100ms
 * at 10k+ document scale.
 *
 * Usage:
 *   import { PAYLOAD_INDEXES } from '@/lib/payload/indexes';
 *   // Pass to scripts/payload-create-indexes.ts for execution
 */

// ── Index Definition Types ───────────────────────────────────────────────────

export interface IndexDefinition {
  /** Name of the index (for identification and idempotent creates) */
  name: string;
  /** The index key specification */
  key: Record<string, 1 | -1 | 'text'>;
  /** Whether to enforce uniqueness */
  unique?: boolean;
  /** Whether to build the index in background (non-blocking) */
  background: boolean;
  /** Sparse index — only indexes documents where the field exists */
  sparse?: boolean;
  /** Rationale for this index */
  purpose: string;
}

export interface CollectionIndexes {
  /** The MongoDB collection name (Payload adds plural + lowercase) */
  collection: string;
  /** The Payload collection slug */
  payloadSlug: string;
  indexes: IndexDefinition[];
}

// ── Index Definitions ────────────────────────────────────────────────────────

/**
 * Services Collection Indexes
 *
 * Optimized for:
 * - Single service lookup by slug (PSEO service pages)
 * - Category filtering (service category pages)
 * - Region-based service discovery (regional grids)
 * - Webhook-ordered updates (recent changes first)
 * - Full-text search (admin search)
 */
const SERVICES_INDEXES: CollectionIndexes = {
  collection: 'services',
  payloadSlug: 'services',
  indexes: [
    {
      name: 'idx_services_slug',
      key: { slug: 1 },
      unique: true,
      background: true,
      purpose: 'O(1) service lookup by slug — primary PSEO access pattern',
    },
    {
      name: 'idx_services_regions_slug',
      key: { 'regions.slug': 1 },
      background: true,
      purpose: 'Regional grid queries — find all services available in a region',
    },
    {
      name: 'idx_services_category_slug',
      key: { 'category.slug': 1, slug: 1 },
      background: true,
      purpose: 'Category listing pages — compound for category + slug lookups',
    },
    {
      name: 'idx_services_updatedAt',
      key: { updatedAt: -1 },
      background: true,
      purpose: 'Webhook processing — order by most recently updated',
    },
    {
      name: 'idx_services_isActive_slug',
      key: { isActive: 1, slug: 1 },
      background: true,
      purpose: 'Active service enumeration for sitemap and build-priorities',
    },
    {
      name: 'idx_services_text_search',
      key: { slug: 'text' as const, title: 'text' as const },
      background: true,
      purpose: 'Full-text search in admin panel and API search endpoints',
    },
  ],
};

/**
 * Regions Collection Indexes
 *
 * Optimized for:
 * - Region lookup by slug (PSEO region pages)
 * - Location-within-region queries (PSEO location pages)
 * - Compound slug+location for direct PSEO routing
 */
const REGIONS_INDEXES: CollectionIndexes = {
  collection: 'regions',
  payloadSlug: 'regions',
  indexes: [
    {
      name: 'idx_regions_slug',
      key: { slug: 1 },
      unique: true,
      background: true,
      purpose: 'O(1) region lookup by slug',
    },
    {
      name: 'idx_regions_locations_slug',
      key: { 'locations.slug': 1 },
      background: true,
      purpose: 'Find region by location slug — reverse lookup for PSEO routing',
    },
    {
      name: 'idx_regions_compound_routing',
      key: { slug: 1, 'locations.slug': 1 },
      background: true,
      purpose: 'Compound index for /services/[service]/[region]/[location] validation',
    },
    {
      name: 'idx_regions_isActive',
      key: { isActive: 1, slug: 1 },
      background: true,
      purpose: 'Active region enumeration for sitemap generation',
    },
  ],
};

/**
 * Conditions Collection Indexes
 *
 * Optimized for:
 * - Condition lookup by slug (condition landing pages)
 * - Cross-reference to related services
 * - Full-text search for admin
 */
const CONDITIONS_INDEXES: CollectionIndexes = {
  collection: 'conditions',
  payloadSlug: 'conditions',
  indexes: [
    {
      name: 'idx_conditions_slug',
      key: { slug: 1 },
      unique: true,
      background: true,
      purpose: 'O(1) condition page lookup by slug',
    },
    {
      name: 'idx_conditions_related_services',
      key: { relatedServices: 1 },
      background: true,
      purpose: 'Find conditions related to a specific service — cross-reference queries',
    },
    {
      name: 'idx_conditions_isActive',
      key: { isActive: 1, slug: 1 },
      background: true,
      purpose: 'Active condition enumeration for sitemap',
    },
    {
      name: 'idx_conditions_text_search',
      key: { slug: 'text' as const, title: 'text' as const },
      background: true,
      purpose: 'Full-text search for conditions in admin and API',
    },
  ],
};

/**
 * Categories Collection Indexes
 *
 * Optimized for:
 * - Category lookup by slug (category pages)
 * - Parent-child category hierarchy
 */
const CATEGORIES_INDEXES: CollectionIndexes = {
  collection: 'categories',
  payloadSlug: 'categories',
  indexes: [
    {
      name: 'idx_categories_slug',
      key: { slug: 1 },
      unique: true,
      background: true,
      purpose: 'O(1) category lookup by slug',
    },
    {
      name: 'idx_categories_parent',
      key: { parentCategory: 1 },
      background: true,
      sparse: true,
      purpose: 'Category hierarchy traversal — find children of a parent',
    },
  ],
};

/**
 * Locations Collection Indexes (if stored as a separate collection)
 */
const LOCATIONS_INDEXES: CollectionIndexes = {
  collection: 'locations',
  payloadSlug: 'locations',
  indexes: [
    {
      name: 'idx_locations_slug',
      key: { slug: 1 },
      unique: true,
      background: true,
      purpose: 'O(1) location lookup by slug',
    },
    {
      name: 'idx_locations_isActive',
      key: { isActive: 1, slug: 1 },
      background: true,
      purpose: 'Active location enumeration',
    },
  ],
};

// ── Exported Index Registry ──────────────────────────────────────────────────

/**
 * Complete index registry for all Payload CMS collections.
 * Used by `scripts/payload-create-indexes.ts` for automated index management.
 *
 * Performance targets:
 * | Collection  | Document Count | Target Latency |
 * |-------------|----------------|----------------|
 * | services    | 400+           | < 10ms         |
 * | regions     | 9              | < 5ms          |
 * | conditions  | 200+           | < 10ms         |
 * | categories  | 20+            | < 5ms          |
 * | locations   | 80+            | < 5ms          |
 */
export const PAYLOAD_INDEXES: CollectionIndexes[] = [
  SERVICES_INDEXES,
  REGIONS_INDEXES,
  CONDITIONS_INDEXES,
  CATEGORIES_INDEXES,
  LOCATIONS_INDEXES,
];

/**
 * Returns the index definitions for a specific collection.
 */
export function getIndexesForCollection(slug: string): IndexDefinition[] {
  const collection = PAYLOAD_INDEXES.find(c => c.payloadSlug === slug);
  return collection?.indexes ?? [];
}
