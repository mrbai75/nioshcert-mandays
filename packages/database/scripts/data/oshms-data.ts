/**
 * Data mandays OSHMS (Occupational Health and Safety Management System).
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 1.1
 * - IAF MD 5:2023 — Annex C, Table OH&SMS 1
 *
 * Complexity: 3 tahap (HIGH, MEDIUM, LOW)
 * FTE bands: 23 (skip ">10700 follow progression")
 *
 * Format setiap row: [fteMin, fteMax, high, medium, low]
 */

import { FTE_BANDS } from './fte-bands.js';

/**
 * Data OSHMS — 23 rows (satu per FTE band).
 * Nilai: [HIGH, MEDIUM, LOW] audit days.
 */
const OSHMS_DAYS: readonly [number, number, number][] = [
  [3.0, 2.5, 2.5],   // 1-5
  [3.5, 3.0, 3.0],   // 6-10
  [4.5, 3.5, 3.0],   // 11-15
  [5.5, 4.5, 3.5],   // 16-25
  [7.0, 5.5, 4.0],   // 26-45
  [8.0, 6.0, 4.5],   // 46-65
  [9.0, 7.0, 5.0],   // 66-85
  [11.0, 8.0, 5.5],  // 86-125
  [12.0, 9.0, 6.0],  // 126-175
  [13.0, 10.0, 7.0], // 176-275
  [15.0, 11.0, 8.0], // 276-425
  [16.0, 12.0, 9.0], // 426-625
  [17.0, 13.0, 10.0], // 626-875
  [19.0, 15.0, 11.0], // 876-1175
  [20.0, 16.0, 12.0], // 1176-1550
  [21.0, 17.0, 12.0], // 1551-2025
  [23.0, 18.0, 13.0], // 2026-2675
  [25.0, 19.0, 14.0], // 2676-3450
  [27.0, 20.0, 15.0], // 3451-4350
  [28.0, 21.0, 16.0], // 4351-5450
  [30.0, 23.0, 17.0], // 5451-6800
  [32.0, 25.0, 19.0], // 6801-8500
  [34.0, 27.0, 20.0], // 8501-10700
] as const;

/**
 * Hasil seed OSHMS — 23 bands × 3 complexity = 69 rows.
 *
 * Setiap row: { fteMin, fteMax, levelCode, days }
 */
export interface MandaysSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  readonly days: number;
}

export const OSHMS_MANDAYS: readonly MandaysSeedRow[] = OSHMS_DAYS.flatMap(
  (days, index) => {
    const band = FTE_BANDS[index];
    if (!band || band.fteMax === null) return [];

    return [
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'HIGH', days: days[0] },
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'MEDIUM', days: days[1] },
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'LOW', days: days[2] },
    ];
  },
);
