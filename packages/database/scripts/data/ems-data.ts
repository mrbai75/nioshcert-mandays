/**
 * Data mandays EMS (Environmental Management System).
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 3.1
 * - IAF MD 5:2023 — Annex B, Table EMS 1
 *
 * Complexity: 4 tahap (HIGH, MEDIUM, LOW, LIMITED)
 * FTE bands: 23 (skip ">10700 follow progression")
 *
 * Nota:
 * - EMS ialah SATU-SATUNYA standard yang guna LIMITED complexity.
 * - ABMS akan duplicate data ini (buang LIMITED).
 */

import { FTE_BANDS } from './fte-bands.js';

/**
 * Data EMS — 23 rows (satu per FTE band).
 * Nilai: [HIGH, MEDIUM, LOW, LIMITED] audit days.
 */
const EMS_DAYS: readonly [number, number, number, number][] = [
  [3.0, 2.5, 2.5, 2.5],  // 1-5
  [3.5, 3.0, 3.0, 3.0],  // 6-10
  [4.5, 3.5, 3.0, 3.0],  // 11-15
  [5.5, 4.5, 3.5, 3.0],  // 16-25
  [7.0, 5.5, 4.0, 3.0],  // 26-45
  [8.0, 6.0, 4.5, 3.5],  // 46-65
  [9.0, 7.0, 5.0, 3.5],  // 66-85
  [11.0, 8.0, 5.5, 4.0], // 86-125
  [12.0, 9.0, 6.0, 4.5], // 126-175
  [13.0, 10.0, 7.0, 5.0], // 176-275
  [15.0, 11.0, 8.0, 5.5], // 276-425
  [16.0, 12.0, 9.0, 6.0], // 426-625
  [17.0, 13.0, 10.0, 6.0], // 626-875
  [19.0, 15.0, 11.0, 7.0], // 876-1175
  [20.0, 16.0, 12.0, 7.5], // 1176-1550
  [21.0, 17.0, 12.0, 8.0], // 1551-2025
  [23.0, 18.0, 13.0, 8.5], // 2026-2675
  [25.0, 19.0, 14.0, 9.0], // 2676-3450
  [27.0, 20.0, 15.0, 10.0], // 3451-4350
  [28.0, 21.0, 16.0, 11.0], // 4351-5450
  [30.0, 23.0, 17.0, 12.0], // 5451-6800
  [32.0, 25.0, 19.0, 13.0], // 6801-8500
  [34.0, 27.0, 20.0, 14.0], // 8501-10700
] as const;

/**
 * Hasil seed EMS — 23 bands × 4 complexity = 92 rows.
 */
export interface EmsSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  readonly days: number;
}

export const EMS_MANDAYS: readonly EmsSeedRow[] = EMS_DAYS.flatMap(
  (days, index) => {
    const band = FTE_BANDS[index];
    if (!band || band.fteMax === null) return [];

    return [
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'HIGH', days: days[0] },
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'MEDIUM', days: days[1] },
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'LOW', days: days[2] },
      { fteMin: band.fteMin, fteMax: band.fteMax, levelCode: 'LIMITED', days: days[3] },
    ];
  },
);