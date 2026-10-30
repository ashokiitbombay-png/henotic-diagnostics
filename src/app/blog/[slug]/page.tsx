import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  ListOrdered,
  HelpCircle,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/wordpress/getBlogPosts";
import { getBlogImageUrl } from "@/lib/blog-image-helper";
import {
  STATIC_BLOG_ARTICLES,
  getStaticBlogArticle,
  type StaticBlogArticle,
} from "@/config/blog-articles";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import type { BlogPost } from "@/types/cms";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

/** Rough reading time estimate (~200 wpm). */
function readingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─────────────────────────────────────────────────────────────────────────────
// Static Generation for Pre-rendered Clinical Guides
// ─────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return STATIC_BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO: Dynamic Metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPost | null = await getBlogPost(slug);

  if (!post) {
    post = getStaticBlogArticle(slug) ?? null;
  }

  if (!post) {
    return {
      title: "Article Not Found | Henotic Diagnostics Blog",
      description: "The requested medical guide or blog post could not be found.",
    };
  }

  const description = stripHtml(post.excerpt).slice(0, 160);
  const postImageUrl = getBlogImageUrl(post);
  const authorName = post.author?.node?.name ?? "Henotic Medical Faculty";

  return {
    title: `${post.title} | Henotic Diagnostics`,
    description,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `https://www.henoticdiagnostics.com/blog/${post.slug}`,
      images: [{ url: postImageUrl, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [postImageUrl],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [wpPost, recentPostsData] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(5),
  ]);

  const staticArticle = getStaticBlogArticle(slug);
  const post = wpPost || staticArticle;

  if (!post) notFound();

  // Combine recent posts: WordPress posts + static guides fallback
  const staticRecent = STATIC_BLOG_ARTICLES.filter((a) => a.slug !== slug);
  const wpRecent = (recentPostsData?.nodes ?? []).filter((p) => p.slug !== slug);
  const recentPosts = (wpRecent.length > 0 ? [...wpRecent, ...staticRecent] : staticRecent).slice(
    0,
    5
  );

  const authorName = post.author?.node?.name ?? "Henotic Medical Faculty";
  const authorCreds =
    "credentials" in (post.author?.node || {})
      ? (post.author?.node as { credentials?: string }).credentials
      : undefined;
  const authorDesignation =
    "designation" in (post.author?.node || {})
      ? (post.author?.node as { designation?: string }).designation
      : undefined;
  const authorDoctorSlug =
    "doctorSlug" in (post.author?.node || {})
      ? (post.author?.node as { doctorSlug?: string }).doctorSlug
      : undefined;
  const avatarUrl = post.author?.node?.avatar?.url;

  const categories = post.categories?.nodes ?? [];
  const tags = post.tags?.nodes ?? [];
  const minutes = post.content ? readingTime(post.content) : 5;
  const postImageUrl = getBlogImageUrl(post);

  // Static article specific enhancements
  const fullStatic = staticArticle?.slug === slug ? staticArticle : null;
  const reviewedBy = fullStatic?.reviewedBy;
  const tableOfContents = fullStatic?.tableOfContents;
  const faqs = fullStatic?.faqs;
  const medicalSpecialty = fullStatic?.medicalSpecialty;
  const relatedServiceSlug = fullStatic?.relatedServiceSlug;

  // ── Structured Data: MedicalScholarlyArticle & MedicalWebPage ──────────
  const medicalArticleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    headline: post.title,
    description: stripHtml(post.excerpt).slice(0, 160),
    image: postImageUrl,
    datePublished: post.date,
    dateModified: ("modified" in post && post.modified) ? (post as StaticBlogArticle).modified : post.date,
    author: {
      "@type": "Physician",
      name: authorName,
      jobTitle: authorDesignation || "Medical Specialist",
      url: authorDoctorSlug
        ? `https://www.henoticdiagnostics.com/doctors/${authorDoctorSlug}`
        : "https://www.henoticdiagnostics.com/doctors",
    },
    reviewedBy: reviewedBy
      ? {
          "@type": "Physician",
          name: reviewedBy.name,
          jobTitle: reviewedBy.designation,
          url: reviewedBy.doctorSlug
            ? `https://www.henoticdiagnostics.com/doctors/${reviewedBy.doctorSlug}`
            : "https://www.henoticdiagnostics.com/doctors",
        }
      : {
          "@type": "Organization",
          name: "Henotic Diagnostics Clinical Review Board",
          url: "https://www.henoticdiagnostics.com",
        },
    publisher: {
      "@type": "DiagnosticLab",
      name: "Henotic Diagnostics",
      url: "https://www.henoticdiagnostics.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.henoticdiagnostics.com/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "MedicalWebPage",
      "@id": `https://www.henoticdiagnostics.com/blog/${post.slug}`,
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
    ...(medicalSpecialty ? { medicalSpecialty } : {}),
  };

  // FAQ Schema if available
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen font-sans mt-[80px]">
      {/* ── Structured Data ──────────────────────────────────────────── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Clinical Guides", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalArticleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-blue-950 via-[#0f172a] to-[#1e1b4b] py-14 md:py-20 px-4 md:px-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-xs font-bold mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Clinical Knowledge Base
          </Link>

          {/* Category & Specialty Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/20 border border-blue-400/30 text-blue-200 backdrop-blur-md"
              >
                {cat.name}
              </span>
            ))}
            {medicalSpecialty && (
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 backdrop-blur-md flex items-center gap-1">
                <Stethoscope size={11} />
                {medicalSpecialty}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Meta Row: Author + Dates + Reading Time */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-200/90 font-semibold border-t border-white/10 pt-5">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={34}
                  height={34}
                  className="rounded-full ring-2 ring-blue-400/50 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
              )}
              <div>
                <div className="font-extrabold text-white">
                  {authorDoctorSlug ? (
                    <Link
                      href={`/doctors/${authorDoctorSlug}`}
                      className="hover:text-blue-300 underline underline-offset-2 transition-colors"
                    >
                      {authorName}
                    </Link>
                  ) : (
                    authorName
                  )}
                </div>
                {authorCreds && (
                  <div className="text-[11px] text-blue-300/80 font-medium">
                    {authorCreds}
                  </div>
                )}
              </div>
            </div>

            {/* Publication Date */}
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-400" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>

            {/* Reading Time */}
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-blue-400" />
              {minutes} min read
            </span>

            {/* Peer Review Badge */}
            {reviewedBy && (
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-400/30 text-xs">
                <ShieldCheck size={13} />
                Reviewed by {reviewedBy.name}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CONTENT + SIDEBAR                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          {/* ── Main Article ─────────────────────────────────────────── */}
          <article className="min-w-0">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-xl shadow-blue-500/10 border-4 border-white">
              <Image
                src={postImageUrl}
                alt={post.featuredImage?.node?.altText || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Quick Clinical Highlights / Table of Contents */}
            {tableOfContents && tableOfContents.length > 0 && (
              <div className="mb-10 p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-blue-900 font-black text-sm uppercase tracking-wider">
                  <ListOrdered size={16} className="text-blue-600" />
                  Table of Contents & Key Sections
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                  {tableOfContents.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] shrink-0 font-black">
                          {idx + 1}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <div
              className="wp-content-wrapper prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-ul:list-disc prose-li:text-slate-700 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
            />

            {/* Frequently Asked Questions (if defined for this guide) */}
            {faqs && faqs.length > 0 && (
              <div className="mt-14 pt-8 border-t border-slate-200" id="faqs">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <HelpCircle size={18} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
                    >
                      <h4 className="text-base font-extrabold text-slate-900 mb-2 flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Service Booking Banner */}
            {relatedServiceSlug && (
              <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl shadow-blue-500/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-black uppercase tracking-wider mb-3">
                    <Sparkles size={12} /> Book With Confidence
                  </div>
                  <h4 className="text-xl font-black mb-1">
                    Need This Diagnostic Scan?
                  </h4>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium max-w-lg leading-relaxed">
                    Henotic Diagnostics provides same-day appointments, 3.0T wide-bore imaging, and NABL-certified reporting across Mumbai & Navi Mumbai.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/services/${relatedServiceSlug}`}
                    className="px-5 py-3 rounded-xl bg-white text-blue-900 font-extrabold text-xs shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    View Pricing & Details
                  </Link>
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-500">Related Clinical Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Review Disclaimer */}
            <div className="mt-10 p-5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <strong className="font-extrabold uppercase tracking-wide block mb-1">
                Medical Editorial Statement
              </strong>
              This article is composed following evidence-based clinical imaging literature and peer-reviewed by certified MD specialists at Henotic Diagnostics. The information is designed to complement, never replace, the therapeutic relationship between patient and physician.
            </div>

            {/* Back Link (bottom) */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-extrabold text-xs transition-colors"
              >
                <ArrowLeft size={14} /> Back to All Diagnostic Articles
              </Link>
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="space-y-8">
            {/* Author / Doctor Card */}
            {authorDoctorSlug && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={authorName}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-blue-500/20 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">
                      MD
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{authorName}</h4>
                    <p className="text-xs text-blue-600 font-bold">{authorCreds || "Consultant Specialist"}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {authorDesignation || "Medical consultant at Henotic Diagnostics specializing in advanced diagnostics and patient care."}
                </p>
                <Link
                  href={`/doctors/${authorDoctorSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 hover:underline"
                >
                  View Specialist Profile & Credentials <ArrowRight size={12} />
                </Link>
              </div>
            )}

            {/* Booking & Second Opinion CTA */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-blue-100 text-[11px] font-extrabold uppercase tracking-wider mb-3">
                  <ShieldCheck size={12} /> 24/7 Clinical Support
                </div>
                <h3 className="text-lg font-black mb-2 leading-tight">
                  Book Scan or Free Report Consult
                </h3>
                <p className="text-blue-100 text-xs font-medium mb-5 leading-relaxed">
                  Have an existing prescription or scan report? Speak directly with our clinical coordinators for pricing, preparation advice, and home sample collection.
                </p>

                <div className="space-y-2.5">
                  <a
                    href="tel:09136979929"
                    className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 font-black text-xs py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md"
                  >
                    <Phone size={14} /> Call Helpline: 091369 79929
                  </a>
                  <a
                    href={`https://wa.me/919136979929?text=${encodeURIComponent(
                      `Hello Henotic Diagnostics, I am reading the guide "${post.title}" and would like to book a scan or consult a doctor.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white font-black text-xs py-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-md"
                  >
                    <MessageSquare size={14} /> WhatsApp Us on 91369 79929
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Articles */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Related Medical Guides</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    {recentPosts.length} Guides
                  </span>
                </h3>
                <ul className="space-y-4">
                  {recentPosts.map((rp) => (
                    <li key={rp.id}>
                      <Link
                        href={`/blog/${rp.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-100">
                          <Image
                            src={getBlogImageUrl(rp)}
                            alt={rp.featuredImage?.node?.altText || rp.title}
                            fill
                            sizes="56px"
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {rp.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-semibold mt-1">
                            {formatDate(rp.date)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Diagnostic Services Directory Link */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-base font-black text-slate-900 mb-2">
                All Diagnostic Services
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Explore our full diagnostic portfolio: 3.0T MRI, Multi-Slice CT, Whole-Body PET-CT, Digital Mammography, 4D Ultrasound, and NABL automated blood tests.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-blue-600 font-extrabold text-xs hover:gap-2.5 transition-all"
              >
                Browse All Services <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
