# 04 — Standards Supported

**Last Updated:** 16 September 2026

---

## 1. 5 STANDARD YANG DISOKONG

| Standard | Jadual Rujukan | Complexity Criteria |
|---|---|---|
| OSHMS | IAF MD 5:2023, Table 1.1 | High / Medium / Low |
| QMS | IAF MD 5:2023, Table 2.1 | High / Medium / Low |
| EMS | IAF MD 5:2023, Table 3.1 | High / Medium / Low / Limited |
| ABMS | IAF MD 5:2023, Table 3.1 | CPI + Business Sector |
| ISMS | ISO/IEC 27006, Annex B | Business Factors + IT Factors |

---

## 2. NOTA PENTING

- Semua standard merujuk IAF MD 5:2023 kecuali ISMS (ISO/IEC 27006)
- ABMS menggunakan jadual EMS (Table 3.1) tetapi complexity ditentukan oleh CPI + business sector
- ISMS mempunyai adjustment factors (Table C.2, C.3, C.4) — bukan sekadar lookup

---

## 3. JADUAL PENUH

Jadual mandays penuh untuk setiap standard akan dimasukkan ke dalam code (TypeScript) semasa Fasa 1 — Formula Engine.

Lokasi code:
- `packages/formula-engine/src/standards/oshms.ts`
- `packages/formula-engine/src/standards/qms.ts`
- `packages/formula-engine/src/standards/ems.ts`
- `packages/formula-engine/src/standards/abms.ts`
- `packages/formula-engine/src/standards/isms.ts`

Dokumen markdown ini cuma untuk rujukan — bukan source of truth.

---
