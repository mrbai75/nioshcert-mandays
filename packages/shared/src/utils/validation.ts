/**
 * Utiliti validation untuk input calculation & questionnaire.
 *
 * Sumber:
 * - IAF MD 5:2023 — FTE, sites, complexity
 * - CAP 03-01 (R1) — CPI ranges, application types
 * - docs/06-database.md — field constraints
 */

import type { StandardCode } from '../types/standard.js';
import type { ComplexityLevel } from '../types/complexity.js';
import type {
  ApplicationType,
  AbmsInput,
  CalculationInput,
} from '../types/calculation.js';
import { STANDARD_CODES, isStandardCode } from '../types/standard.js';
import {
  COMPLEXITY_LEVELS,
  isComplexityLevel,
} from '../types/complexity.js';
import {
  APPLICATION_TYPES,
  isApplicationType,
} from '../types/calculation.js';
import {
  MAX_FTE,
  MIN_FTE,
  MIN_SITES,
  MAX_SITES,
  MIN_CPI_SCORE,
  MAX_CPI_SCORE,
} from '../constants/limits.js';

// =============================================================================
// VALIDATION RESULT
// =============================================================================

/**
 * Hasil validation.
 */
export interface ValidationResult {
  /** Sah? */
  readonly valid: boolean;

  /** Senarai error (kalau ada) */
  readonly errors: readonly ValidationError[];
}

/**
 * Satu error validation.
 */
export interface ValidationError {
  /** Field yang bermasalah */
  readonly field: string;

  /** Kod error */
  readonly code: string;

  /** Mesej error (English) */
  readonly message: string;
}

// =============================================================================
// BASIC VALIDATORS
// =============================================================================

/**
 * Sahkan FTE.
 */
export function validateFte(fte: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof fte !== 'number' || !Number.isFinite(fte)) {
    errors.push({
      field: 'fte',
      code: 'INVALID_TYPE',
      message: 'FTE must be a finite number.',
    });
    return { valid: false, errors };
  }

  if (fte < MIN_FTE) {
    errors.push({
      field: 'fte',
      code: 'BELOW_MIN',
      message: `FTE must be at least ${MIN_FTE}.`,
    });
  }

  if (fte > MAX_FTE) {
    errors.push({
      field: 'fte',
      code: 'ABOVE_MAX',
      message: `FTE exceeds table maximum (${MAX_FTE}). Case-by-case ATD input required.`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan bilangan sites.
 */
export function validateSites(sites: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (sites === undefined || sites === null) {
    return { valid: true, errors };
  }

  if (typeof sites !== 'number' || !Number.isInteger(sites)) {
    errors.push({
      field: 'sites',
      code: 'INVALID_TYPE',
      message: 'Sites must be an integer.',
    });
    return { valid: false, errors };
  }

  if (sites < MIN_SITES) {
    errors.push({
      field: 'sites',
      code: 'BELOW_MIN',
      message: `Sites must be at least ${MIN_SITES}.`,
    });
  }

  if (sites > MAX_SITES) {
    errors.push({
      field: 'sites',
      code: 'ABOVE_MAX',
      message: `Sites exceeds maximum (${MAX_SITES}).`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan CPI score (ABMS).
 */
export function validateCpiScore(cpi: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof cpi !== 'number' || !Number.isFinite(cpi)) {
    errors.push({
      field: 'cpiScore',
      code: 'INVALID_TYPE',
      message: 'CPI score must be a finite number.',
    });
    return { valid: false, errors };
  }

  if (cpi < MIN_CPI_SCORE || cpi > MAX_CPI_SCORE) {
    errors.push({
      field: 'cpiScore',
      code: 'OUT_OF_RANGE',
      message: `CPI score must be between ${MIN_CPI_SCORE} and ${MAX_CPI_SCORE}.`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan standard code.
 */
export function validateStandard(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isStandardCode(value)) {
    errors.push({
      field: 'standard',
      code: 'INVALID_STANDARD',
      message: `Standard must be one of: ${STANDARD_CODES.join(', ')}.`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan complexity level.
 */
export function validateComplexity(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    return { valid: true, errors };
  }

  if (!isComplexityLevel(value)) {
    errors.push({
      field: 'complexity',
      code: 'INVALID_COMPLEXITY',
      message: `Complexity must be one of: ${COMPLEXITY_LEVELS.join(', ')}.`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan application type.
 */
export function validateApplicationType(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isApplicationType(value)) {
    errors.push({
      field: 'applicationType',
      code: 'INVALID_APPLICATION_TYPE',
      message: `Application type must be one of: ${APPLICATION_TYPES.join(', ')}.`,
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sahkan ABMS input.
 */
export function validateAbmsInput(abms: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (abms === undefined || abms === null) {
    return { valid: true, errors };
  }

  if (typeof abms !== 'object') {
    errors.push({
      field: 'abmsInput',
      code: 'INVALID_TYPE',
      message: 'ABMS input must be an object.',
    });
    return { valid: false, errors };
  }

  const input = abms as Partial<AbmsInput>;

  // CPI score
  const cpiResult = validateCpiScore(input.cpiScore);
  errors.push(...cpiResult.errors);

  // hasRegulatoryAction
  if (typeof input.hasRegulatoryAction !== 'boolean') {
    errors.push({
      field: 'abmsInput.hasRegulatoryAction',
      code: 'INVALID_TYPE',
      message: 'hasRegulatoryAction must be a boolean.',
    });
  }

  return { valid: errors.length === 0, errors };
}

// =============================================================================
// CALCULATION INPUT VALIDATOR
// =============================================================================

/**
 * Sahkan `CalculationInput` penuh.
 * Gabungan semua validator di atas.
 */
export function validateCalculationInput(input: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof input !== 'object' || input === null) {
    return {
      valid: false,
      errors: [
        {
          field: 'input',
          code: 'INVALID_TYPE',
          message: 'Calculation input must be an object.',
        },
      ],
    };
  }

  const calc = input as Partial<CalculationInput>;

  // Standard
  errors.push(...validateStandard(calc.standard).errors);

  // FTE
  errors.push(...validateFte(calc.fte).errors);

  // Sites (optional)
  errors.push(...validateSites(calc.sites).errors);

  // Application type
  errors.push(...validateApplicationType(calc.applicationType).errors);

  // Complexity (optional)
  errors.push(...validateComplexity(calc.complexity).errors);

  // ABMS input — WAJIB kalau standard = ABMS
  if (calc.standard === 'ABMS') {
    if (calc.abmsInput === undefined || calc.abmsInput === null) {
      errors.push({
        field: 'abmsInput',
        code: 'REQUIRED',
        message: 'ABMS input is required when standard is ABMS.',
      });
    } else {
      errors.push(...validateAbmsInput(calc.abmsInput).errors);
    }
  }

  return { valid: errors.length === 0, errors };
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Lempar error kalau validation gagal.
 * Berguna untuk backend — fail fast.
 */
export function assertValid(result: ValidationResult): void {
  if (!result.valid) {
    const message = result.errors
      .map((e) => `${e.field}: ${e.message}`)
      .join('; ');
    throw new Error(`[validation] ${message}`);
  }
}

/**
 * Format errors jadi string tunggal.
 */
export function formatValidationErrors(result: ValidationResult): string {
  return result.errors.map((e) => `${e.field}: ${e.message}`).join('; ');
}