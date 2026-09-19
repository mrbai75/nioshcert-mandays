import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListQuestionnaireQueryDto } from './dto/list-questionnaire-query.dto';
import { ValidateAnswersDto } from './dto/validate-answers.dto';

// Service untuk module questionnaire
@Injectable()
export class QuestionnaireService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Ambil soalan untuk satu atau lebih standard.
   * Dedupe automatik — soalan common (company_name) keluar sekali sahaja.
   */
  async findQuestions(query: ListQuestionnaireQueryDto): Promise<{
    standards: string[];
    sections: Array<{
      id: string;
      key: string;
      title: string;
      order: number;
      questions: any[];
    }>;
    total: number;
  }> {
    if (!query.standards) {
      throw new BadRequestException('Query param "standards" is required (e.g. ?standards=ISMS,QMS)');
    }

    const codes = query.standards
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s.length > 0);

    if (codes.length === 0) {
      throw new BadRequestException('At least one standard code is required');
    }

    // Ambil soalan yang appliesTo salah satu standard
    const questions = await this.prisma.client.question.findMany({
      where: {
        isActive: true,
        standards: {
          some: {
            standard: { code: { in: codes } },
          },
        },
      },
      include: {
        section: true,
        standards: {
          include: {
            standard: { select: { code: true } },
          },
        },
      },
      orderBy: [{ section: { order: 'asc' } }, { order: 'asc' }],
    });

    if (questions.length === 0) {
      throw new NotFoundException(`No questions found for standards: ${codes.join(', ')}`);
    }

    // Group by section
    const sectionMap = new Map<string, any>();
    for (const q of questions) {
      if (!q.section) continue;
      const sid = q.section.id;
      if (!sectionMap.has(sid)) {
        sectionMap.set(sid, {
          id: q.section.id,
          key: q.section.key,
          title: q.section.title,
          order: q.section.order,
          questions: [],
        });
      }
      sectionMap.get(sid).questions.push({
        id: q.id,
        key: q.key,
        source: q.source,
        type: q.type,
        label: q.label,
        description: q.description,
        required: q.required,
        order: q.order,
        options: q.options,
        validation: q.validation,
        dependsOn: q.dependsOn,
        complexityImpact: q.complexityImpact,
        fteImpact: q.fteImpact,
        mandaysImpact: q.mandaysImpact,
        appliesTo: q.standards.map((qs) => qs.standard.code),
      });
    }

    const sections = Array.from(sectionMap.values()).sort((a, b) => a.order - b.order);

    return {
      standards: codes,
      sections,
      total: questions.length,
    };
  }

  /**
   * Validate jawapan client terhadap definisi soalan.
   * Cuma check required + type (asas). Metadata-driven validation.
   */
  async validateAnswers(dto: ValidateAnswersDto): Promise<{
    valid: boolean;
    errors: Array<{ field: string; message: string }>;
    totalAnswered: number;
    totalRequired: number;
  }> {
    const result = await this.findQuestions({ standards: dto.standards.join(',') });
    const errors: Array<{ field: string; message: string }> = [];
    let totalRequired = 0;
    let totalAnswered = 0;

    for (const section of result.sections) {
      for (const q of section.questions) {
        const val = dto.answers[q.key];
        const hasValue = val !== undefined && val !== null && val !== '';

        if (q.required) {
          totalRequired++;
          if (!hasValue) {
            errors.push({ field: q.key, message: `"${q.label}" is required` });
            continue;
          }
        }

        if (hasValue) {
          totalAnswered++;

          // Type check ringkas
          if (q.type === 'number' && typeof val !== 'number') {
            errors.push({ field: q.key, message: `"${q.label}" must be a number` });
          }
          if (q.type === 'boolean' && typeof val !== 'boolean') {
            errors.push({ field: q.key, message: `"${q.label}" must be boolean` });
          }
          if (q.type === 'radio' || q.type === 'select') {
            if (typeof val !== 'string') {
              errors.push({ field: q.key, message: `"${q.label}" must be a string` });
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      totalAnswered,
      totalRequired,
    };
  }

  /**
   * Auto-detect complexity dari jawapan.
   * Baca complexityImpact metadata dari setiap soalan.
   * Ambil TERTINGGI (HIGH > MEDIUM > LOW > LIMITED).
   */
  async detectComplexity(dto: ValidateAnswersDto): Promise<{
    standard: string;
    complexity: string | null;
    source: 'AUTO' | 'NONE';
    trace: Array<{ field: string; result: string; reason: string }>;
  }> {
    const result = await this.findQuestions({ standards: dto.standards.join(',') });
    const trace: Array<{ field: string; result: string; reason: string }> = [];

    const RANK: Record<string, number> = { LIMITED: 0, LOW: 1, MEDIUM: 2, HIGH: 3 };
    let highest: string | null = null;
    let highestRank = -1;

    for (const section of result.sections) {
      for (const q of section.questions) {
        if (!q.complexityImpact) continue;

        const impact = q.complexityImpact as any;
        const val = dto.answers[q.key];

        // Support array atau objek
        const impacts = Array.isArray(impact) ? impact : [impact];

        for (const imp of impacts) {
          // Match hanya kalau:
          // 1. when === val (nilai sama), ATAU
          // 2. when === true dan val === true (strict boolean)
          let matches = false;
          if (typeof imp.when === 'boolean') {
            matches = imp.when === val;
          } else if (typeof imp.when === 'object' && imp.when !== null) {
            matches = JSON.stringify(imp.when) === JSON.stringify(val);
          } else {
            matches = imp.when === val;
          }

          if (matches && imp.result) {
            trace.push({
              field: q.key,
              result: imp.result,
              reason: imp.reason ?? q.label,
            });
            const rank = RANK[imp.result] ?? -1;
            if (rank > highestRank) {
              highestRank = rank;
              highest = imp.result;
            }
          }
        }
      }
    }

    // Return complexity untuk standard pertama
    return {
      standard: dto.standards[0] ?? 'UNKNOWN',
      complexity: highest,
      source: highest ? 'AUTO' : 'NONE',
      trace,
    };
  }
}