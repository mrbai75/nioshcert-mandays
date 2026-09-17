/**
 * TIER 1: BASE - Generic mandays lookup
 *
 * Fungsi generik untuk lookup base MD dari jadual standard.
 * Reusable untuk semua standard.
 */

import { ComplexityLevel, MandaysRow, BaseMdResult } from '../types';

export type { BaseMdResult };

/**
 * Lookup base mandays dari table berdasarkan FTE + complexity.
 *
 * - Jika FTE <= maxFte: `value` berisi, `requiresManualInput` = false
 * - Jika FTE > maxFte: `value` = null, `requiresManualInput` = true
 *   -> ATD wajib masukkan nilai manual dengan justifikasi
 */
export function lookupBaseMd(
  table: MandaysRow[],
  fte: number,
  complexity: ComplexityLevel,
  options: { standard: string; maxFte: number }
): BaseMdResult {
  const { standard, maxFte } = options;

  // Guard: FTE < 1
  if (fte < 1) {
    throw new Error(`[${standard}] FTE mesti >= 1. Diterima: ${fte}`);
  }

  // Guard: FTE > maxFte -> requires manual input
  if (fte > maxFte) {
    const lastRow = table[table.length - 1];
    const lastValue = getValueForComplexity(lastRow, complexity, standard);

    return {
      value: null,
      requiresManualInput: true,
      message:
        `FTE ${fte} melebihi jadual rasmi (max: ${maxFte}). ` +
        `Formula progression tidak didefinisikan dalam dokumen rujukan. ` +
        `Sila masukkan Base MD secara manual dengan justifikasi ATD.`,
      referenceLastValue: lastValue,
      referenceLastRange: {
        min: lastRow.fteMin,
        max: lastRow.fteMax ?? lastRow.fteMin,
      },
      meta: {
        fte,
        complexity,
        tableMaxFte: maxFte,
        standardName: standard,
      },
    };
  }

  // Lookup normal
  const row = table.find(
    (r) => fte >= r.fteMin && (r.fteMax === null || fte <= r.fteMax)
  );

  if (!row) {
    throw new Error(
      `[${standard}] Tiada lookup untuk FTE ${fte}. Sila semak jadual mandays.`
    );
  }

  const value = getValueForComplexity(row, complexity, standard);

  return {
    value,
    requiresManualInput: false,
    meta: {
      fte,
      complexity,
      tableMaxFte: maxFte,
      standardName: standard,
    },
  };
}

/**
 * Helper: Ambil nilai ikut complexity dari satu baris.
 */
function getValueForComplexity(
  row: MandaysRow,
  complexity: ComplexityLevel,
  standard: string
): number {
  let value: number | undefined;

  switch (complexity) {
    case 'HIGH':
      value = row.high;
      break;
    case 'MEDIUM':
      value = row.medium;
      break;
    case 'LOW':
      value = row.low;
      break;
    case 'LIMITED':
      value = row.limited;
      break;
  }

  // Fallback: untuk QMS yang tiada complexity
  if (value === undefined && row.days !== undefined) {
    value = row.days;
  }

  if (value === undefined) {
    throw new Error(
      `[${standard}] Complexity ${complexity} tidak tersedia. ` +
      `Sila semak jadual mandays.`
    );
  }

  return value;
}