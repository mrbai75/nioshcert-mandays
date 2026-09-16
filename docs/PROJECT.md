# NIOSHCert Mandays Calculation System

**Last Updated:** 16 September 2026
**Version:** 1.1
**Status:** In Development — Setup Complete, Starting Formula Engine

---

## DAFTAR KANDUNGAN

1. [Project Overview](#1-project-overview)
2. [Skop](#2-skop)
3. [Tech Stack](#3-tech-stack)
4. [Struktur Sistem](#4-struktur-sistem)
5. [5 Standard](#5-standard-yang-disokong)
6. [Contoh Kes HYTRO VISTA](#6-contoh-kes--hytro-vista-sdn-bhd)
7. [Database Schema](#7-database-schema)
8. [Project Structure](#8-project-structure)
9. [Deployment Strategy](#9-deployment-strategy)
10. [Referensi](#10-referensi-rasmi)
11. [Progress Status](#11-progress-status)
12. [Isu Semasa](#12-isu-semasa)
13. [Keputusan](#13-keputusan-yang-telah-dipersetujui)
14. [Perkara Belum Diputuskan](#14-perkara-yang-belum-diputuskan)
15. [Langkah Seterusnya](#15-langkah-seterusnya)
16. [Change Log](#16-change-log)

---

## 1. PROJECT OVERVIEW

Sistem pengiraan mandays untuk NIOSHCert — 5 standard ISO.

**Tujuan utama:**
- Automate pengiraan mandays
- Standardize output
- Audit-ready (defendable)
- Support override dengan justifikasi

**Prinsip:** "Sistem cadang, manusia putus, sistem rekod."

---

## 2. SKOP

### Fasa 1 (Demo — Sedang Dibangunkan)

| Item | Keputusan |
|---|---|
| Platform | Web (laptop, localhost) |
| Standards | 5 — OSHMS, QMS, EMS, ABMS, ISMS |
| Login/Role | Tiada (skip untuk demo) |
| Workflow | Simplified — calculate, review, override, record |
| History | Ya |
| PDF Export | Ya |
| AI | Tiada |
| Mobile | Tiada |

### Fasa 2 (Selepas Demo Lulus)

- Full CR System
- Multi-role (PIC, BD, ATD, ATD Manager, Super Admin)
- SSO Microsoft 365
- Notification engine
- AI enhancement
- Mobile app

---

## 3. TECH STACK

| Layer | Pilihan |
|---|---|
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + NestJS + TypeScript |
| Database | PostgreSQL (via Docker) |
| ORM | Prisma |
| PDF | Puppeteer |
| Container | Docker Compose |
| Hosting (Dev) | Localhost |
| Hosting (Demo) | Cloud (Azure) |

---

## 4. STRUKTUR SISTEM

### 4.1 Formula Engine — 3-Tier
