import Link from 'next/link';
import { ArrowRight, HeartPulse } from 'lucide-react';
import { STATIC_HEALTH_CHECKUP_PAGES } from '@/config/health-checkup';

interface RelatedCheckupLinksProps {
  currentSlug: string;
  relatedSlugs: string[];
}

const BY_SLUG = new Map(STATIC_HEALTH_CHECKUP_PAGES.map((p) => [p.slug, p]));

/**
 * Internal-linking hub for the 26 health checkup authority pages:
 *  - "Related" cards (curated per page, descriptive anchors)
 *  - Full A–Z cluster list so every page links to every sibling (topic hub)
 */
export default function RelatedCheckupLinks({ currentSlug, relatedSlugs }: RelatedCheckupLinksProps) {
  const related = relatedSlugs.map((s) => BY_SLUG.get(s)).filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.slug !== currentSlug);
  const cluster = STATIC_HEALTH_CHECKUP_PAGES.filter((p) => p.slug !== currentSlug);

  return (
    <section aria-labelledby="hc-related-title" className="bg-white/85 backdrop-blur-md rounded-3xl border border-white/60 p-5 sm:p-8 shadow-sm">
      <h2 id="hc-related-title" className="text-2xl sm:text-3xl font-black text-gray-950 flex items-center gap-2">
        <HeartPulse className="w-6 h-6 text-pink-600" aria-hidden="true" />
        Related Health Checkups &amp; Screening
      </h2>

      {related.length > 0 && (
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/services/${p.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-purple-200 transition"
              >
                <span className="text-sm font-black text-gray-900 group-hover:text-purple-800">{p.keyword}</span>
                <span className="mt-1 text-xs text-gray-600 line-clamp-2">{p.eyebrow}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-purple-700">
                  Compare {p.keyword.toLowerCase()} packages
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <nav aria-label="All health checkup and screening pages" className="mt-6 border-t border-gray-100 pt-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">Health Checkups &amp; Screening ({STATIC_HEALTH_CHECKUP_PAGES.length})</h3>
        <ul className="flex flex-wrap gap-2">
          {cluster.map((p) => (
            <li key={p.slug}>
              <Link href={`/services/${p.slug}`} className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-purple-300 hover:text-purple-800 transition">
                {p.keyword}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
