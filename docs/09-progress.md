# 09 — Progress

Status terkini projek **Sambung NIOSHCert Mandays Calculation System**.

**Kemas kini terakhir:** 16 September 2026

---

## Ringkasan Fasa

| # | Fasa | Status | Nota |
|---|---|---|---|
| 1 | Setup environment | ✅ Siap | WSL2, Docker, Node, pnpm, Git, VS Code |
| 2 | Formula Engine | ✅ Siap | 4/4 test PASS |
| 3 | Database | ✅ Siap | 10 table, migration, client |
| 4 | Docs (01–13) | ✅ Siap | Semua MD fail |
| 5 | `packages/shared` | ✅ Siap | 53/53 test PASS |
| 6 | Seed data | ⏳ Belum | `scripts/seed-*` |
| 7 | Backend API (NestJS) | ⏳ Belum | — |
| 8 | Frontend UI (React) | ⏳ Belum | — |
| 9 | PDF Export (Puppeteer) | ⏳ Belum | — |

---

## 1. Setup ✅

- Environment: WSL2, Docker, Node, pnpm, Git, VS Code
- DeepSeek API + Cline
- PostgreSQL 16 (Docker running)
- Git commit docs 01–13

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
1. `Standard`
2. `MandaysRule`
3. `Questionnaire`
4. `Question`
5. `Answer`
6. `Calculation`
7. `CalculationResult`
8. `AuditLog`
9. `User`
10. `Organization`

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
| 09 | `09-progress.md` (v3.0) | ✅ |
| 10 | `10-formula-engine-progress.md` (v2.0) | ✅ |
| 11 | `11-nioshcert-questions.md` | ✅ |
| 12 | `12-questionnaire-analysis.md` | ✅ |
| 13 | `13-project-structure.md` | ✅ |

---

## 5. `packages/shared` ✅ (BARU)

**Lokasi:** `packages/shared/`
**Commit:** `578b856`

### Struktur
packages/shared/
├── src/
│ ├── types/
│ │ ├── standard.ts ✅
│ │ ├── complexity.ts ✅
│ │ ├── calculation.ts ✅
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
│ └── utils.test.ts ✅
├── package.json ✅
├── tsconfig.json ✅
└── vitest.config.ts ✅

text

### Kandungan

- **Types:** 30+ types (StandardCode, ComplexityLevel, CalculationInput/Result, Questionnaire, API DTO)
- **Constants:** SECTORS (per standard), STANDARDS (5 metadata), LIMITS (MAX_FTE, CPI ranges, ratios)
- **Utils:** Rounding (capCeil), Validation (validateCalculationInput), Format (formatMandays, formatDate)
- **Type guards:** `isStandardCode`, `isComplexityLevel`, `isApplicationType`, `isQuestionType`

### Verify

| Check | Result |
|---|---|
| `pnpm install` | ✅ 52 packages |
| `pnpm typecheck` | ✅ 0 error |
| `pnpm test` | ✅ **53/53 PASS** |

### Fail Root Baru

- `tsconfig.base.json` — base config untuk semua package

---

## 6. Seed Data ⏳ (Seterusnya)

**Lokasi:** `scripts/`

- `seed-standards.ts` — seed 5 standard ke DB
- `seed-mandays.ts` — seed table mandays (OSHMS/QMS/EMS)
- `reset-db.ts` — reset + migrate + seed

---

## 7. Backend API ⏳

**Lokasi:** `packages/backend/`

- NestJS
- REST API
- Endpoint: `/api/calculations`, `/api/standards`, `/api/questionnaire`, dll

---

## 8. Frontend UI ⏳

**Lokasi:** `packages/frontend/`

- React + Vite
- Dynamic questionnaire
- Result page
- History

---

## 9. PDF Export ⏳

**Lokasi:** `packages/pdf-export/`

- Puppeteer
- Template PDF untuk laporan mandays

---

## Keputusan Penting

1. **Rounding:** Kekal CAP (ceil) dulu. Clarify NIOSHCert kemudian.
2. **Database:** PostgreSQL + JSONB (hybrid). 10 table. Production-ready.
3. **Questionnaire:** Dynamic ikut standard. Auto-detect complexity + override.
4. **CAP vs IAF:** CAP perlu comply IAF. Kekal CAP dulu.
5. **FTE > 10700:** Case-by-case, ATD manual input.
6. **ABMS Complexity:** Auto + override. CPI + sector + regulatory.
7. **ComplexityLevel:** 4 tahap (`LIMITED`, `LOW`, `MEDIUM`, `HIGH`) — selaras IAF MD 5.
8. **StandardCode:** 5 standard (`OSHMS`, `QMS`, `EMS`, `ABMS`, `ISMS`) — ISMS pending (ISO/IEC 27006).
9. **Monorepo:** pnpm workspaces + `tsconfig.base.json` di root.

---

## Aturan Bahasa

| Component | Language |
|---|---|
| Code (variable, function) | English |
| Comment | Bahasa Melayu |
| Error messages | English |
| Test names | English |
| UI | English |
| Docs | Bahasa Melayu |

---

## Next Step

Sambung **seed data** (`scripts/seed-standards.ts`), kemudian backend API, frontend UI.

---

## Rujukan

- `docs/13-project-structure.md` — struktur folder
- `docs/03-formula-engine.md` — formula penuh
- `docs/06-database.md` — skema DB
- `docs/10-formula-engine-progress.md` — detail formula engine