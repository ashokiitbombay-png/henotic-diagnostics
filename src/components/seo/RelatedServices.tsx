import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { services } from '@/config/services';

interface RelatedServicesProps {
  currentService: string;
  region?: string;
  location?: string;
}

/**
 * 🔗 Related Services Component — Auto Internal Linking
 * Finds related services based on keyword overlap and displays them as cards.
 * Critical for SEO: distributes PageRank and improves crawl efficiency.
 */
export default function RelatedServices({ currentService, region, location }: RelatedServicesProps) {
  const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Extract keywords from current service slug
  const keywords = currentService.split('-').filter(w => w.length > 2);
  
  // Score all services by keyword overlap
  const scored = services
    .filter(s => s !== currentService)
    .map(s => {
      const parts = s.split('-');
      const score = keywords.reduce((acc, kw) => acc + (parts.includes(kw) ? 2 : 0), 0);
      // Also boost services in the same general category
      const categoryBoost = 
        (currentService.includes('mri') && s.includes('mri')) ||
        (currentService.includes('ct-') && s.includes('ct-')) ||
        (currentService.includes('ultrasound') && s.includes('ultrasound')) ||
        (currentService.includes('sonography') && s.includes('sonography')) ||
        (currentService.includes('doppler') && s.includes('doppler')) ||
        (currentService.includes('echo') && s.includes('echo')) ||
        (currentService.includes('blood') && s.includes('blood')) ||
        (currentService.includes('pet') && s.includes('pet')) ||
        (currentService.includes('pregnancy') && s.includes('pregnancy')) ||
        (currentService.includes('mammography') && s.includes('mammography')) ||
        (currentService.includes('breast') && s.includes('breast')) ||
        (currentService.includes('cardiac') && s.includes('cardiac'))
          ? 3 : 0;
      return { slug: s, score: score + categoryBoost };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  // If not enough related, fill with popular services
  const popular = ['mri-scan', 'ct-scan', 'ultrasound', 'blood-test', 'full-body-check-up', '2d-echo', 'pet-ct', 'mammography'];
  while (scored.length < 6) {
    const next = popular.find(p => p !== currentService && !scored.find(s => s.slug === p));
    if (next) scored.push({ slug: next, score: 0 });
    else break;
  }

  const basePath = location && region
    ? (slug: string) => `/services/${slug}/${region}/${location}`
    : region
      ? (slug: string) => `/services/${slug}/${region}`
      : (slug: string) => `/services/${slug}`;

  return (
    <section className="py-12 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles size={20} className="text-[#b06ab3]" />
          <h3 className="text-xl font-black text-slate-900">Related Diagnostic Services</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {scored.map(({ slug }) => (
            <Link
              key={slug}
              href={basePath(slug)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group text-center"
            >
              <p className="font-bold text-slate-700 group-hover:text-blue-600 text-sm leading-tight mb-2">
                {formatText(slug)}
              </p>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-400 mx-auto transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
