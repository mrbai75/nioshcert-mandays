// API client â€” wrapper fetch untuk backend NestJS
// Base URL: proxy /api -> http://localhost:3001 (lihat vite.config.ts)

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    let details: unknown;

    try {
      const body = await response.json();
      message = body.message ?? body.error ?? message;
      details = body;
    } catch {
      message = response.statusText || message;
    }

    throw new ApiClientError(response.status, message, details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// =============================================================================
// TYPES — Calculation
// =============================================================================

export interface StandardCalculation {
  standard: string;
  fte: number;
  complexity: string | null;
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

export interface ApiCalculationResponse {
  success: boolean;
  data: CalculationResponse;
}

// =============================================================================
// API
// =============================================================================

export const api = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse<T>(response);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  /**
   * Kira mandays + save ke DB (kalau ada application).
   *
   * POST /api/calculations
   */
  async calculateMandays(payload: {
    standards: string[];
    answers: Record<string, unknown>;
    applicationType?: 'NEW' | 'SURVEILLANCE' | 'RECERT';
    complexityOverride?: string;
    complexities?: Record<string, string>;
    imsReduction?: number;
    application?: {
      company: { name: string; address?: string; legalStatus?: string; orgType?: string; isBumiputera?: boolean };
      pic?: { name?: string; designation?: string; phone?: string; email?: string };
      employees?: { total?: number; management?: number; permanent?: number; contract?: number; repetitive?: number };
      scopeIndustry?: { scope?: string; industryType?: string; includeSites?: boolean; sitesCount?: number };
      documentation?: {
        established?: boolean;
        type?: string;
        manualIntegrated?: boolean;
        policyIntegrated?: boolean;
        internalAuditIntegrated?: boolean;
      };
      certificationType?: 'SINGLE' | 'INTEGRATED';
      industryType?: string;
    };
  }): Promise<ApiCalculationResponse> {
    return this.post<ApiCalculationResponse>('/calculations', payload);
  },
};


