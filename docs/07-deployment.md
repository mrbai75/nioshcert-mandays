# 07 — Deployment Strategy

**Last Updated:** 16 September 2026

---

## 1. PRINSIP

| Prinsip | Keterangan |
|---|---|
| Development di Localhost | Fokus coding, iterasi cepat, kos sifar |
| Deploy Selepas Stabil | Kurang risiko, deployment lancar |
| Design Cloud-Ready | 12-Factor App, Dockerize, stateless |
| Preview Sebelum Demo | NIOSHCert test awal, feedback cycle pendek |

---

## 2. FASA DEPLOYMENT

| Fasa | Platform | Tujuan | Masa |
|---|---|---|---|
| 1. Development | Localhost | Coding, test | 3-4 minggu |
| 2. Internal Test | Localhost | Test semua case | 1 minggu |
| 3. Deploy Cloud | Azure | Demo rasmi | 2-3 hari |
| 4. NIOSHCert Preview | Cloud URL | Test & feedback | 1-2 minggu |
| 5. Demo Rasmi | Cloud URL | Present kepada NIOSHCert | 1 hari |

**Jumlah:** 5-6 minggu dari mula sampai demo rasmi.

---

## 3. DESIGN CLOUD-READY DARI AWAL

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

**Dengan design ini**, deploy ke cloud nanti cuma tukar config — bukan refactor.

---

## 4. PILIHAN CLOUD

| Platform | Kelebihan | Kekurangan | Kos |
|---|---|---|---|
| Azure Container Apps | Sesuai "Azure preferred" NIOSHCert | Setup lebih kompleks | RM50-200/bulan |
| Railway | Setup paling senang | Bukan Azure | RM30-100/bulan |
| Vercel + Railway | Frontend pantas, backend fleksibel | 2 platform | RM30-100/bulan |
| VPS (DigitalOcean) | Kawalan penuh | Perlu maintenance | RM30-60/bulan |

**Cadangan:** Azure (sebab NIOSHCert prefer Azure). Railway sebagai alternatif untuk demo cepat.

---

## 5. TOOLS UNTUK PREVIEW AWAL

### Ngrok (Optional)

Untuk NIOSHCert test awal **sebelum** cloud deploy:

```bash
# Run backend & frontend di laptop
docker compose up -d
pnpm dev

# Run ngrok
ngrok http 3000

# Dapat URL: https://abc123.ngrok.io
# Hantar ke NIOSHCert untuk preview