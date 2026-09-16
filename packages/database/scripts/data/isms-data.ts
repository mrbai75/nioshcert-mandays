/**
 * Data mandays ISMS (Information Security Management System).
 *
 * Sumber:
 * - CAP 03-01 (R1) — Section 8, Page 39, Table 9
 * - ISO/IEC 27006 — Annex B (dirujuk oleh CAP)
 *
 * Nota:
 * - ISMS guna 1 lajur sahaja (tiada High/Med/Low split).
 * - FTE bands ISMS BERBEZA: 22 bands (bukan 23).
 *   Sebab ISMS gabungkan 1-10 jadi satu band.
 * - Band: [1-10], [11-15], [16-25], ... sampai [8501-10700]
 * - Adjustment (business + IT complexity) adalah LOGIC dalam kod,
 *   bukan dalam table ini (rujuk CAP 03-01 §8 Table C.2/C.3/C.4).
 */

/**
 * Data ISMS — 22 rows.
 * Format: [fteMin, fteMax, auditDays]
 *
 * ⚠️ Perhatian: Band pertama ISMS adalah 1-10 (bukan 1-5, 6-10).
 */
const ISMS_DAYS: readonly [number, number, number][] = [
  [1, 10, 5.0],
  [11, 15, 6.0],
  [16, 25, 7.0],
  [26, 45, 8.5],
  [46, 65, 10.0],
  [66, 85, 11.0],
  [86, 125, 12.0],
  [126, 175, 13.0],
  [176, 275, 14.0],
  [276, 425, 15.0],
  [426, 625, 16.5],
  [626, 875, 17.5],
  [876, 1175, 18.5],
  [1176, 1550, 19.5],
  [1551, 2025, 21.0],
  [2026, 2675, 22.0],
  [2676, 3450, 23.0],
  [3451, 4350, 24.0],
  [4351, 5450, 25.0],
  [5451, 6800, 26.0],
  [6801, 8500, 27.0],
  [8501, 10700, 28.0],
] as const;

/**
 * Hasil seed ISMS — 22 rows (1 lajur).
 *
 * Nota:
 * - `complexityLevel` = null (ISMS tak guna complexity split).
 * - Adjustment logic (business + IT) di luar table ini.
 */
export interface IsmsSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly days: number;
}

export const ISMS_MANDAYS: readonly IsmsSeedRow[] = ISMS_DAYS.map(
  ([fteMin, fteMax, days]) => ({
    fteMin,
    fteMax,
    days,
  }),
);