import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES, getCategoryById } from '@/config/categories';

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  const title = cat?.title || formatText(category);
  return {
    title: `${title} Services | Henotic Diagnostics`,
    description: cat?.description || `Browse all ${title} diagnostic services at Henotic Diagnostics.`,
    alternates: { canonical: `https://www.henoticdiagnostics.com/services/category/${category}` }
  };
}

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map(cat => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) return <div className="min-h-screen flex items-center justify-center mt-[80px]"><p>Category not found.</p></div>;

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            Service Category
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {cat.title}
          </h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">{cat.description}</p>
          <p className="text-sm text-blue-300 font-bold mt-4">{cat.services.length} Services Available</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.services.map(slug => (
              <Link key={slug} href={`/services/${slug}/navi-mumbai/kharghar`}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{formatText(slug)}</h3>
                  <p className="text-sm text-slate-500 mt-1">Book in Navi Mumbai →</p>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-500 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
