/**
 * TIER 3: DERIVED
 *
 * Kira surveillance, recertification, dan stage split.
 *
 * Rujukan:
 * - 03-formula-engine.md - TIER 3: DERIVED (IAF MD 5:2023)
 * - CAP 03-01 (R1), Page 32 - "one third" dan "two thirds"
 *
 * Formula:
 * - Surveillance: ceil(1/3 x effective MD)
 * - Recertification: ceil(2/3 x effective MD)
 * - Minimum 1 audit day
 */

const SURVEILLANCE_FRACTION = 1 / 3;
const RECERT_FRACTION = 2 / 3;
const MIN_AUDIT_DAYS = 1;

/**
 * Kira surveillance mandays.
 * Formula: ceil(1/3 x effective MD)
 */
export function getSurveillanceMd(effectiveMd: number): number {
  if (effectiveMd < 0) {
    throw new Error(
      `[TIER 3] Effective MD tidak boleh negatif. Diterima: ${effectiveMd}`
    );
  }

  const calculated = Math.ceil(SURVEILLANCE_FRACTION * effectiveMd);

  return Math.max(calculated, MIN_AUDIT_DAYS);
}

/**
 * Kira recertification mandays.
 * Formula: ceil(2/3 x effective MD)
 */
export function getRecertMd(effectiveMd: number): number {
  if (effectiveMd < 0) {
    throw new Error(
      `[TIER 3] Effective MD tidak boleh negatif. Diterima: ${effectiveMd}`
    );
  }

  const calculated = Math.ceil(RECERT_FRACTION * effectiveMd);

  return Math.max(calculated, MIN_AUDIT_DAYS);
}

/**
 * Kira semua derived mandays (surveillance + recert).
 */
export function getDerived(effectiveMd: number): {
  surveillanceMd: number;
  recertMd: number;
  meta: {
    effectiveMd: number;
    surveillanceFormula: string;
    recertFormula: string;
    minAuditDays: number;
  };
} {
  const surveillanceMd = getSurveillanceMd(effectiveMd);
  const recertMd = getRecertMd(effectiveMd);

  return {
    surveillanceMd,
    recertMd,
    meta: {
      effectiveMd,
      surveillanceFormula: `ceil(1/3 x ${effectiveMd}) = ${surveillanceMd}`,
      recertFormula: `ceil(2/3 x ${effectiveMd}) = ${recertMd}`,
      minAuditDays: MIN_AUDIT_DAYS,
    },
  };
}

// =============================================================================
// STAGE SPLIT (DEFAULT SUGGESTION)
// =============================================================================

export interface StageSplitResult {
  stage1Md: number;
  stage2Md: number;
  meta: {
    effectiveMd: number;
    defaultRatio: string;
    note: string;
  };
}

/**
 * Cadang stage 1 & stage 2 split (DEFAULT SAHAJA).
 * Default ratio: 30:70
 * ATD BOLEH override - ini cuma suggestion.
 */
export function suggestStageSplit(
  effectiveMd: number,
  ratio: number = 0.3
): StageSplitResult {
  if (ratio <= 0 || ratio >= 1) {
    throw new Error(
      `[TIER 3] Stage 1 ratio mesti antara 0 dan 1. Diterima: ${ratio}`
    );
  }

  const stage1Md = Math.ceil(ratio * effectiveMd * 10) / 10;
  const stage2Md = Math.ceil((effectiveMd - stage1Md) * 10) / 10;

  return {
    stage1Md,
    stage2Md,
    meta: {
      effectiveMd,
      defaultRatio: `${ratio * 100}:${(1 - ratio) * 100}`,
      note:
        'Ini CADANGAN SAHAJA. ATD boleh override stage split ' +
        'dengan justifikasi.',
    },
  };
}