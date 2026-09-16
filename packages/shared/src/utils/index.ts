/**
 * Barrel export untuk semua utils.
 * Guna: import { capCeil, formatMandays } from '@nioshcert/shared';
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
  validateStandards,
  validateComplexity,
  validateComplexities,
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
} from './format.js';