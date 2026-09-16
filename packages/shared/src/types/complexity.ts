/**
 * Types berkaitan Complexity Level.
 * Complexity menentukan lajur mana dalam mandays table digunakan (TIER 1).
 * Selaras dengan IAF MD 5: High / Med / Low / Lim.
 * Rujuk docs/03-formula-engine.md.
 */

/**
 * Tahap complexity standard.
 * - LIMITED : skop terhad (IAF: "Lim")
 * - LOW     : organisasi kecil, proses mudah
 * - MEDIUM  : organisasi sederhana
 * - HIGH    : organisasi besar, proses kompleks
 */
export type ComplexityLevel = 'LIMITED' | 'LOW' | 'MEDIUM' | 'HIGH';

/** Senarai semua complexity level — untuk validation & iterasi. */
export const COMPLEXITY_LEVELS: readonly ComplexityLevel[] = [
  'LIMITED',
  'LOW',
  'MEDIUM',
  'HIGH',
] as const;

/** Type guard — sahkan sama ada string ialah ComplexityLevel yang sah. */
export function isComplexityLevel(value: unknown): value is ComplexityLevel {
  return (
    typeof value === 'string' &&
    (COMPLEXITY_LEVELS as readonly string[]).includes(value)
  );
}

/**
 * Faktor yang menyumbang kepada complexity.
 * Shared-only type — untuk backend terima input questionnaire.
 */
export interface ComplexityFactor {
  /** Nama faktor, cth: 'employeeCount', 'siteCount', 'regulatory' */
  readonly name: string;

  /** Nilai faktor */
  readonly value: number | string | boolean;

  /** Berat faktor (0–1). Default: 1 */
  readonly weight?: number;
}

/**
 * Input untuk tentukan complexity.
 * Boleh datang dari questionnaire (auto-detect) atau manual override.
 */
export interface ComplexityInput {
  /** Saiz organisasi (bilangan pekerja) */
  readonly employeeCount: number;

  /** Bilangan lokasi / site */
  readonly siteCount: number;

  /** Sektor industri */
  readonly sector: string;

  /** Ada keperluan regulatori khas? */
  readonly hasRegulatoryRequirement: boolean;

  /** Skop standard, cth: 'single-site', 'multi-site', 'corporate' */
  readonly scope: string;

  /** Faktor tambahan (extensible) */
  readonly additionalFactors?: readonly ComplexityFactor[];

  /** Override manual — kalau ada, ambil ini dan abaikan auto-detect */
  readonly override?: ComplexityLevel;
}

/**
 * Hasil penentuan complexity.
 * Shared-only type — untuk backend/frontend papar & audit.
 */
export interface ComplexityResult {
  /** Level akhir selepas auto-detect / override */
  readonly level: ComplexityLevel;

  /** Skor mentah (0–100) sebelum dipetakan ke level */
  readonly score: number;

  /** Auto-detect atau override */
  readonly source: 'auto' | 'override';

  /** Sebab / nota kenapa level ini dipilih */
  readonly reason: string;

  /** Faktor yang menyumbang (untuk audit) */
  readonly factors: readonly ComplexityFactor[];
}