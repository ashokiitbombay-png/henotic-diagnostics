# Design System & Visual Guidelines

## 1. Visual Aesthetics & Design Philosophy
Henotic Diagnostics adopts a **luxurious, modern medical glassmorphism** aesthetic. All pages must evoke trust, clinical excellence, high technological sophistication, and premium comfort.

---

## 2. Color Palette & Utility Tokens

### Primary Brand Gradients & Accents
- **Main Header & Primary Hero Gradient**:
  `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`
- **Primary Action Buttons**:
  `bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500`
- **WhatsApp & Success Accent**:
  `text-emerald-500`, `bg-emerald-500`, `hover:bg-emerald-600`
- **Alerts & Warnings**:
  `text-rose-500`, `bg-rose-500`
- **Background Slate Shades**:
  - Light Mode: `bg-slate-50`, `bg-slate-100`, `bg-white`
  - Dark Mode: `dark:bg-slate-950`, `dark:bg-slate-900`, `dark:bg-slate-800`

---

## 3. Glassmorphism & Ambient Glow

### Glass Card Utility Pattern
```html
<div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 shadow-2xl rounded-2xl">
    <!-- Component Content -->
</div>
```

### Ambient Glowing Background Blobs
- Glow Blob 1: Top-left indigo blur (`bg-indigo-500/20 blur-3xl rounded-full`)
- Glow Blob 2: Middle-right purple blur (`bg-purple-500/20 blur-3xl rounded-full`)
- Glow Blob 3: Bottom-center pink blur (`bg-pink-500/20 blur-3xl rounded-full`)

---

## 4. Typography & Font Hierarchy
- **Primary Font**: `Inter` (Google Font) – Used for body copy, form inputs, metadata, and tables.
- **Display Heading Font**: `Outfit` (Google Font) – Used for page headings (`h1`, `h2`), card titles, and modal headers.
- **Micro Accents**:
  - Patient Names: `font-bold uppercase tracking-wide`
  - Badges & Tags: `text-[10px] md:text-xs font-extrabold uppercase`

---

## 5. Floating Widget & Coordinate Positioning Guidelines

To prevent overlapping interactive floating widgets:
- **WhatsApp & Phone Call Floating Container**:
  Positioned at `bottom-[80px] md:bottom-8 right-4 md:right-6 z-50`.
- **Google Customer Reviews (Shop Quality Badge)**:
  Positioned strictly at `BOTTOM_LEFT` (`position: "BOTTOM_LEFT"`).
- **Z-Index Layer Hierarchy**:
  - Ambient Glow Blobs: `z-0`
  - Content Cards: `z-10`
  - Sticky Main Header: `z-40`
  - Floating Action Buttons / Drawers: `z-50`
  - Modals & Lightboxes: `z-50`
