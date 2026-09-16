/**
 * Seed ComplexityLevel ke table `complexity_levels`.
 *
 * Sumber:
 * - IAF MD 5:2023 — Annex A (QMS), Annex B (EMS), Annex C (OH&SMS)
 * - CAP 03-01 (R1) — implementasi NIOSHCert
 *
 * Bilangan tahap per standard:
 * - OSHMS : 3 (HIGH, MEDIUM, LOW)          — IAF MD 5 Annex C
 * - QMS   : 3 (HIGH, MEDIUM, LOW)          — IAF MD 5 Annex A
 * - EMS   : 4 (HIGH, MEDIUM, LOW, LIMITED) — IAF MD 5 Annex B
 * - ABMS  : 3 (HIGH, MEDIUM, LOW)          — CAP 03-01 Table 3.3
 * - ISMS  : 0 (pending, ISO/IEC 27006)
 *
 * Total: 13 rows
 *
 * Guna:
 *   pnpm --filter @nioshcert/database db:seed:complexity
 *
 * Idempotent — boleh run berulang kali tanpa duplicate.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// =============================================================================
// TYPES
// =============================================================================

interface ComplexitySeed {
  levelCode: 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';
  label: string;
  description: string;
}

// =============================================================================
// LABELS (shared across standards)
// =============================================================================

const LABELS: Record<ComplexitySeed['levelCode'], Omit<ComplexitySeed, 'levelCode'>> = {
  HIGH: {
    label: 'High Complexity',
    description:
      'Significant nature and severity. Typically construction, heavy manufacturing ' +
      'or processing type organizations.',
  },
  MEDIUM: {
    label: 'Medium Complexity',
    description:
      'Medium nature and severity. Typically light manufacturing organizations ' +
      'with some significant risks.',
  },
  LOW: {
    label: 'Low Complexity',
    description:
      'Low nature and severity. Typically office-based organizations.',
  },
  LIMITED: {
    label: 'Limited Complexity',
    description:
      'Limited nature and gravity. Typically organizations of an office type environment.',
  },
};

// =============================================================================
// SEED DATA — per standard
// =============================================================================

const COMPLEXITY_SEED: Record<string, ComplexitySeed['levelCode'][]> = {
  OSHMS: ['HIGH', 'MEDIUM', 'LOW'],
  QMS: ['HIGH', 'MEDIUM', 'LOW'],
  EMS: ['HIGH', 'MEDIUM', 'LOW', 'LIMITED'],
  ABMS: ['HIGH', 'MEDIUM', 'LOW'],
  ISMS: [],
};

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  console.log('🌱 Seeding complexity levels...\n');

  let totalSeeded = 0;

  for (const [standardCode, levels] of Object.entries(COMPLEXITY_SEED)) {
    if (levels.length === 0) {
      console.log(`  ⊘ ${standardCode.padEnd(6)} — skip (no levels)`);
      continue;
    }

    // Cari standard dalam DB guna code
    const standard = await prisma.standard.findFirst({
      where: { code: standardCode, version: '1.0' },
      select: { id: true, code: true },
    });

    if (!standard) {
      console.log(`  ⚠ ${standardCode.padEnd(6)} — standard not found, skip`);
      continue;
    }

    console.log(`  ${standardCode.padEnd(6)} (${standard.id}):`);

    for (const levelCode of levels) {
      const meta = LABELS[levelCode];

      const result = await prisma.complexityLevel.upsert({
        where: {
          standardId_levelCode: {
            standardId: standard.id,
            levelCode,
          },
        },
        update: {
          label: meta.label,
          description: meta.description,
        },
        create: {
          standardId: standard.id,
          levelCode,
          label: meta.label,
          description: meta.description,
        },
      });

      console.log(`    ✓ ${result.levelCode.padEnd(8)} — ${result.label}`);
      totalSeeded++;
    }
  }

  console.log(`\n✅ Seeded ${totalSeeded} complexity levels.\n`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });