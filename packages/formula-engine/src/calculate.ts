/**
 * ORCHESTRATOR - Main calculate function
 *
 * Gabungkan TIER 1 + TIER 2 + TIER 3 + Stage Split.
 * Handle semua standard: OSHMS, QMS, EMS, ABMS.
 *
 * Prinsip: "Sistem cadang, manusia putus, sistem rekod."
 */

import {
  CalculationInput,
  CalculationResult,
  TraceStep,
  ComplexityLevel,
  BaseMdResult,
} from './types';
import { getEffectiveMd } from './formulas/adjustment';
import { getDerived, suggestStageSplit } from './formulas/derived';
import { getOshmsBaseMd, OSHMS_METADATA } from './standards/oshms';
import { getQmsBaseMd, QMS_METADATA } from './standards/qms';
import { getEmsBaseMd, EMS_METADATA } from './standards/ems';
import {
  getAbmsBaseMd,
  determineAbmsComplexity,
  ABMS_METADATA,
} from './standards/abms';

export function calculate(input: CalculationInput): CalculationResult {
  const trace: TraceStep[] = [];

  // STEP 0: Tentukan complexity (jika perlu)
  let complexity: ComplexityLevel | undefined = input.complexity;
  const standardMeta = getStandardMetadata(input.standard);

  // ABMS-specific: auto-detect complexity dari CPI + sector
  // Tapi HANYA kalau user TAK override complexity
  if (input.standard === 'ABMS' && input.abmsInput) {
    const abmsResult = determineAbmsComplexity(input.abmsInput);

    // Hormati override: kalau user dah pilih complexity, guna itu
    if (!complexity) {
      complexity = abmsResult.complexity;
    }

    trace.push({
      tier: 'TIER_1',
      description: 'ABMS complexity determination',
      formula: 'CPI + Sector + Regulatory action -> tertinggi',
      input: input.abmsInput,
      output: abmsResult,
    });
  }

  // TIER 1: BASE
  const baseResult = getBaseMd(input.standard, input.fte, complexity);

  trace.push({
    tier: 'TIER_1',
    description: `Base MD lookup (${standardMeta.referenceDoc})`,
    formula: `lookup(FTE=${input.fte}, complexity=${complexity ?? 'N/A'})`,
    input: { fte: input.fte, complexity },
    output: baseResult,
  });

  // Kalau requires manual input (FTE > 10700), return awal
  if (baseResult.requiresManualInput) {
    return {
      baseMd: null,
      requiresManualInput: true,
      effectiveMd: null,
      stage1Md: null,
      stage2Md: null,
      surveillanceMd: null,
      recertMd: null,
      meta: buildMeta(input, complexity, standardMeta),
      trace,
      message: baseResult.message,
    };
  }

  const baseMd = baseResult.value!;

  // TIER 2: EFFECTIVE
  const effectiveMd = getEffectiveMd(baseMd);

  trace.push({
    tier: 'TIER_2',
    description: 'Rounding untuk effective auditing',
    formula: `ceil(${baseMd}) = ${effectiveMd}`,
    input: { baseMd },
    output: { effectiveMd },
  });

  // TIER 3: DERIVED
  const derived = getDerived(effectiveMd);

  trace.push({
    tier: 'TIER_3',
    description: 'Surveillance & Recertification',
    formula: derived.meta.surveillanceFormula + ' | ' + derived.meta.recertFormula,
    input: { effectiveMd },
    output: {
      surveillanceMd: derived.surveillanceMd,
      recertMd: derived.recertMd,
    },
  });

  // STAGE SPLIT (default suggestion)
  const stageSplit = suggestStageSplit(effectiveMd);

  trace.push({
    tier: 'STAGE_SPLIT',
    description: 'Cadangan stage 1 & 2 (default 30:70, ATD boleh override)',
    formula: `stage1 = ceil(0.3 x ${effectiveMd}), stage2 = ${effectiveMd} - stage1`,
    input: { effectiveMd, defaultRatio: '30:70' },
    output: {
      stage1Md: stageSplit.stage1Md,
      stage2Md: stageSplit.stage2Md,
    },
  });

  // FINAL RESULT
  return {
    baseMd,
    requiresManualInput: false,
    effectiveMd,
    stage1Md: stageSplit.stage1Md,
    stage2Md: stageSplit.stage2Md,
    surveillanceMd: derived.surveillanceMd,
    recertMd: derived.recertMd,
    meta: buildMeta(input, complexity, standardMeta),
    trace,
  };
}

// =============================================================================
// HELPERS
// =============================================================================

function getBaseMd(
  standard: string,
  fte: number,
  complexity?: ComplexityLevel
): BaseMdResult {
  switch (standard) {
    case 'OSHMS':
      return getOshmsBaseMd(fte, complexity as 'HIGH' | 'MEDIUM' | 'LOW');
    case 'QMS':
      return getQmsBaseMd(fte);
    case 'EMS':
      return getEmsBaseMd(fte, complexity as 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED');
    case 'ABMS':
      return getAbmsBaseMd(fte, complexity as 'HIGH' | 'MEDIUM' | 'LOW');
    case 'ISMS':
      throw new Error('ISMS belum diimplementasikan. Skip dulu.');
    default:
      throw new Error(`Standard "${standard}" tidak dikenali.`);
  }
}

function getStandardMetadata(standard: string) {
  switch (standard) {
    case 'OSHMS':
      return OSHMS_METADATA;
    case 'QMS':
      return QMS_METADATA;
    case 'EMS':
      return EMS_METADATA;
    case 'ABMS':
      return ABMS_METADATA;
    case 'ISMS':
      throw new Error('ISMS belum diimplementasikan. Skip dulu.');
    default:
      throw new Error(`Metadata untuk "${standard}" tidak dijumpai.`);
  }
}

function buildMeta(
  input: CalculationInput,
  complexity: ComplexityLevel | undefined,
  standardMeta: { code: string; name: string; referenceDoc: string }
) {
  return {
    standard: input.standard,
    standardName: standardMeta.name,
    fte: input.fte,
    complexity,
    applicationType: input.applicationType,
    calculatedAt: new Date().toISOString(),
    reference: standardMeta.referenceDoc,
  };
}