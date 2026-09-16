/**
 * Constants & limits untuk sistem.
 * Sumber: IAF MD 5:2023, CAP 03-01 (R1), dan keputusan sistem.
 */

import type { ApplicationType } from '../types/calculation.js';
import type { ComplexityLevel } from '../types/complexity.js';

// =============================================================================
// FTE LIMITS
// =============================================================================

/**
 * FTE maksimum dalam table IAF MD 5.
 * Melebihi ini → case-by-case, ATD manual input.
 */
export const MAX_FTE = 10700;

/**
 * FTE minimum yang sah.
 */
export const MIN_FTE = 1;

// =============================================================================
// CPI RANGES (ABMS)
// =============================================================================

/**
 * CPI (Corruption Perceptions Index) ranges untuk ABMS.
 * Sumber: CAP 03-01 Table 3.3.
 *
 * - CPI <= 30  → HIGH (default dari location)
 * - CPI 31-59  → MEDIUM
 * - CPI >= 60  → LOW
 */
export const CPI_RANGES = {
  HIGH: { min: 0, max: 30 },
  MEDIUM: { min: 31, max: 59 },
  LOW: { min: 60, max: 100 },
} as const;

/** CPI score minimum. */
export const MIN_CPI_SCORE = 0;

/** CPI score maksimum. */
export const MAX_CPI_SCORE = 100;

// =============================================================================
// SITES
// =============================================================================

/** Bilangan site minimum. */
export const MIN_SITES = 1;

/** Bilangan site maksimum (soft limit — untuk validation UI). */
export const MAX_SITES = 1000;

// =============================================================================
// APPLICATION TYPE RATIOS
// =============================================================================

/**
 * Ratio untuk kiraan surveillance & recert dari initial audit.
 * Sumber: IAF MD 5:2023, Clause 5 & 6.
 *
 * - Surveillance = ~1/3 dari initial
 * - Recertification = ~2/3 dari initial
 */
export const APPLICATION_RATIOS: Readonly<Record<ApplicationType, number>> = {
  NEW: 1.0,
  SURVEILLANCE: 1 / 3,
  RECERT: 2 / 3,
} as const;

// =============================================================================
// ROUNDING
// =============================================================================

/**
 * Mod rounding yang digunakan.
 * Sistem guna CAP (ceil) — rujuk docs/03-formula-engine.md.
 */
export const ROUNDING_MODE = 'ceil' as const;

/**
 * Step rounding untuk audit days.
 * IAF MD 5 Clause 2.2.3: adjust ke 0.5 terdekat.
 * (Untuk sekarang kita guna ceil dulu, clarify NIOSHCert kemudian.)
 */
export const ROUNDING_STEP = 0.5;

// =============================================================================
// INTEGRATED MANAGEMENT SYSTEM (IMS)
// =============================================================================

/**
 * Maximum reduction untuk IMS.
 * Sumber: IAF MD 11:2023.
 */
export const IMS_MAX_REDUCTION = 0.2;

/**
 * Minimum IMS reduction.
 */
export const IMS_MIN_REDUCTION = 0.0;

// =============================================================================
// AUDIT TIME ADJUSTMENTS
// =============================================================================

/**
 * Maximum reduction untuk audit time.
 * Sumber: IAF MD 5:2023, Clause 3.9.
 */
export const MAX_AUDIT_TIME_REDUCTION = 0.3;

/**
 * Minimum on-site duration sebagai peratus dari audit time.
 * Sumber: IAF MD 5:2023, Clause 2.1.2.
 */
export const MIN_ON_SITE_DURATION_RATIO = 0.8;

// =============================================================================
// ISMS ADJUSTMENT RANGES
// =============================================================================

/**
 * Adjustment ranges untuk ISMS berdasarkan Table C.4 (ISO/IEC 27006).
 * TODO: implement penuh bila data ISO 27006 siap.
 */
export const ISMS_ADJUSTMENT_RANGES = {
  BUSINESS_COMPLEXITY: {
    HIGH: { min: 0.07, max: 0.09 },
    MEDIUM: { min: 0.05, max: 0.06 },
    LOW: { min: 0.03, max: 0.04 },
  },
  IT_COMPLEXITY: {
    HIGH: { min: 0.07, max: 0.09 },
    MEDIUM: { min: 0.05, max: 0.06 },
    LOW: { min: 0.03, max: 0.04 },
  },
} as const;

// =============================================================================
// COMPLEXITY DEFAULTS
// =============================================================================

/**
 * Complexity default kalau tak dapat detect dari input.
 */
export const DEFAULT_COMPLEXITY: ComplexityLevel = 'MEDIUM';

// =============================================================================
// PAGINATION DEFAULTS
// =============================================================================

/** Default page untuk senarai. */
export const DEFAULT_PAGE = 1;

/** Default page size untuk senarai. */
export const DEFAULT_PAGE_SIZE = 20;

/** Maximum page size. */
export const MAX_PAGE_SIZE = 100;

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Sahkan sama ada CPI score jatuh dalam range tertentu.
 */
export function isCpiInRange(
  cpi: number,
  range: keyof typeof CPI_RANGES,
): boolean {
  const r = CPI_RANGES[range];
  return cpi >= r.min && cpi <= r.max;
}

/**
 * Map CPI score ke complexity level (ABMS).
 */
export function cpiToComplexity(cpi: number): ComplexityLevel {
  if (cpi <= CPI_RANGES.HIGH.max) return 'HIGH';
  if (cpi <= CPI_RANGES.MEDIUM.max) return 'MEDIUM';
  return 'LOW';
}