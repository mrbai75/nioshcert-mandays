/**
 * Shared types untuk Formula Engine
 * NIOSHCert Mandays Calculation System
 */

// =============================================================================
// COMPLEXITY
// =============================================================================

export type ComplexityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'LIMITED';

export type StandardCode = 'OSHMS' | 'QMS' | 'EMS' | 'ABMS' | 'ISMS';

// =============================================================================
// TABLE
// =============================================================================

export interface MandaysRow {
  fteMin: number;
  fteMax: number | null;
  high?: number;
  medium?: number;
  low?: number;
  limited?: number;
  days?: number;
}

export interface SectorEntry {
  sector: string;
  complexity: ComplexityLevel;
  notes?: string;
}

export interface StandardMetadata {
  code: StandardCode;
  name: string;
  referenceDoc: string;
  effectiveDate: string;
  hasComplexity: boolean;
}

// =============================================================================
// BASE MD RESULT
// =============================================================================

export interface BaseMdResult {
  value: number | null;
  requiresManualInput: boolean;
  message?: string;
  referenceLastValue?: number;
  referenceLastRange?: { min: number; max: number };
  meta: {
    fte: number;
    complexity: ComplexityLevel;
    tableMaxFte: number;
    standardName: string;
  };
}

// =============================================================================
// CALCULATION (Orchestrator)
// =============================================================================

export type ApplicationType = 'NEW' | 'SURVEILLANCE' | 'RECERT';

export interface CalculationInput {
  standard: StandardCode;
  fte: number;
  sites?: number;
  isIntegrated?: boolean;
  applicationType: ApplicationType;
  complexity?: ComplexityLevel;
  abmsInput?: {
    cpiScore: number;
    sector?: string;
    hasRegulatoryAction: boolean;
  };
}

export interface CalculationResult {
  baseMd: number | null;
  requiresManualInput: boolean;
  effectiveMd: number | null;
  stage1Md: number | null;
  stage2Md: number | null;
  surveillanceMd: number | null;
  recertMd: number | null;
  meta: {
    standard: StandardCode;
    standardName: string;
    fte: number;
    complexity?: ComplexityLevel;
    applicationType: ApplicationType;
    calculatedAt: string;
    reference: string;
  };
  trace: TraceStep[];
  message?: string;
}

export interface TraceStep {
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'STAGE_SPLIT';
  description: string;
  formula?: string;
  input?: unknown;
  output?: unknown;
}