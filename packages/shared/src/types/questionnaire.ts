/**
 * Types berkaitan Questionnaire (dynamic ikut standard).
 * Rujuk docs/11-nioshcert-questions.md & docs/12-questionnaire-analysis.md.
 */

import type { StandardCode } from './standard.js';
import type { ComplexityLevel } from './complexity.js';

// =============================================================================
// QUESTION TYPE
// =============================================================================

/**
 * Jenis soalan dalam questionnaire.
 */
export type QuestionType =
  | 'text'      // input teks bebas
  | 'number'    // input nombor
  | 'select'    // pilih satu dari senarai
  | 'multiselect' // pilih banyak
  | 'boolean'   // ya / tidak
  | 'scale';    // skala (cth: 1–5)

/** Senarai semua question type — untuk validation & iterasi. */
export const QUESTION_TYPES: readonly QuestionType[] = [
  'text',
  'number',
  'select',
  'multiselect',
  'boolean',
  'scale',
] as const;

/** Type guard — sahkan sama ada string ialah QuestionType yang sah. */
export function isQuestionType(value: unknown): value is QuestionType {
  return (
    typeof value === 'string' &&
    (QUESTION_TYPES as readonly string[]).includes(value)
  );
}

// =============================================================================
// QUESTION OPTION
// =============================================================================

/**
 * Pilihan jawapan untuk soalan jenis `select` / `multiselect` / `scale`.
 */
export interface QuestionOption {
  /** Nilai unik pilihan */
  readonly value: string;

  /** Label yang dipaparkan pada UI */
  readonly label: string;

  /** Skor (optional) — untuk auto-detect complexity */
  readonly score?: number;

  /** Penerangan tambahan (optional) */
  readonly description?: string;
}

// =============================================================================
// QUESTION
// =============================================================================

/**
 * Satu soalan dalam questionnaire.
 */
export interface Question {
  /** ID unik soalan */
  readonly id: string;

  /** Kod soalan (untuk rujukan), cth: 'Q_EMPLOYEE_COUNT' */
  readonly code: string;

  /** Teks soalan */
  readonly text: string;

  /** Jenis soalan */
  readonly type: QuestionType;

  /** Pilihan jawapan (untuk select/multiselect/scale) */
  readonly options?: readonly QuestionOption[];

  /** Wajib jawab? */
  readonly required: boolean;

  /** Penerangan / bantuan (optional) */
  readonly helpText?: string;

  /** Nilai default (optional) */
  readonly defaultValue?: unknown;

  /** Bilangan minimum (untuk number) */
  readonly min?: number;

  /** Bilangan maksimum (untuk number) */
  readonly max?: number;

  /** Soalan ini untuk standard mana (optional) */
  readonly standardCode?: StandardCode;

  /** Kategori (untuk grouping dalam UI) */
  readonly category?: string;

  /** Faktor complexity yang disumbang (optional) */
  readonly complexityFactor?: string;

  /** Berat sumbangan kepada skor complexity (0–1) */
  readonly weight?: number;

  /** Tunjuk soalan hanya bila kondisi dipenuhi (conditional) */
  readonly dependsOn?: QuestionDependency;

  /** Susunan paparan */
  readonly order: number;
}

/**
 * Kebergantungan soalan — untuk conditional display.
 */
export interface QuestionDependency {
  /** ID soalan yang dirujuk */
  readonly questionId: string;

  /** Operator perbandingan */
  readonly operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'notIn';

  /** Nilai yang dibandingkan */
  readonly value: unknown;
}

// =============================================================================
// ANSWER
// =============================================================================

/**
 * Jawapan untuk satu soalan.
 */
export interface Answer {
  /** ID soalan yang dijawab */
  readonly questionId: string;

  /** Nilai jawapan */
  readonly value: unknown;

  /** Skor dikira (optional) */
  readonly score?: number;

  /** Masa jawab (ISO 8601, optional) */
  readonly answeredAt?: string;
}

// =============================================================================
// QUESTIONNAIRE
// =============================================================================

/**
 * Questionnaire penuh untuk satu standard.
 */
export interface Questionnaire {
  /** ID unik questionnaire */
  readonly id: string;

  /** Kod standard yang berkaitan */
  readonly standardCode: StandardCode;

  /** Tajuk questionnaire */
  readonly title: string;

  /** Penerangan (optional) */
  readonly description?: string;

  /** Senarai soalan */
  readonly questions: readonly Question[];

  /** Versi questionnaire (untuk versioning) */
  readonly version: string;

  /** Aktif? */
  readonly isActive: boolean;
}

/**
 * Jawapan penuh untuk satu questionnaire.
 * Dihantar dari frontend ke backend.
 */
export interface QuestionnaireSubmission {
  /** ID questionnaire */
  readonly questionnaireId: string;

  /** Kod standard */
  readonly standardCode: StandardCode;

  /** Senarai jawapan */
  readonly answers: readonly Answer[];

  /** Override complexity (optional) */
  readonly complexityOverride?: ComplexityLevel;

  /** Metadata tambahan (optional) */
  readonly metadata?: Record<string, unknown>;
}

// =============================================================================
// AUTO-DETECT COMPLEXITY
// =============================================================================

/**
 * Hasil auto-detect complexity dari jawapan questionnaire.
 */
export interface ComplexityDetectionResult {
  /** Level yang dikesan */
  readonly level: ComplexityLevel;

  /** Skor mentah */
  readonly score: number;

  /** Faktor yang menyumbang */
  readonly factors: readonly {
    readonly questionCode: string;
    readonly value: unknown;
    readonly score: number;
    readonly weight: number;
  }[];

  /** Sebab / nota */
  readonly reason: string;
}