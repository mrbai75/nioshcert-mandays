/**
 * OSHMS - Occupational Safety and Health Management Systems
 *
 * Rujukan:
 * - IAF MD 5:2023, Table 1.1 (Base mandays)
 * - CAP 03-01 (R1), Table 1.1 (Base mandays)
 * - CAP 03-01 (R1), Table 1.2 (Complexity criteria - sector list)
 */

import { MandaysRow, SectorEntry, StandardMetadata } from '../types';
import { lookupBaseMd, BaseMdResult } from '../formulas/base';

// =============================================================================
// METADATA
// =============================================================================

export const OSHMS_METADATA: StandardMetadata = {
  code: 'OSHMS',
  name: 'Occupational Safety and Health Management Systems',
  referenceDoc: 'IAF MD 5:2023, Table 1.1',
  effectiveDate: '2025-03-03',
  hasComplexity: true,
};

// =============================================================================
// TABLE 1.1 - BASE MANDAYS
// =============================================================================

export const OSHMS_MANDAYS_TABLE: MandaysRow[] = [
  // Blok kiri
  { fteMin: 1,    fteMax: 5,    high: 3,   medium: 2.5, low: 2.5 },
  { fteMin: 6,    fteMax: 10,   high: 3.5, medium: 3,   low: 3   },
  { fteMin: 11,   fteMax: 15,   high: 4.5, medium: 3.5, low: 3   },
  { fteMin: 16,   fteMax: 25,   high: 5.5, medium: 4.5, low: 3.5 },
  { fteMin: 26,   fteMax: 45,   high: 7,   medium: 5.5, low: 4   },
  { fteMin: 46,   fteMax: 65,   high: 8,   medium: 6,   low: 4.5 },
  { fteMin: 66,   fteMax: 85,   high: 9,   medium: 7,   low: 5   },
  { fteMin: 86,   fteMax: 125,  high: 11,  medium: 8,   low: 5.5 },
  { fteMin: 126,  fteMax: 175,  high: 12,  medium: 9,   low: 6   },
  { fteMin: 176,  fteMax: 275,  high: 13,  medium: 10,  low: 7   },
  { fteMin: 276,  fteMax: 425,  high: 15,  medium: 11,  low: 8   },
  { fteMin: 426,  fteMax: 625,  high: 16,  medium: 12,  low: 9   },
  // Blok kanan
  { fteMin: 626,  fteMax: 875,  high: 17,  medium: 13,  low: 10  },
  { fteMin: 876,  fteMax: 1175, high: 19,  medium: 15,  low: 11  },
  { fteMin: 1176, fteMax: 1550, high: 20,  medium: 16,  low: 12  },
  { fteMin: 1551, fteMax: 2025, high: 21,  medium: 17,  low: 12  },
  { fteMin: 2026, fteMax: 2675, high: 23,  medium: 18,  low: 13  },
  { fteMin: 2676, fteMax: 3450, high: 25,  medium: 19,  low: 14  },
  { fteMin: 3451, fteMax: 4350, high: 27,  medium: 20,  low: 15  },
  { fteMin: 4351, fteMax: 5450, high: 28,  medium: 21,  low: 16  },
  { fteMin: 5451, fteMax: 6800, high: 30,  medium: 23,  low: 17  },
  { fteMin: 6801, fteMax: 8500, high: 32,  medium: 25,  low: 19  },
  { fteMin: 8501, fteMax: 10700, high: 34, medium: 27,  low: 20  },
];

export const OSHMS_MAX_FTE = 10700;

// =============================================================================
// TABLE 1.2 - COMPLEXITY CRITERIA (SECTOR LIST)
// =============================================================================

