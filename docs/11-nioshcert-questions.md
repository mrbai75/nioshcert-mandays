# 11 — NIOSHCert Clarification Questions

**Last Updated:** 16 September 2026
**Version:** 1.0
**Status:** DRAFT — Kumpul soalan untuk clarify dengan NIOSHCert

---

## TUJUAN

Dokumen ini mengandungi **soalan-soalan clarification** untuk NIOSHCert.

**Sebab perlu clarify:**
1. **Percanggahan** antara IAF (antarabangsa) vs CAP (internal NIOSHCert)
2. **Amalan NIOSHCert** (dari CR) mungkin berbeza
3. **CAP mungkin outdated** — perlu update ikut IAF revision
4. **Defendability** — perlu rekod keputusan

**Hierarki dokumen:**
IAF MD 5:2023 (antarabangsa — authority)
↓
CAP 03-01 (NIOSHCert internal — perlu comply IAF)
↓
Amalan NIOSHCert (CR, questionnaire, dll)

text

**Nota dari NIOSHCert:** CAP perlu review & update ikut IAF revision. Mungkin CAP belum di-revise.

---

## FORMAT SOALAN

Setiap soalan ada:
1. **Rujukan** — apa IAF/CAP cakap
2. **Amalan** — apa NIOSHCert buat (dari CR/dokumen)
3. **Percanggahan** — apa beza
4. **Soalan** — apa kita nak tahu
5. **Kesan ke Sistem** — kalau tak betul, apa jadi

---

## SOALAN 1: Rounding Rule

### Rujukan
**IAF MD 5:2023 §2.2.3** — "Adjust to **nearest half day**"
- 5.3 → 5.5
- 5.2 → 5.0
- 3.5 → 3.5 (kekal)

### Amalan
**CR HYTRO VISTA (Page 2):**
> "3.5 MD → 4.0 MD (for effective auditing)"

Base MD 3.5 dibundarkan ke 4.0 (hari penuh) — **bukan** 3.5.

### Percanggahan
- IAF cakap 3.5 kekal 3.5 (nearest half day)
- NIOSHCert naik ke 4.0 (ceil ke hari penuh)

### Soalan
1. Adakah NIOSHCert guna rule berbeza dari IAF?
2. Apakah dasar "effective auditing" NIOSHCert?
3. Ada dokumen internal NIOSHCert yang define ini?
4. Kalau base 3.1 — jadi 3.5 atau 4.0?
5. Kalau base 3.6 — jadi 3.5 atau 4.0?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/formulas/adjustment.ts`
- Kalau salah, **semua output** off by 0.5-1.0 hari
- Test `hytro-vista.test.ts` expect 4.0 — mungkin salah

### Cadangan Sementara
Kekal guna `ceil()` — sebab CR HYTRO guna 4.0. Clarify kemudian.

---

## SOALAN 2: ABMS Complexity — CPI 50

### Rujukan
**CAP 03-01 (R1), Table 3.3:**
- CPI ≤ 30 → **HIGH**
- CPI 31-59 → **MEDIUM**
- CPI ≥ 60 → **LOW**

**IAF MD 5:2023:** ABMS tidak ada dalam skop IAF MD 5. ABMS guna ISO 37001 sendiri.

### Amalan
**CR HYTRO VISTA (Page 2):**
> "Justification High Risk:
> a) Organisations located in countries with a CPI score between 31 to 59.
>    Malaysia score was 50 based CPI Index."

CPI 50 (dalam julat 31-59) → justifikasi **HIGH** (bukan MEDIUM).

### Percanggahan
- CAP Table 3.3: CPI 31-59 → MEDIUM
- CR HYTRO: CPI 50 → HIGH

### Soalan
1. Adakah ini **ATD override** berdasarkan professional judgment?
2. Atau ada rule tambahan — contoh: business sector construction → HIGH?
3. Untuk system, patut default MEDIUM dan ATD override HIGH — betul?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/standards/abms.ts`
- ABMS complexity determination
- Test HYTRO expect default MEDIUM — mungkin betul

