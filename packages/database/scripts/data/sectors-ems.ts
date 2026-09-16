/**
 * Data sector → complexity untuk EMS.
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 3.2
 * - IAF MD 5:2023 — Annex B, Table EMS 2
 *
 * Complexity: 4 tahap (HIGH, MEDIUM, LOW, LIMITED) + SPECIAL CASE
 * Nota: EMS satu-satunya standard yang guna LIMITED untuk sector.
 */

export interface EmsSectorSeedRow {
  readonly sectorName: string;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  readonly keywords: readonly string[];
  readonly notes?: string;
}

// =============================================================================
// HIGH
// =============================================================================

const HIGH: readonly EmsSectorSeedRow[] = [
  { sectorName: 'Mining and quarrying', levelCode: 'HIGH', keywords: ['mining', 'quarrying'] },
  { sectorName: 'Oil and gas extraction', levelCode: 'HIGH', keywords: ['oil', 'gas', 'extraction'] },
  { sectorName: 'Tanning of textiles and clothing', levelCode: 'HIGH', keywords: ['tanning', 'textiles'] },
  { sectorName: 'Pulping part of paper manufacturing including paper recycling processing', levelCode: 'HIGH', keywords: ['pulping', 'paper', 'recycling'] },
  { sectorName: 'Oil refining', levelCode: 'HIGH', keywords: ['oil', 'refining'] },
  { sectorName: 'Chemicals and pharmaceuticals', levelCode: 'HIGH', keywords: ['chemicals', 'pharmaceuticals'] },
  { sectorName: 'Primary productions – metals', levelCode: 'HIGH', keywords: ['metals', 'primary production'] },
  { sectorName: 'Non-metallic processing and products covering ceramics and cement', levelCode: 'HIGH', keywords: ['non-metallic', 'ceramics', 'cement'] },
  { sectorName: 'Coal based electricity generation', levelCode: 'HIGH', keywords: ['coal', 'electricity'] },
  { sectorName: 'Civil construction and demolition', levelCode: 'HIGH', keywords: ['construction', 'demolition'] },
  { sectorName: 'Hazardous and non-hazardous waste processing e.g. incineration etc.', levelCode: 'HIGH', keywords: ['waste', 'incineration'] },
  { sectorName: 'Effluent and sewerage processing', levelCode: 'HIGH', keywords: ['effluent', 'sewerage'] },
];

// =============================================================================
// MEDIUM
// =============================================================================

const MEDIUM: readonly EmsSectorSeedRow[] = [
  { sectorName: 'Fishing/farming/forestry', levelCode: 'MEDIUM', keywords: ['fishing', 'farming', 'forestry'] },
  { sectorName: 'Textiles and clothing except for tanning', levelCode: 'MEDIUM', keywords: ['textiles', 'clothing'] },
  { sectorName: 'Manufacturing of boards, treatment/impregnation of wood and wooden products', levelCode: 'MEDIUM', keywords: ['wood', 'boards', 'treatment'] },
  { sectorName: 'Paper production and printing excluding pulping', levelCode: 'MEDIUM', keywords: ['paper', 'printing'] },
  { sectorName: 'Non-metallic processing and products covering glass, clay, lime etc.', levelCode: 'MEDIUM', keywords: ['non-metallic', 'glass', 'clay', 'lime'] },
  { sectorName: 'Surface and other chemically based treatment for metal fabricated products, excluding primary production', levelCode: 'MEDIUM', keywords: ['surface treatment', 'metal'] },
  { sectorName: 'Surface and other chemically based treatment for general mechanical engineering', levelCode: 'MEDIUM', keywords: ['surface treatment', 'mechanical'] },
  { sectorName: 'Production of bare printed circuit boards for electronics industry', levelCode: 'MEDIUM', keywords: ['printed circuit boards', 'electronics'] },
  { sectorName: 'Manufacturing of transport equipment - road, rail, air, ships', levelCode: 'MEDIUM', keywords: ['transport equipment'] },
  { sectorName: 'Non coal based electricity generation and distribution', levelCode: 'MEDIUM', keywords: ['electricity', 'distribution'] },
  { sectorName: 'Gas production, storage and distribution', levelCode: 'MEDIUM', keywords: ['gas', 'production', 'storage'], notes: 'extraction is graded high' },
  { sectorName: 'Water abstraction, purification and distribution including river management', levelCode: 'MEDIUM', keywords: ['water', 'purification'], notes: 'commercial effluent treatment is graded as high' },
  { sectorName: 'Fossil fuel whole sale and retail', levelCode: 'MEDIUM', keywords: ['fossil fuel', 'wholesale', 'retail'] },
  { sectorName: 'Food and tobacco – processing', levelCode: 'MEDIUM', keywords: ['food', 'tobacco'] },
  { sectorName: 'Transport and distribution by sea, air, land', levelCode: 'MEDIUM', keywords: ['transport', 'distribution'] },
  { sectorName: 'Commercial estate agency, estate management, industrial cleaning, hygiene cleaning, dry cleaning normally part of general business services', levelCode: 'MEDIUM', keywords: ['estate', 'cleaning'] },
  { sectorName: 'Recycling, composting, landfill (of non-hazardous waste)', levelCode: 'MEDIUM', keywords: ['recycling', 'composting', 'landfill'] },
  { sectorName: 'Technical testing and laboratories', levelCode: 'MEDIUM', keywords: ['testing', 'laboratories'] },
  { sectorName: 'Healthcare/hospitals/veterinary', levelCode: 'MEDIUM', keywords: ['healthcare', 'hospitals', 'veterinary'] },
  { sectorName: 'Leisure services and personal services excludes hotels/restaurants', levelCode: 'MEDIUM', keywords: ['leisure', 'personal services'] },
];

