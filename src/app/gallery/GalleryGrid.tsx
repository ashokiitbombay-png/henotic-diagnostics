'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GalleryImage } from './page';

interface GalleryGridProps {
  images: GalleryImage[];
  categories: readonly string[];
}

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? images
      : images.filter((img) => img.category === active);

  return (
    <>
      {/* ─── Category Filters ─── */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
              active === cat
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 -translate-y-0.5'
                : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── Image Grid ─── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img, i) => (
          <div
            key={img.title}
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Category badge */}
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-md backdrop-blur-md">
                {img.category}
              </div>
            </div>

            {/* Info Card */}
            <div className="p-5">
              <h3 className="mb-1 text-lg font-extrabold text-slate-900 tracking-tight">
                {img.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {img.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-bold text-slate-400">
            No images found for this category.
          </p>
        </div>
      )}
    </>
  );
}
