import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

const VIDEO_URL = 'https://storage.googleapis.com/wp-media-henoticbucket/Videos/henotic_diagnostics_trusted_health_care-corporate-video.mp4';
const THUMBNAIL_URL = 'https://storage.googleapis.com/wp-media-henoticbucket/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';
const PAGE_URL = 'https://www.henoticdiagnostics.com/video/corporate-overview';

export const metadata: Metadata = {
  title: 'Corporate Overview Video | Henotic Diagnostics',
  description: 'Watch the Henotic Diagnostics corporate overview video. NABL-accredited diagnostic center offering 3.0T MRI, 128-slice CT scan, PET-CT, 4D Ultrasound, Pathology, and Cardiac testing in Mumbai & Navi Mumbai.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Henotic Diagnostics — Trusted Healthcare Partner',
    description: 'Corporate video overview of Henotic Diagnostics, a premier NABL-accredited diagnostic center.',
    type: 'video.other',
    url: PAGE_URL,
    videos: [{ url: VIDEO_URL, type: 'video/mp4' }],
  },
};

export default function CorporateOverviewPage() {
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Henotic Diagnostics — Trusted Healthcare Partner Corporate Overview',
    description: 'Corporate video overview of Henotic Diagnostics: NABL-accredited diagnostic center offering 3.0T MRI, 128-slice CT scan, PET-CT, 4D Ultrasound, Pathology, and Cardiac testing in Mumbai & Navi Mumbai.',
    thumbnailUrl: THUMBNAIL_URL,
    contentUrl: VIDEO_URL,
    embedUrl: VIDEO_URL,
    uploadDate: '2024-01-01T00:00:00+05:30',
    duration: 'PT1M30S',
    url: PAGE_URL,
    isFamilyFriendly: true,
    publisher: {
      '@type': 'Organization',
      name: 'Henotic Diagnostics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.henoticdiagnostics.com/icon-512.png',
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 font-sans mt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-white font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Video — Primary Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
          Henotic Diagnostics — Trusted Healthcare Partner
        </h1>
        <p className="text-lg text-blue-200 font-medium mb-10 max-w-3xl">
          Watch our corporate overview to learn how Henotic Diagnostics delivers world-class diagnostic services with NABL-accredited precision, advanced medical imaging, and compassionate patient care across Mumbai &amp; Navi Mumbai.
        </p>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <video
            src={VIDEO_URL}
            poster={THUMBNAIL_URL}
            controls
            preload="metadata"
            className="w-full h-auto aspect-video"
          >
            <track kind="captions" src="data:text/vtt,WEBVTT" srcLang="en" label="English Captions" />
          </video>
        </div>
      </section>

      {/* Supporting Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-xl font-black text-white mb-3">NABL Accredited</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our laboratory is NABL, ISO, and AERB accredited, ensuring the highest quality standards for every diagnostic test and report.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-xl font-black text-white mb-3">Advanced Equipment</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              3.0T MRI, 128-Slice CT Scanner, PET-CT, 4D Ultrasound, and fully automated pathology analyzers for precise diagnostics.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-xl font-black text-white mb-3">Same-Day Reports</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Digital reports delivered via WhatsApp and our secure online portal within hours of your visit.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact#booking"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
          >
            Book Appointment
          </Link>
          <a
            href="tel:08879327184"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/25 font-extrabold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all text-lg"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </section>
    </main>
  );
}
