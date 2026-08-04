/**
 * 🏥 Intelligent Medical Blog Image Resolver
 * Resolves high-resolution diagnostic images for WordPress blog posts.
 * Cascades:
 * 1. Post Featured Image (if set in WordPress)
 * 2. Inline Image in Post Content (if present in HTML body)
 * 3. Keyword / Category Medical Image Matching
 * 4. Henotic Corporate Center Default Image
 */

const FALLBACK_IMAGES = {
  cardiac: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7f8eb649-tmt-test-stress-echo-test-stress-test-2d-echo-test-kharghar-henotic-diagnostics-navi-mumbai.webp",
  petCt: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/henotic-diagnostics-pet-scan_hero.webp",
  mri: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/mri-scan-henotic-diagnostics_hero.webp",
  ctScan: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/934e91ce-ct-scan-kharghar-01-scaled.webp",
  pathology: "https://storage.googleapis.com/wp-media-henoticbucket/Laboratory/laboratory-henotic-diagnostics-ct-scan-dexa-bone-scan-mri-scan-sonography-ultrasound-pet-scan-dopa-scan-kharghar-navi-mumbai.webp",
  ultrasound: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/reception-desk-henotic-diagnostics_hero.webp",
  default: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/henotic-diagnostics-main-entrance_hero.webp",
};

/** Extracts the first image URL from HTML content. */
export function extractFirstImageUrl(html: string | undefined): string | null {
  if (!html) return null;

  // Try <img src="...">
  const imgSrcMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgSrcMatch?.[1]) return imgSrcMatch[1];

  // Try <img srcset="...">
  const srcsetMatch = html.match(/<img[^>]+srcset=["']([^\s"']+)/i);
  if (srcsetMatch?.[1]) return srcsetMatch[1];

  // Try background-image: url("...")
  const bgMatch = html.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/i);
  if (bgMatch?.[1]) return bgMatch[1];

  return null;
}

export interface PostImageInput {
  title?: string;
  slug?: string;
  content?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  categories?: {
    nodes?: { name?: string; slug?: string }[];
  };
}

export function getBlogImageUrl(post: PostImageInput): string {
  // 1. Featured Image from WordPress
  if (post.featuredImage?.node?.sourceUrl) {
    return post.featuredImage.node.sourceUrl;
  }

  // 2. First inline image from post HTML content
  const contentImage = extractFirstImageUrl(post.content);
  if (contentImage) {
    return contentImage;
  }

  // 3. Topic & Keyword Matching from title, slug, or category name
  const searchText = `${post.title || ""} ${post.slug || ""} ${post.categories?.nodes?.[0]?.name || ""}`.toLowerCase();

  if (searchText.includes("echo") || searchText.includes("cardiac") || searchText.includes("tmt") || searchText.includes("heart") || searchText.includes("ecg") || searchText.includes("stress")) {
    return FALLBACK_IMAGES.cardiac;
  }

  if (searchText.includes("pet") || searchText.includes("psma") || searchText.includes("nuclear") || searchText.includes("prostate") || searchText.includes("dopa") || searchText.includes("cancer")) {
    return FALLBACK_IMAGES.petCt;
  }

  if (searchText.includes("mri") || searchText.includes("brain") || searchText.includes("spine") || searchText.includes("joint")) {
    return FALLBACK_IMAGES.mri;
  }

  if (searchText.includes("ct") || searchText.includes("angiography") || searchText.includes("hrct") || searchText.includes("scan")) {
    return FALLBACK_IMAGES.ctScan;
  }

  if (searchText.includes("blood") || searchText.includes("lab") || searchText.includes("pathology") || searchText.includes("test") || searchText.includes("cbc") || searchText.includes("hba1c") || searchText.includes("thyroid") || searchText.includes("urine")) {
    return FALLBACK_IMAGES.pathology;
  }

  if (searchText.includes("ultrasound") || searchText.includes("sonography") || searchText.includes("usg") || searchText.includes("pregnancy") || searchText.includes("doppler")) {
    return FALLBACK_IMAGES.ultrasound;
  }

  // 4. Default Henotic Diagnostics corporate building image
  return FALLBACK_IMAGES.default;
}
