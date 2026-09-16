# 09 — Progress

Status terkini projek **Sambung NIOSHCert Mandays Calculation System**.

**Kemas kini terakhir:** 17 September 2026

---

## Ringkasan Fasa

| # | Fasa | Status | Nota |
|---|---|---|---|
| 1 | Setup environment | ✅ Siap | WSL2, Docker, Node, pnpm, Git, VS Code |
| 2 | Formula Engine | ✅ Siap | 4/4 test PASS |
| 3 | Database | ✅ Siap | 10 table, migration, client |
| 4 | Docs (01–13) | ✅ Siap | Semua MD fail |
| 5 | `packages/shared` | ✅ Siap | 82/82 test PASS |
| 6 | Seed data | ✅ Siap | 436 rows (5 standards, 13 complexity, 275 mandays, 143 sectors) |
| 7 | Backend API (NestJS) | ⏳ Seterusnya | — |
| 8 | Frontend UI (React) | ⏳ Belum | — |
| 9 | PDF Export (Puppeteer) | ⏳ Belum | — |

---

## 1. Setup ✅

- Environment: WSL2, Docker, Node, pnpm, Git, VS Code
- DeepSeek API + Cline
- PostgreSQL 16 (Docker running)
- Git remote: `https://github.com/mrbai75/nioshcert-mandays.git`

---

## 2. Formula Engine ✅

**Lokasi:** `packages/formula-engine/`

- Config (`package.json`, `tsconfig.json`, `vitest.config.ts`) — siap
- Types (`types.ts`) — siap
- Standards: `oshms.ts`, `qms.ts`, `ems.ts`, `abms.ts`, `index.ts` — siap
- Formulas: `base.ts`, `adjustment.ts`, `derived.ts` — siap
- Orchestrator: `calculate.ts` — siap
- Public API: `index.ts` — siap
- **Test HYTRO:** 4/4 PASS
- **Typecheck:** 0 error

---

## 3. Database ✅

**Lokasi:** `packages/database/`

- Config (`package.json`, `tsconfig.json`, `.env`, `.env.example`) — siap
- Prisma schema (**10 table**) — siap
- Migration init — siap
- Prisma Client generated — siap
- Docker Postgres running — siap

**10 Table:**
1. `Client`
2. `User`
3. `Application`
4. `Standard`
5. `ComplexityLevel`
6. `MandaysTable`
7. `SectorComplexity`
8. `ApplicationStandard`
9. `Calculation`
10. `AuditLog`

---

## 4. Docs ✅

**Lokasi:** `docs/`

| # | Fail | Status |
|---|---|---|
| 01 | `01-overview.md` | ✅ |
| 02 | `02-tech-stack.md` (v2.0) | ✅ |
| 03 | `03-formula-engine.md` | ✅ |
| 04 | `04-standards.md` | ✅ |
| 05 | `05-example-case.md` | ✅ |
| 06 | `06-database.md` (v2.0) | ✅ |
| 07 | `07-deployment.md` | ✅ |
| 08 | `08-references.md` | ✅ |
| 09 | `09-progress.md` (v4.0) | ✅ |
| 10 | `10-formula-engine-progress.md` (v2.0) | ✅ |
| 11 | `11-nioshcert-questions.md` | ✅ |
| 12 | `12-questionnaire-analysis.md` | ✅ |
| 13 | `13-project-structure.md` | ✅ |

---

## 5. `packages/shared` ✅

**Lokasi:** `packages/shared/`
**Nama package:** `@nioshcert/shared`

### Struktur
packages/shared/
├── src/
│ ├── types/
│ │ ├── standard.ts ✅
│ │ ├── complexity.ts ✅
│ │ ├── calculation.ts ✅ (support IMS)
│ │ ├── questionnaire.ts ✅
│ │ ├── api.ts ✅
│ │ └── index.ts ✅
│ ├── constants/
│ │ ├── sectors.ts ✅
│ │ ├── standards.ts ✅
│ │ ├── limits.ts ✅
│ │ └── index.ts ✅
│ ├── utils/
│ │ ├── rounding.ts ✅
│ │ ├── validation.ts ✅
│ │ ├── format.ts ✅
│ │ └── index.ts ✅
│ └── index.ts ✅
├── tests/
│ └── utils.test.ts ✅ (82 tests)
├── package.json ✅
├── tsconfig.json ✅
└── vitest.config.ts ✅

