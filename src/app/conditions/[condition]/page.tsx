import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, AlertCircle, Activity, Stethoscope } from 'lucide-react';
import { CONDITIONS } from '@/config/conditions';

import MedicalPseoSchema from '@/components/seo/MedicalPseoSchema';
import { isValidConditionSlug } from '@/lib/seo/slug-validator';

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function getCondition(slug: string) {
  return CONDITIONS.find(c => c.id === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ condition: string }> }): Promise<Metadata> {
  const { condition } = await params;
  const cond = getCondition(condition);
  return {
    title: `${cond?.title || formatText(condition)} - Diagnostic Tests | Henotic Diagnostics`,
    description: cond?.description || `Find the right diagnostic tests for ${formatText(condition)}. NABL accredited, same-day reports.`,
    alternates: { canonical: `https://www.henoticdiagnostics.com/conditions/${condition}` }
  };
}

import { getConditionPriorities } from '@/lib/seo/build-priorities';

// Pre-render top priority conditions from the ISR manifest.
// Remaining conditions render on-demand via ISR (dynamicParams = true).
export async function generateStaticParams() {
  return getConditionPriorities();
}

export default async function ConditionPage({ params }: { params: Promise<{ condition: string }> }) {
  const { condition } = await params;

  // Slug validation: prevent CDN cache pollution from invalid condition URLs
  if (!isValidConditionSlug(condition)) {
    notFound();
  }

  const cond = getCondition(condition);
  if (!cond) return <div className="min-h-screen flex items-center justify-center mt-[80px]"><p>Condition not found.</p></div>;

  const urgencyColors: Record<string, string> = {
    routine: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    urgent: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <MedicalPseoSchema type="condition" conditionId={condition} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E55D87] rounded-full mix-blend-screen filter blur-[120px] opacity-15"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${urgencyColors[cond.urgencyLevel]}`}>
              {cond.urgencyLevel} priority
            </span>
            <span className="text-blue-300 text-sm font-bold">{cond.bodySystem}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{cond.title}</h1>
          <p className="text-lg text-slate-300 font-medium max-w-3xl leading-relaxed">{cond.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        {/* Symptoms Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600"><AlertCircle size={22} /></div>
            <h2 className="text-xl font-black text-slate-900">Common Symptoms</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cond.symptoms.map(s => (
              <span key={s} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold border border-slate-200">{s}</span>
            ))}
          </div>
        </div>

        {/* Recommended Tests */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600"><Stethoscope size={22} /></div>
            <h2 className="text-xl font-black text-slate-900">Recommended Diagnostic Tests</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cond.recommendedServices.map(slug => (
              <Link key={slug} href={`/services/${slug}/navi-mumbai/kharghar`}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-blue-500 shrink-0" />
                  <span className="font-bold text-slate-700 group-hover:text-blue-700">{formatText(slug)}</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] rounded-3xl p-8 text-center mb-16">
          <h3 className="text-2xl font-black text-white mb-3">Need Expert Guidance?</h3>
          <p className="text-white/80 font-medium mb-6">Our medical team can help you choose the right tests.</p>
          <Link href="/contact#booking" className="inline-flex items-center gap-2 bg-white text-blue-600 font-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        "name": cond.title,
        "description": cond.description,
        "signOrSymptom": cond.symptoms.map(s => ({ "@type": "MedicalSignOrSymptom", "name": s })),
        "possibleTreatment": cond.recommendedServices.map(s => ({
          "@type": "MedicalTest",
          "name": formatText(s),
          "url": `https://www.henoticdiagnostics.com/services/${s}/navi-mumbai/kharghar`
        }))
      }) }} />
    </main>
  );
}
