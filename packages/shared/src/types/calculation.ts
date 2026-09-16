/**
 * Types berkaitan Calculation (input & output).
 * Selaras dengan formula-engine/src/types.ts.
 * Rujuk docs/03-formula-engine.md & docs/05-example-case.md.
 */

import type { StandardCode } from './standard.js';
import type { ComplexityLevel } from './complexity.js';

// =============================================================================
// APPLICATION TYPE
// =============================================================================

/**
 * Jenis permohonan / audit.
 * - NEW          : audit awal (Stage 1 + Stage 2)
 * - SURVEILLANCE : audit pengawasan tahunan
 * - RECERT       : audit pensijilan semula (setiap 3 tahun)
 */
export type ApplicationType = 'NEW' | 'SURVEILLANCE' | 'RECERT';

/** Senarai semua application type — untuk validation & iterasi. */
export const APPLICATION_TYPES: readonly ApplicationType[] = [
  'NEW',
  'SURVEILLANCE',
  'RECERT',
] as const;

/** Type guard — sahkan sama ada string ialah ApplicationType yang sah. */
export function isApplicationType(value: unknown): value is ApplicationType {
  return (
    typeof value === 'string' &&
    (APPLICATION_TYPES as readonly string[]).includes(value)
  );
}

// =============================================================================
// INPUT
// =============================================================================

/**
 * Input ABMS — sebab ABMS guna CPI (Corruption Perceptions Index)
 * dan regulatory check, bukan IAF MD 5.
 */
export interface AbmsInput {
  /** Skor CPI (0–100) */
  readonly cpiScore: number;

  /** Sektor industri (optional) */
  readonly sector?: string;

  /** Ada tindakan regulatori? */
  readonly hasRegulatoryAction: boolean;
}

/**
 * Input untuk pengiraan mandays.
 * Ini yang backend terima dari frontend.
 */
export interface CalculationInput {
  /** Standard yang dipilih */
  readonly standard: StandardCode;

  /** Bilangan pekerja (FTE) */
  readonly fte: number;

  /** Bilangan site (optional, default: 1) */
  readonly sites?: number;

  /** Ada integrasi dengan standard lain? */
  readonly isIntegrated?: boolean;

  /** Jenis permohonan */
  readonly applicationType: ApplicationType;

  /** Complexity level (optional — kalau tak ada, auto-detect) */
  readonly complexity?: ComplexityLevel;

  /** Input khas ABMS (optional — hanya bila standard = ABMS) */
  readonly abmsInput?: AbmsInput;
}

// =============================================================================
// OUTPUT
// =============================================================================

/**
 * Satu langkah dalam audit trail.
 * Untuk transparensi & debugging.
 */
export interface TraceStep {
  /** Tier pengiraan */
  readonly tier: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'STAGE_SPLIT';

  /** Penerangan langkah */
  readonly description: string;

  /** Formula yang digunakan (optional) */
  readonly formula?: string;

  /** Input langkah ini */
  readonly input?: unknown;

  /** Output langkah ini */
  readonly output?: unknown;
}

/**
 * Metadata hasil pengiraan.
 */
export interface CalculationMeta {
  /** Standard yang digunakan */
  readonly standard: StandardCode;

  /** Nama penuh standard */
  readonly standardName: string;

  /** FTE yang digunakan */
  readonly fte: number;

  /** Complexity level (optional) */
  readonly complexity?: ComplexityLevel;

  /** Jenis permohonan */
  readonly applicationType: ApplicationType;

  /** Tarikh & masa pengiraan (ISO 8601) */
  readonly calculatedAt: string;

  /** Rujukan dokumen, cth: 'IAF MD 5:2019' */
  readonly reference: string;
}

/**
 * Hasil pengiraan mandays.
 * Ini yang backend hantar balik ke frontend.
 */
export interface CalculationResult {
  /** Base mandays (sebelum rounding) */
  readonly baseMd: number | null;

  /** Perlukan input manual? (cth: FTE > 10700) */
  readonly requiresManualInput: boolean;

  /** Effective mandays (selepas rounding / ceil) */
  readonly effectiveMd: number | null;

  /** Mandays Stage 1 */
  readonly stage1Md: number | null;

  /** Mandays Stage 2 */
  readonly stage2Md: number | null;

  /** Mandays surveillance */
  readonly surveillanceMd: number | null;

  /** Mandays recert */
  readonly recertMd: number | null;

  /** Metadata */
  readonly meta: CalculationMeta;

  /** Audit trail */
  readonly trace: readonly TraceStep[];

  /** Mesej tambahan (optional) */
  readonly message?: string;
}

// =============================================================================
// BASE MD RESULT
// =============================================================================

/**
 * Hasil pengiraan base mandays (TIER 1).
 * Digunakan secara dalaman oleh formula-engine.
 */
export interface BaseMdResult {
  /** Nilai base mandays (null kalau perlu manual input) */
  readonly value: number | null;

  /** Perlukan input manual? */
  readonly requiresManualInput: boolean;

  /** Mesej (optional) */
  readonly message?: string;

  /** Nilai rujukan terakhir (untuk FTE > table max) */
  readonly referenceLastValue?: number;

  /** Range rujukan terakhir */
  readonly referenceLastRange?: { readonly min: number; readonly max: number };

  /** Metadata */
  readonly meta: {
    readonly fte: number;
    readonly complexity: ComplexityLevel;
    readonly tableMaxFte: number;
    readonly standardName: string;
  };
}