# 03 — Formula Engine

**Last Updated:** 16 September 2026

---

## 1. FORMULA — 3-TIER

TIER 1: BASE (IAF MD 5:2023 + CAP 03-01)
Lookup base MD dari jadual standard.

TIER 2: ADJUSTMENT (NIOSHCert practice)
Rounding untuk "effective auditing".

TIER 3: DERIVED (IAF MD 5:2023)
Surveillance: ceil(1/3 × effective MD)
Recertification: ceil(2/3 × effective MD)

---

## 2. WORKFLOW

SYSTEM → Default calculation
   ↓
ATD OFFICER → Review / Override (justifikasi WAJIB)
   ↓
ATD MANAGER → Approve / Override / Reject
   ↓
RECORD → Simpan default + override + audit trail

Prinsip: Sistem cadang, manusia putus, sistem rekod.

---

## 3. JENIS OVERRIDE

| Jenis | Justifikasi Wajib |
|---|---|
| Complexity | Ya |
| Base MD | Ya |
| Effective MD | Ya |
| Stage Split | Ya |
| Surveillance MD | Ya |
| Recert MD | Ya |

---

## 4. PRINSIP DEFENDABILITY

Setiap calculation mesti boleh dipertahankan di hadapan auditor:

1. Input — apa klien bagi
2. Rule — apa sistem guna
3. Source — rujukan rasmi (IAF/CAP/ISO)
4. Override — apa ATD ubah, kenapa
5. Approval — siapa luluskan, bila
6. Audit Trail — full history

---
