/**
 * Utiliti rounding untuk pengiraan mandays.
 *
 * Sumber:
 * - IAF MD 5:2023 — Clause 2.2.3 (adjust ke 0.5 terdekat)
 * - docs/03-formula-engine.md — sistem guna CAP (ceil) untuk sekarang
 *
 * Nota:
 * - Sistem guna `ceil` dulu (CAP). Clarify dengan NIOSHCert kemudian.
 * - IAF MD 5 sebenar guna "nearest 0.5 day" — kita boleh implement kemudian.
 */

// =============================================================================
// ROUNDING FUNCTIONS
// =============================================================================

/**
 * Cap (ceil) — bundarkan ke atas ke integer terdekat.
 *
 * Contoh:
 *   3.0 → 3
 *   3.1 → 4
 *   3.5 → 4
 *   3.9 → 4
 *
 * Ini rounding mode utama sistem (CAP).
 */
export function capCeil(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(`[rounding] Nilai tidak sah: ${value}`);
  }
  return Math.ceil(value);
}

/**
 * Bundarkan ke 0.5 terdekat (IAF MD 5 Clause 2.2.3).
 *
 * Contoh:
 *   5.3 → 5.5
 *   5.2 → 5.0
 *   5.7 → 5.5
 *   5.8 → 6.0
 *
 * TODO: Aktifkan bila NIOSHCert clarify guna 0.5 step.
 */
export function roundToNearestHalf(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(`[rounding] Nilai tidak sah: ${value}`);
  }
  return Math.round(value * 2) / 2;
}

/**
 * Bundarkan ke 2 tempat perpuluhan.
 * Untuk paparan & intermediate calculation.
 */
export function roundTo2(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(`[rounding] Nilai tidak sah: ${value}`);
  }
  return Math.round(value * 100) / 100;
}

/**
 * Bundarkan ke integer terdekat (round half up).
 * Untuk paparan sahaja — BUKAN untuk pengiraan mandays.
 */
export function roundToInt(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(`[rounding] Nilai tidak sah: ${value}`);
  }
  return Math.round(value);
}

// =============================================================================
// ROUNDING WITH DETAIL (Audit Trail)
// =============================================================================

/**
 * Hasil rounding dengan detail untuk audit trail.
 */
export interface RoundingDetail {
  /** Nilai asal */
  readonly original: number;

  /** Nilai selepas rounding */
  readonly rounded: number;

  /** Ada perubahan? */
  readonly changed: boolean;

  /** Jumlah perubahan (rounded - original) */
  readonly delta: number;
}

/**
 * Cap (ceil) dengan detail.
 */
export function capCeilWithDetail(value: number): RoundingDetail {
  const rounded = capCeil(value);
  return {
    original: value,
    rounded,
    changed: rounded !== value,
    delta: rounded - value,
  };
}

/**
 * Round to nearest half dengan detail.
 */
export function roundToNearestHalfWithDetail(value: number): RoundingDetail {
  const rounded = roundToNearestHalf(value);
  return {
    original: value,
    rounded,
    changed: rounded !== value,
    delta: rounded - value,
  };
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Sahkan sama ada value ialah nombor yang sah (finite, bukan NaN).
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Sahkan sama ada value ialah nombor positif (> 0).
 */
export function isPositiveNumber(value: unknown): value is number {
  return isValidNumber(value) && value > 0;
}

/**
 * Sahkan sama ada value ialah nombor bukan negatif (>= 0).
 */
export function isNonNegativeNumber(value: unknown): value is number {
  return isValidNumber(value) && value >= 0;
}