import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { DOCTORS } from '@/config/doctors';

export const metadata: Metadata = {
  title: 'Our Expert Medical Team | Henotic Diagnostics',
  description: 'Meet our team of experienced radiologists, pathologists, and cardiologists. NABL certified diagnostic experts.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/doctors' },
  openGraph: {
    title: 'Our Expert Medical Team | Henotic Diagnostics',
    description: 'Meet our team of experienced radiologists, pathologists, and cardiologists. NABL certified diagnostic experts.',
    images: [{ url: 'https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp', width: 1200, height: 630, alt: 'Our Expert Medical Team | Henotic Diagnostics' }],
  },
};

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <section className="bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6">Our Team</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Expert Medical Professionals</h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">Our team of experienced specialists ensures accurate diagnostics with personalized care.</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map(doc => (
            <Link key={doc.id} href={`/doctors/${doc.id}`}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              {doc.imageUrl ? (
                <img src={doc.imageUrl} alt={doc.name} className="w-20 h-20 rounded-full mb-6 shadow-lg object-cover" />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg">
                  {doc.name.charAt(0)}
                </div>
              )}
              <h2 className="text-xl font-black text-slate-800 group-hover:text-blue-600 mb-1">{doc.name}</h2>
              <p className="text-sm text-blue-600 font-bold mb-1">{doc.designation}</p>
              <p className="text-xs text-slate-500 font-bold mb-4">{doc.credentials} • {doc.experience}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {doc.specializations.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                View Profile <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
