/**
 * 24 FTE bands (shared across OSHMS/QMS/EMS/ABMS).
 *
 * Sumber:
 * - IAF MD 5:2023 — Table QMS 1, EMS 1, OH&SMS 1
 * - CAP 03-01 (R1) — Table 1.1, 2.1, 3.1
 *
 * Nota:
 * - `fteMax = null` bermakna band terakhir (>10700) — follow progression.
 * - Untuk seed, kita skip band >10700 (tak boleh seed "follow progression").
 */

export interface FteBand {
  /** FTE minimum (inclusive) */
  readonly fteMin: number;

  /** FTE maximum (inclusive), null kalau open-ended */
  readonly fteMax: number | null;
}

/**
 * 24 FTE bands — digunakan oleh semua standard (kecuali ISMS, 22 bands).
 * ISMS guna subset (skip band 1-10 kerana ISMS combine 1-10).
 */
export const FTE_BANDS: readonly FteBand[] = [
  { fteMin: 1, fteMax: 5 },
  { fteMin: 6, fteMax: 10 },
  { fteMin: 11, fteMax: 15 },
  { fteMin: 16, fteMax: 25 },
  { fteMin: 26, fteMax: 45 },
  { fteMin: 46, fteMax: 65 },
  { fteMin: 66, fteMax: 85 },
  { fteMin: 86, fteMax: 125 },
  { fteMin: 126, fteMax: 175 },
  { fteMin: 176, fteMax: 275 },
  { fteMin: 276, fteMax: 425 },
  { fteMin: 426, fteMax: 625 },
  { fteMin: 626, fteMax: 875 },
  { fteMin: 876, fteMax: 1175 },
  { fteMin: 1176, fteMax: 1550 },
  { fteMin: 1551, fteMax: 2025 },
  { fteMin: 2026, fteMax: 2675 },
  { fteMin: 2676, fteMax: 3450 },
  { fteMin: 3451, fteMax: 4350 },
  { fteMin: 4351, fteMax: 5450 },
  { fteMin: 5451, fteMax: 6800 },
  { fteMin: 6801, fteMax: 8500 },
  { fteMin: 8501, fteMax: 10700 },
  { fteMin: 10701, fteMax: null }, // >10700 — follow progression (skip seed)
] as const;

/**
 * Bilangan FTE bands yang sah untuk seed (bukan "follow progression").
 * = 23 bands (skip band terakhir).
 */
export const SEEDABLE_FTE_BANDS = FTE_BANDS.filter(
  (band) => band.fteMax !== null,
);