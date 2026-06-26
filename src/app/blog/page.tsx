import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, PenLine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health Articles & Medical Insights | Henotic Diagnostics Blog',
  description: 'Expert health articles, diagnostic guides, and medical insights from Henotic Diagnostics. Stay informed about your health.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/blog' }
};

const BLOG_CATEGORIES = [
  { id: 'imaging', title: 'Medical Imaging', count: 12 },
  { id: 'pathology', title: 'Lab Tests & Pathology', count: 8 },
  { id: 'cardiology', title: 'Heart Health', count: 6 },
  { id: 'womens-health', title: "Women's Health", count: 7 },
  { id: 'preventive', title: 'Preventive Care', count: 10 },
  { id: 'pregnancy', title: 'Pregnancy & Fetal', count: 5 },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md">
            <PenLine size={16} /> Health Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Health Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Medical Insights</span>
          </h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
            Expert-written guides on diagnostic procedures, health screenings, and preventive care.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BLOG_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center"
              >
                <h3 className="font-bold text-slate-700 group-hover:text-blue-600 mb-1">{cat.title}</h3>
                <p className="text-xs text-slate-400 font-bold">{cat.count} Articles</p>
              </div>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-16 text-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <PenLine size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Expert Articles Coming Soon</h3>
            <p className="text-slate-600 font-medium max-w-lg mx-auto mb-8">
              Our medical team is preparing in-depth articles on diagnostic procedures, preparation guides, and preventive health tips.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Browse Our Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
