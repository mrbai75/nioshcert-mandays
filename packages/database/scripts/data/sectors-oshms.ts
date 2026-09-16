/**
 * Data sector → complexity untuk OSHMS.
 *
 * Sumber:
 * - CAP 03-01 (R1) — Table 1.2
 * - IAF MD 5:2023 — Annex C, Table OH&SMS 2
 *
 * Complexity: 3 tahap (HIGH, MEDIUM, LOW)
 * Tiada LIMITED untuk OSHMS.
 */

export interface SectorSeedRow {
  readonly sectorName: string;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  readonly keywords: readonly string[];
  readonly notes?: string;
}

/**
 * OSHMS sectors — HIGH complexity.
 */
const HIGH: readonly SectorSeedRow[] = [
  { sectorName: 'Fishing (offshore, coastal dredging and diving)', levelCode: 'HIGH', keywords: ['fishing', 'offshore', 'dredging', 'diving'] },
  { sectorName: 'Mining and quarrying', levelCode: 'HIGH', keywords: ['mining', 'quarrying'] },
  { sectorName: 'Manufacture of coke and refined petroleum products', levelCode: 'HIGH', keywords: ['coke', 'petroleum'] },
  { sectorName: 'Oil and gas extraction', levelCode: 'HIGH', keywords: ['oil', 'gas', 'extraction'] },
  { sectorName: 'Tanning of leather and leather products', levelCode: 'HIGH', keywords: ['tanning', 'leather'] },
  { sectorName: 'Dyeing of textiles and clothing', levelCode: 'HIGH', keywords: ['dyeing', 'textiles'] },
  { sectorName: 'Pulping part of paper manufacturing including paper recycling processing', levelCode: 'HIGH', keywords: ['pulping', 'paper', 'recycling'] },
  { sectorName: 'Oil refining', levelCode: 'HIGH', keywords: ['oil', 'refining'] },
  { sectorName: 'Chemicals (including pesticides, fabrication of batteries and accumulators), and pharmaceuticals', levelCode: 'HIGH', keywords: ['chemicals', 'pesticides', 'batteries', 'pharmaceuticals'] },
  { sectorName: 'Manufacturing of fiberglass', levelCode: 'HIGH', keywords: ['fiberglass'] },
  { sectorName: 'Gas production, storage and distribution', levelCode: 'HIGH', keywords: ['gas', 'production', 'storage', 'distribution'] },
  { sectorName: 'Electricity generation and distribution', levelCode: 'HIGH', keywords: ['electricity', 'generation', 'distribution'] },
  { sectorName: 'Nuclear', levelCode: 'HIGH', keywords: ['nuclear'] },
  { sectorName: 'Storage of large quantities of hazardous material', levelCode: 'HIGH', keywords: ['storage', 'hazardous'] },
  { sectorName: 'Non-metallic processing and products covering ceramics, concrete, cement, lime, plaster, etc.', levelCode: 'HIGH', keywords: ['non-metallic', 'ceramics', 'concrete', 'cement', 'lime', 'plaster'] },
  { sectorName: 'Primary production of metals', levelCode: 'HIGH', keywords: ['metals', 'primary production'] },
  { sectorName: 'Hot and cold forming and metal fabrication', levelCode: 'HIGH', keywords: ['metal', 'fabrication', 'forming'] },
  { sectorName: 'Manufacturing and assembly of metal structures', levelCode: 'HIGH', keywords: ['metal structures', 'assembly'] },
  { sectorName: 'Shipyards', levelCode: 'HIGH', keywords: ['shipyards'], notes: 'depending on the activities could be medium' },
  { sectorName: 'Aerospace industry', levelCode: 'HIGH', keywords: ['aerospace'] },
  { sectorName: 'Automotive industry', levelCode: 'HIGH', keywords: ['automotive'] },
  { sectorName: 'Manufacturing of weapons and explosives', levelCode: 'HIGH', keywords: ['weapons', 'explosives'] },
  { sectorName: 'Recycling of hazardous waste', levelCode: 'HIGH', keywords: ['recycling', 'hazardous waste'] },
  { sectorName: 'Hazardous and non-hazardous waste processing e.g. incineration etc.', levelCode: 'HIGH', keywords: ['waste processing', 'incineration'] },
  { sectorName: 'Effluent and sewerage processing', levelCode: 'HIGH', keywords: ['effluent', 'sewerage'] },
  { sectorName: 'Industrial and civil construction and demolition (including building completion with electrical, hydraulic and air conditioning installation activities)', levelCode: 'HIGH', keywords: ['construction', 'demolition'] },
  { sectorName: 'Slaughter houses', levelCode: 'HIGH', keywords: ['slaughter'] },
  { sectorName: 'Transport and distribution of dangerous goods (by land, air and water)', levelCode: 'HIGH', keywords: ['transport', 'dangerous goods'] },
  { sectorName: 'Defence activities/crisis management', levelCode: 'HIGH', keywords: ['defence', 'crisis'] },
  { sectorName: 'Healthcare/hospitals/veterinary/social works', levelCode: 'HIGH', keywords: ['healthcare', 'hospitals', 'veterinary', 'social'] },
];

/**
 * OSHMS sectors — MEDIUM complexity.
 */
