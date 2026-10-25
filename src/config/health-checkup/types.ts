/**
 * Health Checkup Authority Pages — shared domain types.
 *
 * These types describe the normalised shape consumed by the components in
 * `src/components/health-checkup/`. Data can originate from Payload CMS
 * (collections `health-packages`, `health-checkup-pages` and global
 * `health-checkup-trust`) or from the static fallback config in this folder.
 * The mapper in `src/lib/payload/health-checkups.ts` converts both sources
 * into these shapes so the UI never needs to know where data came from.
 */

export type PackageAudience = 'Men' | 'Women' | 'Seniors';
export type PackageFilter = 'ALL' | PackageAudience;

export interface PackageArchTheme {
  archBg: string;
  accentBorder: string;
  badgeBg: string;
  gradientBottom: string;
  pillColor: string;
  glow: string;
  lineColor: string;
}

export interface PackageTestCategory {
  name: string;
  count: number;
  tests: string[];
}

export interface HealthPackage {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  target: PackageAudience[];
  totalTests: number;
  mrp: number;
  offerPrice: number;
  discount: string;
  imageUrl: string;
  /** Intrinsic pixel width of `imageUrl` (used for srcset + CLS-safe sizing). */
  imageWidth: number;
  /** Intrinsic pixel height of `imageUrl`. */
  imageHeight: number;
  archTheme: PackageArchTheme;
  popular: boolean;
  highlights: string[];
  notes: string[];
  /** Whether overnight fasting is required (drives the card note pill). */
  fastingRequired: boolean;
  categories: PackageTestCategory[];
}

export interface PrimaryImage {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HealthCheckupPageContent {
  slug: string;
  /** Primary target keyword exactly as researched (e.g. "Full Body Check Up"). */
  keyword: string;
  /** Secondary / semantic keywords woven into copy and meta keywords. */
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  /** 40–60 word direct answer used for AEO / featured snippet eligibility. */
  quickAnswer: string;
  primaryImage: PrimaryImage;
  defaultFilter: PackageFilter;
  /** Package codes shown first (in this order); remaining packages follow. */
  featuredPackageCodes: string[];
  whoShouldBook: string[];
  sections: ContentSection[];
  preparation: string[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  /** ISO date (YYYY-MM-DD) of last medical review. */
  lastReviewed: string;
}

export interface InfrastructureItem {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface DoctorProfile {
  name: string;
  degrees: string;
  registration: string;
  bio: string;
  focus: string[];
  image: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  authority: string;
  logo: string;
  certImage: string;
  desc: string;
}

export interface AwardItem {
  id: string;
  title: string;
  category: string;
  year: string;
  organization: string;
  description: string;
  image: string;
  badgeLabel: string;
  accentGlow: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  service: string;
  quote: string;
  image: string;
  rating: number;
}

export interface HealthCheckupTrustContent {
  infrastructure: InfrastructureItem[];
  doctors: DoctorProfile[];
  certificates: CertificateItem[];
  awards: AwardItem[];
  testimonials: TestimonialItem[];
  googleRating: { rating: number; reviewCount: number; profileUrl: string; mapsUrl: string };
}

export interface HealthCheckupPageData {
  page: HealthCheckupPageContent;
  /** Packages already ordered for this page (featured first). */
  packages: HealthPackage[];
  trust: HealthCheckupTrustContent;
  /** Where the content came from — useful for debugging/observability. */
  source: { page: 'payload' | 'static'; packages: 'payload' | 'static'; trust: 'payload' | 'static' };
}
