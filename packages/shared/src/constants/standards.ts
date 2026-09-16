/**
 * Metadata untuk 5 standard yang disokong sistem.
 *
 * Sumber:
 * - IAF MD 5:2023 — QMS, EMS, OH&SMS
 * - CAP 03-01 (R1) — NIOSHCert implementation
 * - ISO/IEC 27006 — ISMS (TODO: data belum supply)
 */

import type { StandardCode, StandardMeta } from '../types/standard.js';

// =============================================================================
// STANDARDS METADATA
// =============================================================================

/**
 * Metadata penuh untuk setiap standard.
 *
 * Nota:
 * - `referenceDoc` — dokumen rujukan utama untuk kiraan audit time
 * - `baseMandays` — nilai default (akan dioverride oleh table lookup)
 * - Untuk OSHMS/QMS/EMS — guna IAF MD 5:2023
 * - Untuk ABMS — guna IAF MD 5:2023 (rujuk Table 3.3 CAP 03-01)
 * - Untuk ISMS — guna ISO/IEC 27006 (TODO)
 */
export const STANDARDS: Readonly<Record<StandardCode, StandardMeta>> = {
  OSHMS: {
    code: 'OSHMS',
    name: 'Occupational Health and Safety Management System',
    version: 'ISO 45001:2018',
    description:
      'Sistem pengurusan keselamatan dan kesihatan pekerjaan. ' +
      'Merangkumi pengenalpastian bahaya, penilaian risiko, dan kawalan risiko.',
    baseMandays: 3,
    isActive: true,
  },

  QMS: {
    code: 'QMS',
    name: 'Quality Management System',
    version: 'ISO 9001:2015',
    description:
      'Sistem pengurusan kualiti. Merangkumi proses, produk, dan perkhidmatan ' +
      'untuk memenuhi keperluan pelanggan dan regulatori.',
    baseMandays: 1.5,
    isActive: true,
  },

  EMS: {
    code: 'EMS',
    name: 'Environmental Management System',
    version: 'ISO 14001:2015',
    description:
      'Sistem pengurusan alam sekitar. Merangkumi aspek alam sekitar, ' +
      'impak, dan pematuhan regulatori.',
    baseMandays: 3,
    isActive: true,
  },

  ABMS: {
    code: 'ABMS',
    name: 'Anti-Bribery Management System',
    version: 'ISO 37001:2025',
    description:
      'Sistem pengurusan anti-rasuah. Menggunakan CPI (Corruption Perceptions Index) ' +
      'dan regulatory history untuk tentukan audit time.',
    baseMandays: 3,
    isActive: true,
  },

  ISMS: {
    code: 'ISMS',
    name: 'Information Security Management System',
    version: 'ISO/IEC 27001:2022',
    description:
      'Sistem pengurusan keselamatan maklumat. Audit time merujuk ISO/IEC 27006 ' +
      'dengan faktor tambahan (business + IT environment).',
    baseMandays: 3,
    isActive: true,
  },
} as const;

// =============================================================================
// REFERENCE DOCUMENTS
// =============================================================================

/**
 * Dokumen rujukan untuk setiap standard.
 * Berguna untuk audit trail & paparan di UI.
 */
export const STANDARD_REFERENCES: Readonly<Record<StandardCode, string>> = {
  OSHMS: 'IAF MD 5:2023 — Annex C (OH&SMS)',
  QMS: 'IAF MD 5:2023 — Annex A (QMS)',
  EMS: 'IAF MD 5:2023 — Annex B (EMS)',
  ABMS: 'IAF MD 5:2023 + CAP 03-01 (R1) — Table 3.3',
  ISMS: 'ISO/IEC 27006 — Annex B (TODO: data belum supply)',
} as const;

// =============================================================================
// STANDARD VERSIONS
// =============================================================================

/**
 * Versi standard (short form) — untuk paparan ringkas.
 */
export const STANDARD_VERSIONS: Readonly<Record<StandardCode, string>> = {
  OSHMS: 'ISO 45001:2018',
  QMS: 'ISO 9001:2015',
  EMS: 'ISO 14001:2015',
  ABMS: 'ISO 37001:2025',
  ISMS: 'ISO/IEC 27001:2022',
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Dapatkan metadata standard.
 */
export function getStandardMeta(code: StandardCode): StandardMeta {
  return STANDARDS[code];
}

/**
 * Dapatkan dokumen rujukan untuk standard.
 */
export function getStandardReference(code: StandardCode): string {
  return STANDARD_REFERENCES[code];
}

/**
 * Dapatkan versi standard.
 */
export function getStandardVersion(code: StandardCode): string {
  return STANDARD_VERSIONS[code];
}

/**
 * Senarai standard yang aktif sahaja.
 * Berguna untuk dropdown UI.
 */
export function getActiveStandards(): readonly StandardCode[] {
  return (Object.keys(STANDARDS) as StandardCode[]).filter(
    (code) => STANDARDS[code].isActive,
  );
}