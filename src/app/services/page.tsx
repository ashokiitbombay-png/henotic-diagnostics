import React from "react";
import Link from "next/link";
import { services } from "@/config/services";
import ServicesSearchFilter from "@/components/features/ServicesSearchFilter";
import ServiceHero from '@/components/blocks/ServiceHero';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Services Directory | Henotic Diagnostics",
  description: "Browse our directory of over 200+ NABL accredited diagnostic services, including 3T MRI, 128-Slice CT, Ultrasound, Cardiology, and Pathology tests.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/services"
  }
};

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  desc: string;
}

// Helper to determine category based on slug
function getServiceCategory(slug: string): string {
  const s = slug.toLowerCase();
  
  if (s.includes("cardiac-ct") || s.includes("cardiac-mri") || s.includes("cardiac-pet") || s.includes("renal-scan")) {
    return "Imaging";
  }
  
  if (
    s.includes("2d-echo") || 
    s.includes("echo-test") || 
    s.includes("echocardiography") || 
    s.includes("tmt") || 
    s.includes("stress") || 
    s.includes("holter") || 
    s.includes("ecg") || 
    s.includes("electrocardiogram") || 
    s.includes("angiography") || 
    s.includes("angioplasty") || 
    s.includes("tavr") || 
    s.includes("catheterization") || 
    s.includes("heart-health") || 
    s.includes("cardiac-health") ||
    s.includes("cardiac-risk") ||
    s.includes("cardiac-evaluation") ||
    s.includes("cardiac-screening")
  ) {
    return "Cardiology";
  }
  
  if (
    s.includes("checkup") || 
    s.includes("check-up") || 
    s.includes("screening") || 
    s.includes("wellness") || 
    s.includes("diagnostic-center") || 
    s.includes("imaging-center") || 
    s.includes("radiology-center") || 
    s.includes("pathology-lab") || 
    s.includes("diagnostic-lab") || 
    s.includes("diagnostic-services") || 
    s.includes("medical-diagnostics") ||
    s.includes("radiology-services")
  ) {
    return "Preventive";
  }
  
  if (
    s.includes("blood") || 
    s.includes("lab-test") || 
    s.includes("pathology-test") || 
    s.includes("cbc") || 
    s.includes("lipid") || 
    s.includes("thyroid") || 
    s.includes("liver") || 
    s.includes("kidney") || 
    s.includes("diabetes") || 
    s.includes("hba1c") || 
    s.includes("vitamin") || 
    s.includes("iron") || 
    s.includes("urine") || 
    s.includes("stool") || 
    s.includes("hormone") || 
    s.includes("allergy") || 
    s.includes("tumor") || 
    s.includes("infection") || 
    s.includes("covid") || 
    s.includes("dengue") || 
    s.includes("malaria") || 
    s.includes("typhoid") || 
    s.includes("prenatal") || 
    s.includes("nipt") || 
    s.includes("nips") || 
    s.includes("nippt") || 
    s.includes("karyotype") || 
    s.includes("chromosomal") || 
    s.includes("chromosome") || 
    s.includes("genetic") || 
    s.includes("dna") || 
    s.includes("paternity") || 
    s.includes("molecular") || 
    s.includes("cytogenetics")
  ) {
    return "Pathology";
  }
  
  return "Imaging";
}

// Helper to construct a Title Case representation of slugs
function getServiceTitle(slug: string): string {
  const uppercaseWords = new Set([
    "mri", "ct", "pet", "dexa", "ecg", "tmt", "bmd", "kub", "hba1c", "nipt", 
    "nips", "nippt", "hsg", "ssg", "dtpa", "ec", "gfr", "bpp", "dvt", "hrct", 
    "fdg", "spect", "abpm", "tavr", "usg"
  ]);
  
  return slug
    .split("-")
    .map(word => {
      const w = word.toLowerCase();
      if (uppercaseWords.has(w)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Helper to generate description
function getServiceDesc(slug: string, title: string, category: string): string {
  if (category === "Imaging") {
    return `Advanced high-resolution ${title} imaging services utilizing state-of-the-art diagnostic technology for precise results.`;
  }
  if (category === "Pathology") {
    return `Accurate clinical pathology testing for ${title} under strict NABL quality control guidelines with same-day reports.`;
  }
  if (category === "Cardiology") {
    return `Comprehensive cardiac diagnostics including ${title} to monitor heart functions, guided by experienced cardiologists.`;
  }
  return `Preventive healthcare package for ${title} to assess overall health parameters and identify early risk indicators.`;
}

export default function ServicesIndexPage() {
  // Map raw slugs from the constants database to full service items
  const mappedServices: ServiceItem[] = services.map(slug => {
    const title = getServiceTitle(slug);
    const category = getServiceCategory(slug);
    const desc = getServiceDesc(slug, title, category);
    
    return {
      id: slug,
      title,
      category,
      desc
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] overflow-hidden">
      
      {/* 🤖 SSR ItemList Schema — helps AI systems enumerate all diagnostic services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Diagnostic Services at Henotic Diagnostics",
          "description": "Complete directory of 250+ diagnostic tests including MRI, CT scan, PET-CT, ultrasound, blood tests, and health checkup packages.",
          "numberOfItems": mappedServices.length,
          "itemListElement": mappedServices.slice(0, 50).map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": service.title,
            "url": `https://www.henoticdiagnostics.com/services/${service.id}`,
          })),
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.henoticdiagnostics.com" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.henoticdiagnostics.com/services" },
          ],
        }) }}
      />

      {/* 🌟 Premium Service Hero with Breadcrumbs & Accreditations */}
      <ServiceHero isServicesIndex />

      {/* Services search/filter (Client Component Wrapper) */}
      <ServicesSearchFilter initialServices={mappedServices} />

      {/* Static directory list for crawlers (Aids Search Indexing & Internal Linking) */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6">Complete A-Z Diagnostics Directory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-xs font-semibold text-slate-600">
            {mappedServices.map((service) => (
              <Link 
                key={service.id}
                href={`/services/${service.id}/navi-mumbai/kharghar`}
                className="hover:text-blue-600 transition-colors p-2 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-100 truncate block"
                title={`Book ${service.title} in Kharghar`}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Need a Customized Health Package?</h2>
          <p className="text-lg text-slate-600 font-medium mb-10">Our medical experts can help you select the exact tests required based on your doctor's prescription or health goals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact#booking" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all text-lg">
              Book Appointment
            </Link>
            <a href="tel:08879327184" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-4 px-8 rounded-2xl shadow-sm border border-slate-200 transition-all text-lg flex items-center justify-center gap-2">
              Call Support
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}