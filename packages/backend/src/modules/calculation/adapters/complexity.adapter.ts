// Complexity Adapter — detect complexity dari jawapan questionnaire
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

export type ComplexityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';

export interface ComplexityResult {
  complexity: ComplexityLevel | null;
  source: 'AUTO' | 'NONE';
  trace: Array<{ field: string; result: ComplexityLevel; reason: string }>;
  reason?: string;
}

// Rank untuk ambil tertinggi
const RANK: Record<ComplexityLevel, number> = {
  LIMITED: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

@Injectable()
export class ComplexityAdapter {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Detect complexity dari jawapan.
   * Baca `complexityImpact` dari setiap soalan yang applies ke standard.
   */
  async detect(standardCode: string, answers: Record<string, unknown>): Promise<ComplexityResult> {
    const questions = await this.prisma.client.question.findMany({
      where: {
        isActive: true,

        standards: {
          some: { standard: { code: standardCode } },
        },
      },
      select: { key: true, label: true, complexityImpact: true },
    });

    const trace: Array<{ field: string; result: ComplexityLevel; reason: string }> = [];
    let highest: ComplexityLevel | null = null;
    let highestRank = -1;

    for (const q of questions) {
      const impact = q.complexityImpact as any;
      if (!impact) continue;

      const impacts = Array.isArray(impact) ? impact : [impact];
      const val = answers[q.key];

      for (const imp of impacts) {
        let matches = false;
        if (typeof imp.when === 'boolean') {
          matches = imp.when === val;
        } else if (typeof imp.when === 'object' && imp.when !== null) {
          matches = JSON.stringify(imp.when) === JSON.stringify(val);
        } else {
          matches = imp.when === val;
        }

        if (matches && imp.result) {
          const result = String(imp.result).toUpperCase() as ComplexityLevel;
          if (!(result in RANK)) continue;

          trace.push({
            field: q.key,
            result,
            reason: imp.reason ?? q.label,
          });

          const rank = RANK[result];
          if (rank > highestRank) {
            highestRank = rank;
            highest = result;
          }
        }
      }
    }

    return {
      complexity: highest,
      source: highest ? 'AUTO' : 'NONE',
      trace,
      reason: trace.length > 0 ? trace[trace.length - 1]?.reason : undefined,
    };
  }
}