import React from 'react';
import {
  generateServiceSchemas,
  generateConditionSchema,
  generateDoctorSchema,
  generateComparisonSchema
} from '@/lib/seo/medical-schema-generator';

export interface MedicalPseoSchemaProps {
  type: 'service' | 'condition' | 'doctor' | 'compare';
  serviceSlug?: string;
  serviceName?: string;
  regionSlug?: string;
  locationSlug?: string;
  conditionId?: string;
  doctorId?: string;
  compareSlug?: string;
  wpContent?: string;
}

/**
 * 🤖 Medical PSEO Schema Component — Context-Aware JSON-LD Head Injector
 * Automatically selects and renders MedicalWebPage, DiagnosticProcedure,
 * MedicalCondition, Physician, BreadcrumbList, and FAQPage schemas.
 */
export default function MedicalPseoSchema({
  type,
  serviceSlug,
  serviceName,
  regionSlug,
  locationSlug,
  conditionId,
  doctorId,
  compareSlug,
  wpContent
}: MedicalPseoSchemaProps) {
  const schemasToRender: Record<string, any>[] = [];

  if (type === 'service' && serviceSlug) {
    const formattedName = serviceName || serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const serviceSchemas = generateServiceSchemas({
      serviceSlug,
      serviceName: formattedName,
      regionSlug,
      locationSlug,
      wpContent
    });

    if (serviceSchemas) {
      schemasToRender.push(serviceSchemas.medicalWebPageSchema);
      schemasToRender.push(serviceSchemas.diagnosticProcedureSchema);
      schemasToRender.push(serviceSchemas.breadcrumbSchema);
      if (serviceSchemas.faqSchema) {
        schemasToRender.push(serviceSchemas.faqSchema);
      }
    }
  } else if (type === 'condition' && conditionId) {
    const conditionSchemas = generateConditionSchema(conditionId);
    if (conditionSchemas) {
      schemasToRender.push(conditionSchemas.medicalWebPageSchema);
      schemasToRender.push(conditionSchemas.medicalConditionSchema);
      schemasToRender.push(conditionSchemas.breadcrumbSchema);
    }
  } else if (type === 'doctor' && doctorId) {
    const doctorSchemas = generateDoctorSchema(doctorId);
    if (doctorSchemas) {
      schemasToRender.push(doctorSchemas.physicianSchema);
      schemasToRender.push(doctorSchemas.breadcrumbSchema);
    }
  } else if (type === 'compare' && compareSlug) {
    const compareSchemas = generateComparisonSchema(compareSlug);
    if (compareSchemas) {
      schemasToRender.push(compareSchemas.medicalWebPageSchema);
      schemasToRender.push(compareSchemas.breadcrumbSchema);
    }
  }

  if (schemasToRender.length === 0) return null;

  return (
    <>
      {schemasToRender.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
