import React from 'react';
import Link from 'next/link';
import { services } from '@/config/services';
import {
  getCanonicalServiceSlug,
  getL2IndexingDirective,
  getL3IndexingDirective,
  isCanonicalPrimaryService,
} from '@/lib/seo/indexing-policy';

interface RelatedServicesProps {
  currentService: string;
  region?: string;
  location?: string;
}

/**
 * Crawl-safe internal linking to related canonical primary services.
 */
export default function RelatedServices({ currentService, region, location }: RelatedServicesProps) {
  const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const currentPrimary = getCanonicalServiceSlug(currentService);
  const keywords = currentPrimary.split('-').filter(w => w.length > 2);

  const scored = services
    .filter(s => isCanonicalPrimaryService(s) && s !== currentService && s !== currentPrimary)
    .map(s => {
      const parts = s.split('-');
      const score = keywords.reduce((acc, kw) => acc + (parts.includes(kw) ? 2 : 0), 0);
      const categoryBoost =
        (currentPrimary.includes('mri') && s.includes('mri')) ||
        (currentPrimary.includes('ct-') && s.includes('ct-')) ||
        (currentPrimary.includes('ultrasound') && s.includes('ultrasound')) ||
        (currentPrimary.includes('sonography') && s.includes('sonography')) ||
        (currentPrimary.includes('doppler') && s.includes('doppler')) ||
        (currentPrimary.includes('echo') && s.includes('echo')) ||
        (currentPrimary.includes('blood') && s.includes('blood')) ||
        (currentPrimary.includes('pet') && s.includes('pet')) ||
        (currentPrimary.includes('pregnancy') && s.includes('pregnancy')) ||
        (currentPrimary.includes('mammography') && s.includes('mammography')) ||
        (currentPrimary.includes('breast') && s.includes('breast')) ||
        (currentPrimary.includes('cardiac') && s.includes('cardiac'))
          ? 3 : 0;
      return { slug: s, score: score + categoryBoost };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const popular = ['mri-scan', 'ct-scan', 'ultrasound', 'blood-test', 'full-body-check-up', '2d-echo', 'pet-ct', 'mammography'];
  while (scored.length < 6) {
    const next = popular.find(p => p !== currentPrimary && !scored.find(s => s.slug === p));
    if (next) scored.push({ slug: next, score: 0 });
    else break;
  }

  const buildIndexableHref = (slug: string): string => {
    if (region && location && getL3IndexingDirective(slug, region, location).includeInSitemap) {
      return `/services/${slug}/${region}/${location}`;
    }
    if (region && getL2IndexingDirective(slug, region).includeInSitemap) {
      return `/services/${slug}/${region}`;
    }
    return `/services/${slug}`;
  };

  return (
    <section className="py-10 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl font-black text-slate-900 mb-6">
          Related Diagnostic Services
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {scored.map(({ slug }) => (
            <Link
              key={slug}
              href={buildIndexableHref(slug)}
              prefetch={false}
              className="rs-tile"
            >
              {formatText(slug)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
