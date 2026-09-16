/**
 * Utiliti format untuk paparan UI.
 * Semua output English (ikut aturan bahasa sistem).
 */

import type { StandardCode } from '../types/standard.js';
import type { ComplexityLevel } from '../types/complexity.js';
import type { ApplicationType } from '../types/calculation.js';
import { STANDARDS } from '../constants/standards.js';

// =============================================================================
// MANDAYS / DAYS
// =============================================================================

/**
 * Format mandays dengan suffix "day" / "days".
 *
 * Contoh:
 *   1    → "1 day"
 *   2.5  → "2.5 days"
 *   0    → "0 days"
 */
export function formatMandays(value: number | null): string {
  if (value === null) return 'N/A';
  const unit = value === 1 ? 'day' : 'days';
  return `${formatNumber(value)} ${unit}`;
}

/**
 * Format nombor — buang trailing zeros.
 *
 * Contoh:
 *   3.0   → "3"
 *   2.5   → "2.5"
 *   3.14  → "3.14"
 *   3.145 → "3.15"
 */
export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return 'N/A';
  const fixed = value.toFixed(decimals);
  return fixed.replace(/\.?0+$/, '');
}

/**
 * Format mandays range (min – max).
 */
export function formatMandaysRange(
  min: number | null,
  max: number | null,
): string {
  if (min === null && max === null) return 'N/A';
  if (min === null) return `≤ ${formatMandays(max)}`;
  if (max === null) return `≥ ${formatMandays(min)}`;
  if (min === max) return formatMandays(min);
  return `${formatMandays(min)} – ${formatMandays(max)}`;
}

// =============================================================================
// STANDARD
// =============================================================================

/**
 * Format kod standard → nama penuh.
 *
 * Contoh:
 *   "OSHMS" → "Occupational Health and Safety Management System"
 */
export function formatStandardName(code: StandardCode): string {
  return STANDARDS[code]?.name ?? code;
}

/**
 * Format kod standard + versi.
 *
 * Contoh:
 *   "OSHMS" → "OSHMS (ISO 45001:2018)"
 */
export function formatStandardWithVersion(code: StandardCode): string {
  const meta = STANDARDS[code];
  if (!meta) return code;
  return `${code} (${meta.version})`;
}

/**
 * Format label standard ringkas (untuk chip / badge).
 */
export function formatStandardShort(code: StandardCode): string {
  return code;
}

// =============================================================================
// COMPLEXITY
// =============================================================================

/**
 * Format complexity level → label paparan.
 *
 * Contoh:
 *   "LIMITED" → "Limited"
 *   "HIGH"    → "High"
 */
export function formatComplexity(level: ComplexityLevel): string {
  const map: Record<ComplexityLevel, string> = {
    LIMITED: 'Limited',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
  };
  return map[level];
}

/**
 * Format complexity + label penuh.
 *
 * Contoh:
 *   "HIGH" → "High Complexity"
 */
export function formatComplexityFull(level: ComplexityLevel): string {
  return `${formatComplexity(level)} Complexity`;
}

// =============================================================================
// APPLICATION TYPE
// =============================================================================

/**
 * Format application type → label paparan.
 *
 * Contoh:
 *   "NEW"          → "New Application"
 *   "SURVEILLANCE" → "Surveillance"
 *   "RECERT"       → "Recertification"
 */
export function formatApplicationType(type: ApplicationType): string {
  const map: Record<ApplicationType, string> = {
    NEW: 'New Application',
    SURVEILLANCE: 'Surveillance',
    RECERT: 'Recertification',
  };
  return map[type];
}

// =============================================================================
// DATE / TIME
// =============================================================================

/**
 * Format ISO 8601 date → display format.
 *
 * Contoh:
 *   "2026-09-16T08:00:00Z" → "16 Sep 2026"
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'N/A';

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Format ISO 8601 date → date + time.
 *
 * Contoh:
 *   "2026-09-16T08:30:00Z" → "16 Sep 2026, 08:30"
 */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'N/A';

  const time = `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
  return `${formatDate(iso)}, ${time}`;
}

/**
 * Pad number ke 2 digit.
 */
function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

// =============================================================================
// FTE
// =============================================================================

/**
 * Format FTE dengan thousand separator.
 *
 * Contoh:
 *   1000    → "1,000"
 *   10700   → "10,700"
 */
export function formatFte(fte: number): string {
  return fte.toLocaleString('en-US');
}

/**
 * Format FTE range.
 *
 * Contoh:
 *   (1, 5)   → "1 – 5"
 *   (876, null) → "876+"
 */
export function formatFteRange(min: number, max: number | null): string {
  if (max === null) return `${formatFte(min)}+`;
  if (min === max) return formatFte(min);
  return `${formatFte(min)} – ${formatFte(max)}`;
}

// =============================================================================
// CPI
// =============================================================================

/**
 * Format CPI score + label.
 *
 * Contoh:
 *   25 → "CPI 25 (High)"
 *   45 → "CPI 45 (Medium)"
 *   75 → "CPI 75 (Low)"
 */
export function formatCpiScore(cpi: number): string {
  let label: ComplexityLevel;
  if (cpi <= 30) label = 'HIGH';
  else if (cpi <= 59) label = 'MEDIUM';
  else label = 'LOW';

  return `CPI ${cpi} (${formatComplexity(label)})`;
}

// =============================================================================
// SITES
// =============================================================================

/**
 * Format bilangan sites.
 *
 * Contoh:
 *   1 → "1 site"
 *   5 → "5 sites"
 */
export function formatSites(count: number): string {
  const unit = count === 1 ? 'site' : 'sites';
  return `${count} ${unit}`;
}

// =============================================================================
// PERCENTAGE
// =============================================================================

/**
 * Format decimal → percentage string.
 *
 * Contoh:
 *   0.2  → "20%"
 *   0.15 → "15%"
 */
export function formatPercent(decimal: number, decimals = 0): string {
  if (!Number.isFinite(decimal)) return 'N/A';
  return `${(decimal * 100).toFixed(decimals)}%`;
}