/**
 * Barrel export untuk semua constants.
 * Guna: import { MAX_FTE, STANDARDS } from '@sambung/shared';
 */

// =============================================================================
// SECTORS
// =============================================================================

export type { SectorEntry } from './sectors.js';
export {
  SECTOR_COMPLEXITY,
  getSectorsByStandard,
  getComplexityForSector,
  getAllSectors,
} from './sectors.js';

// =============================================================================
// STANDARDS
// =============================================================================

export {
  STANDARDS,
  STANDARD_REFERENCES,
  STANDARD_VERSIONS,
  getStandardMeta,
  getStandardReference,
  getStandardVersion,
  getActiveStandards,
} from './standards.js';

// =============================================================================
// LIMITS
// =============================================================================

export {
  // FTE
  MAX_FTE,
  MIN_FTE,
  // CPI
  CPI_RANGES,
  MIN_CPI_SCORE,
  MAX_CPI_SCORE,
  // Sites
  MIN_SITES,
  MAX_SITES,
  // Application ratios
  APPLICATION_RATIOS,
  // Rounding
  ROUNDING_MODE,
  ROUNDING_STEP,
  // IMS
  IMS_MAX_REDUCTION,
  IMS_MIN_REDUCTION,
  // Audit time adjustments
  MAX_AUDIT_TIME_REDUCTION,
  MIN_ON_SITE_DURATION_RATIO,
  // ISMS
  ISMS_ADJUSTMENT_RANGES,
  // Defaults
  DEFAULT_COMPLEXITY,
  // Pagination
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  // Helpers
  isCpiInRange,
  cpiToComplexity,
} from './limits.js';