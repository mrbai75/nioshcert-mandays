/**
 * EMS - Environmental Management Systems
 *
 * Rujukan:
 * - IAF MD 5:2023, Table 3.1 (Base mandays)
 * - CAP 03-01 (R1), Table 3.2 (Complexity criteria - sector list)
 *
 * NOTA:
 * - EMS ada 4 complexity: High / Medium / Low / Limited
 * - Special Case sector -> throw error (manual review)
 * - ABMS juga guna Table 3.1 (tapi complexity logic berbeza)
 */

import { MandaysRow, SectorEntry, StandardMetadata } from '../types';
import { lookupBaseMd, BaseMdResult } from '../formulas/base';

// =============================================================================
// METADATA
// =============================================================================

export const EMS_METADATA: StandardMetadata = {
  code: 'EMS',
  name: 'Environmental Management Systems',
  referenceDoc: 'IAF MD 5:2023, Table 3.1',
  effectiveDate: '2025-03-03',
  hasComplexity: true,
};

// =============================================================================
// TABLE 3.1 - BASE MANDAYS
// =============================================================================

export const EMS_MANDAYS_TABLE: MandaysRow[] = [
  // Blok kiri
  { fteMin: 1,    fteMax: 5,    high: 3,   medium: 2.5, low: 2.5, limited: 2.5 },
  { fteMin: 6,    fteMax: 10,   high: 3.5, medium: 3,   low: 3,   limited: 3   },
  { fteMin: 11,   fteMax: 15,   high: 4.5, medium: 3.5, low: 3,   limited: 3   },
  { fteMin: 16,   fteMax: 25,   high: 5.5, medium: 4.5, low: 3.5, limited: 3   },
  { fteMin: 26,   fteMax: 45,   high: 7,   medium: 5.5, low: 4,   limited: 3   },
  { fteMin: 46,   fteMax: 65,   high: 8,   medium: 6,   low: 4.5, limited: 3.5 },
  { fteMin: 66,   fteMax: 85,   high: 9,   medium: 7,   low: 5,   limited: 3.5 },
  { fteMin: 86,   fteMax: 125,  high: 11,  medium: 8,   low: 5.5, limited: 4   },
  { fteMin: 126,  fteMax: 175,  high: 12,  medium: 9,   low: 6,   limited: 4.5 },
  { fteMin: 176,  fteMax: 275,  high: 13,  medium: 10,  low: 7,   limited: 5   },
  { fteMin: 276,  fteMax: 425,  high: 15,  medium: 11,  low: 8,   limited: 5.5 },
  { fteMin: 426,  fteMax: 625,  high: 16,  medium: 12,  low: 9,   limited: 6   },
  // Blok kanan
  { fteMin: 626,  fteMax: 875,  high: 17,  medium: 13,  low: 10,  limited: 6.5 },
  { fteMin: 876,  fteMax: 1175, high: 19,  medium: 15,  low: 11,  limited: 7   },
  { fteMin: 1176, fteMax: 1550, high: 20,  medium: 16,  low: 12,  limited: 7.5 },
  { fteMin: 1551, fteMax: 2025, high: 21,  medium: 17,  low: 12,  limited: 8   },
  { fteMin: 2026, fteMax: 2675, high: 23,  medium: 18,  low: 13,  limited: 8.5 },
  { fteMin: 2676, fteMax: 3450, high: 25,  medium: 19,  low: 14,  limited: 9   },
  { fteMin: 3451, fteMax: 4350, high: 27,  medium: 20,  low: 15,  limited: 10  },
  { fteMin: 4351, fteMax: 5450, high: 28,  medium: 21,  low: 16,  limited: 11  },
  { fteMin: 5451, fteMax: 6800, high: 30,  medium: 23,  low: 17,  limited: 12  },
  { fteMin: 6801, fteMax: 8500, high: 32,  medium: 25,  low: 19,  limited: 13  },
  { fteMin: 8501, fteMax: 10700, high: 34, medium: 27,  low: 20,  limited: 14  },
];

export const EMS_MAX_FTE = 10700;

// =============================================================================
// TABLE 3.2 - COMPLEXITY CRITERIA (SECTOR LIST)
// =============================================================================

