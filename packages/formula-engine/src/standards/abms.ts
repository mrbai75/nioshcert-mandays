/**
 * ABMS - Anti-Bribery Management Systems
 *
 * Rujukan:
 * - IAF MD 5:2023, Table 3.1 (Base mandays - sama dengan EMS)
 * - CAP 03-01 (R1), Table 3.3 (Complexity - CPI + sector + regulatory)
 *
 * NOTA:
 * - ABMS guna Table 3.1 (sama dengan EMS) untuk base mandays
 * - Complexity dari: CPI score + sector + regulatory action
 * - Sistem ambil complexity TERTINGGI antara semua factor
 * - ABMS TIDAK guna "Limited" complexity
 */

import { SectorEntry, StandardMetadata, ComplexityLevel } from '../types';
import { lookupBaseMd, BaseMdResult } from '../formulas/base';
import { EMS_MANDAYS_TABLE, EMS_MAX_FTE } from './ems';

// =============================================================================
// METADATA
// =============================================================================

export const ABMS_METADATA: StandardMetadata = {
  code: 'ABMS',
  name: 'Anti-Bribery Management Systems',
  referenceDoc: 'IAF MD 5:2023, Table 3.1 + CAP 03-01 (R1), Table 3.3',
  effectiveDate: '2025-03-03',
  hasComplexity: true,
};

// =============================================================================
// BASE MANDAYS - Reuse dari EMS (Table 3.1 sama)
// =============================================================================

export const ABMS_MANDAYS_TABLE = EMS_MANDAYS_TABLE;
export const ABMS_MAX_FTE = EMS_MAX_FTE;

// =============================================================================
// TABLE 3.3 - COMPLEXITY (SECTOR LIST)
// =============================================================================

export const ABMS_SECTORS: SectorEntry[] = [
  // MEDIUM
  { sector: 'Transportation and storage', complexity: 'MEDIUM' },
  { sector: 'Telecommunications', complexity: 'MEDIUM' },
  { sector: 'Consumer services', complexity: 'MEDIUM' },
  { sector: 'Forestry', complexity: 'MEDIUM' },
  { sector: 'Banking and finance', complexity: 'MEDIUM' },
  { sector: 'Information technology', complexity: 'MEDIUM' },
  { sector: 'Civilian aerospace', complexity: 'MEDIUM' },
  { sector: 'Trading, intermediation and commercial companies', complexity: 'MEDIUM' },
  { sector: 'Associations, foundations, national boards, NGOs, Not-for-Profit', complexity: 'MEDIUM' },

  // LOW
  { sector: 'Light manufacturing', complexity: 'LOW' },
  { sector: 'Agriculture', complexity: 'LOW' },
  { sector: 'SMEs', complexity: 'LOW' },
  { sector: 'Organisations not listed within high & medium categories', complexity: 'LOW' },
];

// =============================================================================
// CPI THRESHOLDS
// =============================================================================

export const ABMS_CPI_THRESHOLDS = {
  HIGH_MAX: 30,
  MEDIUM_MIN: 31,
  MEDIUM_MAX: 59,
  LOW_MIN: 60,
} as const;

// =============================================================================
// INPUT / RESULT TYPES
// =============================================================================

export interface AbmsComplexityInput {
  cpiScore: number;
  sector?: string;
  hasRegulatoryAction: boolean;
}

export interface AbmsComplexityResult {
  complexity: 'HIGH' | 'MEDIUM' | 'LOW';
  breakdown: {
    fromRegulatory: 'HIGH' | null;
    fromCpi: {
      score: number;
      complexity: 'HIGH' | 'MEDIUM' | 'LOW';
    };
    fromSector: {
      sector: string | null;
      complexity: 'HIGH' | 'MEDIUM' | 'LOW' | null;
    } | null;
  };
  message?: string;
}

// =============================================================================
// COMPLEXITY DETERMINATION
// =============================================================================

export function determineAbmsComplexity(
  input: AbmsComplexityInput
): AbmsComplexityResult {
  if (input.cpiScore < 0 || input.cpiScore > 100) {
    throw new Error(
      `[ABMS] CPI score mesti antara 0-100. Diterima: ${input.cpiScore}`
    );
  }

  // Rule 1: Regulatory action -> HIGH
  const fromRegulatory: 'HIGH' | null = input.hasRegulatoryAction ? 'HIGH' : null;

  // Rule 2: CPI -> complexity
  let cpiComplexity: 'HIGH' | 'MEDIUM' | 'LOW';
  if (input.cpiScore <= ABMS_CPI_THRESHOLDS.HIGH_MAX) {
    cpiComplexity = 'HIGH';
  } else if (input.cpiScore <= ABMS_CPI_THRESHOLDS.MEDIUM_MAX) {
    cpiComplexity = 'MEDIUM';
  } else {
    cpiComplexity = 'LOW';
  }

  // Rule 3: Sector -> complexity
  let sectorComplexity: 'HIGH' | 'MEDIUM' | 'LOW' | null = null;
  let matchedSector: string | null = null;

  if (input.sector) {
    const normalized = input.sector.toLowerCase().trim();

    const match = ABMS_SECTORS.find((entry) =>
      entry.sector.toLowerCase().includes(normalized) ||
      normalized.includes(entry.sector.toLowerCase())
    );

    if (match) {
      sectorComplexity = match.complexity as 'HIGH' | 'MEDIUM' | 'LOW';
      matchedSector = match.sector;
    }
  }

  // Rule 4: Ambil TERTINGGI
  const candidates: Array<'HIGH' | 'MEDIUM' | 'LOW'> = [cpiComplexity];
  if (fromRegulatory) candidates.push(fromRegulatory);
  if (sectorComplexity) candidates.push(sectorComplexity);

  const finalComplexity = highestComplexity(candidates);

  const result: AbmsComplexityResult = {
    complexity: finalComplexity,
    breakdown: {
      fromRegulatory,
      fromCpi: {
        score: input.cpiScore,
        complexity: cpiComplexity,
      },
      fromSector: sectorComplexity
        ? {
            sector: matchedSector,
            complexity: sectorComplexity,
          }
        : null,
    },
  };

  if (input.sector && !sectorComplexity) {
    result.message =
      `Sector "${input.sector}" tidak dijumpai dalam Table 3.3. ` +
      `Complexity ditentukan dari CPI sahaja.`;
  }

  return result;
}

// =============================================================================
// PUBLIC API - BASE MANDAYS
// =============================================================================

export function getAbmsBaseMd(
  fte: number,
  complexity: 'HIGH' | 'MEDIUM' | 'LOW'
): BaseMdResult {
  return lookupBaseMd(
    ABMS_MANDAYS_TABLE,
    fte,
    complexity,
    { standard: 'ABMS', maxFte: ABMS_MAX_FTE }
  );
}

// =============================================================================
// HELPERS
// =============================================================================

function highestComplexity(
  levels: Array<'HIGH' | 'MEDIUM' | 'LOW'>
): 'HIGH' | 'MEDIUM' | 'LOW' {
  const rank = { HIGH: 3, MEDIUM: 2, LOW: 1 };

  let highest: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  for (const level of levels) {
    if (rank[level] > rank[highest]) {
      highest = level;
    }
  }

  return highest;
}