import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import GalleryGrid from './GalleryGrid';

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: 'Facility Gallery | Henotic Diagnostics — Premium Diagnostic Center',
  description:
    'Explore Henotic Diagnostics\' state-of-the-art facility, advanced MRI, CT, PET-CT scanners, pathology lab, and cardiology department in Panvel, Navi Mumbai.',
  openGraph: {
    title: 'Facility Gallery | Henotic Diagnostics',
    description:
      'Tour our world-class diagnostic facility featuring cutting-edge medical imaging equipment and patient-centric spaces.',
    type: 'website',
  },
};

/* ─── Gallery Data ─── */
export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: 'Equipment' | 'Facility' | 'Laboratory';
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp',
    alt: 'Henotic Diagnostics Reception Area in Panvel',
    title: 'Reception',
    category: 'Facility',
    description: 'Modern, welcoming reception designed for patient comfort',
  },
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp',
    alt: 'Henotic Diagnostics 3T MRI Scanner in Navi Mumbai',
    title: 'MRI Scanner',
    category: 'Equipment',
    description: 'State-of-the-art 3 Tesla MRI for precision imaging',
  },
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/CT%20SCAN/Hero/henotic-diagnostics-ct-scan-service-panvel.webp',
    alt: 'Henotic Diagnostics 128-Slice CT Scanner in Panvel',
    title: 'CT Scanner',
    category: 'Equipment',
    description: '128-Slice CT for rapid, high-resolution diagnostics',
  },
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/PET-CT/Hero/henotic-diagnostics-pet-ct-scan-panvel.webp',
    alt: 'Henotic Diagnostics PET-CT Scanner in Panvel',
    title: 'PET-CT Scanner',
    category: 'Equipment',
    description: 'Advanced PET-CT for oncology and metabolic imaging',
  },
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/PATHOLOGY/Hero/henotic-diagnostics-pathology-lab-panvel.webp',
    alt: 'Henotic Diagnostics NABL Certified Pathology Lab in Panvel',
    title: 'Pathology Lab',
    category: 'Laboratory',
    description: 'NABL-accredited lab with automated analyzers',
  },
  {
    src: 'https://storage.googleapis.com/wp-media-henoticbucket/CARDIOLOGY/Hero/henotic-diagnostics-cardiology-panvel.webp',
    alt: 'Henotic Diagnostics Cardiology Department in Panvel',
    title: 'Cardiology',
    category: 'Equipment',
    description: 'Comprehensive cardiac diagnostics suite',
  },
];

const categories = ['All', 'Equipment', 'Facility', 'Laboratory'] as const;

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 pt-20 pb-24 text-center">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300 backdrop-blur-md">
            <Camera size={14} />
            Virtual Facility Tour
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              World-Class
            </span>{' '}
            Facility
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/70">
            Step inside Henotic Diagnostics and explore our cutting-edge medical
            equipment, state-of-the-art laboratories, and patient-centric
            spaces designed for your comfort and precision care.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ─── Gallery Section ─── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryGrid images={galleryImages} categories={categories} />
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl tracking-tight">
            Ready to Experience{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Premium Care
            </span>
            ?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg font-medium text-white/70">
            Book an appointment or visit our facility to experience
            world-class diagnostics first-hand.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-400 hover:to-purple-500 hover:shadow-blue-500/35 hover:-translate-y-0.5"
          >
            Book an Appointment
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
