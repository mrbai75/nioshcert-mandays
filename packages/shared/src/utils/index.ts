/**
 * Barrel export untuk semua utils.
 * Guna: import { capCeil, formatMandays } from '@sambung/shared';
 */

// =============================================================================
// ROUNDING
// =============================================================================

export type { RoundingDetail } from './rounding.js';
export {
  capCeil,
  roundToNearestHalf,
  roundTo2,
  roundToInt,
  capCeilWithDetail,
  roundToNearestHalfWithDetail,
  isValidNumber,
  isPositiveNumber,
  isNonNegativeNumber,
} from './rounding.js';

// =============================================================================
// VALIDATION
// =============================================================================

export type { ValidationResult, ValidationError } from './validation.js';
export {
  validateFte,
  validateSites,
  validateCpiScore,
  validateStandard,
  validateComplexity,
  validateApplicationType,
  validateAbmsInput,
  validateCalculationInput,
  assertValid,
  formatValidationErrors,
} from './validation.js';

// =============================================================================
// FORMAT
// =============================================================================

export {
  formatMandays,
  formatNumber,
  formatMandaysRange,
  formatStandardName,
  formatStandardWithVersion,
  formatStandardShort,
  formatComplexity,
  formatComplexityFull,
  formatApplicationType,
  formatDate,
  formatDateTime,
  formatFte,
  formatFteRange,
  formatCpiScore,
  formatSites,
  formatPercent,
} from './format.js';