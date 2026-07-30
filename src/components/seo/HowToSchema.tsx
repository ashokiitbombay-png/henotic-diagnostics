import React from 'react';

export interface HowToStep {
  name: string;
  text: string;
  imageUrl?: string;
}

export interface HowToSchemaProps {
  title: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}

/**
 * 🤖 HowTo Schema Component
 * Server Component for rendering HowTo JSON-LD structured data
 */
export default function HowToSchema({
  title,
  description,
  steps,
  totalTime,
}: HowToSchemaProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    ...(totalTime ? { "totalTime": totalTime } : {}),
    "step": steps.map((step) => ({
      "@type": "HowToStep",
      "name": step.name,
      "text": step.text,
      ...(step.imageUrl ? { "image": step.imageUrl } : {})
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
