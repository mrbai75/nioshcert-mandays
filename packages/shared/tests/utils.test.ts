/**
 * Unit test untuk utils (rounding, validation, format).
 */

import { describe, it, expect } from 'vitest';

import {
  // Rounding
  capCeil,
  roundToNearestHalf,
  roundTo2,
  roundToInt,
  capCeilWithDetail,
  isValidNumber,
  isPositiveNumber,
  isNonNegativeNumber,
  // Validation
  validateFte,
  validateSites,
  validateCpiScore,
  validateStandard,
  validateComplexity,
  validateApplicationType,
  validateAbmsInput,
  validateCalculationInput,
  formatValidationErrors,
  // Format
  formatMandays,
  formatNumber,
  formatMandaysRange,
  formatComplexity,
  formatComplexityFull,
  formatApplicationType,
  formatDate,
  formatFte,
  formatFteRange,
  formatCpiScore,
  formatSites,
  formatPercent,
  // Constants
  MAX_FTE,
} from '../src/index.js';

// =============================================================================
// ROUNDING
// =============================================================================

describe('rounding', () => {
  describe('capCeil', () => {
    it('rounds up to nearest integer', () => {
      expect(capCeil(3.0)).toBe(3);
      expect(capCeil(3.1)).toBe(4);
      expect(capCeil(3.5)).toBe(4);
      expect(capCeil(3.9)).toBe(4);
    });

    it('throws on invalid input', () => {
      expect(() => capCeil(NaN)).toThrow();
      expect(() => capCeil(Infinity)).toThrow();
    });
  });

  describe('roundToNearestHalf', () => {
    it('rounds to nearest 0.5', () => {
      expect(roundToNearestHalf(5.2)).toBe(5.0);
      expect(roundToNearestHalf(5.3)).toBe(5.5);
      expect(roundToNearestHalf(5.7)).toBe(5.5);
      expect(roundToNearestHalf(5.8)).toBe(6.0);
    });
  });

  describe('roundTo2', () => {
    it('rounds to 2 decimals', () => {
      expect(roundTo2(3.14159)).toBe(3.14);
      expect(roundTo2(3.145)).toBe(3.15);
    });
  });

  describe('roundToInt', () => {
    it('rounds to nearest integer', () => {
      expect(roundToInt(3.4)).toBe(3);
      expect(roundToInt(3.5)).toBe(4);
      expect(roundToInt(3.6)).toBe(4);
    });
  });

  describe('capCeilWithDetail', () => {
    it('returns detail with delta', () => {
      const result = capCeilWithDetail(3.5);
      expect(result.original).toBe(3.5);
      expect(result.rounded).toBe(4);
      expect(result.changed).toBe(true);
      expect(result.delta).toBe(0.5);
    });

    it('marks unchanged when already integer', () => {
      const result = capCeilWithDetail(3.0);
      expect(result.changed).toBe(false);
      expect(result.delta).toBe(0);
    });
  });

  describe('number guards', () => {
    it('isValidNumber', () => {
      expect(isValidNumber(3)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('3')).toBe(false);
    });

    it('isPositiveNumber', () => {
      expect(isPositiveNumber(3)).toBe(true);
      expect(isPositiveNumber(0)).toBe(false);
      expect(isPositiveNumber(-1)).toBe(false);
    });

    it('isNonNegativeNumber', () => {
      expect(isNonNegativeNumber(3)).toBe(true);
      expect(isNonNegativeNumber(0)).toBe(true);
      expect(isNonNegativeNumber(-1)).toBe(false);
    });
  });
});

// =============================================================================
// VALIDATION
// =============================================================================

