/**
 * IMS (Integrated Management System) calculation
 *
 * Rujukan: IAF MD 11:2023 + CAP 03-01 (Section 9)
 *   - Kira setiap standard berasingan
 *   - Jumlahkan: T = A + B + C
 *   - Reduction: 0% hingga 20% (bergantung level integrasi)
 *
 * Nota:
 *   - Formula-engine TERIMA `suggestedReduction` dari backend
 *   - Backend yang kira skor integrasi dari questionnaire answers
 *   - ATD boleh override (imsReduction)
 */

import { CalculationInput, CalculationResult } from './types';
import { calculate } from './calculate';

export interface ImsInput {
  standards: CalculationInput[];
  suggestedReduction?: number; // 0.0 - 0.20 (dari backend, optional)
  imsReduction?: number;       // 0.0 - 0.20 (ATD override, optional)
}

export interface ImsIndividualResult {
  standard: string;
  result: CalculationResult;
}

export interface ImsResult {
  individual: ImsIndividualResult[];
  rawTotalMd: number;
  imsReduction: number;          // actual reduction (0.0 - 0.20)
  imsReductionSource: 'AUTO' | 'OVERRIDE';
  suggestedReduction: number;    // dari backend (atau 0 jika tiada)
  reductionMinMd: number;        // T × (1 - 0.20)
  reductionMaxMd: number;        // T × (1 - 0.00)
  finalTotalMd: number;
  meta: {
    standardsCount: number;
    maxReduction: number;
    minReduction: number;
    reference: string;
    calculatedAt: string;
  };
}

const MAX_IMS_REDUCTION = 0.20;
const MIN_IMS_REDUCTION = 0.00;

export function calculateIms(input: ImsInput): ImsResult {
  // 1. Kira setiap standard
  const individual: ImsIndividualResult[] = input.standards.map((std) => ({
    standard: std.standard,
    result: calculate(std),
  }));

  // 2. Raw total (T = A + B + C)
  const rawTotalMd = individual.reduce(
    (sum, item) => sum + (item.result.effectiveMd ?? 0),
    0,
  );

  // 3. Suggested reduction (dari backend)
  const suggestedReduction = input.suggestedReduction ?? 0;

  // 4. Actual reduction (ATD override atau suggested)
  let reduction: number;
  let source: 'AUTO' | 'OVERRIDE';

  if (input.imsReduction !== undefined) {
    reduction = Math.max(
      MIN_IMS_REDUCTION,
      Math.min(MAX_IMS_REDUCTION, input.imsReduction),
    );
    source = 'OVERRIDE';
  } else {
    reduction = Math.max(
      MIN_IMS_REDUCTION,
      Math.min(MAX_IMS_REDUCTION, suggestedReduction),
    );
    source = 'AUTO';
  }

  // 5. Final
  const finalTotalMd = rawTotalMd * (1 - reduction);
  const reductionMaxMd = rawTotalMd * (1 - MAX_IMS_REDUCTION);
  const reductionMinMd = rawTotalMd * (1 - MIN_IMS_REDUCTION);

  return {
    individual,
    rawTotalMd,
    imsReduction: reduction,
    imsReductionSource: source,
    suggestedReduction,
    reductionMinMd,
    reductionMaxMd,
    finalTotalMd,
    meta: {
      standardsCount: input.standards.length,
      maxReduction: MAX_IMS_REDUCTION,
      minReduction: MIN_IMS_REDUCTION,
      reference: 'IAF MD 11:2023 + CAP 03-01 Section 9',
      calculatedAt: new Date().toISOString(),
    },
  };
}