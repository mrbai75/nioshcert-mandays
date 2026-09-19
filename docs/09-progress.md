# 09 — Progress

Status terkini projek **NIOSHCert Mandays Calculation System**.

**Kemas kini terakhir:** 19 September 2026
**Versi:** 5.0

---

## Ringkasan Fasa

| # | Fasa | Status | Nota |
|---|------|--------|------|
| 1 | Setup environment | SIAP | WSL2, Docker, Node, pnpm, Git, VS Code |
| 2 | Formula Engine | SIAP | 4/4 test PASS + IMS reduction |
| 3 | Database | SIAP | 13 table (10 asal + 3 questionnaire) |
| 4 | Docs (01-15) | SIAP | Semua MD + questionnaires/ |
| 5 | packages/shared | SIAP | 82/82 test PASS, dual-mode |
| 6 | Seed data | SIAP | 436 rows + 117 soalan questionnaire |
| 7 | Backend API (NestJS) | SIAP | 13 endpoint, 15/15 E2E PASS |
| 8 | Frontend UI (React) | BELUM | Seterusnya |
| 9 | PDF Export (Puppeteer) | BELUM | |
| 10 | Auth (Microsoft SSO) | BELUM | |
| 11 | Deployment (Azure) | BELUM | |

---

## 7. Backend API - SIAP

**Lokasi:** packages/backend/
**Framework:** NestJS v10 (CommonJS)
**Port:** 3001
**Prefix:** /api

### 7 modules

1. health — health check + DB status
2. standards — senarai + detail standard
3. complexity — complexity levels per standard
4. mandays — mandays table + lookup
5. sectors — sector -> complexity mapping
6. questionnaire — soalan dynamic + validate + detect complexity
7. calculation — kira mandays (single + IMS reduction)

### 13 endpoint

| Method | Path |
|--------|------|
| GET | /api/health |
| GET | /api/standards |
| GET | /api/standards/:code |
| GET | /api/complexity |
| GET | /api/mandays |
| GET | /api/mandays/lookup |
| GET | /api/sectors |
| GET | /api/questionnaire |
| GET | /api/questionnaire/:standard |
| POST | /api/questionnaire/validate |
| POST | /api/questionnaire/detect-complexity |
| POST | /api/calculations |

### Test E2E - 15/15 PASS

- Health, standards (3), complexity (2), mandays (1)
- Sectors (2), questionnaire (3), calculations (3)
- IMS dedupe, IMS auto reduction, IMS override

### Dual-mode

3 package guna dual-mode (CJS + ESM):
- @nioshcert/shared -> dist/cjs/ + dist/esm/
- @nioshcert/database -> sama
- @nioshcert/formula-engine -> sama

package.json dual exports (import + require).

---

## 7.3 Questionnaire - SIAP

### 6 MD dalam docs/questionnaires/

| Fail | CAS | Soalan |
|------|-----|--------|
| 15-01-application-form.md | CAS 15-01 (R1) | 45 |
| 15-08-oshms.md | CAS 15-08-R02 | 32 |
| 15-09-ems.md | CAS 15-09 | 21 |
| 15-10-qms.md | CAS 15-10 | 7 |
| 15-16-abms.md | CAS 15-16 | 16 |
| 15-19-isms.md | CAS 15-19 | 13 |

Total: 134 soalan.

### DB - 3 table baru

- sections — grouping soalan (13 row)
- questions — soalan (117 row, dedupe)
- question_standards — relation (300 row)

### Seed

pnpm --filter @nioshcert/database db:seed:questionnaire

Parser: packages/database/scripts/lib/parse-questionnaire-md.ts
Seed: packages/database/scripts/seed-questionnaire.ts

### IMS dedupe

company_name = 1 soalan, link ke 5 standard.
Query ?standards=ISMS,QMS,ABMS -> 70 soalan unik (bukan 84).

---

## 7.4 Calculation - SIAP

### FTE Adapter

Formula (dari CR HYTRO):
FTE = Management + Permanent + (Contract x 0.5) + Repetitive

### Complexity Adapter

Baca complexityImpact dari soalan -> auto-detect HIGH/MEDIUM/LOW/LIMITED.
Ambil tertinggi.

### Formula wrapper

Panggil @nioshcert/formula-engine:
- Tier 1 (base lookup)
- Tier 2 (rounding ceil)
- Tier 3 (surveillance + recert)
- Stage split (30:70 default)

### IMS reduction

Formula (ANDAIAN - perlu sahkan NIOSHCert):
Skor integrasi = manual + policy + internal_audit
0/3 -> 0%
1/3 -> 5%
2/3 -> 12%
3/3 -> 20%

Range: 0-20% (IAF MD 11 + CAP 03-01 Section 9).
ATD boleh override via imsReduction field.

### Tested

- Single OSHMS: FTE 9, HIGH, 4 MD
- IMS OSHMS+EMS: raw 8, auto 20%, final 6.4
- IMS override 10%: final 7.2

---

## Fail Penting

| Fail | Guna |
|------|------|
| HANDOFF.md | Onboarding + chat baru |
| docs/11-nioshcert-questions.md | Soalan clarification |
| docs/12-questionnaire-analysis.md | Analisis questionnaire |
| docs/questionnaires/*.md | Soalan sebenar |

---

## Keputusan Penting

| Perkara | Keputusan |
|---------|-----------|
| Rounding | CAP (ceil) - perlu sahkan |
| DB | PostgreSQL + JSONB (hybrid) |
| Questionnaire | DB normalized (3 table) |
| Soalan | Reka sendiri ikut PDF CAS |
| Dedupe IMS | QuestionStandard relation |
| IMS reduction | Skor integrasi -> 0/5/12/20% (ANDAIAN) |
| Stage split | 30:70 default, ATD override |
| ABMS | Guna data EMS (proxy) |
| ISMS | Belum implement formula |
| Auth | SKIP - Fasa 10 |
| Dual-mode | CJS + ESM untuk 3 package |

---

## Next Step

Fasa 8 - Frontend (React + Vite)

UI untuk PIC, BD, ATD, Manager, Admin.
Guna 13 endpoint API.

---

## GitHub

https://github.com/mrbai75/nioshcert-mandays

Commit terakhir: fb47ebd (Fasa 7.5 - test E2E)