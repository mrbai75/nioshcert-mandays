// Seed questionnaire dari MD files -> DB
// Idempotent: boleh run berulang (upsert)

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '../src/index';
import { parseQuestionnaireMd, ParsedQuestionnaire } from './lib/parse-questionnaire-md';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MD_DIR = path.resolve(__dirname, '../../../docs/questionnaires');

// Mapping standard code dari MD
function normalizeStandard(raw: string): string[] {
  const upper = raw.toUpperCase();
  if (upper.includes('ALL') || upper.includes('COMMON')) {
    return ['OSHMS', 'QMS', 'EMS', 'ABMS', 'ISMS'];
  }
  const codes = ['OSHMS', 'QMS', 'EMS', 'ABMS', 'ISMS'];
  const matched = codes.filter((c) => upper.includes(c));
  return matched;
}

async function seedSection(sectionKey: string, order: number) {
  const title = sectionKey
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return prisma.section.upsert({
    where: { key: sectionKey },
    update: { title, order },
    create: { key: sectionKey, title, order },
  });
}

async function seedQuestion(q: ParsedQuestionnaire['questions'][0], sectionId: string, order: number) {
  let complexityImpact: any = null;
  let fteImpact: any = null;
  let mandaysImpact: any = null;

  const gunaLower = q.guna.toLowerCase();
  if (gunaLower.includes('complexity')) {
    const resultMatch = q.guna.match(/(HIGH|MEDIUM|LOW|LIMITED)/gi);
    complexityImpact = {
      standard: q.appliesTo,
      when: true,
      result: resultMatch ? resultMatch[0].toUpperCase() : 'MEDIUM',
      reason: q.label,
      needsVerify: q.guna.includes('[PERLU SAHKAN]'),
    };
  }
  if (gunaLower.includes('fte')) {
    const weightMatch = q.guna.match(/weight\s*[×x]\s*([\d.]+)/i);
    fteImpact = {
      role: q.key,
      weight: weightMatch ? parseFloat(weightMatch[1]) : 1.0,
    };
  }
  if (gunaLower.includes('adjustment')) {
    mandaysImpact = {
      when: true,
      reason: q.label,
      needsVerify: q.guna.includes('[PERLU SAHKAN]'),
    };
  }

  const dependsOn = q.dependsOn ? { raw: q.dependsOn } : null;

  const question = await prisma.question.upsert({
    where: { key: q.key },
    update: {
      source: q.source,
      type: q.type,
      label: q.label,
      description: q.description ?? null,
      required: q.required,
      order,
      // sectionId: JANGAN update — kekalkan section asal
      options: q.options ?? null,
      complexityImpact: complexityImpact ?? undefined,
      fteImpact: fteImpact ?? undefined,
      mandaysImpact: mandaysImpact ?? undefined,
      dependsOn: dependsOn ?? undefined,
    },
    create: {
      key: q.key,
      source: q.source,
      type: q.type,
      label: q.label,
      description: q.description ?? null,
      required: q.required,
      order,
      sectionId,
      options: q.options ?? null,
      complexityImpact: complexityImpact ?? undefined,
      fteImpact: fteImpact ?? undefined,
      mandaysImpact: mandaysImpact ?? undefined,
      dependsOn: dependsOn ?? undefined,
    },
  });

  const standards = normalizeStandard(q.appliesTo.join(','));
  for (const code of standards) {
    const std = await prisma.standard.findFirst({
      where: { code, isActive: true },
      orderBy: { effectiveDate: 'desc' },
    });
    if (!std) {
      console.warn(`  [WARN] Standard ${code} not found — skip link`);
      continue;
    }
    await prisma.questionStandard.upsert({
      where: {
        questionId_standardId: {
          questionId: question.id,
          standardId: std.id,
        },
      },
      update: {},
      create: {
        questionId: question.id,
        standardId: std.id,
      },
    });
  }

  return question;
}

// PRE-SCAN: Bina map question.key -> union(appliesTo)
function preScanAllStandards(files: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const f of files) {
    const parsed = parseQuestionnaireMd(path.join(MD_DIR, f));
    for (const q of parsed.questions) {
      const codes = normalizeStandard(q.appliesTo.join(','));
      const existing = map.get(q.key) ?? [];
      const union = Array.from(new Set([...existing, ...codes]));
      map.set(q.key, union);
    }
  }
  return map;
}

async function seedFile(
  filePath: string,
  standardMap: Map<string, string[]>,
) {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Processing: ${fileName}`);

  const parsed = parseQuestionnaireMd(filePath);
  console.log(`   CAS: ${parsed.casNumber}, Standard: ${parsed.standard}, Soalan: ${parsed.questions.length}`);

  const bySection = new Map<string, ParsedQuestionnaire['questions']>();
  for (const q of parsed.questions) {
    const allStandards = standardMap.get(q.key) ?? normalizeStandard(q.appliesTo.join(','));
    let sec = q.section || 'default';
    if (allStandards.length > 1 && allStandards.length < 5) {
      sec = 'multi_standard';
    }
    if (!bySection.has(sec)) bySection.set(sec, []);
    bySection.get(sec)!.push(q);
  }

  let sectionOrder = 0;
  for (const [sectionKey, questions] of bySection) {
    sectionOrder++;
    const section = await seedSection(sectionKey, sectionOrder);
    console.log(`   Section: ${sectionKey} (${questions.length} soalan)`);

    let qOrder = 0;
    for (const q of questions) {
      qOrder++;
      await seedQuestion(q, section.id, qOrder);
    }
  }
}

async function main() {
  console.log('🌱 Seeding questionnaire...\n');

  const files = fs.readdirSync(MD_DIR).filter((f) => f.endsWith('.md'));
  files.sort();

  // PRE-SCAN
  console.log('🔍 Pre-scanning MD files untuk multi-standard detection...');
  const standardMap = preScanAllStandards(files);
  const multiCount = Array.from(standardMap.values()).filter(
    (v) => v.length > 1 && v.length < 5,
  ).length;
  console.log(`   Multi-standard questions: ${multiCount}\n`);

  for (const f of files) {
    await seedFile(path.join(MD_DIR, f), standardMap);
  }

  const totalQ = await prisma.question.count();
  const totalS = await prisma.section.count();
  const totalQS = await prisma.questionStandard.count();

  console.log(`\n✅ Seed complete:`);
  console.log(`   Sections: ${totalS}`);
  console.log(`   Questions: ${totalQ}`);
  console.log(`   QuestionStandard relations: ${totalQS}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
