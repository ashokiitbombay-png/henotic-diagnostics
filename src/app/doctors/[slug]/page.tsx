import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, BookOpen, GraduationCap, ArrowRight, Users, Stethoscope } from 'lucide-react';
import { DOCTORS } from '@/config/doctors';

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCTORS.find(d => d.id === slug);
  return {
    title: doc ? `${doc.name} - ${doc.designation} | Henotic Diagnostics` : 'Doctor Profile',
    description: doc?.bio || 'Expert medical professionals at Henotic Diagnostics.',
    alternates: { canonical: `https://www.henoticdiagnostics.com/doctors/${slug}` }
  };
}

export async function generateStaticParams() {
  return DOCTORS.map(d => ({ slug: d.id }));
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCTORS.find(d => d.id === slug);
  if (!doc) return <div className="min-h-screen flex items-center justify-center mt-[80px]"><p>Doctor not found.</p></div>;

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {doc.imageUrl ? (
            <img src={doc.imageUrl} alt={doc.name} className="w-40 h-40 rounded-full shadow-2xl shrink-0 border-4 border-white/20 object-cover" />
          ) : (
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl shrink-0 border-4 border-white/20">
              {doc.name.charAt(0)}
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{doc.name}</h1>
            <p className="text-blue-300 font-bold text-lg mb-1">{doc.designation}</p>
            <p className="text-slate-400 font-bold">{doc.credentials}</p>
            <p className="text-white/70 text-sm font-bold mt-2">{doc.experience} experience</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-20 space-y-8 pb-16">
        {/* Bio */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <Stethoscope size={22} className="text-blue-500" /> About
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed text-lg">{doc.bio}</p>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <Award size={22} className="text-pink-500" /> Specializations
          </h2>
          <div className="flex flex-wrap gap-2">
            {doc.specializations.map(s => (
              <span key={s} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100">{s}</span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <GraduationCap size={22} className="text-emerald-500" /> Education
          </h2>
          <ul className="space-y-2">
            {doc.education.map(e => (
              <li key={e} className="text-slate-600 font-medium flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> {e}</li>
            ))}
          </ul>
        </div>

        {/* Memberships */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <Users size={22} className="text-purple-500" /> Professional Memberships
          </h2>
          <ul className="space-y-2">
            {doc.memberships.map(m => (
              <li key={m} className="text-slate-600 font-medium flex items-start gap-2"><span className="text-purple-500 mt-1">•</span> {m}</li>
            ))}
          </ul>
        </div>

        {/* Linked Services */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <BookOpen size={22} className="text-blue-500" /> Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {doc.linkedServices.map(s => (
              <Link key={s} href={`/services/${s}/navi-mumbai/kharghar`}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <span className="font-bold text-slate-700 group-hover:text-blue-600 text-sm">{formatText(s)}</span>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Physician Schema — enhanced for Google Knowledge Panel */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Physician",
        "@id": `https://www.henoticdiagnostics.com/doctors/${slug}#physician`,
        "name": doc.name,
        "description": doc.bio,
        "url": `https://www.henoticdiagnostics.com/doctors/${slug}`,
        "telephone": "+918879327184",
        "medicalSpecialty": doc.specializations,
        "jobTitle": doc.designation,
        "qualifications": doc.credentials,
        "alumniOf": doc.education.map(e => ({ "@type": "EducationalOrganization", "name": e })),
        "worksFor": {
          "@type": "MedicalOrganization",
          "name": "Henotic Diagnostics",
          "url": "https://www.henoticdiagnostics.com",
          "telephone": "+918879327184"
        },
        "memberOf": doc.memberships.map(m => ({ "@type": "Organization", "name": m })),
        "availableService": doc.linkedServices.map(s => ({
          "@type": "MedicalProcedure",
          "name": formatText(s),
          "url": `https://www.henoticdiagnostics.com/services/${s}`
        }))
      }) }} />
      {/* BreadcrumbSchema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.henoticdiagnostics.com" },
          { "@type": "ListItem", "position": 2, "name": "Doctors", "item": "https://www.henoticdiagnostics.com/doctors" },
          { "@type": "ListItem", "position": 3, "name": doc.name, "item": `https://www.henoticdiagnostics.com/doctors/${slug}` }
        ]
      }) }} />
    </main>
  );
}
