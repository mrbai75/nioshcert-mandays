/**
 * QMS - Quality Management Systems
 *
 * Rujukan:
 * - IAF MD 5:2023, Table 2.1 (Base mandays)
 * - CAP 03-01 (R1), Table 2.1 (Base mandays)
 * - CAP 03-01 (R1), Page 18-19 (Risk categories - untuk auditor competence)
 *
 * NOTA PENTING:
 * QMS TIADA complexity adjustment untuk mandays.
 * Risk category cuma untuk tentukan auditor competence.
 * Mandays = FTE -> days (lookup terus).
 */

import { MandaysRow, StandardMetadata, SectorEntry } from '../types';
import { lookupBaseMd, BaseMdResult } from '../formulas/base';

// =============================================================================
// METADATA
// =============================================================================

export const QMS_METADATA: StandardMetadata = {
  code: 'QMS',
  name: 'Quality Management Systems',
  referenceDoc: 'IAF MD 5:2023, Table 2.1',
  effectiveDate: '2025-03-03',
  hasComplexity: false,
};

// =============================================================================
// TABLE 2.1 - BASE MANDAYS
// =============================================================================

export const QMS_MANDAYS_TABLE: MandaysRow[] = [
  // Blok kiri
  { fteMin: 1,    fteMax: 5,    days: 1.5 },
  { fteMin: 6,    fteMax: 10,   days: 2   },
  { fteMin: 11,   fteMax: 15,   days: 2.5 },
  { fteMin: 16,   fteMax: 25,   days: 3   },
  { fteMin: 26,   fteMax: 45,   days: 4   },
  { fteMin: 46,   fteMax: 65,   days: 5   },
  { fteMin: 66,   fteMax: 85,   days: 6   },
  { fteMin: 86,   fteMax: 125,  days: 7   },
  { fteMin: 126,  fteMax: 175,  days: 8   },
  { fteMin: 176,  fteMax: 275,  days: 9   },
  { fteMin: 276,  fteMax: 425,  days: 10  },
  { fteMin: 426,  fteMax: 625,  days: 11  },
  // Blok kanan
  { fteMin: 626,  fteMax: 875,  days: 12  },
  { fteMin: 876,  fteMax: 1175, days: 13  },
  { fteMin: 1176, fteMax: 1550, days: 14  },
  { fteMin: 1551, fteMax: 2025, days: 15  },
  { fteMin: 2026, fteMax: 2675, days: 16  },
  { fteMin: 2676, fteMax: 3450, days: 17  },
  { fteMin: 3451, fteMax: 4350, days: 18  },
  { fteMin: 4351, fteMax: 5450, days: 19  },
  { fteMin: 5451, fteMax: 6800, days: 20  },
  { fteMin: 6801, fteMax: 8500, days: 21  },
  { fteMin: 8501, fteMax: 10700, days: 22 },
];

export const QMS_MAX_FTE = 10700;

// =============================================================================
// RISK CATEGORIES (REFERENCE ONLY - untuk auditor competence)
// =============================================================================

export const QMS_RISK_CATEGORIES: SectorEntry[] = [
  // HIGH RISK
  { sector: 'Food', complexity: 'HIGH' },
  { sector: 'Pharmaceuticals', complexity: 'HIGH' },
  { sector: 'Aircraft', complexity: 'HIGH' },
  { sector: 'Shipbuilding', complexity: 'HIGH' },
  { sector: 'Load bearing components and structures', complexity: 'HIGH' },
  { sector: 'Complex construction activity', complexity: 'HIGH' },
  { sector: 'Electrical and gas equipment', complexity: 'HIGH' },
  { sector: 'Medical and health services', complexity: 'HIGH' },
  { sector: 'Fishing', complexity: 'HIGH' },
  { sector: 'Nuclear fuel', complexity: 'HIGH' },
  { sector: 'Chemicals, chemical products and fibres', complexity: 'HIGH' },

  // MEDIUM RISK
  { sector: 'Non load bearing components and structures', complexity: 'MEDIUM' },
  { sector: 'Simple construction activities', complexity: 'MEDIUM' },
  { sector: 'Basic metals and fabricated products', complexity: 'MEDIUM' },
  { sector: 'Non-metallic products', complexity: 'MEDIUM' },
  { sector: 'Furniture', complexity: 'MEDIUM' },
  { sector: 'Optical equipment', complexity: 'MEDIUM' },
  { sector: 'Leisure and personal services', complexity: 'MEDIUM' },

  // LOW RISK
  { sector: 'Textiles and clothing', complexity: 'LOW' },
  { sector: 'Pulp, paper and paper products', complexity: 'LOW' },
  { sector: 'Publishing', complexity: 'LOW' },
  { sector: 'Office services', complexity: 'LOW' },
  { sector: 'Education', complexity: 'LOW' },
  { sector: 'Retailing, hotels and restaurants', complexity: 'LOW' },
];

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Kira base mandays untuk QMS (TIER 1)
 * QMS tiada complexity - guna placeholder 'HIGH' untuk signature seragam.
 */
export function getQmsBaseMd(fte: number): BaseMdResult {
  return lookupBaseMd(
    QMS_MANDAYS_TABLE,
    fte,
    'HIGH',
    { standard: 'QMS', maxFte: QMS_MAX_FTE }
  );
}

/**
 * Cadang risk category (REFERENCE sahaja, bukan untuk adjust mandays)
 */
export function suggestQmsRiskCategory(sectorName: string): {
  riskCategory: 'HIGH' | 'MEDIUM' | 'LOW';
  matchedSector: string;
} | null {
  const normalized = sectorName.toLowerCase().trim();

  const match = QMS_RISK_CATEGORIES.find((entry) =>
    entry.sector.toLowerCase().includes(normalized) ||
    normalized.includes(entry.sector.toLowerCase())
  );

  if (!match) return null;

  return {
    riskCategory: match.complexity as 'HIGH' | 'MEDIUM' | 'LOW',
    matchedSector: match.sector,
  };
}