const MEDIUM: readonly SectorSeedRow[] = [
  { sectorName: 'Aquaculture (breeding, rearing, and harvesting of plants and animals in all types of water environments)', levelCode: 'MEDIUM', keywords: ['aquaculture'] },
  { sectorName: 'Fishing (offshore fishing is high)', levelCode: 'MEDIUM', keywords: ['fishing'] },
  { sectorName: 'Farming/forestry', levelCode: 'MEDIUM', keywords: ['farming', 'forestry'], notes: 'depending on the activities could be high' },
  { sectorName: 'Food, beverage and tobacco processing', levelCode: 'MEDIUM', keywords: ['food', 'beverage', 'tobacco'] },
  { sectorName: 'Textiles and clothing except for dyeing', levelCode: 'MEDIUM', keywords: ['textiles', 'clothing'] },
  { sectorName: 'Leather and leather product except for tanning', levelCode: 'MEDIUM', keywords: ['leather'] },
  { sectorName: 'Manufacturing of wood and wooden products including manufacturing of boards, treatment/impregnation of wood', levelCode: 'MEDIUM', keywords: ['wood', 'wooden'] },
  { sectorName: 'Paper production and paper products excluding pulping', levelCode: 'MEDIUM', keywords: ['paper'] },
  { sectorName: 'Non-metallic processing and products covering glass, ceramics, clay, etc.', levelCode: 'MEDIUM', keywords: ['non-metallic', 'glass', 'ceramics', 'clay'] },
  { sectorName: 'General mechanical engineering assembly', levelCode: 'MEDIUM', keywords: ['mechanical', 'engineering'] },
  { sectorName: 'Manufacturing of metallic products', levelCode: 'MEDIUM', keywords: ['metallic'] },
  { sectorName: 'Surface and other chemically based treatment for metal fabricated products excluding primary production and for general mechanical engineering', levelCode: 'MEDIUM', keywords: ['surface treatment', 'chemical'], notes: 'depending on the treatment and the size of the component could be high' },
  { sectorName: 'Production of bare printed circuit boards for electronics industry', levelCode: 'MEDIUM', keywords: ['printed circuit boards', 'electronics'] },
  { sectorName: 'Rubber and plastic injection moulding, forming and assembly', levelCode: 'MEDIUM', keywords: ['rubber', 'plastic', 'moulding'] },
  { sectorName: 'Electrical and electronic equipment assembly', levelCode: 'MEDIUM', keywords: ['electrical', 'electronic'] },
  { sectorName: 'Manufacturing of transport equipment and their repairs road, rail and air', levelCode: 'MEDIUM', keywords: ['transport equipment', 'repairs'], notes: 'depending on the size of the equipment, could be high' },
  { sectorName: 'Recycling, composting, landfill (of non-hazardous waste)', levelCode: 'MEDIUM', keywords: ['recycling', 'composting', 'landfill'] },
  { sectorName: 'Water abstraction, purification and distribution including river management', levelCode: 'MEDIUM', keywords: ['water', 'purification', 'distribution'] },
  { sectorName: 'Fossil fuel wholesale and retail', levelCode: 'MEDIUM', keywords: ['fossil fuel', 'wholesale', 'retail'] },
  { sectorName: 'Transport of passengers (by air, land and sea)', levelCode: 'MEDIUM', keywords: ['transport', 'passengers'] },
  { sectorName: 'Transport and distribution of non dangerous goods (by land, air and water)', levelCode: 'MEDIUM', keywords: ['transport', 'non-dangerous goods'] },
  { sectorName: 'Industrial cleaning, hygiene cleaning, dry cleaning normally part of general business services', levelCode: 'MEDIUM', keywords: ['cleaning', 'hygiene', 'dry cleaning'] },
  { sectorName: 'Research & development in natural and technical sciences', levelCode: 'MEDIUM', keywords: ['R&D', 'research', 'natural sciences'] },
  { sectorName: 'Technical testing and laboratories', levelCode: 'MEDIUM', keywords: ['testing', 'laboratories'] },
  { sectorName: 'Hotels, leisure services and personal services excludes restaurants', levelCode: 'MEDIUM', keywords: ['hotels', 'leisure'] },
  { sectorName: 'Education services', levelCode: 'MEDIUM', keywords: ['education'], notes: 'depending on the object of teaching activities could be high or low' },
];

/**
 * OSHMS sectors — LOW complexity.
 */
const LOW: readonly SectorSeedRow[] = [
  { sectorName: 'Corporate activities and management, HQ and management of holding companies', levelCode: 'LOW', keywords: ['corporate', 'HQ', 'holding'] },
  { sectorName: 'Wholesale and retail', levelCode: 'LOW', keywords: ['wholesale', 'retail'], notes: 'depending on the product, could be medium or high, e.g. fuel' },
  { sectorName: 'General business services except industrial cleaning, hygiene cleaning, dry cleaning and education services', levelCode: 'LOW', keywords: ['business services'] },
  { sectorName: 'Transport and distribution management services with no actual fleet to manage', levelCode: 'LOW', keywords: ['transport management'] },
  { sectorName: 'Engineering services', levelCode: 'LOW', keywords: ['engineering services'], notes: 'could be medium depending on type of services' },
  { sectorName: 'Telecommunications and post office services', levelCode: 'LOW', keywords: ['telecommunications', 'post office'] },
  { sectorName: 'Restaurants and campings', levelCode: 'LOW', keywords: ['restaurants', 'campings'] },
  { sectorName: 'Commercial estate agency, estate management', levelCode: 'LOW', keywords: ['estate agency', 'estate management'] },
  { sectorName: 'Research & development on social sciences and humanities', levelCode: 'LOW', keywords: ['R&D', 'social sciences', 'humanities'] },
  { sectorName: 'Public administration, local authorities', levelCode: 'LOW', keywords: ['public administration', 'local authorities'] },
  { sectorName: 'Financial institutions, advertising agency', levelCode: 'LOW', keywords: ['financial', 'advertising'] },
];

export const OSHMS_SECTORS: readonly SectorSeedRow[] = [
  ...HIGH,
  ...MEDIUM,
  ...LOW,
];