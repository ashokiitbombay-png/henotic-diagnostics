import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';
import DiagnosticCostEstimator from '@/components/pricing/DiagnosticCostEstimator';
import { siteConfig } from '@/config/site';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
  title: 'Diagnostic Test Pricing & Scan Cost Estimator (30–50% Savings) | Henotic Diagnostics',
  description:
    'Calculate and compare transparent prices for 100+ diagnostic investigations across 3T MRI, 128-Slice CT, PET-CT, Ultrasound, and Pathology blood tests in Mumbai, Navi Mumbai, Thane & Pune. NABL accredited with instant multi-test bundle discounts and free doorstep blood sample collection.',
  keywords:
    'diagnostic test price list, MRI cost Mumbai, CT scan price Navi Mumbai, PET CT scan charges Kharghar, blood test cost Thane, NABL diagnostic pricing, health package calculator, medical imaging rates',
  alternates: {
    canonical: 'https://www.henoticdiagnostics.com/pricing',
  },
  openGraph: {
    title: 'Diagnostic Test Pricing & Scan Cost Estimator | Henotic Diagnostics',
    description:
      'Compare transparent pricing for 100+ diagnostic scans and pathology profiles. Save 30-50% vs corporate hospital rates with NABL accredited quality.',
    url: 'https://www.henoticdiagnostics.com/pricing',
    type: 'website',
    siteName: 'Henotic Diagnostics',
    images: [
      {
        url: 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp',
        width: 1200,
        height: 630,
        alt: 'Diagnostic Test Pricing & Scan Cost Estimator | Henotic Diagnostics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnostic Test Pricing & Scan Cost Estimator | Henotic Diagnostics',
    description:
      'Transparent diagnostic investigation pricing with 30-50% savings. Calculate costs for MRI, CT, PET-CT & blood tests in Navi Mumbai & Mumbai.',
    images: ['https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp'],
  },
};

export default function PricingPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Diagnostic Pricing & Cost Estimator', item: 'https://www.henoticdiagnostics.com/pricing' }
    ]
  };

  const clinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Henotic Diagnostics',
    url: 'https://www.henoticdiagnostics.com',
    logo: siteConfig.logoUrl,
    image: 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp',
    description: 'Premier NABL-accredited diagnostic imaging and automated pathology center serving Navi Mumbai, Mumbai, Thane, Pune & Raigad.',
    priceRange: '₹200 - ₹25,500',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking, Mediclaim Reimbursement',
    telephone: siteConfig.contact.phonePrimary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15',
      addressLocality: 'Kharghar',
      addressRegion: 'Navi Mumbai',
      postalCode: '410210',
      addressCountry: 'IN'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why are Henotic Diagnostics prices 30% to 50% lower than private corporate hospitals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corporate hospitals bundle high real-estate overheads, room charges, and administrative surcharges into scan prices. Henotic operates dedicated high-throughput diagnostic centers with state-of-the-art 3.0 Tesla MRI, 128-Slice CT, and automated NABL pathology, passing institutional savings directly to patients.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are your diagnostic reports accepted by all doctors and hospitals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. Henotic Diagnostics is NABL-accredited and ISO-certified. All imaging scans are interpreted and signed by MD Radiologists, and pathology tests are certified by MD Pathologists. Reports are valid for all medical treatments, hospital admissions, and insurance claims.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I claim Mediclaim / Health Insurance reimbursement with Henotic bills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We provide official computer-generated GST tax invoices stamped with NABL registration details, along with comprehensive radiologist/pathologist signed reports. Most outpatient OPD policies, health insurance riders, and pre-hospitalization claims reimburse diagnostic investigations conducted at NABL centers.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the Multi-Test Custom Bundle discount work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When you combine multiple investigations, our system automatically applies an additional 5% package discount on 2 tests, and 10% extra discount on 3 or more tests on top of our already discounted pricing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is home sample collection available for pathology blood tests?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide 24/7 doorstep blood sample collection across Navi Mumbai, Mumbai, Thane, and Raigad. Collection is completely free for test orders above ₹500.'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Breadcrumb Ribbon ────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-900 font-bold">Diagnostic Pricing &amp; Cost Estimator</span>
          </nav>
        </div>
      </div>

      {/* ── Content Container ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <DiagnosticCostEstimator />
      </div>
    </main>
  );
}