export const EMS_SECTORS: SectorEntry[] = [
  // HIGH
  { sector: 'Mining and quarrying', complexity: 'HIGH' },
  { sector: 'Oil and gas extraction', complexity: 'HIGH' },
  { sector: 'Tanning of textiles and clothing', complexity: 'HIGH' },
  { sector: 'Pulping part of paper manufacturing', complexity: 'HIGH' },
  { sector: 'Oil refining', complexity: 'HIGH' },
  { sector: 'Chemicals and pharmaceuticals', complexity: 'HIGH' },
  { sector: 'Primary productions - metals', complexity: 'HIGH' },
  { sector: 'Non-metallic processing (ceramics and cement)', complexity: 'HIGH' },
  { sector: 'Coal based electricity generation', complexity: 'HIGH' },
  { sector: 'Civil construction and demolition', complexity: 'HIGH' },
  { sector: 'Hazardous and non-hazardous waste processing', complexity: 'HIGH' },
  { sector: 'Effluent and sewerage processing', complexity: 'HIGH' },

  // MEDIUM
  { sector: 'Fishing / farming / forestry', complexity: 'MEDIUM' },
  { sector: 'Textiles and clothing', complexity: 'MEDIUM', notes: 'except for tanning' },
  { sector: 'Manufacturing of boards, treatment of wood', complexity: 'MEDIUM' },
  { sector: 'Paper production and printing', complexity: 'MEDIUM', notes: 'excluding pulping' },
  { sector: 'Non-metallic processing (glass, clay, lime)', complexity: 'MEDIUM' },
  { sector: 'Surface treatment for metal fabricated products', complexity: 'MEDIUM' },
  { sector: 'Production of bare printed circuit boards', complexity: 'MEDIUM' },
  { sector: 'Manufacturing of transport equipment', complexity: 'MEDIUM' },
  { sector: 'Non coal based electricity generation', complexity: 'MEDIUM' },
  { sector: 'Gas production, storage and distribution', complexity: 'MEDIUM' },
  { sector: 'Water abstraction, purification and distribution', complexity: 'MEDIUM' },
  { sector: 'Fossil fuel wholesale and retail', complexity: 'MEDIUM' },
  { sector: 'Food and tobacco processing', complexity: 'MEDIUM' },
  { sector: 'Transport and distribution by sea, air, land', complexity: 'MEDIUM' },
  { sector: 'Commercial estate agency, estate management', complexity: 'MEDIUM' },
  { sector: 'Recycling, composting, landfill (non-hazardous)', complexity: 'MEDIUM' },
  { sector: 'Technical testing and laboratories', complexity: 'MEDIUM' },
  { sector: 'Healthcare / hospitals / veterinary', complexity: 'MEDIUM' },
  { sector: 'Leisure services and personal services', complexity: 'MEDIUM' },

  // LOW
  { sector: 'Hotels / restaurants', complexity: 'LOW' },
  { sector: 'Wood and wooden products', complexity: 'LOW' },
  { sector: 'Paper products', complexity: 'LOW' },
  { sector: 'Rubber and plastic injection moulding', complexity: 'LOW' },
  { sector: 'Hot and cold forming and metal fabrication', complexity: 'LOW' },
  { sector: 'General mechanical engineering assembly', complexity: 'LOW' },
  { sector: 'Wholesale and retail', complexity: 'LOW' },
  { sector: 'Electrical and electronic equipment assembly', complexity: 'LOW' },

  // LIMITED
  { sector: 'Corporate activities and management, HQ', complexity: 'LIMITED' },
  { sector: 'Transport and distribution management services', complexity: 'LIMITED' },
  { sector: 'Telecommunications', complexity: 'LIMITED' },
  { sector: 'General business services', complexity: 'LIMITED' },
  { sector: 'Education services', complexity: 'LIMITED' },
];

// =============================================================================
// SPECIAL CASE - Throw error (manual review)
// =============================================================================

export const EMS_SPECIAL_CASE_SECTORS: string[] = [
  'Nuclear',
  'Nuclear electricity generation',
  'Storage of large quantities of hazardous material',
  'Public administration',
  'Local authorities',
  'Organizations with environmental sensitive products or services, financial institutions',
];

// =============================================================================
// PUBLIC API
// =============================================================================

export function getEmsBaseMd(
  fte: number,
  complexity: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED'
): BaseMdResult {
  return lookupBaseMd(
    EMS_MANDAYS_TABLE,
    fte,
    complexity,
    { standard: 'EMS', maxFte: EMS_MAX_FTE }
  );
}

export function suggestEmsComplexity(sectorName: string): {
  complexity: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  matchedSector: string;
  notes?: string;
} {
  const normalized = sectorName.toLowerCase().trim();

  // Semak Special Case dahulu
  const specialCase = EMS_SPECIAL_CASE_SECTORS.find((s) =>
    s.toLowerCase().includes(normalized) ||
    normalized.includes(s.toLowerCase())
  );

  if (specialCase) {
    throw new Error(
      `[EMS] Sector "${specialCase}" adalah Special Case. ` +
      `Sila tentukan complexity secara manual dengan justifikasi ATD.`
    );
  }

  const match = EMS_SECTORS.find((entry) =>
    entry.sector.toLowerCase().includes(normalized) ||
    normalized.includes(entry.sector.toLowerCase())
  );

  if (!match) {
    throw new Error(
      `[EMS] Sector "${sectorName}" tidak dijumpai dalam Table 3.2. ` +
      `Sila tentukan complexity secara manual dengan justifikasi ATD.`
    );
  }

  return {
    complexity: match.complexity as 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED',
    matchedSector: match.sector,
    notes: match.notes,
  };
}