export const OSHMS_SECTORS: SectorEntry[] = [
  // HIGH
  { sector: 'Fishing (offshore, coastal dredging and diving)', complexity: 'HIGH' },
  { sector: 'Mining and quarrying', complexity: 'HIGH' },
  { sector: 'Manufacture of coke and refined petroleum products', complexity: 'HIGH' },
  { sector: 'Oil and gas extraction', complexity: 'HIGH' },
  { sector: 'Tanning of leather and leather products', complexity: 'HIGH' },
  { sector: 'Dyeing of textiles and clothing', complexity: 'HIGH' },
  { sector: 'Pulping part of paper manufacturing', complexity: 'HIGH' },
  { sector: 'Oil refining', complexity: 'HIGH' },
  { sector: 'Chemicals and pharmaceuticals', complexity: 'HIGH' },
  { sector: 'Manufacturing of fiberglass', complexity: 'HIGH' },
  { sector: 'Gas production, storage and distribution', complexity: 'HIGH' },
  { sector: 'Electricity generation and distribution', complexity: 'HIGH' },
  { sector: 'Nuclear', complexity: 'HIGH' },
  { sector: 'Storage of large quantities of hazardous material', complexity: 'HIGH' },
  { sector: 'Non-metallic processing (ceramics, concrete, cement, lime, plaster)', complexity: 'HIGH' },
  { sector: 'Primary production of metals', complexity: 'HIGH' },
  { sector: 'Hot and cold forming and metal fabrication', complexity: 'HIGH' },
  { sector: 'Manufacturing and assembly of metal structures', complexity: 'HIGH' },
  { sector: 'Shipyards', complexity: 'HIGH', notes: 'depending on the activities could be medium' },
  { sector: 'Aerospace industry', complexity: 'HIGH' },
  { sector: 'Automotive industry', complexity: 'HIGH' },
  { sector: 'Manufacturing of weapons and explosives', complexity: 'HIGH' },
  { sector: 'Recycling of hazardous waste', complexity: 'HIGH' },
  { sector: 'Hazardous and non-hazardous waste processing', complexity: 'HIGH' },
  { sector: 'Effluent and sewerage processing', complexity: 'HIGH' },
  { sector: 'Industrial and civil construction and demolition', complexity: 'HIGH' },
  { sector: 'Slaughter houses', complexity: 'HIGH' },
  { sector: 'Transport and distribution of dangerous goods', complexity: 'HIGH' },
  { sector: 'Defence activities / crisis management', complexity: 'HIGH' },
  { sector: 'Healthcare / hospitals / veterinary / social works', complexity: 'HIGH' },

  // MEDIUM
  { sector: 'Aquaculture', complexity: 'MEDIUM' },
  { sector: 'Fishing', complexity: 'MEDIUM', notes: 'offshore fishing is high' },
  { sector: 'Farming / forestry', complexity: 'MEDIUM', notes: 'depending on the activities could be high' },
  { sector: 'Food, beverage and tobacco processing', complexity: 'MEDIUM' },
  { sector: 'Textiles and clothing', complexity: 'MEDIUM', notes: 'except for dyeing' },
  { sector: 'Leather and leather product', complexity: 'MEDIUM', notes: 'except for tanning' },
  { sector: 'Manufacturing of wood and wooden products', complexity: 'MEDIUM' },
  { sector: 'Paper production and paper products excluding pulping', complexity: 'MEDIUM' },
  { sector: 'Non-metallic processing (glass, ceramics, clay)', complexity: 'MEDIUM' },
  { sector: 'General mechanical engineering assembly', complexity: 'MEDIUM' },
  { sector: 'Manufacturing of metallic products', complexity: 'MEDIUM' },
  { sector: 'Production of bare printed circuit boards', complexity: 'MEDIUM' },
  { sector: 'Rubber and plastic injection moulding, forming and assembly', complexity: 'MEDIUM' },
  { sector: 'Electrical and electronic equipment assembly', complexity: 'MEDIUM' },
  { sector: 'Manufacturing of transport equipment', complexity: 'MEDIUM' },
  { sector: 'Recycling, composting, landfill (non-hazardous waste)', complexity: 'MEDIUM' },
  { sector: 'Water abstraction, purification and distribution', complexity: 'MEDIUM' },
  { sector: 'Fossil fuel wholesale and retail', complexity: 'MEDIUM' },
  { sector: 'Transport of passengers', complexity: 'MEDIUM' },
  { sector: 'Transport and distribution of non-dangerous goods', complexity: 'MEDIUM' },
  { sector: 'Industrial cleaning, hygiene cleaning, dry cleaning', complexity: 'MEDIUM' },
  { sector: 'Research & development in natural and technical sciences', complexity: 'MEDIUM' },
  { sector: 'Hotels, leisure services and personal services', complexity: 'MEDIUM' },
  { sector: 'Education services', complexity: 'MEDIUM' },

  // LOW
  { sector: 'Corporate activities and management, HQ', complexity: 'LOW' },
  { sector: 'Wholesale and retail', complexity: 'LOW' },
  { sector: 'General business services', complexity: 'LOW' },
  { sector: 'Transport and distribution management services', complexity: 'LOW' },
  { sector: 'Engineering services', complexity: 'LOW' },
  { sector: 'Telecommunications and post office services', complexity: 'LOW' },
  { sector: 'Restaurants and campings', complexity: 'LOW' },
  { sector: 'Commercial estate agency, estate management', complexity: 'LOW' },
  { sector: 'Research & development on social sciences and humanities', complexity: 'LOW' },
  { sector: 'Public administration, local authorities', complexity: 'LOW' },
  { sector: 'Financial institutions, advertising agency', complexity: 'LOW' },
];

// =============================================================================
// PUBLIC API
// =============================================================================

export function getOshmsBaseMd(
  fte: number,
  complexity: 'HIGH' | 'MEDIUM' | 'LOW'
): BaseMdResult {
  return lookupBaseMd(
    OSHMS_MANDAYS_TABLE,
    fte,
    complexity,
    { standard: 'OSHMS', maxFte: OSHMS_MAX_FTE }
  );
}

export function suggestOshmsComplexity(sectorName: string): {
  complexity: 'HIGH' | 'MEDIUM' | 'LOW';
  matchedSector: string;
  notes?: string;
} | null {
  const normalized = sectorName.toLowerCase().trim();

  const match = OSHMS_SECTORS.find((entry) =>
    entry.sector.toLowerCase().includes(normalized) ||
    normalized.includes(entry.sector.toLowerCase())
  );

  if (!match) return null;

  return {
    complexity: match.complexity as 'HIGH' | 'MEDIUM' | 'LOW',
    matchedSector: match.sector,
    notes: match.notes,
  };
}