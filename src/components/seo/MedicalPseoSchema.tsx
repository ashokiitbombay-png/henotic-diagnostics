import React from 'react';
import {
  generateServiceSchemas,
  generateConditionSchema,
  generateDoctorSchema,
  generateComparisonSchema,
  generateMedicalTestSchema,
  generateLocationClinicSchema
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
 * 
 * Automatically selects and renders highly nested YMYL healthcare schemas:
 * - MedicalWebPage + DiagnosticProcedure + MedicalTest + BreadcrumbList + FAQPage
 * - MedicalClinic (per-location for hyper-local PSEO pages)
 * - MedicalCondition + MedicalSymptom
 * - Physician
 * 
 * Google's YMYL (Your Money or Your Life) algorithms give healthcare content
 * higher scrutiny. These nested schemas signal medical authority to crawlers.
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemasToRender: Record<string, any>[] = [];

  if (type === 'service' && serviceSlug) {
    const formattedName = serviceName || serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // 1. Core schemas: DiagnosticProcedure + MedicalWebPage + Breadcrumbs + FAQ
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

    // 2. MedicalTest schema — higher YMYL signal than DiagnosticProcedure
    const medicalTestSchema = generateMedicalTestSchema({
      serviceSlug,
      serviceName: formattedName,
      regionSlug,
      locationSlug,
      wpContent
    });
    if (medicalTestSchema) {
      schemasToRender.push(medicalTestSchema);
    }

    // 3. Location-specific MedicalClinic for hyper-local PSEO pages
    if (regionSlug && locationSlug) {
      const clinicSchema = generateLocationClinicSchema({
        regionSlug,
        locationSlug,
        serviceSlug,
        serviceName: formattedName
      });
      if (clinicSchema) {
        schemasToRender.push(clinicSchema);
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
