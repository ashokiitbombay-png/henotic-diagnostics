import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PenLine, ShieldCheck, Stethoscope, ArrowRight, Award } from "lucide-react";
import { getBlogPosts } from "@/lib/wordpress/getBlogPosts";
import { getStaticBlogArticles } from "@/config/blog-articles";
import BlogListClient from "@/components/blog/BlogListClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Clinical Knowledge Base & Health Insights | Henotic Diagnostics",
  description:
    "Evidence-based diagnostic guides, scan preparation instructions, and clinical insights reviewed by board-certified radiologists and pathologists at Henotic Diagnostics.",
  alternates: { canonical: "https://www.henoticdiagnostics.com/blog" },
  openGraph: {
    title: "Clinical Knowledge Base & Health Insights | Henotic Diagnostics",
    description:
      "Evidence-based diagnostic guides, scan preparation instructions, and clinical insights reviewed by board-certified radiologists and pathologists.",
    url: "https://www.henoticdiagnostics.com/blog",
    type: "website",
    images: [
      {
        url: "https://cdn.henoticdiagnostics.com/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp",
        width: 1200,
        height: 630,
        alt: "Clinical Knowledge Base & Diagnostic Guides | Henotic Diagnostics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Knowledge Base & Health Insights | Henotic Diagnostics",
    description:
      "Evidence-based diagnostic guides and scan preparation instructions reviewed by MD radiologists and pathologists.",
    images: [
      "https://cdn.henoticdiagnostics.com/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp",
    ],
  },
};

export default async function BlogPage() {
  const postsData = await getBlogPosts(12);
  const wpPosts = postsData?.nodes ?? [];
  const staticArticles = getStaticBlogArticles();

  // Merge: Avoid duplicating any slugs that already exist in WordPress
  const wpSlugs = new Set(wpPosts.map((p) => p.slug));
  const fallbackArticles = staticArticles.filter((art) => !wpSlugs.has(art.slug));
  const allPosts = [...wpPosts, ...fallbackArticles];

  // ItemList Schema for SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Henotic Diagnostics Clinical Knowledge Base",
    description: "Medical diagnostic guides, preparation protocols, and health articles.",
    itemListElement: allPosts.map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: post.title,
      url: `https://www.henoticdiagnostics.com/blog/${post.slug}`,
    })),
  };

  return (
    <main className="min-h-screen font-sans mt-[80px]">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Health Blog & Guides", url: "/blog" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-blue-950 via-[#0f172a] to-[#1e1b4b] py-16 md:py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Ambient lighting glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <PenLine size={15} /> Clinical Knowledge Base
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Diagnostic Guides &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-pink-400">
              Medical Insights
            </span>
          </h1>
          <p className="text-base md:text-lg text-blue-100/90 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            Evidence-based preparation instructions, procedure explanations, and health screening
            checklists authored and reviewed by certified medical specialists.
          </p>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-blue-200/90">
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>MD Radiologist & Pathologist Reviewed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              <Award size={14} className="text-amber-400" />
              <span>NABL ISO 15189 Quality Standards</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              <Stethoscope size={14} className="text-blue-400" />
              <span>Patient-Centered Clinical Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* EDITORIAL TRUST BANNER                                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-blue-50/70 border-b border-blue-100 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              <strong>Clinical Policy:</strong> All content is verified against Indian medical council
              and international radiological (IRIA/RSNA) standards.
            </span>
          </div>
          <Link
            href="/doctors"
            className="text-blue-700 font-extrabold hover:underline flex items-center gap-1 shrink-0"
          >
            Meet Our Medical Faculty <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ARTICLES GRID & FILTERS                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <BlogListClient posts={allPosts} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MEDICAL DISCLAIMER                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto text-center text-xs text-slate-500 leading-relaxed">
          <p className="mb-2 font-bold text-slate-700 uppercase tracking-wider">
            Medical Disclaimer & Clinical Context
          </p>
          <p>
            The health articles and diagnostic guides published on Henotic Diagnostics are intended
            solely for educational awareness and patient preparation purposes. They do not constitute
            personal medical advice, diagnosis, or clinical treatment plans. Always consult your
            attending physician or certified healthcare provider regarding medical conditions or test
            interpretation.
          </p>
        </div>
      </section>
    </main>
  );
}
