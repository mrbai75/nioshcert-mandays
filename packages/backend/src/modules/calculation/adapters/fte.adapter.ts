// FTE Adapter — tukar jawapan questionnaire jadi FTE number
import { Injectable } from '@nestjs/common';

export interface FteResult {
  fte: number;
  breakdown: Record<string, number>;
  formula: string;
}

// Roles default + weight (rujuk CAS 15-01 Q11-Q14)
const FTE_WEIGHTS: Record<string, number> = {
  management_count: 1.0,
  permanent_count: 1.0,
  contract_count: 0.5,
  repetitive_count: 1.0,
};

@Injectable()
export class FteAdapter {
  /**
   * Kira FTE dari jawapan questionnaire.
   * Formula (dari CR HYTRO):
   *   FTE = Management + Permanent + (Contract × 0.5) + Repetitive
   */
  calculate(answers: Record<string, unknown>): FteResult {
    const breakdown: Record<string, number> = {};
    const parts: string[] = [];
    let total = 0;

    for (const [key, weight] of Object.entries(FTE_WEIGHTS)) {
      const raw = answers[key];
      const value = typeof raw === 'number' ? raw : Number(raw) || 0;
      const contribution = value * weight;
      breakdown[key] = contribution;
      total += contribution;

      if (weight === 1.0) {
        parts.push(`${value}`);
      } else {
        parts.push(`(${value} × ${weight})`);
      }
    }

    const formula = `${parts.join(' + ')} = ${total}`;

    return {
      fte: Math.ceil(total),
      breakdown,
      formula,
    };
  }
}