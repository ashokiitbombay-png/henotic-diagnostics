"use client";

import React, { useState, useMemo } from "react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostCard } from "@/types/cms";
import { Search, Sparkles, Filter, X } from "lucide-react";

interface BlogListClientProps {
  posts: Array<BlogPostCard & { content?: string }>;
}

const CATEGORIES = [
  "All",
  "MRI & Radiology",
  "CT Scan & Imaging",
  "Nuclear Medicine & Oncology",
  "Preventive Healthcare",
  "Pathology & Lab Diagnostics",
  "Ultrasound & Women's Health",
  "Cardiology Diagnostics",
];

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All") {
        const matchesCategory = post.categories?.nodes?.some((c) =>
          c.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(c.name.toLowerCase())
        );
        if (!matchesCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(query);
        const inExcerpt = post.excerpt.toLowerCase().includes(query);
        const inAuthor = (post.author?.node?.name || "").toLowerCase().includes(query);
        const inTags = post.categories?.nodes?.some((c) => c.name.toLowerCase().includes(query));
        return inTitle || inExcerpt || inAuthor || inTags;
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* ── Search & Filter Controls ─────────────────────────────── */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diagnostic guides, preparation, tests..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 shrink-0 self-center md:self-auto">
            <Sparkles size={14} className="text-blue-500" />
            <span>
              Showing <strong className="text-slate-800">{filteredPosts.length}</strong> of {posts.length} articles
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            <Filter size={13} />
            Topic:
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Article Grid ─────────────────────────────────────────── */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-slate-200/80 p-8">
          <p className="text-lg font-bold text-slate-700 mb-2">
            No articles match your search or filter
          </p>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Try adjusting your search terms or select "All" to browse all clinical guides.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
