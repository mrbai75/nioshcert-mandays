/**
 * Data mandays QMS (Quality Management System).
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 2.1
 * - IAF MD 5:2023 — Annex A, Table QMS 1
 *
 * Nota:
 * - QMS guna 1 lajur sahaja (tiada High/Med/Low split).
 * - Complexity di QMS ditentukan oleh "risk category" (High/Med/Low)
 *   tetapi dari segi audit days — guna table yang sama.
 * - Untuk seed, kita simpan dengan `levelCode = 'MEDIUM'` sebagai default
 *   (atau boleh guna `null` — tapi schema kita ada complexityId optional).
 *
 * FTE bands: 23 (skip ">10700 follow progression")
 */

import { FTE_BANDS } from './fte-bands.js';

/**
 * Data QMS — 23 rows (satu per FTE band).
 * Nilai: audit days.
 */
const QMS_DAYS: readonly number[] = [
  1.5,  // 1-5
  2.0,  // 6-10
  2.5,  // 11-15
  3.0,  // 16-25
  4.0,  // 26-45
  5.0,  // 46-65
  6.0,  // 66-85
  7.0,  // 86-125
  8.0,  // 126-175
  9.0,  // 176-275
  10.0, // 276-425
  11.0, // 426-625
  12.0, // 626-875
  13.0, // 876-1175
  14.0, // 1176-1550
  15.0, // 1551-2025
  16.0, // 2026-2675
  17.0, // 2676-3450
  18.0, // 3451-4350
  19.0, // 4351-5450
  20.0, // 5451-6800
  21.0, // 6801-8500
  22.0, // 8501-10700
] as const;

/**
 * Hasil seed QMS — 23 bands × 1 lajur = 23 rows.
 *
 * Nota:
 * - `complexityLevel` = null (QMS tak guna complexity split)
 * - Tapi kita tetap perlu isi supaya struktur konsisten.
 */
export interface QmsSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly days: number;
}

export const QMS_MANDAYS: readonly QmsSeedRow[] = QMS_DAYS.flatMap(
  (days, index) => {
    const band = FTE_BANDS[index];
    if (!band || band.fteMax === null) return [];

    return [
      {
        fteMin: band.fteMin,
        fteMax: band.fteMax,
        days,
      },
    ];
  },
);