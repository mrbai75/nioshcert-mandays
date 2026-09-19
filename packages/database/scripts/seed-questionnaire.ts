// Seed questionnaire dari MD files → DB
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
  if (upper.includes('OSHMS')) return ['OSHMS'];
  if (upper.includes('QMS')) return ['QMS'];
  if (upper.includes('EMS')) return ['EMS'];
  if (upper.includes('ABMS')) return ['ABMS'];
  if (upper.includes('ISMS')) return ['ISMS'];
  return [];
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
  // Convert guna ke complexityImpact/fteImpact/mandaysImpact
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
      // sectionId: JANGAN update â€” kekalkan section asal (elak soalan common ditimpa)
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

  // Link ke standards
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

async function seedFile(filePath: string) {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Processing: ${fileName}`);

  const parsed = parseQuestionnaireMd(filePath);
  console.log(`   CAS: ${parsed.casNumber}, Standard: ${parsed.standard}, Soalan: ${parsed.questions.length}`);

  // Group by section
  const bySection = new Map<string, ParsedQuestionnaire['questions']>();
  for (const q of parsed.questions) {
    const sec = q.section || 'default';
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

  for (const f of files) {
    await seedFile(path.join(MD_DIR, f));
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