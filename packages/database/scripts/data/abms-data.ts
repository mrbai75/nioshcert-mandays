/**
 * Data mandays ABMS (Anti-Bribery Management System).
 *
 * Sumber:
 * - CAP 03-01 (R1) — HYTRO Contract Review
 *   "Initial Audit MD based on IAF MD 5:2023, Annex B, Table EMS 1"
 * - Proxy: Table EMS 1 (CAP 03-01 Table 3.1)
 *
 * Complexity: 3 tahap (HIGH, MEDIUM, LOW)
 *   → Tiada LIMITED (ABMS tak guna)
 *   → Complexity ditentukan oleh CPI score + regulatory (logic dalam kod)
 *
 * FTE bands: 23 (skip ">10700 follow progression")
 *
 * ⚠️ Nota penting:
 * - ABMS DUPLICATE data EMS (buang lajur LIMITED).
 * - Sebab CAP sendiri cakap ABMS guna Table EMS 1.
 * - Tapi disimpan sebagai row ABMS dalam DB (self-contained, senang audit).
 * - Complexity (HIGH/MED/LOW) ditentukan oleh:
 *   - CPI score (≤30 HIGH, 31-59 MEDIUM, ≥60 LOW)
 *   - Regulatory action (kalau ada → HIGH)
 */

import { FTE_BANDS } from './fte-bands.js';
import { EMS_MANDAYS, type EmsSeedRow } from './ems-data.js';

/**
 * Hasil seed ABMS — 23 bands × 3 complexity = 69 rows.
 *
 * Cara: Ambil dari EMS_MANDAYS, buang `LIMITED`, tukar tak perlu.
 */
export interface AbmsSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW';
  readonly days: number;
}

export const ABMS_MANDAYS: readonly AbmsSeedRow[] = EMS_MANDAYS
  .filter((row) => row.levelCode !== 'LIMITED')
  .map((row) => ({
    fteMin: row.fteMin,
    fteMax: row.fteMax,
    levelCode: row.levelCode as 'HIGH' | 'MEDIUM' | 'LOW',
    days: row.days,
  }));