// =============================================================================
// LOW
// =============================================================================

const LOW: readonly EmsSectorSeedRow[] = [
  { sectorName: 'Hotels/restaurants', levelCode: 'LOW', keywords: ['hotels', 'restaurants'] },
  { sectorName: 'Wood and wooden products excluding manufacturing of boards, treatment and impregnation of wood', levelCode: 'LOW', keywords: ['wood'] },
  { sectorName: 'Paper products excluding printing, pulping and paper making', levelCode: 'LOW', keywords: ['paper products'] },
  { sectorName: 'Rubber and plastic injection moulding, forming and assembly excluding manufacturing of rubber and plastic raw materials which are part of chemicals', levelCode: 'LOW', keywords: ['rubber', 'plastic'] },
  { sectorName: 'Hot and cold forming and metal fabrication excluding surface treatment and other chemical based treatments and primary production', levelCode: 'LOW', keywords: ['metal fabrication', 'forming'] },
  { sectorName: 'General mechanical engineering assembly excluding surface treatment and other chemical based treatments', levelCode: 'LOW', keywords: ['mechanical', 'engineering'] },
  { sectorName: 'Wholesale and retail', levelCode: 'LOW', keywords: ['wholesale', 'retail'] },
  { sectorName: 'Electrical and electronic equipment assembly excluding manufacturing of bare printed circuit boards', levelCode: 'LOW', keywords: ['electrical', 'electronic'] },
];

// =============================================================================
// LIMITED
// =============================================================================

const LIMITED: readonly EmsSectorSeedRow[] = [
  { sectorName: 'Corporate activities and management, HQ and management of holding companies', levelCode: 'LIMITED', keywords: ['corporate', 'HQ', 'holding'] },
  { sectorName: 'Transport and distribution - management services with no actual fleet to manage', levelCode: 'LIMITED', keywords: ['transport management'] },
  { sectorName: 'Telecommunications', levelCode: 'LIMITED', keywords: ['telecommunications'] },
  { sectorName: 'General business services except commercial estate agency, estate management, industrial cleaning, hygiene cleaning, dry cleaning', levelCode: 'LIMITED', keywords: ['business services'] },
  { sectorName: 'Education services', levelCode: 'LIMITED', keywords: ['education'] },
];

// =============================================================================
// SPECIAL CASE (map ke HIGH sebagai default)
// =============================================================================

const SPECIAL: readonly EmsSectorSeedRow[] = [
  { sectorName: 'Nuclear', levelCode: 'HIGH', keywords: ['nuclear'], notes: 'SPECIAL CASE — individual justification required' },
  { sectorName: 'Nuclear electricity generation', levelCode: 'HIGH', keywords: ['nuclear', 'electricity'], notes: 'SPECIAL CASE — individual justification required' },
  { sectorName: 'Storage of large quantities of hazardous material', levelCode: 'HIGH', keywords: ['storage', 'hazardous'], notes: 'SPECIAL CASE — individual justification required' },
  { sectorName: 'Public administration', levelCode: 'HIGH', keywords: ['public administration'], notes: 'SPECIAL CASE — individual justification required' },
  { sectorName: 'Local authorities', levelCode: 'HIGH', keywords: ['local authorities'], notes: 'SPECIAL CASE — individual justification required' },
  { sectorName: 'Organizations with environmental sensitive products or services, financial institutions', levelCode: 'HIGH', keywords: ['environmental sensitive', 'financial'], notes: 'SPECIAL CASE — individual justification required' },
];

export const EMS_SECTORS: readonly EmsSectorSeedRow[] = [
  ...HIGH,
  ...MEDIUM,
  ...LOW,
  ...LIMITED,
  ...SPECIAL,
];