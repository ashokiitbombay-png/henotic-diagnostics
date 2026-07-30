import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, PenLine, Newspaper } from "lucide-react";
import { getBlogPosts } from "@/lib/wordpress/getBlogPosts";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Health Articles & Medical Insights | Henotic Diagnostics Blog",
  description:
    "Expert health articles, diagnostic guides, and medical insights from Henotic Diagnostics. Stay informed about your health.",
  alternates: { canonical: "https://www.henoticdiagnostics.com/blog" },
  openGraph: {
    title: "Health Articles & Medical Insights | Henotic Diagnostics Blog",
    description:
      "Expert health articles, diagnostic guides, and medical insights from Henotic Diagnostics. Stay informed about your health.",
    images: [{ url: 'https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp', width: 1200, height: 630, alt: 'Health Articles & Medical Insights | Henotic Diagnostics Blog' }],
  },
};

export default async function BlogPage() {
  const postsData = await getBlogPosts(12);
  const posts = postsData?.nodes ?? [];
  const hasWordPressPosts = posts.length > 0;

  return (
    <main className="min-h-screen font-sans mt-[80px]">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md">
            <PenLine size={16} /> Health Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Health Articles &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              Medical Insights
            </span>
          </h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
            Expert-written guides on diagnostic procedures, health screenings,
            and preventive care.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CONTENT                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {hasWordPressPosts ? (
            <>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Newspaper size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Latest Articles
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    {posts.length} article{posts.length !== 1 ? "s" : ""}{" "}
                    published
                  </p>
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination CTA (if more pages available) */}
              {postsData?.pageInfo?.hasNextPage && (
                <div className="mt-12 text-center">
                  <span className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-sm">
                    More articles available — stay tuned!
                  </span>
                </div>
              )}
            </>
          ) : (
            /* ─────────────────────────────────────────────────────────── */
            /* Graceful Fallback — Coming Soon                            */
            /* ─────────────────────────────────────────────────────────── */
            <div className="mt-8 text-center p-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PenLine size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Expert Articles Coming Soon
              </h3>
              <p className="text-slate-600 font-medium max-w-lg mx-auto mb-8">
                Our medical team is preparing in-depth articles on diagnostic
                procedures, preparation guides, and preventive health tips.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Browse Our Services <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