### Cadangan Sementara
Kekal guna CAP Table 3.3 (CPI 50 → MEDIUM). ATD override ke HIGH. Clarify.

---

## SOALAN 3: Sector Construction untuk ABMS

### Rujukan
**CAP 03-01 (R1), Table 3.3:** Sector list untuk ABMS.
- **HIGH:** CPI ≤ 30 OR regulatory action
- **MEDIUM:** CPI 31-59 OR sector (IT, Banking, dll)
- **LOW:** CPI ≥ 60 OR sector (Agriculture, SMEs)

**"Construction"** — **tidak tersenarai** dalam mana-mana kategori.

### Amalan
**CR HYTRO VISTA (Page 2):**
> "Business Sectors: Public works contracts and construction"

Construction dijustifikasi sebagai **HIGH risk** — tapi tak tersenarai dalam Table 3.3.

### Percanggahan
- CAP Table 3.3: Construction tiada
- CR HYTRO: Construction → HIGH

### Soalan
1. Adakah NIOSHCert guna **sector list tambahan** (bukan dalam CAP)?
2. Atau ini ATD professional judgment?
3. Untuk sector yang tak match Table 3.3 — default apa? LOW? MEDIUM? Throw error?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/standards/abms.ts`
- Sector matching logic
- Kalau construction tiada → sistem tak detect HIGH

---

## SOALAN 4: FTE > 10,700

### Rujukan
**IAF MD 5:2023 (Page 21, 29):**
> ">10700 — Follow progression above"

**Tidak ada formula exact** untuk FTE > 10,700.

### Amalan
- Tak ada contoh dalam CR
- Kita andaikan: case-by-case, ATD manual input

### Percanggahan
- IAF cakap "follow progression" — tapi tak define
- Kita tak tahu apa amalan NIOSHCert

### Soalan
1. Ada formula progression NIOSHCert guna?
2. Contoh: +1 hari per 1000 FTE? Atau lain?
3. Untuk FTE > 10,700 — case-by-case dengan ATD judgment?
4. Untuk system, throw error dan minta manual input — betul?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/formulas/base.ts`
- Kalau ada formula, kita implement
- Kalau tiada, kita kekal "manual input"

---

## SOALAN 5: Stage Split

### Rujukan
**IAF MD 5:2023:** Tidak define stage split ratio.

**CAP 03-01:** Tidak define stage split ratio.

### Amalan
**CR HYTRO VISTA (Page 2):**
> Stage 1 Audit: 1.0 MD
> Stage 2 Audit: 3.0 MD
> Total: 4.0 MD
> Ratio: 25:75

### Percanggahan
- IAF/CAP: tak define
- CR HYTRO: guna 25:75

