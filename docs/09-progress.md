# 09 — Progress Status

**Last Updated:** 16 September 2026
**Version:** 1.1

---

## 1. SETUP ENVIRONMENT

| # | Item | Status |
|---|---|---|
| 1 | WSL2 | ✅ Siap |
| 2 | Docker Desktop | ✅ Siap |
| 3 | Node.js v22.22.0 | ✅ Siap |
| 4 | npm 10.9.4 | ✅ Siap |
| 5 | pnpm 12.4.1 | ✅ Siap |
| 6 | Git 2.55.0 | ✅ Siap |
| 7 | VS Code 1.132.0 | ✅ Siap |

---

## 2. PROJECT STRUCTURE

| # | Item | Status |
|---|---|---|
| 1 | Folder project | ✅ Siap |
| 2 | Git init | ✅ Siap |
| 3 | Struktur folder | ✅ Siap |
| 4 | 8 Root files | ✅ Siap |
| 5 | Git commit (56cffef) | ✅ Siap |

---

## 3. DEVELOPMENT

| # | Item | Status |
|---|---|---|
| 1 | Docker pull image | ✅ Selesai (registry mirror) |
| 2 | PostgreSQL 16.15 running | ✅ Tested |
| 3 | Docker Compose | ✅ Selesai |
| 4 | Formula Engine code | ⏳ Seterusnya |
| 5 | Database schema | ⏳ Belum |
| 6 | Backend API | ⏳ Belum |
| 7 | Frontend UI | ⏳ Belum |
| 8 | PDF generator | ⏳ Belum |
| 9 | Unit tests | ⏳ Belum |
| 10 | Demo script | ⏳ Belum |

---

## 4. ISU YANG DISELESAIKAN

### Docker Pull Gagal (EOF) — ✅ RESOLVED

**Masalah:** Docker pull gagal dengan error `EOF`.

**Penyelesaian:** Tambah `registry-mirrors` dalam `C:\Users\Dr. Bai II\.docker\daemon.json`:

```json
{
  "dns": ["8.8.8.8", "8.8.4.4", "1.1.1.1"],
  "registry-mirrors": [
    "https://mirror.gcr.io",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}