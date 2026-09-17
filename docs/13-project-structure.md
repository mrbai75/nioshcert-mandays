# 13 — Project Structure

Dokumen ini menerangkan struktur folder keseluruhan projek **Sambung NIOSHCert Mandays Calculation System**. Struktur ini menggunakan **monorepo** dengan **pnpm workspaces** supaya formula engine, database, backend, dan frontend boleh dikongsi secara konsisten.

---

## 1. Prinsip Reka Bentuk

1. **Monorepo (pnpm workspaces)** — satu repo, banyak package.
2. **Pemisahan tanggungjawab** — setiap package ada satu peranan utama.
3. **Shared types** — jenis TypeScript dikongsi melalui `packages/shared` (akan datang).
4. **Bahasa kod** — English untuk variable/function, Bahasa Melayu untuk comment.
5. **Test berdekatan dengan kod** — fail `.test.ts` duduk sebelah fail sumber.
6. **Docs berpusat** — semua dokumentasi dalam `docs/`.

---

## 2. Struktur Folder Root
sambung-nioshcert/
├── .github/ # (akan datang) CI/CD workflow
├── .vscode/ # VS Code settings
├── docker/ # Docker compose & init scripts
│ ├── docker-compose.yml
│ └── postgres/
│ └── init.sql
├── docs/ # Semua dokumentasi projek
│ ├── 01-overview.md
│ ├── 02-tech-stack.md
│ ├── 03-formula-engine.md
│ ├── 04-standards.md
│ ├── 05-example-case.md
│ ├── 06-database.md
│ ├── 07-deployment.md
│ ├── 08-references.md
│ ├── 09-progress.md
│ ├── 10-formula-engine-progress.md
│ ├── 11-nioshcert-questions.md
│ ├── 12-questionnaire-analysis.md
│ └── 13-project-structure.md # (fail ini)
├── packages/ # Semua package monorepo
│ ├── formula-engine/ # ✅ Siap
│ ├── database/ # ✅ Siap
│ ├── shared/ # ⏳ Akan datang
│ ├── backend/ # ⏳ Akan datang (NestJS)
│ ├── frontend/ # ⏳ Akan datang (React)
│ └── pdf-export/ # ⏳ Akan datang (Puppeteer)
├── scripts/ # Script utiliti (seed, migrate, dll)
│ ├── seed-standards.ts
│ └── seed-mandays.ts
├── .env.example
├── .gitignore
├── .npmrc
├── package.json # Root package.json (workspaces)
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json # Config TypeScript asas
└── README.md

text

---

## 3. Konfigurasi Root

### 3.1 `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
3.2 package.json (root)
json
{
  "name": "sambung-nioshcert",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint",
    "db:migrate": "pnpm --filter @sambung/database migrate:dev",
    "db:seed": "pnpm --filter @sambung/database seed",
    "dev:backend": "pnpm --filter @sambung/backend dev",
    "dev:frontend": "pnpm --filter @sambung/frontend dev"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  },
  "packageManager": "pnpm@9.0.0"
}
3.3 tsconfig.base.json
json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "sourceMap": true,
    "resolveJsonModule": true
  }
}
4. Package: formula-engine ✅
text
packages/formula-engine/
├── src/
│   ├── types.ts                 # Jenis asas (Standard, Complexity, dll)
│   ├── standards/
│   │   ├── oshms.ts             # OSHMS standard
│   │   ├── qms.ts               # QMS standard
│   │   ├── ems.ts               # EMS standard
│   │   ├── abms.ts              # ABMS standard
│   │   └── index.ts
│   ├── formulas/
│   │   ├── base.ts              # Formula asas mandays
│   │   ├── adjustment.ts        # Pelarasan (complexity, sector, dll)
│   │   ├── derived.ts           # Formula terbitan
│   │   └── index.ts
│   ├── orchestrator/
│   │   └── calculate.ts         # Orkestrasi pengiraan
│   └── index.ts                 # Public API
├── tests/
│   └── hytro.test.ts            # 4/4 PASS
├── package.json
├── tsconfig.json
└── vitest.config.ts
Tanggungjawab: Mengira mandays berdasarkan standard, complexity, dan input questionnaire.

5. Package: database ✅
text
packages/database/
├── prisma/
│   ├── schema.prisma            # 10 table
│   └── migrations/
│       └── 0001_init/
├── src/
│   ├── client.ts                # Export PrismaClient singleton
│   └── index.ts
├── seeds/                       # (akan datang)
│   ├── standards.seed.ts
│   └── mandays.seed.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
Tanggungjawab: Skema database, migration, client Prisma, dan seed data.

10 Table (rujuk docs/06-database.md):

Standard

MandaysRule

Questionnaire

Question

Answer

Calculation

CalculationResult

AuditLog

User

Organization

6. Package: shared ⏳
text
packages/shared/
├── src/
│   ├── types/
│   │   ├── standard.ts          # Shared type untuk standard
│   │   ├── calculation.ts       # Shared type untuk hasil kiraan
│   │   └── api.ts               # DTO untuk API
│   ├── constants/
│   │   ├── sectors.ts
│   │   └── complexity.ts
│   ├── utils/
│   │   ├── rounding.ts          # CAP (ceil) helper
│   │   └── validation.ts
│   └── index.ts
├── package.json
└── tsconfig.json
Tanggungjawab: Types, constants, dan utiliti yang dikongsi antara backend & frontend.

