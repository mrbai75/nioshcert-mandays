# 05 — Example Case: HYTRO VISTA SDN BHD

**Last Updated:** 16 September 2026

---

## 1. INPUT

| Field | Value |
|---|---|
| Client | HYTRO VISTA SDN BHD |
| Standard | ISO 37001 (ABMS) |
| Application | New Application |
| Certification | Single |
| FTE | 9 |
| Sites | 1 (HQ) |
| Country | Malaysia (CPI 50) |
| Sector | Construction + IT Infrastructure |
| Consultant | None |
| Threat to Impartiality | None |

---

## 2. SYSTEM DEFAULT vs OVERRIDE

| Item | Default | Override | Final |
|---|---|---|---|
| Complexity | Medium | High | High |
| Base MD | 3.0 | 3.5 | 3.5 |
| Effective MD | 3.0 | 4.0 | 4.0 |
| Stage 1 | 0.9 | — | 1.0 |
| Stage 2 | 2.1 | — | 3.0 |
| Surveillance | 1.0 | — | 2.0 |
| Recert | 2.0 | — | 3.0 |

---

## 3. JUSTIFIKASI HIGH COMPLEXITY

- Sektor pembinaan high-risk (public works contracts)
- CPI Malaysia 50 (mid-range)
- Klien sendiri declare High Risk

---

## 4. RUJUKAN

- CAP 03-01 (R1), Page 1 (complexity adjustment)
- CAP 03-01 (R1), Table 3.3 (ABMS complexity)
- IAF MD 5:2023, Table 3.1 (audit duration)

---

## 5. FORMULA PENGIRAAN

TIER 1 (Base):
FTE 9 → range 6-10 → High → 3.5 MD

TIER 2 (Effective):
3.5 → round up → 4.0 MD

TIER 3 (Derived):
Stage 1 = 1.0 MD (ATD decide)
Stage 2 = 3.0 MD (ATD decide)
Surveillance = ceil(1/3 × 4.0) = 2.0 MD
Recert = ceil(2/3 × 4.0) = 3.0 MD

---

## 6. PELAJARAN

1. Default system cadang Medium — tapi ATD boleh override ke High dengan justifikasi
2. Rounding 3.5 → 4.0 adalah untuk "effective auditing"
3. Stage split ditentukan ATD (bukan auto 30:70 atau 25:75)
4. Setiap override mesti ada justifikasi + rujukan + approval
5. Semua direkod untuk audit trail

---
