import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Heart, Brain, Bone, Baby, Droplets, Activity, Eye, Stethoscope } from 'lucide-react';
import { CONDITIONS } from '@/config/conditions';

export const metadata: Metadata = {
  title: 'Medical Conditions & Symptoms Guide | Henotic Diagnostics',
  description: 'Find the right diagnostic tests for your symptoms. Browse 80+ medical conditions with recommended NABL-accredited tests.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/conditions' }
};

const BODY_SYSTEMS = [
  { name: 'Musculoskeletal', icon: Bone, color: 'bg-amber-100 text-amber-600' },
  { name: 'Cardiovascular', icon: Heart, color: 'bg-red-100 text-red-600' },
  { name: 'Neurological', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { name: 'Reproductive', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { name: 'Urological', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
  { name: 'Gastrointestinal', icon: Activity, color: 'bg-green-100 text-green-600' },
  { name: 'Endocrine', icon: Stethoscope, color: 'bg-teal-100 text-teal-600' },
  { name: 'Oncological', icon: Eye, color: 'bg-slate-100 text-slate-600' },
];

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export default function ConditionsIndexPage() {
  // Group conditions by body system
  const grouped = BODY_SYSTEMS.map(sys => ({
    ...sys,
    conditions: CONDITIONS.filter(c => c.bodySystem === sys.name)
  })).filter(g => g.conditions.length > 0);

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E55D87] rounded-full mix-blend-screen filter blur-[120px] opacity-15"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            Symptom Checker
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Medical Conditions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Symptoms Guide</span>
          </h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
            Find the right diagnostic tests based on your symptoms. {CONDITIONS.length}+ conditions mapped to expert-recommended tests.
          </p>
        </div>
      </section>

      {/* Body System Groups */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {grouped.map(group => {
            const IconComp = group.icon;
            return (
              <div key={group.name}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${group.color}`}>
                    <IconComp size={22} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">{group.name}</h2>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{group.conditions.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {group.conditions.map(cond => (
                    <Link
                      key={cond.id}
                      href={`/conditions/${cond.id}`}
                      className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all group flex items-center justify-between gap-2"
                    >
                      <span className="font-bold text-sm text-slate-700 group-hover:text-blue-600 truncate">{cond.title}</span>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