7. Package: backend ⏳ (NestJS)
text
packages/backend/
├── src/
│   ├── main.ts                  # Entry point
│   ├── app.module.ts
│   ├── common/
│   │   ├── filters/             # Exception filters
│   │   ├── interceptors/        # Logging, transform
│   │   ├── guards/              # Auth guards
│   │   └── decorators/
│   ├── config/
│   │   └── configuration.ts     # Env config
│   ├── modules/
│   │   ├── standards/           # CRUD standard
│   │   ├── questionnaire/       # Questionnaire dynamic
│   │   ├── calculation/         # Endpoint kiraan mandays
│   │   ├── auth/                # Auth (JWT)
│   │   └── users/
│   ├── prisma/
│   │   └── prisma.service.ts    # Prisma service (inject)
│   └── formula/
│       └── formula.service.ts   # Wrapper formula-engine
├── test/
│   └── e2e/
├── package.json
├── tsconfig.json
└── nest-cli.json
Tanggungjawab: REST API untuk frontend, orchestrasi formula + database.

Endpoint utama (rancangan):

POST /api/calculations — kira mandays

GET /api/standards — senarai standard

GET /api/questionnaire/:standardId — soalan dynamic

POST /api/questionnaire/:id/submit — hantar jawapan

GET /api/calculations/:id — dapatkan hasil

GET /api/calculations/:id/pdf — export PDF

8. Package: frontend ⏳ (React + Vite)
text
packages/frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router/
│   │   └── index.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Questionnaire.tsx    # Soalan dynamic
│   │   ├── Result.tsx           # Paparan mandays
│   │   └── History.tsx
│   ├── components/
│   │   ├── ui/                  # Button, Input, Card
│   │   ├── form/                # Dynamic form
│   │   └── layout/
│   ├── hooks/
│   │   ├── useCalculation.ts
│   │   └── useQuestionnaire.ts
│   ├── services/
│   │   └── api.ts               # Axios client
│   ├── store/                   # Zustand / Redux
│   ├── types/                   # Re-export dari shared
│   └── styles/
├── public/
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
Tanggungjawab: UI pengguna — questionnaire dynamic, paparan hasil, history.

9. Package: pdf-export ⏳ (Puppeteer)
text
packages/pdf-export/
├── src/
│   ├── templates/
│   │   ├── calculation.hbs      # Handlebars template
│   │   └── styles.css
│   ├── generator.ts             # Puppeteer logic
│   └── index.ts
├── package.json
└── tsconfig.json
Tanggungjawab: Generate PDF laporan mandays dari template HTML.

10. Docker
text
docker/
├── docker-compose.yml           # Postgres 16 + (akan datang) backend
└── postgres/
    └── init.sql                 # Extensions, roles
Nota: Backend & frontend akan ditambah ke docker-compose.yml selepas siap.

11. Scripts
text
scripts/
├── seed-standards.ts            # Seed 4 standard (OSHMS, QMS, EMS, ABMS)
├── seed-mandays.ts              # Seed mandays rule
└── reset-db.ts                  # Reset + migrate + seed
Dijalankan melalui root: pnpm db:seed.

12. Aliran Data (High-Level)
text
[Frontend React]
      │  HTTP (JSON)
      ▼
[Backend NestJS] ──► [formula-engine]
      │                    │
      │                    ▼
      │            (kira mandays)
      ▼
[database (Prisma)] ──► [PostgreSQL 16]
      │
      ▼
[pdf-export (Puppeteer)]
      │
      ▼
   PDF file
13. Konvensyen Penamaan
Item	Konvensyen	Contoh
Folder	kebab-case	formula-engine
Fail TS	kebab-case.ts	calculate.ts
Komponen React	PascalCase.tsx	Questionnaire.tsx
Test	*.test.ts	hytro.test.ts
Package name	@sambung/*	@sambung/database
Constant	UPPER_SNAKE_CASE	MAX_FTE
Type/Interface	PascalCase	CalculationInput
Function	camelCase	calculateMandays
14. Status Ringkas
Package	Status	Nota
formula-engine	✅ Siap	4/4 test PASS, 0 error
database	✅ Siap	10 table, migration, client
shared	⏳ Belum	Types & utils dikongsi
backend	⏳ Belum	NestJS API
frontend	⏳ Belum	React + Vite
pdf-export	⏳ Belum	Puppeteer
docs	✅ Siap	01–13
scripts	⏳ Belum	Seed data
15. Langkah Seterusnya
Cipta packages/shared — types & utils dikongsi.

Tulis scripts/seed-standards.ts dan seed-mandays.ts.

Scaffold packages/backend (NestJS).

Scaffold packages/frontend (React + Vite).

Tambah pdf-export selepas backend stabil.

Kemas kini docs/09-progress.md.

Rujukan:

docs/02-tech-stack.md — tech stack penuh

docs/06-database.md — skema database

docs/09-progress.md — status terkini

docs/10-formula-engine-progress.md — detail formula engine