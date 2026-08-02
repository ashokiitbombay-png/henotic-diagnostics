import React from 'react';

export interface VideoObjectSchemaProps {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadDate?: string;
  duration?: string;
}

/**
 * 🤖 VideoObject Schema Component
 * Server Component for rendering VideoObject JSON-LD structured data
 */
export default function VideoObjectSchema({
  videoTitle,
  videoDescription,
  videoUrl,
  thumbnailUrl,
  uploadDate,
  duration,
}: VideoObjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle,
    "description": videoDescription,
    "thumbnailUrl": thumbnailUrl,
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
    ...(uploadDate ? { "uploadDate": uploadDate } : {}),
    ...(duration ? { "duration": duration } : {}),
    "publisher": {
      "@type": "Organization",
      "name": "Henotic Diagnostics",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.henoticdiagnostics.com/icon-512.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
