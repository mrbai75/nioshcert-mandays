/**
 * Seed sector_complexity table untuk semua standard.
 *
 * Sumber data:
 * - OSHMS : CAP 03-01 Table 1.2
 * - EMS   : CAP 03-01 Table 3.2
 * - ABMS  : CAP 03-01 Table 3.3
 *
 * Skip:
 * - QMS  — guna risk category, bukan sector
 * - ISMS — guna business + IT complexity, bukan sector
 *
 * Total: ~150 rows
 *
 * Guna:
 *   pnpm --filter @nioshcert/database db:seed:sectors
 *
 * Idempotent:
 * - Delete semua existing rows untuk standard (version 1.0)
 * - Insert fresh
 */

import { PrismaClient } from '@prisma/client';
import type { StandardCode } from '@nioshcert/shared';

import { OSHMS_SECTORS } from './data/sectors-oshms.js';
import { EMS_SECTORS } from './data/sectors-ems.js';
import { ABMS_SECTORS } from './data/sectors-abms.js';

const prisma = new PrismaClient();

const VERSION = '1.0';

// =============================================================================
// TYPES
// =============================================================================

interface SectorSeedInput {
  readonly sectorName: string;
  readonly levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  readonly keywords: readonly string[];
  readonly notes?: string;
}

// =============================================================================
// HELPER
// =============================================================================

async function getStandardId(code: StandardCode): Promise<string> {
  const standard = await prisma.standard.findFirst({
    where: { code, version: VERSION },
    select: { id: true },
  });

  if (!standard) {
    throw new Error(`Standard ${code} not found (version ${VERSION})`);
  }

  return standard.id;
}

async function getComplexityIdMap(
  standardId: string,
): Promise<Map<string, string>> {
  const levels = await prisma.complexityLevel.findMany({
    where: { standardId },
    select: { id: true, levelCode: true },
  });

  const map = new Map<string, string>();
  for (const level of levels) {
    map.set(level.levelCode, level.id);
  }

  return map;
}

// =============================================================================
// SEED SATU STANDARD
// =============================================================================

async function seedSectors(
  code: StandardCode,
  rows: readonly SectorSeedInput[],
): Promise<number> {
  const standardId = await getStandardId(code);
  const complexityMap = await getComplexityIdMap(standardId);

  // Delete existing
  await prisma.sectorComplexity.deleteMany({
    where: { standardId, version: VERSION },
  });

  let inserted = 0;

  for (const row of rows) {
    const complexityId = complexityMap.get(row.levelCode);

    if (!complexityId) {
      console.warn(
        `    ⚠ ${code}: complexity ${row.levelCode} not found for sector "${row.sectorName}", skip`,
      );
      continue;
    }

    await prisma.sectorComplexity.create({
      data: {
        standardId,
        complexityId,
        sectorName: row.sectorName,
        keywords: [...row.keywords],
        notes: row.notes ?? null,
        version: VERSION,
        isActive: true,
      },
    });

    inserted++;
  }

  return inserted;
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  console.log('🌱 Seeding sector complexity...\n');

  let total = 0;

  // OSHMS
  const oshmsCount = await seedSectors('OSHMS', OSHMS_SECTORS);
  console.log(`  ✓ OSHMS  — ${oshmsCount} sectors`);
  total += oshmsCount;

  // EMS
  const emsCount = await seedSectors('EMS', EMS_SECTORS);
  console.log(`  ✓ EMS    — ${emsCount} sectors`);
  total += emsCount;

  // ABMS
  const abmsCount = await seedSectors('ABMS', ABMS_SECTORS);
  console.log(`  ✓ ABMS   — ${abmsCount} sectors`);
  total += abmsCount;

  // Skip
  console.log(`  ⊘ QMS    — skip (risk category, bukan sector)`);
  console.log(`  ⊘ ISMS   — skip (business + IT complexity, bukan sector)`);

  console.log(`\n✅ Seeded ${total} sectors.\n`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });