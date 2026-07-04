import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import type { BlogPost } from "@/types/cms";

interface BlogCardProps {
  post: BlogPost;
}

/** Strips HTML tags and truncates to a given character limit. */
function stripAndTruncate(html: string, maxLength: number = 120): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "…" : text;
}

/** Formats an ISO date string into a human-readable date. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = post.categories?.nodes?.[0];
  const authorName = post.author?.node?.name ?? "Henotic Team";
  const avatarUrl = post.author?.node?.avatar?.url;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
    >
      {/* ── Image / Gradient Placeholder ─────────────────────────────── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        {post.featuredImage?.node?.sourceUrl ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-5xl font-black text-white/20 select-none">H</span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-white/90 backdrop-blur-md text-blue-700 shadow-lg border border-white/60">
            {category.name}
          </span>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-3">
          <Calendar size={13} className="shrink-0" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 line-clamp-3 flex-1">
          {stripAndTruncate(post.excerpt, 140)}
        </p>

        {/* Footer: Author + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={authorName}
                width={24}
                height={24}
                className="rounded-full ring-2 ring-blue-100"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User size={12} className="text-white" />
              </div>
            )}
            <span className="text-xs font-bold text-slate-500">{authorName}</span>
          </div>

          <span className="flex items-center gap-1 text-xs font-extrabold text-blue-600 group-hover:gap-2 transition-all duration-300">
            Read More <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
