/**
 * Test case: HYTRO VISTA SDN BHD (v1.0)
 *
 * Rujukan:
 * - Contract Review: NIOSHCERT/ATD/ABMS-HYTRO VISTA SDN BHD/26/288
 * - docs/05-example-case.md
 *
 * Standard: ISO 37001 (ABMS)
 */

import { describe, it, expect } from 'vitest';
import { calculate } from '../src/calculate';

describe('HYTRO VISTA - ABMS Case (v1.0)', () => {
  // Test 1: Sistem Cadang (Default - MEDIUM)
  it('Sistem cadang: MEDIUM (CPI 50 -> julat 31-59)', () => {
    const result = calculate({
      standard: 'ABMS',
      fte: 9,
      applicationType: 'NEW',
      abmsInput: {
        cpiScore: 50,
        sector: 'Construction Works and IT Infrastructure',
        hasRegulatoryAction: false,
      },
    });

    expect(result.meta.complexity).toBe('MEDIUM');
    expect(result.baseMd).toBe(3.0);
    expect(result.effectiveMd).toBe(3.0);
  });

  // Test 2: ATD Override ke HIGH
  it('ATD override: HIGH -> base 3.5, effective 4.0', () => {
    const result = calculate({
      standard: 'ABMS',
      fte: 9,
      applicationType: 'NEW',
      complexity: 'HIGH',
      abmsInput: {
        cpiScore: 50,
        sector: 'Construction Works and IT Infrastructure',
        hasRegulatoryAction: false,
      },
    });

    expect(result.meta.complexity).toBe('HIGH');
    expect(result.baseMd).toBe(3.5);
    expect(result.effectiveMd).toBe(4.0);
  });

  // Test 3: Verify Nilai CR HYTRO
  it('CR HYTRO: base 3.5, effective 4.0, surv 2.0, recert 3.0', () => {
    const result = calculate({
      standard: 'ABMS',
      fte: 9,
      applicationType: 'NEW',
      complexity: 'HIGH',
      abmsInput: {
        cpiScore: 50,
        sector: 'Construction Works and IT Infrastructure',
        hasRegulatoryAction: false,
      },
    });

    expect(result.baseMd).toBe(3.5);
    expect(result.effectiveMd).toBe(4.0);
    expect(result.surveillanceMd).toBe(2.0);
    expect(result.recertMd).toBe(3.0);
  });

  // Test 4: Stage Split Default (30:70)
  it('Stage split default: 30:70 -> 1.2 / 2.8', () => {
    const result = calculate({
      standard: 'ABMS',
      fte: 9,
      applicationType: 'NEW',
      complexity: 'HIGH',
      abmsInput: {
        cpiScore: 50,
        sector: 'Construction Works and IT Infrastructure',
        hasRegulatoryAction: false,
      },
    });

    expect(result.stage1Md).toBe(1.2);
    expect(result.stage2Md).toBe(2.8);
    expect(result.stage1Md! + result.stage2Md!).toBe(4.0);
  });
});