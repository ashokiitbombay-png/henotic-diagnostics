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
}

export type PayloadCollectionSlug = keyof PayloadCollectionMap;
