/**
 * Types berkaitan Standard (OSHMS, QMS, EMS, ABMS, ISMS).
 * Rujuk docs/04-standards.md untuk definisi penuh setiap standard.
 */

/**
 * StandardCode — kod standard yang disokong sistem.
 *
 * Status pengiraan:
 * - OSHMS, QMS, EMS, ABMS → IAF MD 5 (siap)
 * - ISMS                  → ISO/IEC 27006 (TODO: data belum supply)
 *
 * Cara tambah standard baru:
 * 1. Tambah kod di sini
 * 2. Tambah entry dalam STANDARD_CODES
 * 3. Tambah table data dalam formula-engine
 * 4. Tambah seed dalam database
 * 5. Kemas kini docs/04-standards.md
 */
export type StandardCode = 'OSHMS' | 'QMS' | 'EMS' | 'ABMS' | 'ISMS';

/**
 * Senarai semua kod standard — untuk validation & iterasi.
 * Selaras dengan formula-engine/src/types.ts.
 */
export const STANDARD_CODES: readonly StandardCode[] = [
  'OSHMS',
  'QMS',
  'EMS',
  'ABMS',
  'ISMS',
] as const;

/**
 * Type guard — sahkan sama ada string ialah StandardCode yang sah.
 */
export function isStandardCode(value: unknown): value is StandardCode {
  return (
    typeof value === 'string' &&
    (STANDARD_CODES as readonly string[]).includes(value)
  );
}

/**
 * Metadata sesebuah standard.
 * Shared-only type — untuk UI/backend papar maklumat standard.
 */
export interface StandardMeta {
  /** Kod unik, cth: 'OSHMS' */
  readonly code: StandardCode;

  /** Nama penuh, cth: 'Occupational Health and Safety Management System' */
  readonly name: string;

  /** Versi standard, cth: 'ISO 45001:2018' */
  readonly version: string;

  /** Penerangan ringkas */
  readonly description: string;

  /** Bilangan mandays asas sebelum pelarasan */
  readonly baseMandays: number;

  /** Status aktif — standard lama boleh dinyahaktif tanpa buang rekod */
  readonly isActive: boolean;
}