text

### Verify

| Check | Result |
|---|---|
| `pnpm typecheck` | ✅ 0 error |
| `pnpm test` | ✅ **82/82 PASS** |

### IMS Support ✅

Types, validation, format, dan DB schema sedia untuk IMS (integrated management system). Formula IMS (IAF MD 11) belum implement — akan datang.

---

## 6. Seed Data ✅ (BARU)

**Lokasi:** `packages/database/scripts/`

### Seed Scripts

| # | Script | Rows | Sumber |
|---|---|---|---|
| 1 | `seed-standards.ts` | 5 | Manual |
| 2 | `seed-complexity.ts` | 13 | IAF MD 5 + CAP 03-01 |
| 3 | `seed-mandays.ts` | 275 | CAP 03-01 Table 1.1/2.1/3.1 |
| 4 | `seed-sectors.ts` | 143 | CAP 03-01 Table 1.2/3.2/3.3 |
| | **Total** | **436** | |

### Breakdown

**Standards (5):**
OSHMS, QMS, EMS, ABMS, ISMS

**Complexity Levels (13):**
- OSHMS: 3 (H/M/L)
- QMS: 3 (H/M/L)
- EMS: 4 (H/M/L/LIM)
- ABMS: 3 (H/M/L)
- ISMS: 0 (skip — tiada complexity split)

**Mandays Table (275):**
- OSHMS: 69 (23 bands × 3)
- QMS: 23 (23 bands × 1)
- EMS: 92 (23 bands × 4)
- ABMS: 69 (duplicate EMS, buang LIMITED)
- ISMS: 22 (CAP Table 9, 22 bands)

**Sectors (143):**
- OSHMS: 67
- EMS: 51
- ABMS: 25
- QMS: skip (risk category)
- ISMS: skip (business + IT complexity)

### Seed Commands

```bash
pnpm --filter @nioshcert/database db:seed:all          # semua
pnpm --filter @nioshcert/database db:seed:standards    # 5 standard
pnpm --filter @nioshcert/database db:seed:complexity   # 13 levels
pnpm --filter @nioshcert/database db:seed:mandays      # 275 rows
pnpm --filter @nioshcert/database db:seed:sectors      # 143 sectors
Semua idempotent — boleh run berulang.

7. Backend API ⏳ (Seterusnya)
Lokasi: packages/backend/

NestJS

REST API

Endpoint: /api/calculations, /api/standards, /api/questionnaire, dll

8. Frontend UI ⏳
Lokasi: packages/frontend/

React + Vite

Dynamic questionnaire

Result page

History

9. PDF Export ⏳
Lokasi: packages/pdf-export/

Puppeteer

Template PDF untuk laporan mandays

Keputusan Penting
Rounding: Kekal CAP (ceil) dulu. Clarify NIOSHCert kemudian.

Database: PostgreSQL + JSONB (hybrid). 10 table. Production-ready.

Questionnaire: Dynamic ikut standard. Auto-detect complexity + override.

CAP vs IAF: CAP perlu comply IAF. Kekal CAP dulu.

FTE > 10700: Case-by-case, ATD manual input.

ABMS Complexity: Auto + override. CPI + sector + regulatory.

ComplexityLevel: 4 tahap (LIMITED, LOW, MEDIUM, HIGH) — selaras IAF MD 5.

StandardCode: 5 standard (OSHMS, QMS, EMS, ABMS, ISMS) — ISMS pending (ISO/IEC 27006).

Monorepo: pnpm workspaces + tsconfig.base.json di root.

Package naming: @nioshcert/* (konsisten).

IMS Support: Types/validation/format/DB sedia. Formula (IAF MD 11) pending.

ABMS: Guna data EMS (proxy) — CAP 03-01.

ISMS: Tiada sector + complexity split. Guna Table 9 + adjustment (business + IT complexity) dalam formula engine.

Aturan Bahasa
Component	Language
Code (variable, function)	English
Comment	Bahasa Melayu
Error messages	English
Test names	English
UI	English
Docs	Bahasa Melayu
Next Step
Sambung Backend API (NestJS) — packages/backend/.

Rujukan
docs/13-project-structure.md — struktur folder

docs/03-formula-engine.md — formula penuh

docs/06-database.md — skema DB

docs/10-formula-engine-progress.md — detail formula engine

GitHub: https://github.com/mrbai75/nioshcert-mandays