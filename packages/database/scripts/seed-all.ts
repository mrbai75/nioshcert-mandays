/**
 * Seed ALL — orchestrator.
 *
 * Jalankan semua seed script mengikut urutan:
 * 1. standards   — 5 standard
 * 2. complexity  — 13 complexity levels
 * 3. mandays     — 275 mandays rows
 * 4. sectors     — ~150 sectors
 *
 * Guna:
 *   pnpm --filter @nioshcert/database db:seed:all
 *
 * Nota:
 * - Idempotent — boleh run berulang kali.
 * - Kalau ada step gagal → stop, tak proceed ke step seterusnya.
 */

import { execSync } from 'node:child_process';

// =============================================================================
// STEPS
// =============================================================================

interface SeedStep {
  readonly name: string;
  readonly file: string;
}

const STEPS: readonly SeedStep[] = [
  { name: 'Standards', file: 'scripts/seed-standards.ts' },
  { name: 'Complexity Levels', file: 'scripts/seed-complexity.ts' },
  { name: 'Mandays Table', file: 'scripts/seed-mandays.ts' },
  { name: 'Sectors', file: 'scripts/seed-sectors.ts' },
] as const;

// =============================================================================
// MAIN
// =============================================================================

function runStep(step: SeedStep, index: number, total: number): void {
  const counter = `[${index + 1}/${total}]`;
  console.log(`\n${counter} Seeding ${step.name}...`);
  console.log(`     → ${step.file}\n`);

  try {
    execSync(`tsx ${step.file}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error(`\n❌ Failed at step ${counter}: ${step.name}\n`);
    throw error;
  }
}

function main(): void {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  🌱 NIOSHCert Mandays — Seed All                     ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  const startTime = Date.now();

  for (let i = 0; i < STEPS.length; i++) {
    runStep(STEPS[i]!, i, STEPS.length);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log(`║  ✅ All seeds completed in ${elapsed}s`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
}

main();