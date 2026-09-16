/**
 * Types berkaitan API (request & response DTO).
 * Dikongsi antara backend (NestJS) & frontend (React).
 * Rujuk docs/13-project-structure.md.
 */

import type { StandardCode } from './standard.js';
import type { CalculationInput, CalculationResult } from './calculation.js';
import type {
  Questionnaire,
  QuestionnaireSubmission,
} from './questionnaire.js';

// =============================================================================
// GENERIC RESPONSE WRAPPER
// =============================================================================

/**
 * Response standard dari API.
 * Semua endpoint akan return bentuk ini.
 */
export interface ApiResponse<T> {
  /** Berjaya? */
  readonly success: boolean;

  /** Data (kalau berjaya) */
  readonly data?: T;

  /** Mesej (optional) */
  readonly message?: string;

  /** Error (kalau gagal) */
  readonly error?: ApiError;
}

/**
 * Struktur error standard.
 */
export interface ApiError {
  /** Kod error, cth: 'VALIDATION_ERROR' */
  readonly code: string;

  /** Mesej error (English) */
  readonly message: string;

  /** Detail tambahan (optional) */
  readonly details?: unknown;
}

/**
 * Response berhalaman (pagination) untuk senarai.
 */
export interface PaginatedResponse<T> {
  /** Senarai item */
  readonly items: readonly T[];

  /** Jumlah keseluruhan */
  readonly total: number;

  /** Halaman semasa (1-indexed) */
  readonly page: number;

  /** Saiz halaman */
  readonly pageSize: number;

  /** Jumlah halaman */
  readonly totalPages: number;
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

/**
 * Query params untuk senarai (pagination + filter).
 */
export interface ListQueryParams {
  /** Halaman (default: 1) */
  readonly page?: number;

  /** Saiz halaman (default: 20) */
  readonly pageSize?: number;

  /** Cari (optional) */
  readonly search?: string;

  /** Susun ikut field (optional) */
  readonly sortBy?: string;

  /** Arah susun */
  readonly sortOrder?: 'asc' | 'desc';
}

// =============================================================================
// STANDARDS
// =============================================================================

/** Response senarai standard. */
export type GetStandardsResponse = ApiResponse<readonly StandardCode[]>;

// =============================================================================
// QUESTIONNAIRE
// =============================================================================

/**
 * Request untuk dapatkan questionnaire.
 */
export interface GetQuestionnaireRequest {
  /** Kod standard */
  readonly standardCode: StandardCode;
}

/** Response questionnaire. */
export type GetQuestionnaireResponse = ApiResponse<Questionnaire>;

/**
 * Request untuk hantar jawapan questionnaire.
 */
export interface SubmitQuestionnaireRequest {
  /** Jawapan penuh */
  readonly submission: QuestionnaireSubmission;
}

/** Response selepas hantar questionnaire. */
export type SubmitQuestionnaireResponse = ApiResponse<{
  readonly calculationId: string;
  readonly result: CalculationResult;
}>;

// =============================================================================
// CALCULATION
// =============================================================================

/**
 * Request untuk kira mandays.
 */
export interface CalculateRequest {
  /** Input pengiraan */
  readonly input: CalculationInput;
}

/** Response hasil pengiraan. */
export type CalculateResponse = ApiResponse<CalculationResult>;

/**
 * Request untuk dapatkan hasil pengiraan sedia ada.
 */
export interface GetCalculationRequest {
  /** ID pengiraan */
  readonly calculationId: string;
}

/** Response detail pengiraan. */
export type GetCalculationResponse = ApiResponse<CalculationResult>;

/**
 * Ringkasan pengiraan untuk senarai history.
 */
export interface CalculationSummary {
  /** ID pengiraan */
  readonly id: string;

  /** Standard */
  readonly standard: StandardCode;

  /** FTE */
  readonly fte: number;

  /** Effective mandays */
  readonly effectiveMd: number | null;

  /** Tarikh kira (ISO 8601) */
  readonly calculatedAt: string;
}

/** Response senarai history. */
export type ListCalculationsResponse = ApiResponse<
  PaginatedResponse<CalculationSummary>
>;

// =============================================================================
// EXPORT
// =============================================================================

/**
 * Request untuk export PDF.
 */
export interface ExportPdfRequest {
  /** ID pengiraan */
  readonly calculationId: string;
}

/**
 * Response export PDF.
 * Boleh return URL atau blob.
 */
export type ExportPdfResponse = ApiResponse<{
  readonly url: string;
  readonly expiresAt: string;
}>;

// =============================================================================
// HEALTH CHECK
// =============================================================================

/** Response health check. */
export type HealthCheckResponse = ApiResponse<{
  readonly status: 'ok' | 'degraded' | 'down';
  readonly uptime: number;
  readonly timestamp: string;
}>;