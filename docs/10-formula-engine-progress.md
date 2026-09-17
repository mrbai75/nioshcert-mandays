# 10 — Formula Engine Progress

**Last Updated:** 16 September 2026
**Version:** 2.0
**Status:** SIAP — Formula Engine 4 standard berfungsi

---

## 1. OVERVIEW

Formula Engine adalah otak sistem — logik pengiraan mandays untuk 4 standard ISO (OSHMS, QMS, EMS, ABMS).

**Lokasi:** `packages/formula-engine/`

**Status:** SIAP + tested

---

## 2. STRUKTUR FOLDER
packages/formula-engine/
package.json
tsconfig.json
vitest.config.ts
src/
index.ts - Public API
types.ts - Types
calculate.ts - Orchestrator (TIER 1+2+3)
formulas/
base.ts - TIER 1 (lookup)
adjustment.ts - TIER 2 (rounding)
derived.ts - TIER 3 (surveillance, recert, stage split)
standards/
index.ts - Barrel export
oshms.ts - OSHMS standard
qms.ts - QMS standard
ems.ts - EMS standard
abms.ts - ABMS standard
tests/
hytro-vista.test.ts - HYTRO VISTA test (4/4 PASS)

text

---

## 3. FORMULA 3-TIER

| Tier | Formula | File |
|---|---|---|
| TIER 1 | Base MD lookup | `formulas/base.ts` |
| TIER 2 | `ceil(baseMd)` | `formulas/adjustment.ts` |
| TIER 3 | `ceil(1/3 × effective)`, `ceil(2/3 × effective)` | `formulas/derived.ts` |
| Stage Split | Default 30:70 | `formulas/derived.ts` |

**Formula lengkap:**
Input → TIER 1 (base) → TIER 2 (effective) → TIER 3 (derived) → Output

text

---

## 4. STANDARD YANG SIAP

### 4.1 OSHMS

| Item | Value |
|---|---|
| Rujukan | IAF MD 5:2023, Table OH&SMS 1 + CAP 03-01 (R1), Table 1.2 |
| Complexity | High / Medium / Low |
| Base Table | 23 baris (FTE 1 → 10700) |
| Sector List | Lengkap |
| File | `standards/oshms.ts` |

### 4.2 QMS

| Item | Value |
|---|---|
| Rujukan | IAF MD 5:2023, Table QMS 1 + CAP 03-01 (R1), Page 18-19 |
| Complexity | Tiada (FTE → days) |
| Base Table | 23 baris |
| Risk Category | Reference sahaja |
| File | `standards/qms.ts` |

### 4.3 EMS

| Item | Value |
|---|---|
| Rujukan | IAF MD 5:2023, Table EMS 1 + CAP 03-01 (R1), Table 3.2 |
| Complexity | High / Medium / Low / Limited |
| Base Table | 23 baris dengan 4 column |
| Special Case | Throw error (manual review) |
| File | `standards/ems.ts` |

### 4.4 ABMS

| Item | Value |
|---|---|
| Rujukan | IAF MD 5:2023, Table EMS 1 + CAP 03-01 (R1), Table 3.3 |
| Complexity | High / Medium / Low |
| Base Table | Shared dengan EMS |
| Complexity Logic | CPI + Sector + Regulatory action |
| File | `standards/abms.ts` |

### 4.5 ISMS

| Item | Value |
|---|---|
| Status | Skip dulu (Fasa 2) |
| Sebab | Matrix logic (C.2, C.3, C.4) — bukan simple lookup |

---

## 5. DESIGN KEPUTUSAN

### 5.1 FTE > 10700

**Keputusan:** Case-by-case, ATD manual input.

**Implementasi:**
```typescript
if (fte > maxFte) {
  return {
    value: null,
    requiresManualInput: true,
    message: "FTE melebihi jadual rasmi...",
    referenceLastValue: 34,
    referenceLastRange: { min: 8501, max: 10700 },
  };
}
5.2 Sector Matching
Substring match (case-insensitive).

5.3 ABMS Complexity
text
Rule 1: Regulatory action → HIGH
Rule 2: CPI ≤ 30 → HIGH, 31-59 → MEDIUM, ≥ 60 → LOW
Rule 3: Sector → HIGH/MEDIUM/LOW
Rule 4: Ambil tertinggi
5.4 EMS Special Case
Throw error — manual review required.

5.5 Override Priority
User override menang:

typescript
if (!complexity) {
  complexity = autoDetectedComplexity;
}
6. UNIT TESTS
Fail: tests/hytro-vista.test.ts

Status: 4/4 PASS

Test	Status
Sistem cadang MEDIUM (CPI 50)	PASS
ATD override HIGH → 3.5 base, 4.0 effective	PASS
CR HYTRO: base 3.5, effective 4.0, surv 2.0, recert 3.0	PASS
Stage split default 30:70 → 1.2/2.8	PASS
Kesimpulan: Formula Engine verified dengan HYTRO VISTA case.

7. TYPECHECK
bash
pnpm --filter @nioshcert/formula-engine typecheck
# Output: tsc --noEmit
# 0 error
Siap type-safe.

8. YANG BELUM SIAP
#	Item	Status
1	ISMS implementation	Skip — Fasa 2
2	Test per-standard (oshms, qms, ems, abms)	Belum
3	Test orchestrator (calculate)	Belum
4	Integration dengan database	Belum
5	Backend API wrapper	Belum
9. YANG PERLU CLARIFY (NIOSHCert)
#	Isu
1	Rounding rule — IAF half-day vs CR ceil
2	ABMS complexity — CPI 50 → HIGH (CR) vs MEDIUM (CAP)
3	Sector construction — CR justify HIGH, tapi CAP tak list
4	FTE > 10700 — IAF tak define formula
5	Stage split — IAF tak define ratio
Cadangan: Kekal CAP dulu, kumpul soalan, clarify kemudian.

10. NEXT STEPS
#	Item	Priority
1	Seed database dengan standards + mandays	High
2	Backend API (NestJS)	High
3	Frontend UI (React)	High
4	PDF Generator (Puppeteer)	Medium
5	ISMS implementation	Low
Formula Engine 4/5 standard siap. TIER 1, 2, 3, Orchestrator, Stage Split — semua siap.

text

---

## 🎯 Cara Copy

1. **Klik dalam code block di atas**
2. **Ctrl+A** (select all dalam code block)
3. **Ctrl+C** (copy)
4. **Paste** ke fail `docs/10-formula-engine-progress.md` dalam VS Code
5. **Ctrl+S** save
6. Balas **"10 siap"**

---

## 📋 Checklist