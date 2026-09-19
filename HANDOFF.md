# HANDOFF — NIOSHCert Mandays Calculation System

**Tarikh:** 19 September 2026
**Status:** Backend MVP Complete

## RINGKASAN

Sistem pengiraan mandays audit NIOSHCert untuk 5 standard ISO:
- OSHMS (ISO 45001)
- QMS (ISO 9001)
- EMS (ISO 14001)
- ABMS (ISO 37001)
- ISMS (ISO 27001)

## STATUS FASA

| Fasa | Status | Nota |
|------|--------|------|
| 1. Setup | SIAP | WSL2, Docker, Node 20+, pnpm 9+ |
| 2. Formula Engine | SIAP | 4/4 test PASS + IMS reduction |
| 3. Database | SIAP | 13 table |
| 4. Docs (01-15) | SIAP | Semua MD |
| 5. packages/shared | SIAP | 82/82 test PASS |
| 6. Seed data | SIAP | 436 rows + 117 soalan |
| 7. Backend API | SIAP | 13 endpoint, 15/15 E2E PASS |
| 8. Frontend (React) | BELUM | Seterusnya |
| 9. PDF Export | BELUM | |
| 10. Auth (SSO) | BELUM | |
| 11. Deployment | BELUM | |

## STRUKTUR

nioshcert-mandays/
  docs/
    01-15 (design docs)
    questionnaires/ (6 MD - CAS 15-01, 08, 09, 10, 16, 19)
  packages/
    shared/          (dual-mode CJS+ESM)
    formula-engine/  (dual-mode)
    database/        (dual-mode + Prisma + seed)
    backend/         (NestJS v10, CommonJS)
  tsconfig.base.json
  package.json
  pnpm-workspace.yaml
  docker-compose.yml   (PostgreSQL 16)

## BACKEND - 13 ENDPOINT

- GET /api/health — Health check
- GET /api/standards — Senarai standard
- GET /api/standards/:code — Detail standard
- GET /api/complexity — Complexity levels
- GET /api/mandays — Mandays table
- GET /api/mandays/lookup — Lookup FTE + complexity
- GET /api/sectors — Sector complexity
- GET /api/questionnaire — Soalan (dedupe IMS)
- GET /api/questionnaire/:standard — Soalan single standard
- POST /api/questionnaire/validate — Validate jawapan
- POST /api/questionnaire/detect-complexity — Auto-detect complexity
- POST /api/calculations — Kira mandays (single + IMS)

## CARA RUN

1. docker compose up -d
2. pnpm install
3. pnpm --filter @nioshcert/database db:seed:all
4. pnpm --filter @nioshcert/backend dev
   -> http://localhost:3001/api
5. pnpm --filter @nioshcert/backend test:e2e

## KEPUTUSAN PENTING

- Rounding: CAP (ceil) — perlu sahkan NIOSHCert
- DB: PostgreSQL + JSONB (hybrid)
- Questionnaire: DB normalized (3 table)
- Soalan: Reka sendiri ikut PDF CAS (bukan 1:1)
- Dedupe IMS: QuestionStandard relation (company_name = 1 soalan, 5 standard)
- IMS reduction: Skor integrasi -> 0/5/12/20% (ANDAIAN - perlu sahkan)
- Stage split: 30:70 default, ATD override
- ABMS: Guna data EMS (proxy) — CAP 03-01
- ISMS: Belum implement formula — guna ISO 27006 (Fasa 2)
- Auth: SKIP dulu — Fasa 10
- Dual-mode: CJS + ESM (shared, database, formula-engine)

## PERLU SAHKAN NIOSHCERT

Lihat docs/11-nioshcert-questions.md - 10 soalan:

1. Rounding rule (ceil vs nearest half)
2. ABMS CPI 50 -> HIGH override
3. Sector construction untuk ABMS
4. FTE > 10,700 (formula)
5. Stage split ratio (25:75 vs 30:70)
6. CAP vs IAF hierarchy
7. EMS Special Case
8. Questionnaire dynamic (IMS dedupe)
9. Complexity auto vs manual
10. ISMS Table C.4 range

Tambah: IMS reduction formula (skor integrasi) - ANDAIAN

## TEKNOLOGI

- Backend: NestJS v10, CommonJS, Prisma 5.22
- Frontend: React + Vite + TypeScript (belum)
- Database: PostgreSQL 16 (Docker)
- ORM: Prisma
- PDF: Puppeteer (belum)
- Monorepo: pnpm workspaces

## GAYA KERJA

- Kod: English
- Komen: Bahasa Melayu
- Error messages: English
- Docs: Bahasa Melayu
- UI: English
- Commit: Conventional commits

## NEXT STEP

Fasa 8 - Frontend (React + Vite)

UI untuk:
- PIC - isi questionnaire (dynamic form)
- BD - review + tambah soalan
- ATD - override complexity, approve
- Manager - approve, view report

Endpoint dah sedia - guna API 13 endpoint.

## GITHUB

https://github.com/mrbai75/nioshcert-mandays

Commit terakhir: fb47ebd (Fasa 7.5 test E2E)