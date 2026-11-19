import Link from 'next/link';
import { ArrowRight, Dna, MapPin } from 'lucide-react';
import { STATIC_NIPT_PAGES, type NiptPageContent } from '@/config/nipt-test';
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';

interface RelatedNiptLinksProps {
  currentSlug: string;
  relatedSlugs: string[];
  regionSlug?: string;
  locationSlug?: string;
  showRegionDirectory?: boolean;
}

const BY_SLUG = new Map(STATIC_NIPT_PAGES.map((p) => [p.slug, p]));

/** Canonical non-redirected region keys matching generate-sitemaps.ts. */
const CANONICAL_REGIONS = Object.keys(REGION_LOCATIONS).filter((r) => r !== 'mumbai-suburban');

/**
 * Internal-linking topic cluster hub across all 20 NIPT keyword slugs + regional hubs.
 * Preserves region/location context when rendered on Tier 2 or Tier 3 pages.
 */
export default function RelatedNiptLinks({
  currentSlug,
  relatedSlugs,
  regionSlug,
  locationSlug,
  showRegionDirectory = false,
}: RelatedNiptLinksProps) {
  const related = relatedSlugs
    .map((s) => BY_SLUG.get(s))
    .filter((p): p is NiptPageContent => Boolean(p && p.slug !== currentSlug));
  const cluster = STATIC_NIPT_PAGES.filter((p) => p.slug !== currentSlug);

  const buildHref = (slug: string) => {
    if (regionSlug && locationSlug) return `/services/${slug}/${regionSlug}/${locationSlug}`;
    if (regionSlug) return `/services/${slug}/${regionSlug}`;
    return `/services/${slug}`;
  };

  return (
    <section
      aria-labelledby="nipt-related-title"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-5 sm:p-8 shadow-sm space-y-6"
    >
      <div>
        <h2 id="nipt-related-title" className="text-2xl sm:text-3xl font-black text-slate-950 flex items-center gap-2.5">
          <Dna className="w-6 h-6 text-purple-700" aria-hidden="true" />
          <span>Related NIPT &amp; Prenatal Screening Guides</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore pricing, trisomy panels, Down syndrome screening, and blood test details across our NIPT resource hub.
        </p>
      </div>

      {related.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={buildHref(p.slug)}
                prefetch={false}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md hover:border-purple-300 transition"
              >
                <span className="text-sm font-black text-slate-900 group-hover:text-purple-800">{p.keyword}</span>
                <span className="mt-1 text-xs text-slate-600 line-clamp-2">{p.eyebrow}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-purple-700">
                  Explore {p.keyword}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <nav aria-label="All NIPT Prenatal Testing Pages" className="border-t border-slate-100 pt-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          All NIPT Screening Topics ({STATIC_NIPT_PAGES.length})
        </h3>
        <ul className="flex flex-wrap gap-2">
          {cluster.map((p) => (
            <li key={p.slug}>
              <Link
                href={buildHref(p.slug)}
                prefetch={false}
                className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:text-purple-800 transition"
              >
                {p.keyword}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {showRegionDirectory && (
        <nav aria-label="Regional NIPT Hubs" className="border-t border-slate-100 pt-5">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-pink-600" aria-hidden="true" />
            <span>NIPT Home Collection &amp; Centers by Region</span>
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CANONICAL_REGIONS.map((region) => (
              <li key={region}>
                <Link
                  href={`/services/${currentSlug}/${region}`}
                  prefetch={false}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-purple-50 hover:border-purple-300 text-xs font-bold text-slate-800 hover:text-purple-900 transition"
                >
                  <span>{REGION_NAMES[region] || region}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
