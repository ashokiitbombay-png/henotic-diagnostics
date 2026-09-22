interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom Next.js Image Loader.
 * Optimizes media URLs dynamically depending on the source (WordPress media CDN, Google Cloud Storage, etc.).
 */
export default function wordpressImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Serve directly from CDN — primary path for all media.
  if (src.includes("cdn.henoticdiagnostics.com/")) {
    const relativePath = src.split("cdn.henoticdiagnostics.com/")[1];
    const encodedPath = relativePath.split('/').map(seg => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    }).join('/');
    return `https://cdn.henoticdiagnostics.com/${encodedPath}`;
  }

  // Legacy fallback: handle any stale GCS URLs from cached content
  if (src.includes("storage.googleapis.com/wp-media-henoticbucket/")) {
    const relativePath = src.split("storage.googleapis.com/wp-media-henoticbucket/")[1];
    const encodedPath = relativePath.split('/').map(seg => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    }).join('/');
    return `https://cdn.henoticdiagnostics.com/${encodedPath}`;
  }

  // If the image is served from Google Cloud Storage generally, handle standard URL output
  if (src.includes("storage.googleapis.com")) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // If the image is served from WordPress uploads directory, optimize using responsive sizes
  if (src.includes("/wp-content/uploads/")) {
    // Add responsive query parameters if WordPress CDN handles dynamic resizes
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Fallback for standard local images or external assets
  return `${src}?w=${width}&q=${quality || 75}`;
}
