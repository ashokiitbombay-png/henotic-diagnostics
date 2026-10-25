/**
 * Payload CMS Collection Types
 * 
 * Type definitions for the Payload CMS headless backend.
 * These types map directly to Payload collection schemas and are used
 * by the Payload REST API client for type-safe data fetching.
 */

// ── Rich Text ────────────────────────────────────────────────────────────

export interface PayloadRichTextNode {
  type: string;
  children?: PayloadRichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  value?: PayloadMediaUpload;
  fields?: Record<string, unknown>;
}

export type PayloadRichText = PayloadRichTextNode[];

// ── Media ────────────────────────────────────────────────────────────────

export interface PayloadMediaUpload {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
  filename: string;
  sizes?: Record<string, { url: string; width: number; height: number }>;
}

// ── SEO ──────────────────────────────────────────────────────────────────

export interface PayloadSEO {
  title?: string;
  description?: string;
  image?: PayloadMediaUpload;
  keywords?: string;
}

// ── Pricing ──────────────────────────────────────────────────────────────

export interface PayloadPricing {
  mrp: number;
  sellingPrice: number;
  currency: 'INR';
  discountPercentage?: number;
}

// ── Location ─────────────────────────────────────────────────────────────

export interface PayloadLocation {
  id: string;
  name: string;
  slug: string;
  address?: string;
  coordinates?: { latitude: number; longitude: number };
  isActive: boolean;
}

// ── Region ───────────────────────────────────────────────────────────────

export interface PayloadRegion {
  id: string;
  name: string;
  slug: string;
  locations: PayloadLocation[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Category ─────────────────────────────────────────────────────────────

export interface PayloadCategory {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string | PayloadCategory;
  description?: string;
}

// ── Service ──────────────────────────────────────────────────────────────

export interface PayloadService {
  id: string;
  slug: string;
  title: string;
  content: PayloadRichText;
  excerpt?: string;
  featuredImage?: PayloadMediaUpload;
  category: string | PayloadCategory;
  regions: Array<string | PayloadRegion>;
  pricing: PayloadPricing;
  preparation?: string;
  duration?: string;
  seo: PayloadSEO;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Condition ────────────────────────────────────────────────────────────

export interface PayloadCondition {
  id: string;
  slug: string;
  title: string;
  content: PayloadRichText;
  relatedServices: Array<string | PayloadService>;
  seo: PayloadSEO;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Health Checkup Authority Content ─────────────────────────────────────
// Payload arrays of primitives are stored as `{ id, <field> }` rows; the
// mapper in `src/lib/payload/health-checkups.ts` accepts both shapes.

export type PayloadTextRow = string | { id?: string; text?: string; value?: string };

export interface PayloadHealthPackage {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  target?: Array<'Men' | 'Women' | 'Seniors'>;
  totalTests: number;
  pricing: PayloadPricing;
  discountLabel?: string;
  image?: PayloadMediaUpload | string | null;
  /** External CDN URL — used when no Payload media upload is attached. */
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  theme?: Partial<Record<'archBg' | 'accentBorder' | 'badgeBg' | 'gradientBottom' | 'pillColor' | 'glow' | 'lineColor', string>>;
  popular?: boolean;
  fastingRequired?: boolean;
  highlights?: PayloadTextRow[];
  notes?: PayloadTextRow[];
  categories?: Array<{ name: string; count?: number; tests?: PayloadTextRow[] }>;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PayloadHealthCheckupPage {
  id: string;
  slug: string;
  keyword?: string;
  secondaryKeywords?: PayloadTextRow[];
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  eyebrow?: string;
  intro?: string;
  quickAnswer?: string;
  primaryImage?: {
    media?: PayloadMediaUpload | string | null;
    url?: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
  defaultFilter?: 'ALL' | 'Men' | 'Women' | 'Seniors';
  featuredPackages?: Array<string | PayloadHealthPackage>;
  featuredPackageCodes?: PayloadTextRow[];
  whoShouldBook?: PayloadTextRow[];
  sections?: Array<{ heading: string; body: string }>;
  preparation?: PayloadTextRow[];
  faqs?: Array<{ question: string; answer: string }>;
  relatedSlugs?: PayloadTextRow[];
  lastReviewed?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PayloadHealthCheckupTrust {
  googleRating?: { rating?: number; reviewCount?: number; profileUrl?: string; mapsUrl?: string };
  infrastructure?: Array<{ title: string; subtitle?: string; image?: PayloadMediaUpload | string | null; imageUrl?: string; tag?: string }>;
  doctors?: Array<{ name: string; degrees?: string; registration?: string; bio?: string; focus?: PayloadTextRow[]; image?: PayloadMediaUpload | string | null; imageUrl?: string }>;
  certificates?: Array<{ certId?: string; name: string; authority?: string; logo?: PayloadMediaUpload | string | null; logoUrl?: string; certImage?: PayloadMediaUpload | string | null; certImageUrl?: string; desc?: string }>;
  awards?: Array<{ awardId?: string; title: string; category?: string; year?: string; organization?: string; description?: string; image?: PayloadMediaUpload | string | null; imageUrl?: string; badgeLabel?: string; accentGlow?: string }>;
  testimonials?: Array<{ name: string; service?: string; quote: string; image?: PayloadMediaUpload | string | null; imageUrl?: string; rating?: number }>;
}

/** Payload global slug → document type mapping */
export interface PayloadGlobalMap {
  'health-checkup-trust': PayloadHealthCheckupTrust;
}

export type PayloadGlobalSlug = keyof PayloadGlobalMap;

// ── Payload API Response Wrappers ────────────────────────────────────────

export interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadFindByIDResponse<T> {
  doc: T;
}

/** Payload collection name to document type mapping */
export interface PayloadCollectionMap {
  services: PayloadService;
  regions: PayloadRegion;
  locations: PayloadLocation;
  conditions: PayloadCondition;
  categories: PayloadCategory;
  media: PayloadMediaUpload;
  'health-packages': PayloadHealthPackage;
  'health-checkup-pages': PayloadHealthCheckupPage;
}

export type PayloadCollectionSlug = keyof PayloadCollectionMap;
