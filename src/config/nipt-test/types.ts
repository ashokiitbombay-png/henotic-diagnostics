/**
 * NIPT Prenatal Screening Authority Pages — shared domain types.
 *
 * Normalized shapes consumed by `src/components/nipt-test/` and populated
 * from Payload CMS (`nipt-panels`, `nipt-pages`, global `nipt-trust`)
 * or the static clinical fallback in `src/config/nipt-test/`.
 */

export interface NiptPanelArchTheme {
  archBg: string;
  accentBorder: string;
  glow: string;
  lineColor: string;
  gradientBelowImage: string;
  cardHeaderTint: string;
  badgeBg: string;
  ctaGradient: string;
  ctaShadow?: string;
  tagStyle?: string;
  cardRing?: string;
}

export interface NiptPanelParameter {
  param: string;
  detail: string;
}

export interface NiptPanel {
  id: string;
  code: string;
  badgeNumber: string;
  topPillLabel: string;
  discountBadge: string;
  tags: string[];
  testsCountNumber: string;
  testsCountUnit: string;
  shortTag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  totalTestsLabel: string;
  totalTestsCount: string;
  tat: string;
  mrp: number;
  offerPrice: number;
  savings: number;
  sampleType: string;
  gestation: string;
  popular: boolean;
  ribbonText: string;
  colHeaders: [string, string];
  archTheme: NiptPanelArchTheme;
  parameters: NiptPanelParameter[];
}

export interface NiptComparisonRow {
  parameter: string;
  basic: 'included' | 'excluded' | string;
  advanced: 'included' | 'excluded' | string;
  comprehensive: 'included' | 'excluded' | string;
}

export interface NiptPrerequisite {
  req: string;
  detail: string;
}

export interface NiptProcessStep {
  step: string;
  title: string;
  desc: string;
  iconName: 'Stethoscope' | 'Baby' | 'Droplets' | 'ShieldCheck' | 'Dna' | 'Microscope' | 'FileText' | 'HeartHandshake';
}

export interface NiptSampleSpec {
  param: string;
  detail: string;
}

export interface NiptResultGuide {
  status: string;
  badgeClass: string;
  dotClass: string;
  meaning: string;
}

export interface NiptReportHighlight {
  title: string;
  desc: string;
}

export interface NiptPrimaryImage {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface NiptContentSection {
  heading: string;
  body: string;
}

export interface NiptFaqItem {
  question: string;
  answer: string;
}

export interface NiptPageContent {
  slug: string;
  /** Primary target keyword (e.g. "NIPT Test"). */
  keyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  eyebrow: string;
  intro: string;
  /** Concise 35-70 word direct answer for AEO / AI Overview / featured snippet. */
  quickAnswer: string;
  primaryImage: NiptPrimaryImage;
  /** Panel codes ordered for this keyword intent (e.g. ['NIPT-BASIC', 'NIPT-COMP', 'NIPT-ADV']). */
  featuredPanelCodes: string[];
  whoShouldBook: string[];
  sections: NiptContentSection[];
  faqs: NiptFaqItem[];
  relatedSlugs: string[];
  /** ISO date (YYYY-MM-DD) of last clinical review. */
  lastReviewed: string;
}

export interface NiptInfrastructureItem {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface NiptDoctorProfile {
  name: string;
  degrees: string;
  registration: string;
  bio: string;
  focus: string[];
  image: string;
}

export interface NiptCertificateItem {
  id: string;
  name: string;
  authority: string;
  logo: string;
  certImage: string;
  desc: string;
}

export interface NiptAwardItem {
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

export interface NiptTestimonialItem {
  id: number;
  name: string;
  service: string;
  quote: string;
  image: string;
  rating: number;
}

export interface NiptTrustContent {
  infrastructure: NiptInfrastructureItem[];
  doctors: NiptDoctorProfile[];
  certificates: NiptCertificateItem[];
  awards: NiptAwardItem[];
  testimonials: NiptTestimonialItem[];
  googleRating: { rating: number; reviewCount: number; profileUrl: string; mapsUrl: string };
}

export interface NiptLocationContext {
  regionSlug?: string;
  regionName?: string;
  locationSlug?: string;
  locationName?: string;
  cityName?: string;
  pincode?: string;
  homeCollectionTurnaround?: string;
  nearestPartnerHub?: string;
  serviceTier?: string;
  latitude?: number;
  longitude?: number;
  microNeighborhoods?: string[];
}

export interface NiptPageData {
  /** Requested URL slug (preserved for canonical / breadcrumb URLs even on synonym fallback). */
  routeSlug: string;
  page: NiptPageContent;
  panels: NiptPanel[];
  trust: NiptTrustContent;
  locationContext?: NiptLocationContext;
  source: { page: 'payload' | 'static'; panels: 'payload' | 'static'; trust: 'payload' | 'static' };
}
