/**
 * Data sector → complexity untuk ABMS.
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 3.3
 *
 * Complexity: 3 tahap (HIGH, MEDIUM, LOW)
 * Tiada LIMITED.
 *
 * ⚠️ Nota penting:
 * - ABMS complexity ditentukan oleh 3 faktor:
 *   1. CPI score (geographical)
 *   2. Regulatory action (5 tahun)
 *   3. Business sector (table ini)
 * - Table ini simpan SECTOR → complexity.
 * - Logic CPI + regulatory akan jadi LOGIC dalam kod (bukan dalam table).
 * - Sebab tu HIGH boleh juga dari CPI ≤ 30 (bukan sector).
 */

export interface AbmsSectorSeedRow {
  readonly sectorName: string;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW';
  readonly keywords: readonly string[];
  readonly notes?: string;
}

// =============================================================================
// HIGH
// =============================================================================

const HIGH: readonly AbmsSectorSeedRow[] = [
  { sectorName: 'Public works contracts and construction', levelCode: 'HIGH', keywords: ['public works', 'construction'] },
  { sectorName: 'Utilities', levelCode: 'HIGH', keywords: ['utilities'] },
  { sectorName: 'Real estate, property, legal and business services', levelCode: 'HIGH', keywords: ['real estate', 'property', 'legal'] },
  { sectorName: 'Oil and gas', levelCode: 'HIGH', keywords: ['oil', 'gas'] },
  { sectorName: 'Mining', levelCode: 'HIGH', keywords: ['mining'] },
  { sectorName: 'Power generation and transmission', levelCode: 'HIGH', keywords: ['power', 'generation', 'transmission'] },
  { sectorName: 'Pharmaceutical and healthcare', levelCode: 'HIGH', keywords: ['pharmaceutical', 'healthcare'] },
  { sectorName: 'Heavy manufacturing', levelCode: 'HIGH', keywords: ['heavy manufacturing'] },
  { sectorName: 'Fisheries', levelCode: 'HIGH', keywords: ['fisheries'] },
  { sectorName: 'Arms, defence and military', levelCode: 'HIGH', keywords: ['arms', 'defence', 'military'] },
  { sectorName: 'Organisations either fully or partially under government control', levelCode: 'HIGH', keywords: ['government control'] },
  { sectorName: 'Political parties and trade unions', levelCode: 'HIGH', keywords: ['political parties', 'trade unions'] },
];

// =============================================================================
// MEDIUM
// =============================================================================

const MEDIUM: readonly AbmsSectorSeedRow[] = [
  { sectorName: 'Transportation and storage', levelCode: 'MEDIUM', keywords: ['transportation', 'storage'] },
  { sectorName: 'Telecommunications', levelCode: 'MEDIUM', keywords: ['telecommunications'] },
  { sectorName: 'Consumer services', levelCode: 'MEDIUM', keywords: ['consumer services'] },
  { sectorName: 'Forestry', levelCode: 'MEDIUM', keywords: ['forestry'] },
  { sectorName: 'Banking and finance', levelCode: 'MEDIUM', keywords: ['banking', 'finance'] },
  { sectorName: 'Information technology', levelCode: 'MEDIUM', keywords: ['information technology', 'IT'] },
  { sectorName: 'Civilian aerospace', levelCode: 'MEDIUM', keywords: ['civilian aerospace'] },
  { sectorName: 'Trading, intermediation and commercial companies not classifiable as SMEs', levelCode: 'MEDIUM', keywords: ['trading', 'intermediation', 'commercial'] },
  { sectorName: 'Associations, foundations, national boards, NGOs, Not-for-Profit entities', levelCode: 'MEDIUM', keywords: ['associations', 'foundations', 'NGOs', 'not-for-profit'] },
];

// =============================================================================
// LOW
// =============================================================================

const LOW: readonly AbmsSectorSeedRow[] = [
  { sectorName: 'Light manufacturing', levelCode: 'LOW', keywords: ['light manufacturing'] },
  { sectorName: 'Agriculture', levelCode: 'LOW', keywords: ['agriculture'] },
  { sectorName: 'SMEs', levelCode: 'LOW', keywords: ['SMEs'] },
  { sectorName: 'Organisations not listed within the high & medium categories', levelCode: 'LOW', keywords: ['other'] },
];

export const ABMS_SECTORS: readonly AbmsSectorSeedRow[] = [
  ...HIGH,
  ...MEDIUM,
  ...LOW,
];