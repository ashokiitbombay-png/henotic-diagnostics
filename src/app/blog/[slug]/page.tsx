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
} from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/wordpress/getBlogPosts";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
// SEO: Dynamic Metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Henotic Diagnostics Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const description = stripHtml(post.excerpt).slice(0, 160);

  return {
    title: `${post.title} | Henotic Diagnostics Blog`,
    description,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `https://www.henoticdiagnostics.com/blog/${post.slug}`,
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl, width: 1200, height: 630 }]
        : undefined,
      publishedTime: post.date,
      authors: [post.author?.node?.name ?? "Henotic Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featuredImage?.node?.sourceUrl
        ? [post.featuredImage.node.sourceUrl]
        : undefined,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, recentPostsData] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(5),
  ]);

  if (!post) notFound();

  const authorName = post.author?.node?.name ?? "Henotic Team";
  const avatarUrl = post.author?.node?.avatar?.url;
  const categories = post.categories?.nodes ?? [];
  const tags = post.tags?.nodes ?? [];
  const recentPosts = (recentPostsData?.nodes ?? []).filter(
    (p) => p.slug !== slug
  ).slice(0, 5);
  const minutes = post.content ? readingTime(post.content) : 3;

  // ── Structured Data ──────────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: stripHtml(post.excerpt).slice(0, 160),
    image: post.featuredImage?.node?.sourceUrl ?? undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Henotic Diagnostics",
      url: "https://www.henoticdiagnostics.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.henoticdiagnostics.com/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.henoticdiagnostics.com/blog/${post.slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.henoticdiagnostics.com/#website",
      name: "Henotic Diagnostics",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "Henotic Diagnostics",
      url: "https://www.henoticdiagnostics.com",
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
  };

  return (
    <main className="min-h-screen font-sans mt-[80px]">
      {/* ── Structured Data ──────────────────────────────────────────── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-bold mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Category Badges */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((cat) => (
                <span
                  key={cat.slug}
                  className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-white/10 border border-white/20 text-blue-200 backdrop-blur-md"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-blue-200/80 font-medium">
            <div className="flex items-center gap-2">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-blue-400/40"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={13} className="text-white" />
                </div>
              )}
              <span className="font-bold text-white/90">{authorName}</span>
            </div>

            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {minutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CONTENT + SIDEBAR                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14">
          {/* ── Main Article ─────────────────────────────────────────── */}
          <article>
            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-xl shadow-blue-500/10 border-4 border-white">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            )}

            {/* WordPress Content */}
            <div
              className="wp-content-wrapper"
              dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-500">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back Link (bottom) */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-extrabold text-sm transition-colors"
              >
                <ArrowLeft size={16} /> Back to All Articles
              </Link>
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="space-y-8">
            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md p-6">
                <h3 className="text-lg font-black text-slate-900 mb-5 pb-3 border-b border-slate-100">
                  Recent Articles
                </h3>
                <ul className="space-y-4">
                  {recentPosts.map((rp) => (
                    <li key={rp.id}>
                      <Link
                        href={`/blog/${rp.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                          {rp.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={rp.featuredImage.node.sourceUrl}
                              alt={rp.featuredImage.node.altText || rp.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {rp.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">
                            {formatDate(rp.date)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking CTA */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />

              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2">
                  Book Your Health Check
                </h3>
                <p className="text-blue-100 text-sm font-medium mb-5 leading-relaxed">
                  Get accurate diagnostics with same-day digital reports.
                  NABL-accredited lab and advanced imaging.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-extrabold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Phone size={15} />
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Browse Services */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md p-6">
              <h3 className="text-lg font-black text-slate-900 mb-3">
                Our Services
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-4 leading-relaxed">
                From 3.0T MRI scans to automated pathology — explore our full
                range of diagnostic services.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-sm hover:gap-3 transition-all"
              >
                Browse Services <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
