/**
 * Seed 5 standard ke table `Standard`.
 *
 * Guna:
 *   pnpm --filter @sambung/database seed:standards
 *
 * Idempotent — boleh run berulang kali tanpa duplicate.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Tarikh kuat kuasa standard.
 * Placeholder — boleh adjust kemudian.
 */
const EFFECTIVE_DATE = new Date('2024-01-01');

/**
 * Data 5 standard.
 */
const STANDARDS_SEED = [
  {
    code: 'OSHMS',
    name: 'Occupational Health and Safety Management System',
    referenceDoc: 'IAF MD 5:2023 - Annex C',
  },
  {
    code: 'QMS',
    name: 'Quality Management System',
    referenceDoc: 'IAF MD 5:2023 - Annex A',
  },
  {
    code: 'EMS',
    name: 'Environmental Management System',
    referenceDoc: 'IAF MD 5:2023 - Annex B',
  },
  {
    code: 'ABMS',
    name: 'Anti-Bribery Management System',
    referenceDoc: 'IAF MD 5:2023 + CAP 03-01',
  },
  {
    code: 'ISMS',
    name: 'Information Security Management System',
    referenceDoc: 'ISO/IEC 27006',
  },
] as const;

async function main(): Promise<void> {
  console.log('🌱 Seeding standards...\n');

  for (const std of STANDARDS_SEED) {
    const result = await prisma.standard.upsert({
      where: {
        code_version: {
          code: std.code,
          version: '1.0',
        },
      },
      update: {
        name: std.name,
        referenceDoc: std.referenceDoc,
        effectiveDate: EFFECTIVE_DATE,
        isActive: true,
      },
      create: {
        code: std.code,
        version: '1.0',
        name: std.name,
        referenceDoc: std.referenceDoc,
        effectiveDate: EFFECTIVE_DATE,
        isActive: true,
      },
    });

    console.log(`  ✓ ${result.code.padEnd(6)} — ${result.name}`);
  }

  const count = await prisma.standard.count();
  console.log(`\n✅ Seeded ${count} standards.\n`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });