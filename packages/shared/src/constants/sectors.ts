/**
 * Senarai sektor industri + mapping ke complexity category.
 *
 * Sumber:
 * - IAF MD 5:2023 — Annex A (QMS), Annex B (EMS), Annex C (OH&SMS)
 * - CAP 03-01 (R1) — Table 1.2 (OSHMS), 3.2 (EMS), 3.3 (ABMS)
 *
 * Nota:
 * - Complexity category mungkin dilaraskan oleh CAB berdasarkan aktiviti sebenar.
 * - Setiap standard guna subset complexity yang berbeza:
 *   - OSHMS: HIGH / MEDIUM / LOW
 *   - QMS:   HIGH / MEDIUM / LOW
 *   - EMS:   HIGH / MEDIUM / LOW / LIMITED
 *   - ABMS:  HIGH / MEDIUM / LOW (berdasarkan CPI + regulatory)
 *   - ISMS:  ikut ISO/IEC 27006 (TODO)
 */

import type { StandardCode } from '../types/standard.js';
import type { ComplexityLevel } from '../types/complexity.js';

// =============================================================================
// SECTOR ENTRY
// =============================================================================

/**
 * Satu entry sektor + complexity untuk standard tertentu.
 */
export interface SectorEntry {
  /** Nama sektor (verbatim dari IAF/CAP) */
  readonly sector: string;

  /** Complexity category */
  readonly complexity: ComplexityLevel;

  /** Nota tambahan (optional) — cth: "depending on activities could be high" */
  readonly notes?: string;
}

// =============================================================================
// OSHMS — CAP 03-01 Table 1.2 (IAF MD 5 Annex C)
// =============================================================================

const OSHMS_SECTORS: readonly SectorEntry[] = [
  // HIGH
  { sector: 'fishing (offshore, coastal dredging and diving)', complexity: 'HIGH' },
  { sector: 'mining and quarrying', complexity: 'HIGH' },
  { sector: 'manufacture of coke and refined petroleum products', complexity: 'HIGH' },
  { sector: 'oil and gas extraction', complexity: 'HIGH' },
  { sector: 'tanning of leather and leather products', complexity: 'HIGH' },
  { sector: 'dyeing of textiles and clothing', complexity: 'HIGH' },
  { sector: 'pulping part of paper manufacturing including paper recycling processing', complexity: 'HIGH' },
  { sector: 'oil refining', complexity: 'HIGH' },
  { sector: 'chemicals (including pesticides, fabrication of batteries and accumulators), and pharmaceuticals', complexity: 'HIGH' },
  { sector: 'manufacturing of fiberglass', complexity: 'HIGH' },
  { sector: 'gas production, storage and distribution', complexity: 'HIGH' },
  { sector: 'electricity generation and distribution', complexity: 'HIGH' },
  { sector: 'nuclear', complexity: 'HIGH' },
  { sector: 'storage of large quantities of hazardous material', complexity: 'HIGH' },
  { sector: 'non-metallic processing and products covering ceramics, concrete, cement, lime, plaster, etc.', complexity: 'HIGH' },
  { sector: 'primary production of metals', complexity: 'HIGH' },
  { sector: 'hot and cold forming and metal fabrication', complexity: 'HIGH' },
  { sector: 'manufacturing and assembly of metal structures', complexity: 'HIGH' },
  { sector: 'shipyards', complexity: 'HIGH', notes: 'depending on the activities could be medium' },
  { sector: 'aerospace industry', complexity: 'HIGH' },
  { sector: 'automotive industry', complexity: 'HIGH' },
  { sector: 'manufacturing of weapons and explosives', complexity: 'HIGH' },
  { sector: 'recycling of hazardous waste', complexity: 'HIGH' },
  { sector: 'hazardous and non-hazardous waste processing e.g. incineration etc.', complexity: 'HIGH' },
  { sector: 'effluent and sewerage processing', complexity: 'HIGH' },
  { sector: 'industrial and civil construction and demolition (including building completion with electrical, hydraulic and air conditioning installation activities)', complexity: 'HIGH' },
  { sector: 'slaughter houses', complexity: 'HIGH' },
  { sector: 'transport and distribution of dangerous goods (by land, air and water)', complexity: 'HIGH' },
  { sector: 'defence activities/crisis management', complexity: 'HIGH' },
  { sector: 'healthcare/hospitals/veterinary/social works', complexity: 'HIGH' },

  // MEDIUM
  { sector: 'aquaculture (breeding, rearing, and harvesting of plants and animals in all types of water environments)', complexity: 'MEDIUM' },
  { sector: 'fishing (offshore fishing is high)', complexity: 'MEDIUM' },
  { sector: 'farming/forestry', complexity: 'MEDIUM', notes: 'depending on the activities could be high' },
  { sector: 'food, beverage and tobacco processing', complexity: 'MEDIUM' },
  { sector: 'textiles and clothing except for dyeing', complexity: 'MEDIUM' },
  { sector: 'leather and leather product except for tanning', complexity: 'MEDIUM' },
  { sector: 'manufacturing of wood and wooden products including manufacturing of boards, treatment/impregnation of wood', complexity: 'MEDIUM' },
  { sector: 'paper production and paper products excluding pulping', complexity: 'MEDIUM' },
  { sector: 'non-metallic processing and products covering glass, ceramics, clay, etc.', complexity: 'MEDIUM' },
  { sector: 'general mechanical engineering assembly', complexity: 'MEDIUM' },
  { sector: 'manufacturing of metallic products', complexity: 'MEDIUM' },
  { sector: 'surface and other chemically based treatment for metal fabricated products excluding primary production and for general mechanical engineering', complexity: 'MEDIUM', notes: 'depending on the treatment and the size of the component could be high' },
  { sector: 'production of bare printed circuit boards for electronics industry', complexity: 'MEDIUM' },
  { sector: 'rubber and plastic injection moulding, forming and assembly', complexity: 'MEDIUM' },
  { sector: 'electrical and electronic equipment assembly', complexity: 'MEDIUM' },
  { sector: 'manufacturing of transport equipment and their repairs road, rail and air', complexity: 'MEDIUM', notes: 'depending on the size of the equipment, could be high' },
  { sector: 'recycling, composting, landfill (of non-hazardous waste)', complexity: 'MEDIUM' },
  { sector: 'water abstraction, purification and distribution including river management', complexity: 'MEDIUM', notes: 'commercial effluent treatment is graded as high' },
  { sector: 'fossil fuel wholesale and retail', complexity: 'MEDIUM', notes: 'depending on the amount of fuel, could be high' },
  { sector: 'transport of passengers (by air, land and sea)', complexity: 'MEDIUM' },
  { sector: 'transport and distribution of non dangerous goods (by land, air and water)', complexity: 'MEDIUM' },
  { sector: 'industrial cleaning, hygiene cleaning, dry cleaning normally part of general business services', complexity: 'MEDIUM' },
  { sector: 'research & development in natural and technical sciences', complexity: 'MEDIUM', notes: 'depending on the business sector could be high' },
  { sector: 'technical testing and laboratories', complexity: 'MEDIUM' },
  { sector: 'hotels, leisure services and personal services excludes restaurants', complexity: 'MEDIUM' },
  { sector: 'education services', complexity: 'MEDIUM', notes: 'depending on the object of teaching activities could be high or low' },

  // LOW
  { sector: 'corporate activities and management, HQ and management of holding companies', complexity: 'LOW' },
  { sector: 'wholesale and retail', complexity: 'LOW', notes: 'depending on the product, could be medium or high, e.g. fuel' },
  { sector: 'general business services except industrial cleaning, hygiene cleaning, dry cleaning and education services', complexity: 'LOW' },
  { sector: 'transport and distribution management services with no actual fleet to manage', complexity: 'LOW' },
  { sector: 'engineering services', complexity: 'LOW', notes: 'could be medium depending on type of services' },
  { sector: 'telecommunications and post office services', complexity: 'LOW' },
  { sector: 'restaurants and campings', complexity: 'LOW' },
  { sector: 'commercial estate agency, estate management', complexity: 'LOW' },
  { sector: 'research & development on social sciences and humanities', complexity: 'LOW' },
  { sector: 'public administration, local authorities', complexity: 'LOW' },
  { sector: 'financial institutions, advertising agency', complexity: 'LOW' },
];

// =============================================================================
// QMS — IAF MD 5 Annex A, Table QMS 2 (Risk Categories)
// =============================================================================

const QMS_SECTORS: readonly SectorEntry[] = [
  // HIGH
  { sector: 'food', complexity: 'HIGH' },
  { sector: 'pharmaceuticals', complexity: 'HIGH' },
  { sector: 'aircraft', complexity: 'HIGH' },
  { sector: 'shipbuilding', complexity: 'HIGH' },
  { sector: 'load bearing components and structures', complexity: 'HIGH' },
  { sector: 'complex construction activity', complexity: 'HIGH' },
  { sector: 'electrical and gas equipment', complexity: 'HIGH' },
  { sector: 'medical and health services', complexity: 'HIGH' },
  { sector: 'fishing', complexity: 'HIGH' },
  { sector: 'nuclear fuel', complexity: 'HIGH' },
  { sector: 'chemicals, chemical products and fibres', complexity: 'HIGH' },

  // MEDIUM
  { sector: 'non load bearing components and structures', complexity: 'MEDIUM' },
  { sector: 'simple construction activities', complexity: 'MEDIUM' },
  { sector: 'basic metals and fabricated products', complexity: 'MEDIUM' },
  { sector: 'non-metallic products', complexity: 'MEDIUM' },
  { sector: 'furniture', complexity: 'MEDIUM' },
  { sector: 'optical equipment', complexity: 'MEDIUM' },
  { sector: 'leisure and personal services', complexity: 'MEDIUM' },

  // LOW
  { sector: 'textiles and clothing', complexity: 'LOW' },
  { sector: 'pulp, paper and paper products', complexity: 'LOW' },
  { sector: 'publishing', complexity: 'LOW' },
  { sector: 'office services', complexity: 'LOW' },
  { sector: 'education', complexity: 'LOW' },
  { sector: 'retailing, hotels and restaurants', complexity: 'LOW' },
];

// =============================================================================
// EMS — CAP 03-01 Table 3.2 (IAF MD 5 Annex B, Table EMS 2)
// =============================================================================

const EMS_SECTORS: readonly SectorEntry[] = [
  // HIGH
  { sector: 'mining and quarrying', complexity: 'HIGH' },
  { sector: 'oil and gas extraction', complexity: 'HIGH' },
  { sector: 'tanning of textiles and clothing', complexity: 'HIGH' },
  { sector: 'pulping part of paper manufacturing including paper recycling processing', complexity: 'HIGH' },
  { sector: 'oil refining', complexity: 'HIGH' },
  { sector: 'chemicals and pharmaceuticals', complexity: 'HIGH' },
  { sector: 'primary productions – metals', complexity: 'HIGH' },
  { sector: 'non-metallic processing and products covering ceramics and cement', complexity: 'HIGH' },
  { sector: 'coal based electricity generation', complexity: 'HIGH' },
  { sector: 'civil construction and demolition', complexity: 'HIGH' },
  { sector: 'hazardous and non-hazardous waste processing e.g. incineration etc.', complexity: 'HIGH' },
  { sector: 'effluent and sewerage processing', complexity: 'HIGH' },

  // MEDIUM
  { sector: 'fishing/farming/forestry', complexity: 'MEDIUM' },
  { sector: 'textiles and clothing except for tanning', complexity: 'MEDIUM' },
  { sector: 'manufacturing of boards, treatment/impregnation of wood and wooden products', complexity: 'MEDIUM' },
  { sector: 'paper production and printing excluding pulping', complexity: 'MEDIUM' },
  { sector: 'non-metallic processing and products covering glass, clay, lime etc.', complexity: 'MEDIUM' },
  { sector: 'surface and other chemically based treatment for metal fabricated products, excluding primary production', complexity: 'MEDIUM' },
  { sector: 'surface and other chemically based treatment for general mechanical engineering', complexity: 'MEDIUM' },
  { sector: 'production of bare printed circuit boards for electronics industry', complexity: 'MEDIUM' },
  { sector: 'manufacturing of transport equipment - road, rail, air, ships', complexity: 'MEDIUM' },
  { sector: 'non coal based electricity generation and distribution', complexity: 'MEDIUM' },
  { sector: 'gas production, storage and distribution', complexity: 'MEDIUM', notes: 'extraction is graded high' },
  { sector: 'water abstraction, purification and distribution including river management', complexity: 'MEDIUM', notes: 'commercial effluent treatment is graded as high' },
  { sector: 'fossil fuel whole sale and retail', complexity: 'MEDIUM' },
  { sector: 'food and tobacco – processing', complexity: 'MEDIUM' },
  { sector: 'transport and distribution by sea, air, land', complexity: 'MEDIUM' },
  { sector: 'commercial estate agency, estate management, industrial cleaning, hygiene cleaning, dry cleaning normally part of general business services', complexity: 'MEDIUM' },
  { sector: 'recycling, composting, landfill (of non-hazardous waste)', complexity: 'MEDIUM' },
  { sector: 'technical testing and laboratories', complexity: 'MEDIUM' },
  { sector: 'healthcare/hospitals/veterinary', complexity: 'MEDIUM' },
  { sector: 'leisure services and personal services excludes hotels/restaurants', complexity: 'MEDIUM' },

  // LOW
  { sector: 'hotels/restaurants', complexity: 'LOW' },
  { sector: 'wood and wooden products excluding manufacturing of boards, treatment and impregnation of wood', complexity: 'LOW' },
  { sector: 'paper products excluding printing, pulping and paper making', complexity: 'LOW' },
  { sector: 'rubber and plastic injection moulding, forming and assembly excluding manufacturing of rubber and plastic raw materials which are part of chemicals', complexity: 'LOW' },
  { sector: 'hot and cold forming and metal fabrication excluding surface treatment and other chemical based treatments and primary production', complexity: 'LOW' },
  { sector: 'general mechanical engineering assembly excluding surface treatment and other chemical based treatments', complexity: 'LOW' },
  { sector: 'wholesale and retail', complexity: 'LOW' },
  { sector: 'electrical and electronic equipment assembly excluding manufacturing of bare printed circuit boards', complexity: 'LOW' },

  // LIMITED
  { sector: 'corporate activities and management, HQ and management of holding companies', complexity: 'LIMITED' },
  { sector: 'transport and distribution - management services with no actual fleet to manage', complexity: 'LIMITED' },
  { sector: 'telecommunications', complexity: 'LIMITED' },
  { sector: 'general business services except commercial estate agency, estate management, industrial cleaning, hygiene cleaning, dry cleaning', complexity: 'LIMITED' },
  { sector: 'education services', complexity: 'LIMITED' },

  // SPECIAL CASE (case-by-case — di-map ke HIGH sebagai default)
  { sector: 'nuclear', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
  { sector: 'nuclear electricity generation', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
  { sector: 'storage of large quantities of hazardous material', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
  { sector: 'public administration', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
  { sector: 'local authorities', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
  { sector: 'organizations with environmental sensitive products or services, financial institutions', complexity: 'HIGH', notes: 'SPECIAL CASE — individual justification required' },
];

// =============================================================================
// ABMS — CAP 03-01 Table 3.3
// =============================================================================

/**
 * ABMS guna CPI score + regulatory history, BUKAN sektor sahaja.
 * Mapping di bawah adalah approximation berdasarkan sektor.
 * Untuk ABMS, logik sebenar guna `abmsInput.cpiScore` + `abmsInput.hasRegulatoryAction`.
 */
const ABMS_SECTORS: readonly SectorEntry[] = [
  // MEDIUM
  { sector: 'transportation and storage', complexity: 'MEDIUM' },
  { sector: 'telecommunications', complexity: 'MEDIUM' },
  { sector: 'consumer services', complexity: 'MEDIUM' },
  { sector: 'forestry', complexity: 'MEDIUM' },
  { sector: 'banking and finance', complexity: 'MEDIUM' },
  { sector: 'information technology', complexity: 'MEDIUM' },
  { sector: 'civilian aerospace', complexity: 'MEDIUM' },
  { sector: 'trading, intermediation and commercial companies not classifiable as SMEs', complexity: 'MEDIUM' },
  { sector: 'associations, foundations, national boards, NGOs, Not-for-Profit entities', complexity: 'MEDIUM' },

  // LOW
  { sector: 'light manufacturing', complexity: 'LOW' },
  { sector: 'agriculture', complexity: 'LOW' },
  { sector: 'SMEs', complexity: 'LOW' },
  { sector: 'organisations not listed within the high & medium categories', complexity: 'LOW' },
];

// =============================================================================
// ISMS — TODO: ISO/IEC 27006 (data belum supply)
// =============================================================================

const ISMS_SECTORS: readonly SectorEntry[] = [];

// =============================================================================
// MAPPING PER STANDARD
// =============================================================================

/**
 * Mapping sektor → complexity untuk setiap standard.
 *
 * Guna:
 *   getSectorsByStandard('OSHMS')       → semua sektor OSHMS
 *   getComplexityForSector('OSHMS', '...') → complexity untuk sektor
 */
export const SECTOR_COMPLEXITY: Readonly<
  Record<StandardCode, readonly SectorEntry[]>
> = {
  OSHMS: OSHMS_SECTORS,
  QMS: QMS_SECTORS,
  EMS: EMS_SECTORS,
  ABMS: ABMS_SECTORS,
  ISMS: ISMS_SECTORS,
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Dapatkan senarai sektor untuk standard tertentu.
 */
export function getSectorsByStandard(
  standard: StandardCode,
): readonly SectorEntry[] {
  return SECTOR_COMPLEXITY[standard];
}

/**
 * Cari complexity untuk sektor tertentu.
 * Return undefined kalau sektor tak dijumpai.
 */
export function getComplexityForSector(
  standard: StandardCode,
  sector: string,
): ComplexityLevel | undefined {
  const entries = SECTOR_COMPLEXITY[standard];
  const found = entries.find((e) => e.sector === sector);
  return found?.complexity;
}

/**
 * Dapatkan semua sektor unik (union semua standard).
 * Berguna untuk dropdown UI.
 */
export function getAllSectors(): readonly string[] {
  const set = new Set<string>();
  for (const entries of Object.values(SECTOR_COMPLEXITY)) {
    for (const entry of entries) {
      set.add(entry.sector);
    }
  }
  return Array.from(set).sort();
}