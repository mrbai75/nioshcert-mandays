/**
 * Public API untuk @nioshcert/shared.
 *
 * Guna:
 *   import { StandardCode, capCeil, STANDARDS } from '@nioshcert/shared';
 *
 * Semua types, constants, dan utils di-export dari sini.
 * Package lain TIDAK sepatutnya import dari sub-path (cth: '/types/standard.js').
 */

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Standard
  StandardCode,
  StandardMeta,
  // Complexity
  ComplexityLevel,
  ComplexityFactor,
  ComplexityInput,
  ComplexityResult,
  // Calculation
  ApplicationType,
  AbmsInput,
  CalculationInput,
  CalculationResult,
  CalculationMeta,
  TraceStep,
  BaseMdResult,
  // Questionnaire
  QuestionType,
  QuestionOption,
  Question,
  QuestionDependency,
  Answer,
  Questionnaire,
  QuestionnaireSubmission,
  ComplexityDetectionResult,
  // API
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
} from './types/index.js';

// =============================================================================
// TYPE GUARDS & VALUES FROM TYPES
// =============================================================================

export {
  STANDARD_CODES,
  isStandardCode,
  COMPLEXITY_LEVELS,
  isComplexityLevel,
  APPLICATION_TYPES,
  isApplicationType,
  QUESTION_TYPES,
  isQuestionType,
} from './types/index.js';

// =============================================================================
// CONSTANTS
// =============================================================================

export type { SectorEntry } from './constants/index.js';

export {
  // Sectors
  SECTOR_COMPLEXITY,
  getSectorsByStandard,
  getComplexityForSector,
  getAllSectors,
  // Standards
  STANDARDS,
  STANDARD_REFERENCES,
  STANDARD_VERSIONS,
  getStandardMeta,
  getStandardReference,
  getStandardVersion,
  getActiveStandards,
  // Limits
  MAX_FTE,
  MIN_FTE,
  CPI_RANGES,
  MIN_CPI_SCORE,
  MAX_CPI_SCORE,
  MIN_SITES,
  MAX_SITES,
  APPLICATION_RATIOS,
  ROUNDING_MODE,
  ROUNDING_STEP,
  IMS_MAX_REDUCTION,
  IMS_MIN_REDUCTION,
  MAX_AUDIT_TIME_REDUCTION,
  MIN_ON_SITE_DURATION_RATIO,
  ISMS_ADJUSTMENT_RANGES,
  DEFAULT_COMPLEXITY,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  isCpiInRange,
  cpiToComplexity,
} from './constants/index.js';

// =============================================================================
// UTILS
// =============================================================================

export type {
  RoundingDetail,
  ValidationResult,
  ValidationError,
} from './utils/index.js';

export {
  // Rounding
  capCeil,
  roundToNearestHalf,
  roundTo2,
  roundToInt,
  capCeilWithDetail,
  roundToNearestHalfWithDetail,
  isValidNumber,
  isPositiveNumber,
  isNonNegativeNumber,
  // Validation
  validateFte,
  validateSites,
  validateCpiScore,
  validateStandard,
  validateStandards,
  validateComplexity,
  validateComplexities,
  validateApplicationType,
  validateAbmsInput,
  validateCalculationInput,
  assertValid,
  formatValidationErrors,
  // Format
  formatMandays,
  formatNumber,
  formatMandaysRange,
  formatStandardName,
  formatStandardWithVersion,
  formatStandardShort,
  formatStandardsList,
  formatStandardsWithNames,
  formatIntegrationLabel,
  formatComplexity,
  formatComplexityFull,
  formatComplexitiesMap,
  formatApplicationType,
  formatDate,
  formatDateTime,
  formatFte,
  formatFteRange,
  formatCpiScore,
  formatSites,
  formatPercent,
} from './utils/index.js';