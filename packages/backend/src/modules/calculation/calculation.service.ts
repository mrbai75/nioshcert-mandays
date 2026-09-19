import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { FormulaService } from '../../formula/formula.service';
import { FteAdapter } from './adapters/fte.adapter';
import { ComplexityAdapter, ComplexityLevel } from './adapters/complexity.adapter';
import { CreateCalculationDto } from './dto/create-calculation.dto';

export interface StandardCalculation {
  standard: string;
  fte: number;
  complexity: ComplexityLevel | null;
  baseMd: number | null;
  effectiveMd: number | null;
  stage1Md: number | null;
  stage2Md: number | null;
  surveillanceMd: number | null;
  recertMd: number | null;
  requiresManualInput: boolean;
  trace: unknown[];
  meta: unknown;
}

export interface ImsReductionInfo {
  applied: boolean;
  suggestedReduction: number;
  actualReduction: number;
  source: 'AUTO' | 'OVERRIDE' | 'NONE';
  breakdown: {
    manualIntegrated: boolean;
    policyIntegrated: boolean;
    internalAuditIntegrated: boolean;
    score: number;
    maxScore: number;
  };
  rawTotalMd: number;
  finalTotalMd: number;
  reductionMinMd: number;
  reductionMaxMd: number;
}

const MAX_IMS_REDUCTION = 0.20;

@Injectable()
export class CalculationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly formulaService: FormulaService,
    private readonly fteAdapter: FteAdapter,
    private readonly complexityAdapter: ComplexityAdapter,
  ) {}

  async create(dto: CreateCalculationDto): Promise<{
    fte: number;
    fteFormula: string;
    standards: StandardCalculation[];
    totalEffectiveMd: number;
    applicationType: string;
    isIms: boolean;
    ims?: ImsReductionInfo;
  }> {
    if (!dto.standards || dto.standards.length === 0) {
      throw new BadRequestException('At least one standard is required');
    }

    const codes = dto.standards.map((s) => s.trim().toUpperCase());
    const appType = dto.applicationType ?? 'NEW';
    const isIms = codes.length > 1;

    // 1. Kira FTE
    const fteResult = this.fteAdapter.calculate(dto.answers);

    // 2. Kira setiap standard
    const results: StandardCalculation[] = [];

    for (const code of codes) {
      const standard = await this.prisma.client.standard.findFirst({
        where: { code, isActive: true },
        orderBy: { effectiveDate: 'desc' },
      });

      if (!standard) {
        throw new NotFoundException(`Standard "${code}" not found`);
      }

      let complexity: ComplexityLevel | null = null;

      if (dto.complexityOverride && code === codes[0]) {
        complexity = dto.complexityOverride.toUpperCase() as ComplexityLevel;
      } else {
        const detected = await this.complexityAdapter.detect(code, dto.answers);
        complexity = detected.complexity;
      }

      const input = {
        standard: code as any,
        fte: fteResult.fte,
        applicationType: appType,
        complexity: complexity ?? undefined,
      };

      let calculation: any;
      try {
        calculation = this.formulaService.engine.calculate(input);
      } catch (err) {
        results.push({
          standard: code,
          fte: fteResult.fte,
          complexity,
          baseMd: null,
          effectiveMd: null,
          stage1Md: null,
          stage2Md: null,
          surveillanceMd: null,
          recertMd: null,
          requiresManualInput: true,
          trace: [],
          meta: { error: (err as Error).message },
        });
        continue;
      }

      results.push({
        standard: code,
        fte: fteResult.fte,
        complexity,
        baseMd: calculation.baseMd,
        effectiveMd: calculation.effectiveMd,
        stage1Md: calculation.stage1Md,
        stage2Md: calculation.stage2Md,
        surveillanceMd: calculation.surveillanceMd,
        recertMd: calculation.recertMd,
        requiresManualInput: calculation.requiresManualInput,
        trace: calculation.trace ?? [],
        meta: calculation.meta,
      });
    }

    // 3. Single standard — total = effectiveMd
    if (!isIms) {
      const totalEffectiveMd = results.reduce(
        (sum, r) => sum + (r.effectiveMd ?? 0),
        0,
      );
      return {
        fte: fteResult.fte,
        fteFormula: fteResult.formula,
        standards: results,
        totalEffectiveMd,
        applicationType: appType,
        isIms: false,
      };
    }

    // 4. IMS — kira reduction
    const suggested = this.calculateSuggestedReduction(dto.answers);
    const actualReduction =
      dto.imsReduction !== undefined
        ? Math.max(0, Math.min(MAX_IMS_REDUCTION, dto.imsReduction))
        : suggested.reduction;
    const source: 'AUTO' | 'OVERRIDE' =
      dto.imsReduction !== undefined ? 'OVERRIDE' : 'AUTO';

    const rawTotalMd = results.reduce(
      (sum, r) => sum + (r.effectiveMd ?? 0),
      0,
    );
    const finalTotalMd = rawTotalMd * (1 - actualReduction);

    return {
      fte: fteResult.fte,
      fteFormula: fteResult.formula,
      standards: results,
      totalEffectiveMd: finalTotalMd,
      applicationType: appType,
      isIms: true,
      ims: {
        applied: true,
        suggestedReduction: suggested.reduction,
        actualReduction,
        source,
        breakdown: suggested.breakdown,
        rawTotalMd,
        finalTotalMd,
        reductionMinMd: rawTotalMd * (1 - MAX_IMS_REDUCTION),
        reductionMaxMd: rawTotalMd * (1 - 0),
      },
    };
  }

  /**
   * Skor integrasi → suggested reduction
   * ⚠️ ANDAAN — perlu sahkan NIOSHCert
   */
  private calculateSuggestedReduction(answers: Record<string, unknown>): {
    reduction: number;
    breakdown: {
      manualIntegrated: boolean;
      policyIntegrated: boolean;
      internalAuditIntegrated: boolean;
      score: number;
      maxScore: number;
    };
  } {
    const manualIntegrated = answers['manual_integrated'] === true;
    const policyIntegrated = answers['policy_integrated'] === true;
    const internalAuditIntegrated = answers['internal_audit_integrated'] === true;

    let score = 0;
    if (manualIntegrated) score++;
    if (policyIntegrated) score++;
    if (internalAuditIntegrated) score++;

    // ⚠️ ANDAAN — perlu sahkan NIOSHCert
    const MAP: Record<number, number> = {
      0: 0.0,
      1: 0.05,
      2: 0.12,
      3: 0.2,
    };

    return {
      reduction: MAP[score] ?? 0,
      breakdown: {
        manualIntegrated,
        policyIntegrated,
        internalAuditIntegrated,
        score,
        maxScore: 3,
      },
    };
  }
}