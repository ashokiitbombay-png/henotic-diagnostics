/**
 * 🏅 Accreditation Certificate Registry
 * Central mapping of accreditation logos → certificate images.
 * Used across ServiceHero, HeroBlock, Accreditations, and any component
 * that displays accreditation logos.
 */

const CERT_BASE = "https://storage.googleapis.com/wp-media-henoticbucket/Certificates";

export const CERTIFICATE_MAP: Record<string, string> = {
  "CAP":    `${CERT_BASE}/Certificates_henotic-diagnostics-cap-certified.webp`,
  "NABL":   `${CERT_BASE}/Certificates_henotic-diagnostics-nabl-certified.webp`,
  "ISO":    `${CERT_BASE}/Certificates_henotic-diagnostics-iso-certified.webp`,
  "AERB":   `${CERT_BASE}/henotic-diagnostics-aerb-certified.webp`,
  "PCPNDT": `${CERT_BASE}/henotic-diagnostics-pcpndt-certified.webp`,
  "NABH":   `${CERT_BASE}/Certificates_henotic-diagnostics-nabl-certified.webp`, // Uses NABL cert (parent body)
  "ISUOG":  `${CERT_BASE}/henotic-diagnostics-isoug-certified.webp`,
  "ISOUG":  `${CERT_BASE}/henotic-diagnostics-isoug-certified.webp`,
};

/**
 * Get the certificate URL for a given accreditation title.
 * Returns null if no certificate is available.
 */
export function getCertificateUrl(title: string): string | null {
  // Normalize: strip common suffixes and match by key
  const key = title.toUpperCase()
    .replace(/\s*(ACCREDITED|CERTIFIED|COMPLIANT|CERTIFICATION)\s*/gi, '')
    .trim();
  
  return CERTIFICATE_MAP[key] || null;
}
