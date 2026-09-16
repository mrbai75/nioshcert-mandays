/**
 * Barrel export untuk semua types.
 * Guna: import { StandardCode, ComplexityLevel } from '@sambung/shared';
 */

// =============================================================================
// STANDARD
// =============================================================================

export type { StandardCode, StandardMeta } from './standard.js';
export { STANDARD_CODES, isStandardCode } from './standard.js';

// =============================================================================
// COMPLEXITY
// =============================================================================

export type {
  ComplexityLevel,
  ComplexityFactor,
  ComplexityInput,
  ComplexityResult,
} from './complexity.js';
export { COMPLEXITY_LEVELS, isComplexityLevel } from './complexity.js';

// =============================================================================
// CALCULATION
// =============================================================================

export type {
  ApplicationType,
  AbmsInput,
  CalculationInput,
  CalculationResult,
  CalculationMeta,
  TraceStep,
  BaseMdResult,
} from './calculation.js';
export { APPLICATION_TYPES, isApplicationType } from './calculation.js';

// =============================================================================
// QUESTIONNAIRE
// =============================================================================

export type {
  QuestionType,
  QuestionOption,
  Question,
  QuestionDependency,
  Answer,
  Questionnaire,
  QuestionnaireSubmission,
  ComplexityDetectionResult,
} from './questionnaire.js';
export { QUESTION_TYPES, isQuestionType } from './questionnaire.js';

// =============================================================================
// API
// =============================================================================

export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  ListQueryParams,
  GetStandardsResponse,
  GetQuestionnaireRequest,
  GetQuestionnaireResponse,
  SubmitQuestionnaireRequest,
  SubmitQuestionnaireResponse,
  CalculateRequest,
  CalculateResponse,
  GetCalculationRequest,
  GetCalculationResponse,
  CalculationSummary,
  ListCalculationsResponse,
  ExportPdfRequest,
  ExportPdfResponse,
  HealthCheckResponse,
} from './api.js';