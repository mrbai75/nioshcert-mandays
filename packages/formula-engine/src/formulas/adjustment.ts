/**
 * TIER 2: ADJUSTMENT
 *
 * Rounding untuk "effective auditing".
 *
 * Rujukan:
 * - 03-formula-engine.md - TIER 2: ADJUSTMENT (NIOSHCert practice)
 * - 05-example-case.md - "Rounding 3.5 -> 4.0 untuk effective auditing"
 *
 * Formula: ceil(baseMd)
 * Contoh: 3.5 -> 4.0, 3.0 -> 3.0, 3.1 -> 4.0
 */

/**
 * Kira effective mandays dari base mandays.
 */
export function getEffectiveMd(baseMd: number): number {
  if (baseMd < 0) {
    throw new Error(`[TIER 2] Base MD tidak boleh negatif. Diterima: ${baseMd}`);
  }

  return Math.ceil(baseMd);
}

/**
 * Kira effective mandays dengan detail untuk audit trail.
 */
export function getEffectiveMdWithDetail(baseMd: number): {
  baseMd: number;
  effectiveMd: number;
  rounded: boolean;
  roundingAmount: number;
} {
  const effectiveMd = getEffectiveMd(baseMd);

  return {
    baseMd,
    effectiveMd,
    rounded: effectiveMd !== baseMd,
    roundingAmount: effectiveMd - baseMd,
  };
}