### Soalan
1. NIOSHCert ada default stage split ratio? (30:70? 25:75? 20:80?)
2. Ada minimum untuk Stage 1? (contoh: min 0.5 MD)
3. Ada guideline untuk Stage 2?
4. Untuk system, cadang 30:70 sebagai default dan ATD override — betul?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/formulas/derived.ts`
- Stage split suggestion
- Test HYTRO expect 1.2/2.8 (30:70) — mungkin salah

---

## SOALAN 6: CAP vs IAF — Hierarchy

### Rujukan
**Dari NIOSHCert:**
> "CAP tu niosh punya internal doc process yg perlu comply to IAF doc. CAP doc perlu review dan update according to IAF doc revision. Mungkin CAP doc not revised yet."

### Amalan
- CAP 03-01 mungkin outdated
- CR HYTRO guna amalan semasa

### Soalan
1. Kalau CAP percanggah IAF — mana menang? (IAF, kan?)
2. Ada timeline untuk CAP update?
3. Untuk system, mana jadi **default** — CAP atau IAF?
4. Kalau amalan NIOSHCert berbeza dari IAF — rekod sebagai apa?

### Kesan ke Sistem
- Semua code
- Dokumentasi
- Audit trail

### Cadangan Sementara
Kekal CAP dulu (untuk compliance internal). Rekod perbezaan. Clarify kemudian.

---

## SOALAN 7: Table EMS 1 — Special Case

### Rujukan
**IAF MD 5:2023 (Page 28):**
> "The provisions specified in this document are based on **five primary complexity categories**"

**Kategori:**
- High
- Medium
- Low
- Limited
- **Special**

**Table EMS 1** ada 4 column (High, Med, Low, Lim) — **Special** tiada.

### Amalan
- Code kita: Special Case → throw error (manual review)

### Percanggahan
- IAF: 5 kategori
- Table EMS 1: 4 column

### Soalan
1. Special Case — manual atau ada table?
2. Untuk system, throw error — betul?

### Kesan ke Sistem
- Code: `packages/formula-engine/src/standards/ems.ts`
- Sudah handle — throw error

---

## SOALAN 8: Questionnaire Dynamic

### Rujukan
**Questionnaire NIOSHCert:**
- Application Form (CAS 15-01)
- OSHMS Questionnaire (CAS 15-08)
- EMS Questionnaire (CAS 15-09)
- QMS Questionnaire (CAS 15-10)
- ABMS Questionnaire (CAS 15-16)
- ISMS Questionnaire (CAS 15-19)

### Amalan
- Questionnaire bergantung pada standard yang dipilih
- Untuk Integrated (IMS) — gabung questionnaire, buang redundant

### Soalan
1. Untuk Integrated (IMS) — macam mana handle redundant questions?
2. Ada questionnaire yang Wajib vs Optional?
3. Kalau PIC pilih 3 standard — questionnaire mana yang keluar?

### Kesan ke Sistem
- Frontend UI (dynamic form)
- Database schema (JSONB questionnaire)

---

## SOALAN 9: Complexity Auto vs Manual

### Rujukan
- CAP 03-01 Table 1.2, 3.2, 3.3 — sector → complexity mapping

### Amalan
- Sistem boleh auto-detect dari questionnaire answers
- ATD boleh override

### Soalan
1. Betul ke NIOSHCert amalkan "auto + override"?
2. Atau ATD yang pilih complexity manual?
3. Kalau auto, apa logic yang NIOSHCert guna?

### Kesan ke Sistem
- ABMS complexity logic
- OSHMS complexity logic
- EMS complexity logic

### Cadangan Sementara
Auto based on CAP + IAF. ATD boleh override. Clarify.

---

## SOALAN 10: ISMS (ISO 27001)

### Rujukan
**ISO/IEC 27006, Annex B:**
- Table B.1 — base audit time
- Table C.2, C.3, C.4 — adjustment factors

### Amalan
- ISMS skip dulu (Fasa 2)
- Sebab: Matrix logic, bukan simple lookup

### Soalan
1. Untuk Table C.4 — range (contoh: -5% to -10%) — macam mana pilih?
2. Midpoint? Min? Max? ATD pilih?
3. Ada contoh real ISMS calculation?

### Kesan ke Sistem
- ISMS implementation (Fasa 2)
- Matrix logic

---

## CARA GUNA DOKUMEN INI

1. **Kumpul soalan** — bila jumpa percanggahan, tambah dalam fail ni
2. **Compile** — bila dah cukup, kemas
3. **Hantar ke NIOSHCert** — bila ada sesi perbincangan
4. **Update** — bila NIOSHCert bagi jawapan, update code + docs
5. **Rekod** — simpan sebagai audit trail

---

## CHANGE LOG

| Versi | Tarikh | Perubahan |
|---|---|---|
| 1.0 | 16 Sep 2026 | Versi pertama — 10 soalan |

---

**Dokumen ini untuk perbincangan dengan NIOSHCert. Bukan untuk luar.**