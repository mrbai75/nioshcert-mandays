import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { FteAdapter } from './adapters/fte.adapter';
import {
  ComplexityAdapter,
  ComplexityLevel,
} from './adapters/complexity.adapter';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { calculateIms, CalculationInput } from '@nioshcert/formula-engine';

// =============================================================================
// TYPES
// =============================================================================

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
  source: 'AUTO' | 'OVERRIDE';
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

export interface CalculationResponse {
  applicationId: string | null;
  calculationIds: string[];
  referenceNo: string | null;
  fte: number;
  fteFormula: string;
  standards: StandardCalculation[];
  totalEffectiveMd: number;
  applicationType: string;
  isIms: boolean;
  ims?: ImsReductionInfo;
}

// =============================================================================
// SERVICE
// =============================================================================

@Injectable()
export class CalculationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fteAdapter: FteAdapter,
    private readonly complexityAdapter: ComplexityAdapter,
  ) {}

  async create(dto: CreateCalculationDto): Promise<CalculationResponse> {
    if (!dto.standards || dto.standards.length === 0) {
      throw new BadRequestException('At least one standard is required');
    }

    const codes = dto.standards.map((s) => s.trim().toUpperCase());
    const appType = dto.applicationType ?? 'NEW';
    const isIms = codes.length > 1;

    // 0. Merge application.employees ke answers (kalau ada)
    const mergedAnswers = this.mergeApplicationIntoAnswers(dto);

    // 1. Kira FTE (backend adapter)
    const fteResult = this.fteAdapter.calculate(mergedAnswers);

    // 2. Tentukan complexity per standard (backend adapter)
    const standardInputs: CalculationInput[] = [];

    for (const code of codes) {
      const standard = await this.prisma.client.standard.findFirst({
        where: { code, isActive: true },
        orderBy: { effectiveDate: 'desc' },
      });

      if (!standard) {
        throw new NotFoundException(`Standard "${code}" not found`);
      }

      let complexity: ComplexityLevel | null = null;

      // Priority:
      // 1. complexities map (per standard)
      // 2. complexityOverride (single standard sahaja)
      // 3. Auto-detect dari answers
      if (dto.complexities && dto.complexities[code]) {
        complexity = dto.complexities[code].toUpperCase() as ComplexityLevel;
      } else if (dto.complexityOverride && code === codes[0]) {
        complexity = dto.complexityOverride.toUpperCase() as ComplexityLevel;
      } else {
        const detected = await this.complexityAdapter.detect(
          code,
          mergedAnswers,
        );
        complexity = detected.complexity;
      }

      standardInputs.push({
        standard: code as any,
        fte: fteResult.fte,
        applicationType: appType as any,
        complexity: complexity ?? undefined,
      });
    }

    // 3. Panggil engine — SEMUA calculation guna calculateIms()
    const suggested = this.calculateSuggestedReduction(mergedAnswers);

    const imsResult = calculateIms({
      standards: standardInputs,
      suggestedReduction: suggested.reduction,
      imsReduction: dto.imsReduction,
    });

    // 4. Map imsResult.individual → results[] (format backend)
    const results: StandardCalculation[] = imsResult.individual.map((item) => {
      const r = item.result;
      const meta = r.meta as any;

      return {
        standard: item.standard,
        fte: fteResult.fte,
        complexity: (meta.complexity ?? null) as ComplexityLevel | null,
        baseMd: r.baseMd,
        effectiveMd: r.effectiveMd,
        stage1Md: r.stage1Md,
        stage2Md: r.stage2Md,
        surveillanceMd: r.surveillanceMd,
        recertMd: r.recertMd,
        requiresManualInput: r.requiresManualInput,
        trace: r.trace ?? [],
        meta: r.meta,
      };
    });

    // 5. Total MD (dari engine)
    const totalEffectiveMd = imsResult.finalTotalMd;

    // 6. IMS info (kalau isIms)
    let ims: ImsReductionInfo | undefined;
    if (isIms) {
      ims = {
        applied: true,
        suggestedReduction: imsResult.suggestedReduction,
        actualReduction: imsResult.imsReduction,
        source: imsResult.imsReductionSource,
        breakdown: suggested.breakdown,
        rawTotalMd: imsResult.rawTotalMd,
        finalTotalMd: imsResult.finalTotalMd,
        reductionMinMd: imsResult.reductionMinMd,
        reductionMaxMd: imsResult.reductionMaxMd,
      };
    }

    // 7. Save DB (kalau ada application info)
    let applicationId: string | null = null;
    let referenceNo: string | null = null;
    const calculationIds: string[] = [];

    if (dto.application && dto.application.company?.name) {
      const saved = await this.saveToDatabase(
        dto,
        codes,
        fteResult.fte,
        results,
        totalEffectiveMd,
        appType,
        isIms,
      );
      applicationId = saved.applicationId;
      referenceNo = saved.referenceNo;
      calculationIds.push(...saved.calculationIds);
    }

    return {
      applicationId,
      calculationIds,
      referenceNo,
      fte: fteResult.fte,
      fteFormula: fteResult.formula,
      standards: results,
      totalEffectiveMd,
      applicationType: appType,
      isIms,
      ims,
    };
  }

  // ===========================================================================
  // SAVE TO DATABASE
  // ===========================================================================

  private async saveToDatabase(
    dto: CreateCalculationDto,
    codes: string[],
    fte: number,
    results: StandardCalculation[],
    totalEffectiveMd: number,
    appType: string,
    isIms: boolean,
  ): Promise<{
    applicationId: string;
    referenceNo: string;
    calculationIds: string[];
  }> {
    const app = dto.application!;
    const company = app.company;

    // 1. Upsert Client (by name)
    const clientCode = this.generateClientCode(company.name);

    let client = await this.prisma.client.client.findFirst({
      where: { name: company.name, deletedAt: null },
    });

    if (!client) {
      client = await this.prisma.client.client.create({
        data: {
          code: clientCode,
          name: company.name,
          address: company.address ?? null,
          legalStatus: company.legalStatus ?? null,
          orgType: company.orgType ?? null,
          isBumiputera: company.isBumiputera ?? false,
          contactName: app.pic?.name ?? null,
          contactDesignation: app.pic?.designation ?? null,
          contactPhone: app.pic?.phone ?? null,
          contactEmail: app.pic?.email ?? null,
        },
      });
    }

    // 2. Create Application
    const referenceNo = this.generateReferenceNo();
    const now = new Date();

    const application = await this.prisma.client.application.create({
      data: {
        referenceNo,
        clientId: client.id,
        applicationType: appType,
        certificationType: isIms ? 'INTEGRATED' : 'SINGLE',
        totalFte: Math.round(fte),
        industryType: app.industryType ?? null,
        fteBreakdown: app.employees
          ? {
              total: app.employees.total ?? 0,
              management: app.employees.management ?? 0,
              permanent: app.employees.permanent ?? 0,
              contract: app.employees.contract ?? 0,
              repetitive: app.employees.repetitive ?? 0,
            }
          : undefined,
        questionnaire: (dto.answers as any) ?? undefined,
        clientSnapshot: (app as any) ?? undefined,
        status: 'SUBMITTED',
        submittedAt: now,
        submittedBy: app.pic?.email ?? null,
      },
    });

    // 3. Create ApplicationStandard + Calculation per standard
    const calculationIds: string[] = [];

    for (let i = 0; i < codes.length; i++) {
      const code = codes[i]!;
      const result = results[i]!;

      const standard = await this.prisma.client.standard.findFirst({
        where: { code, isActive: true },
        orderBy: { effectiveDate: 'desc' },
      });

      if (!standard) continue;

      const appStandard = await this.prisma.client.applicationStandard.create({
        data: {
          applicationId: application.id,
          standardId: standard.id,
          complexityLevel: result.complexity,
          complexitySource: result.complexity ? 'AUTO' : null,
          isIntegrated: isIms,
          status: 'PENDING',
        },
      });

      const calcRefNo = this.generateCalculationRefNo();

      const calculation = await this.prisma.client.calculation.create({
        data: {
          referenceNo: calcRefNo,
          applicationId: application.id,
          applicationStandardId: appStandard.id,
          standardCode: code,
          fte: Math.round(fte),
          complexity: result.complexity,
          defaultBaseMd: result.baseMd,
          defaultEffectiveMd: result.effectiveMd,
          defaultOutput: {
            stage1Md: result.stage1Md,
            stage2Md: result.stage2Md,
            surveillanceMd: result.surveillanceMd,
            recertMd: result.recertMd,
            requiresManualInput: result.requiresManualInput,
          },
          defaultTrace: (result.trace as any) ?? [],
          finalBaseMd: result.baseMd,
          finalEffectiveMd: result.effectiveMd,
          finalStage1Md: result.stage1Md,
          finalStage2Md: result.stage2Md,
          finalSurveillanceMd: result.surveillanceMd,
          finalRecertMd: result.recertMd,
          createdBy: app.pic?.email ?? null,
        },
      });

      calculationIds.push(calculation.id);
    }

    return {
      applicationId: application.id,
      referenceNo,
      calculationIds,
    };
  }

  // ===========================================================================
  // MERGE — application.employees → answers
  // ===========================================================================

  private mergeApplicationIntoAnswers(
    dto: CreateCalculationDto,
  ): Record<string, unknown> {
    const merged: Record<string, unknown> = { ...dto.answers };

    if (dto.application?.employees) {
      const emp = dto.application.employees;

      if (emp.management !== undefined) {
        merged['management_count'] = emp.management;
      }
      if (emp.permanent !== undefined) {
        merged['permanent_count'] = emp.permanent;
      }
      if (emp.contract !== undefined) {
        merged['contract_count'] = emp.contract;
      }
      if (emp.repetitive !== undefined) {
        merged['repetitive_count'] = emp.repetitive;
      }
    }

    return merged;
  }

  // ===========================================================================
  // IMS REDUCTION — suggested (dari questionnaire answers)
  // ===========================================================================

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
    const internalAuditIntegrated =
      answers['internal_audit_integrated'] === true;

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

  // ===========================================================================
  // HELPERS — Generate codes
  // ===========================================================================

  private generateClientCode(name: string): string {
    const slug = name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6);
    const suffix = Date.now().toString(36).toUpperCase().slice(-4);
    return `CLI-${slug}-${suffix}`;
  }

  private generateReferenceNo(): string {
    const year = new Date().getFullYear();
    const rand = Math.random().toString(36).toUpperCase().slice(2, 8);
    return `APP-${year}-${rand}`;
  }

  private generateCalculationRefNo(): string {
    const year = new Date().getFullYear();
    const rand = Math.random().toString(36).toUpperCase().slice(2, 8);
    return `CALC-${year}-${rand}`;
  }
}
