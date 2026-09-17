# 02 — Tech Stack

**Last Updated:** 16 September 2026
**Version:** 2.0

---

## 1. TECH STACK

| Layer | Pilihan | Justifikasi |
|---|---|---|
| Frontend | React + Vite + TypeScript | Ringan, hot reload |
| Backend | Node.js + NestJS + TypeScript | Modular, scalable |
| Database | PostgreSQL 16 | Relational + JSONB |
| ORM | Prisma 5.22 | Type-safe, migration |
| PDF | Puppeteer | Server-side |
| Container | Docker Compose | 1 command up |
| Test | Vitest | Fast, ESM-native |
| AI Agent | Cline + DeepSeek API | Auto-coding |
| Hosting (Dev) | Localhost | Development |
| Hosting (Prod) | Azure | Production |

---

## 2. LANGUAGE CONVENTION

| Component | Language |
|---|---|
| Code (variable, function, type) | English |
| Comments | Bahasa Melayu |
| Error messages | English |
| Test names | English |
| UI (Frontend) | English |
| Documentation (MD files) | Bahasa Melayu |

**Aturan:**
- **Comment sahaja Bahasa Melayu**
- **Semua lain English**

---

## 3. KENAPA RELATIONAL + JSONB

**PostgreSQL (bukan NoSQL) sebab:**
1. Data berstruktur tinggi (FTE, sites, dll)
2. Perlu referential integrity
3. Audit trail (ISO 27001) — traceable
4. Reporting & analytics (SQL GROUP BY)
5. 15+ standards × versions × tables

**JSONB untuk:**
- Questionnaire answers (dynamic ikut standard)
- FTE breakdown (evolve-able)
- Audit trail (nested events)
- Snapshot (client, formula trace)

**Hybrid = Best of both worlds.**

---

## 4. AI CODING AGENT

| Tool | Guna |
|---|---|
| **Cline** | VS Code extension |
| **DeepSeek API** | Model (deepseek-v4-flash) |

**Nota:**
- Cline kadang over-think untuk fail besar
- Untuk fail besar — manual copy-paste
- Untuk code simple — Cline OK

**Cadangan:** Guna Cline untuk debug/refactor, manual untuk fail baru.

---

## 5. DESIGN CLOUD-READY

| Prinsip | Implikasi |
|---|---|
| 12-Factor App | Config via environment variables |
| Dockerize | Semua service dalam Docker |
| Stateless backend | Session dalam DB/Redis |
| Database migrations | Prisma migrate |
| Environment config | `.env` untuk dev, Azure Config untuk prod |
| Health check endpoint | Untuk Azure probe |
| Logging | Structured logging (JSON) |
| Error handling | Centralized |

---

## 6. MONOREPO STRUCTURE
nioshcert-mandays/
package.json (root)
pnpm-workspace.yaml
docker-compose.yml
tsconfig.json (root)
docs/ (dokumentasi)
packages/
formula-engine/ (code formula)
database/ (Prisma + schema)
backend/ (NestJS — belum)
frontend/ (React — belum)

text

**Setiap package ada `package.json` sendiri.**

---

## 7. DEV TOOLS

| Tool | Version |
|---|---|
| Node.js | 22.22.0 |
| pnpm | 12.4.1 |
| Git | 2.55.0 |
| VS Code | 1.132.0 |
| Docker Desktop | Latest |
| PostgreSQL | 16 (Docker) |

---

## 8. PRISMA COMMANDS

**Dalam `packages/database/`:**

| Command | Fungsi |
|---|---|
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run migration |
| `pnpm db:studio` | Open GUI |
| `pnpm db:seed` | Seed data |
| `pnpm db:reset` | Reset database |

---

## 9. DOCKER COMMANDS

| Command | Fungsi |
|---|---|
| `docker compose up -d` | Start services |
| `docker compose down` | Stop services |
| `docker compose down -v` | Stop + delete volume |
| `docker ps` | List containers |
| `docker compose logs` | Show logs |

---

## 10. TEST COMMANDS

| Command | Fungsi |
|---|---|
| `pnpm --filter @nioshcert/formula-engine test` | Run formula tests |
| `pnpm --filter @nioshcert/formula-engine typecheck` | TypeScript check |

---

## 11. HOSTING (CADANGAN)

| Environment | Platform |
|---|---|
| Development | Localhost (Docker) |
| Staging | Azure Container Apps |
| Production | Azure Container Apps |

**Alternatif:**
- Railway (demo cepat)
- Vercel + Railway (frontend + backend)
- VPS (DigitalOcean)

---

## 12. FUTURE CONSIDERATIONS

| # | Perkara | Fasa |
|---|---|---|
| 1 | SSO Microsoft 365 | Fasa 2 |
| 2 | Multi-role auth | Fasa 2 |
| 3 | Notification engine | Fasa 2 |
| 4 | Mobile app (React Native) | Fasa 3 |
| 5 | AI enhancement | Fasa 3 |

---

**Tech stack dah muktamad. Guna untuk sepanjang project.**