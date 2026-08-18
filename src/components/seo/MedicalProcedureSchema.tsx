import React from 'react';

interface MedicalProcedureSchemaProps {
  procedureName: string;
  procedureSlug: string;
  description?: string;
  bodyLocation?: string;
  howPerformed?: string;
}

/**
 * 🤖 MedicalProcedure Schema — Enhances SERP visibility for diagnostic procedures
 */
export default function MedicalProcedureSchema({
  procedureName,
  procedureSlug,
  description,
  bodyLocation,
  howPerformed,
}: MedicalProcedureSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": procedureName,
    "description": description || `${procedureName} diagnostic procedure at Henotic Diagnostics. NABL accredited, same-day reports, affordable pricing.`,
    "url": `https://www.henoticdiagnostics.com/services/${procedureSlug}`,
    "procedureType": "https://schema.org/DiagnosticProcedure",
    "bodyLocation": bodyLocation || "Various",
    "howPerformed": howPerformed || `Advanced diagnostic imaging and laboratory analysis using state-of-the-art equipment for accurate ${procedureName} results.`,
    "status": "https://schema.org/EventScheduled",
    "availableService": {
      "@type": "MedicalTherapy",
      "name": procedureName,
      "availableIn": {
        "@type": "MedicalClinic",
        "name": "Henotic Diagnostics",
        "telephone": "+91-8879327184"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
