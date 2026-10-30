import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Users,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  CalendarCheck,
  Clock,
  MapPin,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { DOCTORS } from '@/config/doctors';
import MedicalPseoSchema from '@/components/seo/MedicalPseoSchema';
import { LAB_WHATSAPP_NUMBER, LAB_PHONE_DISPLAY, LAB_PHONE_TEL } from '@/config/health-checkup/trust';
import { siteConfig } from '@/config/site';

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function getDoctorInitials(name: string): string {
  return name.replace(/^Dr\.\s*/i, '').split(' ').map(n => n.charAt(0)).slice(0, 2).join('');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCTORS.find(d => d.id === slug);
  const title = doc ? `${doc.name} — ${doc.designation} | Henotic Diagnostics` : 'Doctor Profile';
  const description = doc?.bio || 'Expert medical professionals at Henotic Diagnostics.';
  const doctorImage = doc?.imageUrl || 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';

  return {
    title,
    description,
    alternates: { canonical: `https://www.henoticdiagnostics.com/doctors/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.henoticdiagnostics.com/doctors/${slug}`,
      type: 'profile',
      images: [
        {
          url: `https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(doc?.name || 'Doctor Profile')}&subtitle=${encodeURIComponent(`${doc?.designation || 'Medical Specialist'} • Henotic Diagnostics`)}`,
          width: 1200,
          height: 630,
          alt: `${doc?.name || 'Doctor'} — Henotic Diagnostics`,
        },
        {
          url: doctorImage,
          width: 1200,
          height: 630,
          alt: `${doc?.name || 'Doctor'} — Henotic Diagnostics`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(doc?.name || 'Doctor Profile')}&subtitle=${encodeURIComponent(`${doc?.designation || 'Medical Specialist'} • Henotic Diagnostics`)}`],
    },
  };
}

export async function generateStaticParams() {
  return DOCTORS.map(d => ({ slug: d.id }));
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCTORS.find(d => d.id === slug);
  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[80px]">
        <p className="text-slate-600 font-bold">Doctor profile not found.</p>
      </div>
    );
  }

  const initials = getDoctorInitials(doc.name);

  // Physician Structured Data for Google Rich Snippets
  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doc.name,
    jobTitle: doc.designation,
    description: doc.bio,
    url: `https://www.henoticdiagnostics.com/doctors/${slug}`,
    medicalSpecialty: doc.specializations,
    knowsAbout: doc.specializations,
    alumniOf: doc.education.map(e => ({ '@type': 'EducationalOrganization', name: e })),
    memberOf: doc.memberships.map(m => ({ '@type': 'Organization', name: m })),
    worksFor: {
      '@type': 'MedicalClinic',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.contact.phonePrimary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15',
        addressLocality: 'Kharghar',
        addressRegion: 'Navi Mumbai',
        postalCode: '410210',
        addressCountry: 'IN'
      }
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Medical Faculty', item: 'https://www.henoticdiagnostics.com/doctors' },
      { '@type': 'ListItem', position: 3, name: doc.name, item: `https://www.henoticdiagnostics.com/doctors/${slug}` }
    ]
  };

  const whatsappInquiryUrl = `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Henotic Diagnostics, I would like to schedule an appointment / request a scan report review with ${doc.name} (${doc.designation}).`
  )}`;

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      <MedicalPseoSchema type="doctor" doctorId={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Breadcrumb Ribbon ────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/doctors" className="hover:text-blue-600 transition">Medical Faculty</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-900 font-bold">{doc.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Profile Header ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0c1e3e] via-[#1a2d54] to-[#254680] text-white py-14 md:py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Stylized Physician Avatar */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-600 text-white flex items-center justify-center text-4xl sm:text-5xl font-black shadow-2xl ring-4 ring-white/20">
              {initials}
            </div>
            <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 border-2 border-white text-white text-[11px] font-black flex items-center gap-1 shadow-md">
              <CheckCircle2 size={13} /> NABL Verified
            </span>
          </div>

          {/* Title & Credentials */}
          <div className="text-center md:text-left flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-200 border border-white/20 text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-md">
              <Award size={13} className="text-cyan-300" />
              {doc.experience} Clinical Practice
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              {doc.name}
            </h1>

            <p className="text-base md:text-lg text-cyan-200 font-extrabold mb-1">
              {doc.designation}
            </p>

            <p className="text-xs md:text-sm text-blue-200 font-mono font-medium mb-4">
              {doc.credentials}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {doc.specializations.map(s => (
                <span key={s} className="px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/15 backdrop-blur-md">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Grid: Left Details & Right Action Sidebar ────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bio, Education, Memberships, Services (Spans 8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Clinical Bio */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2.5">
                <Stethoscope size={20} className="text-blue-600" />
                Clinical Background &amp; Expertise
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
                {doc.bio}
              </p>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2.5">
                <GraduationCap size={20} className="text-emerald-600" />
                Medical Qualifications &amp; Fellowships
              </h2>
              <ul className="space-y-3">
                {doc.education.map(e => (
                  <li key={e} className="text-slate-700 font-semibold text-xs sm:text-sm flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-emerald-600 font-black mt-0.5">✓</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Memberships */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2.5">
                <Users size={20} className="text-purple-600" />
                Professional Memberships &amp; Affiliations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doc.memberships.map(m => (
                  <div key={m} className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-xs font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Diagnostic Modalities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
              <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2.5">
                <BookOpen size={20} className="text-blue-600" />
                Diagnostic Investigations Interpreted by {doc.name}
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Select any modality below to view center locations, pricing, preparation instructions, and book priority slots.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doc.linkedServices.map(s => (
                  <Link
                    key={s}
                    href={`/services/${s}/navi-mumbai/kharghar`}
                    className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/80 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all group cursor-pointer"
                  >
                    <span className="font-extrabold text-slate-800 group-hover:text-blue-600 text-xs sm:text-sm">
                      {formatText(s)}
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Consultation / Scan Review Booking Card (Spans 4) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                  Accepting Second Opinions &amp; Scan Reviews
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug mb-2">
                Consult with {doc.name}
              </h3>

              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                Have your MRI, CT, PET scan, or biopsy reviewed with detailed clinical correlation and second-opinion reporting.
              </p>

              {/* Consultation Timings */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold"><Clock size={13} className="text-blue-600" /> Reporting Hours:</span>
                  <span className="font-semibold">Mon – Sat: 9 AM – 7 PM</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold"><ShieldCheck size={13} className="text-emerald-600" /> Emergency Scans:</span>
                  <span className="font-semibold text-emerald-700">24/7 On-Call MD</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold"><MapPin size={13} className="text-rose-500" /> Center:</span>
                  <span className="font-semibold">Kharghar Flagship Hub</span>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs md:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mb-3"
              >
                <span>Request Scan Review on WhatsApp</span>
              </a>

              {/* Phone Helpline */}
              <a
                href={LAB_PHONE_TEL}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs text-center transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PhoneCall size={14} className="text-blue-600" />
                <span>Call Medical Desk: {LAB_PHONE_DISPLAY}</span>
              </a>

              <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-1.5">
                <p className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Valid for all hospital admissions
                </p>
                <p className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Digital report delivered in 6–8 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
