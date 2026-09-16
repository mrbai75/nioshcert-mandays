# 02 — Tech Stack

**Last Updated:** 16 September 2026
**Version:** 1.1

---

## 1. TECH STACK

| Layer | Pilihan | Justifikasi |
|---|---|---|
| Frontend | React + Vite + TypeScript | Ringan, hot reload, sesuai laptop |
| Mobile | React Native (Expo) — nanti | Boleh share kod dengan web |
| Backend | Node.js + NestJS + TypeScript | Modular, senang tambah standard |
| Database | PostgreSQL (via Docker) | Relational, sesuai untuk audit trail |
| ORM | Prisma | Type-safe, migration bagus |
| PDF | Puppeteer | Server-side, output kemas |
| Container | Docker Compose | 1 command naik semua |
| Hosting (Dev) | Localhost | Development & test |
| Hosting (Demo) | Cloud (Azure) | Demo rasmi & production |

---

## 2. KENAPA RELATIONAL (POSTGRESQL), BUKAN NOSQL

1. Data berstruktur tinggi (jadual mandays fixed)
2. Perlu referential integrity (versioning standard)
3. Audit trail (ISO 27001) — traceable
4. Reporting & analytics (SQL GROUP BY)
5. Data migration dari historical CR
6. 15+ standards × versions × tables — relational natural

---

## 3. DESIGN CLOUD-READY

| Prinsip | Implikasi |
|---|---|
| 12-Factor App | Config via environment variables |
| Dockerize | Semua service dalam Docker |
| Stateless backend | Session dalam DB/Redis, bukan memory |
| Database migrations | Prisma migrate, bukan manual |
| Environment config | `.env` untuk dev, Azure Config untuk prod |
| Health check endpoint | Untuk Azure probe |
| Logging | Structured logging (JSON) |
| Error handling | Centralized, bukan `console.log` |

**Nota:** Walaupun deploy kemudian, design mesti cloud-ready dari awal. Bila deploy nanti, cuma tukar config — bukan refactor.

---