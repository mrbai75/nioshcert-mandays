/**
 * ISMS - Information Security Management Systems
 *
 * Rujukan:
 * - ISO/IEC 27006, Annex B (Table 9)
 * - CAP 03-01 (R1), Section 8
 *
 * NOTA:
 * - ISMS guna 1 lajur sahaja (tiada HIGH/MEDIUM/LOW)
 * - FTE bands BERBEZA: 22 bands (1-10 digabung)
 * - Adjustment (business + IT complexity) adalah LOGIC dalam kod,
 *   bukan dalam table ini (rujuk CAP 03-01 Section 8 Table C.2/C.3/C.4)
 *   ⚠️ TODO: Implement adjustment kemudian
 */

import { MandaysRow, StandardMetadata } from '../types';
import { lookupBaseMd, BaseMdResult } from '../formulas/base';

// =============================================================================
// METADATA
// =============================================================================

export const ISMS_METADATA: StandardMetadata = {
  code: 'ISMS',
  name: 'Information Security Management Systems',
  referenceDoc: 'ISO/IEC 27006, Table B.1 + CAP 03-01 (R1), Section 8',
  effectiveDate: '2025-03-03',
  hasComplexity: false, // ISMS tak guna HIGH/MEDIUM/LOW
};

// =============================================================================
// TABLE B.1 - BASE MANDAYS (22 rows)
// =============================================================================

export const ISMS_MANDAYS_TABLE: MandaysRow[] = [
  { fteMin: 1,    fteMax: 10,    days: 5    },
  { fteMin: 11,   fteMax: 15,    days: 6    },
  { fteMin: 16,   fteMax: 25,    days: 7    },
  { fteMin: 26,   fteMax: 45,    days: 8.5  },
  { fteMin: 46,   fteMax: 65,    days: 10   },
  { fteMin: 66,   fteMax: 85,    days: 11   },
  { fteMin: 86,   fteMax: 125,   days: 12   },
  { fteMin: 126,  fteMax: 175,   days: 13   },
  { fteMin: 176,  fteMax: 275,   days: 14   },
  { fteMin: 276,  fteMax: 425,   days: 15   },
  { fteMin: 426,  fteMax: 625,   days: 16.5 },
  { fteMin: 626,  fteMax: 875,   days: 17.5 },
  { fteMin: 876,  fteMax: 1175,  days: 18.5 },
  { fteMin: 1176, fteMax: 1550,  days: 19.5 },
  { fteMin: 1551, fteMax: 2025,  days: 21   },
  { fteMin: 2026, fteMax: 2675,  days: 22   },
  { fteMin: 2676, fteMax: 3450,  days: 23   },
  { fteMin: 3451, fteMax: 4350,  days: 24   },
  { fteMin: 4351, fteMax: 5450,  days: 25   },
  { fteMin: 5451, fteMax: 6800,  days: 26   },
  { fteMin: 6801, fteMax: 8500,  days: 27   },
  { fteMin: 8501, fteMax: 10700, days: 28   },
];

export const ISMS_MAX_FTE = 10700;

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Kira base MD untuk ISMS.
 *
 * ⚠️ Nota: Complexity parameter diabaikan (ISMS tak guna).
 * Sebab tu `complexity` optional dalam signature.
 */
export function getIsmsBaseMd(fte: number): BaseMdResult {
  // ISMS tak guna complexity — hantar 'LOW' sebagai dummy.
  // `lookupBaseMd` akan fallback ke `row.days` (sebab row ISMS ada `days` sahaja).
  return lookupBaseMd(
    ISMS_MANDAYS_TABLE,
    fte,
    'LOW',
    { standard: 'ISMS', maxFte: ISMS_MAX_FTE }
  );
}