describe('validation', () => {
  describe('validateFte', () => {
    it('accepts valid FTE', () => {
      expect(validateFte(100).valid).toBe(true);
      expect(validateFte(1).valid).toBe(true);
      expect(validateFte(MAX_FTE).valid).toBe(true);
    });

    it('rejects FTE below minimum', () => {
      const result = validateFte(0);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('BELOW_MIN');
    });

    it('rejects FTE above maximum', () => {
      const result = validateFte(MAX_FTE + 1);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('ABOVE_MAX');
    });

    it('rejects non-number', () => {
      const result = validateFte('100');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_TYPE');
    });
  });

  describe('validateSites', () => {
    it('accepts undefined (optional)', () => {
      expect(validateSites(undefined).valid).toBe(true);
    });

    it('accepts valid integer', () => {
      expect(validateSites(5).valid).toBe(true);
    });

    it('rejects non-integer', () => {
      const result = validateSites(3.5);
      expect(result.valid).toBe(false);
    });

    it('rejects zero', () => {
      const result = validateSites(0);
      expect(result.valid).toBe(false);
    });
  });

  describe('validateCpiScore', () => {
    it('accepts valid range', () => {
      expect(validateCpiScore(0).valid).toBe(true);
      expect(validateCpiScore(50).valid).toBe(true);
      expect(validateCpiScore(100).valid).toBe(true);
    });

    it('rejects out of range', () => {
      expect(validateCpiScore(-1).valid).toBe(false);
      expect(validateCpiScore(101).valid).toBe(false);
    });
  });

  describe('validateStandard', () => {
    it('accepts valid codes', () => {
      expect(validateStandard('OSHMS').valid).toBe(true);
      expect(validateStandard('QMS').valid).toBe(true);
      expect(validateStandard('EMS').valid).toBe(true);
      expect(validateStandard('ABMS').valid).toBe(true);
      expect(validateStandard('ISMS').valid).toBe(true);
    });

    it('rejects invalid code', () => {
      expect(validateStandard('INVALID').valid).toBe(false);
    });
  });

  describe('validateComplexity', () => {
    it('accepts valid levels', () => {
      expect(validateComplexity('HIGH').valid).toBe(true);
      expect(validateComplexity('MEDIUM').valid).toBe(true);
      expect(validateComplexity('LOW').valid).toBe(true);
      expect(validateComplexity('LIMITED').valid).toBe(true);
    });

    it('accepts undefined (optional)', () => {
      expect(validateComplexity(undefined).valid).toBe(true);
    });

    it('rejects invalid level', () => {
      expect(validateComplexity('INVALID').valid).toBe(false);
    });
  });

  describe('validateApplicationType', () => {
    it('accepts valid types', () => {
      expect(validateApplicationType('NEW').valid).toBe(true);
      expect(validateApplicationType('SURVEILLANCE').valid).toBe(true);
      expect(validateApplicationType('RECERT').valid).toBe(true);
    });

    it('rejects invalid type', () => {
      expect(validateApplicationType('INVALID').valid).toBe(false);
    });
  });

  describe('validateAbmsInput', () => {
    it('accepts valid ABMS input', () => {
      const result = validateAbmsInput({
        cpiScore: 25,
        hasRegulatoryAction: false,
      });
      expect(result.valid).toBe(true);
    });

    it('rejects missing hasRegulatoryAction', () => {
      const result = validateAbmsInput({ cpiScore: 25 });
      expect(result.valid).toBe(false);
    });

    it('rejects invalid CPI', () => {
      const result = validateAbmsInput({
        cpiScore: 200,
        hasRegulatoryAction: false,
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('validateCalculationInput', () => {
    it('accepts valid input', () => {
      const result = validateCalculationInput({
        standard: 'OSHMS',
        fte: 100,
        applicationType: 'NEW',
      });
      expect(result.valid).toBe(true);
    });

    it('rejects input with invalid FTE', () => {
      const result = validateCalculationInput({
        standard: 'OSHMS',
        fte: -1,
        applicationType: 'NEW',
      });
      expect(result.valid).toBe(false);
    });

    it('requires ABMS input when standard is ABMS', () => {
      const result = validateCalculationInput({
        standard: 'ABMS',
        fte: 100,
        applicationType: 'NEW',
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('formatValidationErrors', () => {
    it('formats errors as string', () => {
      const result = validateFte(-1);
      const formatted = formatValidationErrors(result);
      expect(formatted).toContain('fte');
      expect(formatted).toContain('must be at least');
    });
  });
});

// =============================================================================
// FORMAT
// =============================================================================

describe('format', () => {
  describe('formatMandays', () => {
    it('formats single day', () => {
      expect(formatMandays(1)).toBe('1 day');
    });

    it('formats multiple days', () => {
      expect(formatMandays(2.5)).toBe('2.5 days');
      expect(formatMandays(3)).toBe('3 days');
    });

    it('handles null', () => {
      expect(formatMandays(null)).toBe('N/A');
    });
  });

  describe('formatNumber', () => {
    it('removes trailing zeros', () => {
      expect(formatNumber(3.0)).toBe('3');
      expect(formatNumber(2.5)).toBe('2.5');
      expect(formatNumber(3.14)).toBe('3.14');
    });
  });

  describe('formatMandaysRange', () => {
    it('formats range', () => {
      expect(formatMandaysRange(3, 5)).toBe('3 days – 5 days');
    });

    it('formats open-ended range', () => {
      expect(formatMandaysRange(3, null)).toBe('≥ 3 days');
    });

    it('handles null/null', () => {
      expect(formatMandaysRange(null, null)).toBe('N/A');
    });
  });

  describe('formatComplexity', () => {
    it('title-cases levels', () => {
      expect(formatComplexity('HIGH')).toBe('High');
      expect(formatComplexity('LIMITED')).toBe('Limited');
    });
  });

  describe('formatComplexityFull', () => {
    it('adds "Complexity" suffix', () => {
      expect(formatComplexityFull('HIGH')).toBe('High Complexity');
    });
  });

  describe('formatApplicationType', () => {
    it('formats each type', () => {
      expect(formatApplicationType('NEW')).toBe('New Application');
      expect(formatApplicationType('SURVEILLANCE')).toBe('Surveillance');
      expect(formatApplicationType('RECERT')).toBe('Recertification');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date', () => {
      expect(formatDate('2026-09-16T08:00:00Z')).toBe('16 Sep 2026');
    });

    it('handles invalid date', () => {
      expect(formatDate('invalid')).toBe('N/A');
    });
  });

  describe('formatFte', () => {
    it('adds thousand separator', () => {
      expect(formatFte(1000)).toBe('1,000');
      expect(formatFte(10700)).toBe('10,700');
    });
  });

  describe('formatFteRange', () => {
    it('formats range', () => {
      expect(formatFteRange(1, 5)).toBe('1 – 5');
    });

    it('formats open-ended', () => {
      expect(formatFteRange(876, null)).toBe('876+');
    });
  });

  describe('formatCpiScore', () => {
    it('formats with complexity label', () => {
      expect(formatCpiScore(25)).toBe('CPI 25 (High)');
      expect(formatCpiScore(45)).toBe('CPI 45 (Medium)');
      expect(formatCpiScore(75)).toBe('CPI 75 (Low)');
    });
  });

  describe('formatSites', () => {
    it('formats singular', () => {
      expect(formatSites(1)).toBe('1 site');
    });

    it('formats plural', () => {
      expect(formatSites(5)).toBe('5 sites');
    });
  });

  describe('formatPercent', () => {
    it('formats decimal as percent', () => {
      expect(formatPercent(0.2)).toBe('20%');
      expect(formatPercent(0.15)).toBe('15%');
    });
  });
});