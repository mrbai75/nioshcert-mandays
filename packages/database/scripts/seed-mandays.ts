/**
 * Seed mandays table untuk semua standard.
 *
 * Sumber data:
 * - OSHMS : CAP 03-01 Table 1.1 (3 complexity)
 * - QMS   : CAP 03-01 Table 2.1 (1 lajur)
 * - EMS   : CAP 03-01 Table 3.1 (4 complexity)
 * - ABMS  : CAP 03-01 Table 3.1 (proxy — HYTRO: EMS Table 1, 3 complexity)
 * - ISMS  : CAP 03-01 §8 Table 9 (1 lajur, 22 bands)
 *
 * Total: ~286 rows
 *
 * Guna:
 *   pnpm --filter @nioshcert/database db:seed:mandays
 *
 * Idempotent:
 * - Delete semua existing rows untuk standard (version 1.0)
 * - Insert fresh
 */

import { PrismaClient } from '@prisma/client';
import type { StandardCode } from '@nioshcert/shared';

import { OSHMS_MANDAYS } from './data/oshms-data.js';
import { QMS_MANDAYS } from './data/qms-data.js';
import { EMS_MANDAYS } from './data/ems-data.js';
import { ABMS_MANDAYS } from './data/abms-data.js';
import { ISMS_MANDAYS } from './data/isms-data.js';

const prisma = new PrismaClient();

const EFFECTIVE_DATE = new Date('2024-01-01');
const VERSION = '1.0';

// =============================================================================
// TYPES
// =============================================================================

interface MandaysSeedRow {
  readonly fteMin: number;
  readonly fteMax: number;
  readonly days: number;
  readonly levelCode?: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
}

// =============================================================================
// HELPER — cari standard + complexity ID
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

interface SeedStandardOptions {
  readonly code: StandardCode;
  readonly rows: readonly MandaysSeedRow[];
  /** Guna complexity split? (false untuk QMS + ISMS) */
  readonly hasComplexity: boolean;
}

async function seedStandard(options: SeedStandardOptions): Promise<number> {
  const { code, rows, hasComplexity } = options;

  const standardId = await getStandardId(code);
  const complexityMap = hasComplexity
    ? await getComplexityIdMap(standardId)
    : new Map<string, string>();

  // Delete existing rows untuk standard ini (idempotent)
  await prisma.mandaysTable.deleteMany({
    where: { standardId, version: VERSION },
  });

  // Insert fresh
  let inserted = 0;
  for (const row of rows) {
    const complexityId =
      hasComplexity && row.levelCode
        ? complexityMap.get(row.levelCode) ?? null
        : null;

    if (hasComplexity && !complexityId) {
      console.warn(`    ⚠ ${code}: complexity ${row.levelCode} not found, skip`);
      continue;
    }

    await prisma.mandaysTable.create({
      data: {
        standardId,
        complexityId,
        fteMin: row.fteMin,
        fteMax: row.fteMax,
        auditDays: row.days,
        version: VERSION,
        effectiveDate: EFFECTIVE_DATE,
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
  console.log('🌱 Seeding mandays table...\n');

  let total = 0;

  // OSHMS — 3 complexity
  const oshmsCount = await seedStandard({
    code: 'OSHMS',
    rows: OSHMS_MANDAYS,
    hasComplexity: true,
  });
  console.log(`  ✓ OSHMS  — ${oshmsCount} rows`);
  total += oshmsCount;

  // QMS — 1 lajur
  const qmsCount = await seedStandard({
    code: 'QMS',
    rows: QMS_MANDAYS,
    hasComplexity: false,
  });
  console.log(`  ✓ QMS    — ${qmsCount} rows`);
  total += qmsCount;

  // EMS — 4 complexity
  const emsCount = await seedStandard({
    code: 'EMS',
    rows: EMS_MANDAYS,
    hasComplexity: true,
  });
  console.log(`  ✓ EMS    — ${emsCount} rows`);
  total += emsCount;

  // ABMS — 3 complexity (duplicate EMS)
  const abmsCount = await seedStandard({
    code: 'ABMS',
    rows: ABMS_MANDAYS,
    hasComplexity: true,
  });
  console.log(`  ✓ ABMS   — ${abmsCount} rows`);
  total += abmsCount;

  // ISMS — 1 lajur (22 bands)
  const ismsCount = await seedStandard({
    code: 'ISMS',
    rows: ISMS_MANDAYS,
    hasComplexity: false,
  });
  console.log(`  ✓ ISMS   — ${ismsCount} rows`);
  total += ismsCount;

  console.log(`\n✅ Seeded ${total} mandays rows.\n`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });