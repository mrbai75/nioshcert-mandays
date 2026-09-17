# 12 — Questionnaire Analysis

**Last Updated:** 16 September 2026
**Version:** 1.0

---

## 1. OVERVIEW

Analisis 6 questionnaire NIOSHCert:
1. **Certification Application Form** (CAS 15-01 R1)
2. **OSHMS Questionnaire** (CAS 15-08 R02)
3. **EMS Questionnaire** (CAS 15-09)
4. **QMS Questionnaire** (CAS 15-10)
5. **ABMS Questionnaire** (CAS 15-16)
6. **ISMS Questionnaire** (CAS 15-19)

**Tujuan:** Faham apa field PIC isi, mapping ke database schema.

---

## 2. STRUKTUR FLOW
PIC Company
↓

Certification Application Form (CAS 15-01) — 45 soalan
↓

Specific Questionnaire (bergantung standard):

OSHMS (CAS 15-08) — 32 soalan

EMS (CAS 15-09) — 19 soalan

QMS (CAS 15-10) — 7 soalan

ABMS (CAS 15-16) — 16 soalan

ISMS (CAS 15-19) — 13 soalan
↓
Submit ke BD

text

**Nota:** Kalau Integrated (IMS) — gabung questionnaire, buang redundant.

---

## 3. CERTIFICATION APPLICATION FORM (CAS 15-01)

**45 soalan** — sama untuk semua standard.

### 3.1 Field Classification

| # | Soalan | Field | Guna |
|---|---|---|---|
| 1 | Name of Company | `company_name` | Header CR |
| 2 | Address | `address` | Header CR |
| 3 | Legal Status (ROC/ROB) | `legal_status` | Header CR |
| 4 | Type of Organisation | `org_type` | Info |
| 5 | Bumiputera? | `is_bumiputera` | Info |
| 6-9 | PIC Contact | `contact_*` | Contact |
| **10** | **Total Employees** | **`total_employees`** | **FTE** |
| **11** | **Management** | **`management_count`** | **FTE** |
| **12** | **Permanent Staffs** | **`permanent_count`** | **FTE** |
| **13** | **Contract Workers** | **`contract_count`** | **FTE (×0.5)** |
| **14** | **Repetitive** | **`repetitive_count`** | **FTE adjustment** |
| 15 | Outsource activities | `outsource_activities` | Info |
| **16-19** | **Shift operations** | **`shift_count`, `shift_employees`** | **FTE** |
| 20-22 | Sites/branches | `sites` | Multi-site |
| 23-27 | Multi-site eligibility | `multisite_eligible` | Info |
| 28 | Scope | `scope` | Header |
| **29** | **Industry Type** | **`industry_type`** | **Complexity** |
| 30 | Certifications required | `certifications` | Info |
| 31 | Questionnaire link | — | Navigation |
| 32 | ISO 37301 compliance risk | `compliance_risk` | Info |
| 33 | Target date | `target_date` | Info |
| 34-38 | MS documentation | `ms_documentation` | Info |
| 39 | Personnel for multi-MS | `multi_ms_personnel` | Info |
| 40-41 | Other ISO cert | `other_certs` | Info |
| 42-43 | Consultant | `consultant` | Info |
| 44 | Marketing source | `marketing_source` | Info |
| 45 | Declaration | `declaration_accepted` | Legal |

### 3.2 FTE Calculation (PENTING)

**Dari soalan 10-14, 16-19:**
FTE = Management + Permanent + Contract×(0.5) + Repetitive

text

**Contoh HYTRO:**
- Total Staff: 9
- Contract: 0
- **FTE = 9 + (0.5)(0) = 9** ✓

**Dari CR HYTRO:**
> "Working In Shift - Effective No. Of Staffs: Staff + (0.5)(Contracts)"

### 3.3 Industry Type (Soalan 29)

**40 pilihan industry:**
1. Agriculture, forestry and fishing
2. Mining and Quarrying
3. Food products, beverages and tobacco
4. Textiles and Textiles Products
5. Leather and leather products
6. Wood and wood products
7. Pulp, paper and paper products
8. Publishing companies
9. Printing companies
10. Manufacture of coke and refined petroleum products
11. Nuclear fuel
12. Chemicals, chemical products and fibre
13. Pharmaceuticals
14. Rubber and plastic products
15. Non-metallic mineral products
16. Concrete, cement, lime, plaster etc.
17. Basic metals and fabricated metal products
18. Machinery and equipment
19. Electrical and optical equipment
20. Shipbuilding
21. Aerospace
22. Other transport equipment
23. Manufacturing not elsewhere classified
24. Recycling
25. Electricity supply
26. Gas supply
27. Water supply
28. Construction
29. Wholesale and retail trade; Repair of motor vehicles...
30. Hotels and restaurant
31. Transport, Storage and Communication
32. Financial intermediation; real estate; renting
33. Information technology
34. Engineering services
35. Other services
36. Public administration
37. Education
38. Health and social work
39. Other social activities
40. Palm Oil Industry

**Field:** `industry_type` (VARCHAR) atau array (kalau multiple).

---

## 4. OSHMS QUESTIONNAIRE (CAS 15-08)

**32 soalan** — semua berkaitan OH&S risk.

### 4.1 Field Classification

| # | Soalan | Field | Complexity Indicator |
|---|---|---|---|
| 1 | Name of Company | `company_name` | — |
| 2 | Major Hazard? | `is_major_hazard` | HIGH |
| 3 | Hazardous chemicals | `hazardous_chemicals` | HIGH |
| 4-5 | Dangerous substance | `dangerous_substance` | HIGH |
| 6 | Asbestos removal | `asbestos_removal` | HIGH |
| 7 | Temporary site | `has_temporary_site` | Adjust |
| 8 | OSHMS varies across sites | `oshms_varies` | Adjust |
| 9-11 | Plant/machinery | `has_plant` | Risk |
| 12-15 | Manual handling/chemicals | `hazardous_work` | Risk |
| 16-20 | Asbestos, lead, radiation, noise, confined spaces | `exposures` | HIGH |
| 21 | Falls from heights | `fall_risk` | HIGH |
| 22-24 | Violence, animal, thermal | `environmental_risks` | Risk |
| 25-30 | Workforce factors | `workforce_factors` | FTE adjustment |
| 31 | Other info | `other_info` | — |
| 32 | Declaration | `declaration` | — |

### 4.2 Complexity Detection

**Auto-detect HIGH:**
- Major Hazard = Yes
- Hazardous chemicals = Yes
- Asbestos = Yes
- Falls from heights = Yes
- Confined spaces = Yes

**Auto-detect MEDIUM:**
- Plant/machinery = Yes
- Manual handling = Yes
- Some exposures

**Auto-detect LOW:**
- Office-based, no hazard

**ATD boleh override.**

---

## 5. EMS QUESTIONNAIRE (CAS 15-09)

**19 soalan** — environmental aspects.

### 5.1 Field Classification

| # | Soalan | Field |
|---|---|---|
| 1 | Name of Company | `company_name` |
| 2 | Emissions/releases/discharges | `emissions` |
| 3 | Treatment facilities | `treatment_facilities` |
| 4 | Pollutants | `pollutants` |
| 5 | Environmental review | `env_review` |
| 6 | Environmental audit | `env_audit` |
| 7 | Environmental statement | `env_statement` |
| 8 | Environmental policy | `env_policy` |
| 9 | Environmental objectives | `env_objectives` |
| 10 | Environmental programs | `env_programs` |
| 11 | EMS manual | `ems_manual` |
| 12 | Certified QMS | `certified_qms` |
| 13 | Emission substance sheet | `emission_sheet` |
| 14 | Waste management concept | `waste_mgmt` |
| 15 | Safety analysis | `safety_analysis` |
| 16 | Fire protection | `fire_protection` |
| 17 | Technical expert opinions | `expert_opinions` |
| 18 | Register on laws | `laws_register` |
| 19 | Declaration | `declaration` |

### 5.2 Complexity Detection

**Auto-detect HIGH:**
- Mining, oil & gas, chemicals, construction
- Significant emissions
- Hazardous waste

**Auto-detect MEDIUM:**
- Manufacturing
- Some emissions

**Auto-detect LOW:**
- Office-based
- Few environmental aspects

**Limited:**
- Corporate, telecom, education

**Special Case:**
- Nuclear, public admin — manual review

---

## 6. QMS QUESTIONNAIRE (CAS 15-10)

**7 soalan** — simple.

### 6.1 Field Classification

| # | Soalan | Field |
|---|---|---|
| 1 | Name of Company | `company_name` |
| 2 | Scope | `scope` |
| 3 | Design included? | `design_included` |
| 4 | Products/services | `products_services` |
| 5 | Other products | `other_products` |
| 6 | Sub-contracted | `subcontracted` |
| 7 | Declaration | `declaration` |

### 6.2 Complexity

**QMS tiada complexity** — FTE → days sahaja.

Risk category (High/Med/Low) — reference sahaja (untuk auditor competence).

---

## 7. ABMS QUESTIONNAIRE (CAS 15-16)

**16 soalan** — bribery risk.

### 7.1 Field Classification

| # | Soalan | Field | Complexity Indicator |
|---|---|---|---|
| 1 | Name of Company | `company_name` | — |
| 2 | Scope | `scope` | — |
| 3 | Products/services | `products_services` | — |
| 4 | Sub-contracted | `subcontracted` | Risk |
| 5 | Publicly listed? | `is_listed` | Risk |
| 6 | Audited financially? | `is_audited` | Risk |
| **7** | **Operations in other countries?** | **`has_intl_operations`** | **CPI factor** |
| **8** | **High corruption risk country?** | **`high_corruption_country`** | **HIGH factor** |
| **9** | **Personnel history (bribery, fraud, dll)** | **`personnel_history`** | **HIGH factor** |
| **10** | **Legal proceedings?** | **`legal_proceedings`** | **HIGH factor** |
| 11 | Details | `legal_details` | — |
| **12** | **Outstanding cases?** | **`outstanding_cases`** | **HIGH factor** |
| 13 | Details | `outstanding_details` | — |
| 14 | Compliance dept? | `has_compliance` | Risk |
| 15 | Contractors/intermediaries? | `has_intermediaries` | Risk |
| 16 | Declaration | `declaration` | — |

### 7.2 Complexity Detection

**Auto-detect HIGH:**
- Q8: High corruption country = Yes
- Q9: Personnel history = Yes (any)
- Q10: Legal proceedings = Yes
- Q12: Outstanding cases = Yes

**Auto-detect MEDIUM:**
- CPI 31-59
- Sector: IT, Banking, Telecom, dll

**Auto-detect LOW:**
- CPI ≥ 60
- Sector: Agriculture, SMEs

**ATD boleh override.**

### 7.3 Nota Penting

**Dari CR HYTRO:**
- Justifikasi guna **CPI 50** (julat 31-59) → HIGH
- **Tapi** CAP Table 3.3 cakap CPI 31-59 → MEDIUM

**Ini percanggahan.** Lihat `docs/11-nioshcert-questions.md` Soalan 2.

---

## 8. ISMS QUESTIONNAIRE (CAS 15-19)

**13 soalan** — ISMS adjustment factors.

### 8.1 Field Classification

| # | Soalan | Field | Guna |
|---|---|---|---|
| 1 | Name of Company | `company_name` | — |
| **2** | **Critical business sectors** | **`critical_sector`** | **Business factor (C.2)** |
| **3** | **Process complexity** | **`process_complexity`** | **Business factor (C.2)** |
| **4** | **MS establishment level** | **`ms_level`** | **Business factor (C.2)** |
| **5** | **IT infrastructure complexity** | **`it_complexity`** | **IT factor (C.3)** |
| **6** | **Outsourcing dependency** | **`outsourcing`** | **IT factor (C.3)** |
| **7** | **IS development** | **`is_development`** | **IT factor (C.3)** |
| 8 | Risk assessment process | `risk_process` | Info |
| 9 | Risk treatment | `risk_treatment` | Info |
| 10 | Authentication info | `auth_info` | Info |
| 11 | Mobile/teleworking | `mobile_process` | Info |
| 12 | Sub-contracted | `subcontracted` | Info |
| 13 | Declaration | `declaration` | — |

### 8.2 Complexity Detection

**Soalan 2-7 → Business + IT factors**

**Business Score (C.2):**
- Type of business (1-3)
- Process & tasks (1-3)
- Level of MS (1-3)
- Number of locations (1-3)
- Other MS certification (1-3)
- **Total: 5-15**

**IT Score (C.3):**
- IT infrastructure (1-3)
- Outsourcing (1-3)
- IS development (1-3)
- **Total: 3-9**

**Table C.4 — Impact:**
- Business + IT → Adjustment %

**Skip dulu (Fasa 2).**

---

## 9. MAPPING KE DATABASE

### 9.1 Field Mapping

| Questionnaire Field | Database Table | Column |
|---|---|---|
| Application Form fields | `applications` | Column + JSONB |
| FTE breakdown | `applications` | `fte_breakdown` (JSONB) |
| Questionnaire answers | `applications` | `questionnaire` (JSONB) |
| Industry type | `applications` | `industry_type` |
| CPI score | `applications` | `cpi_score` |
| Complexity | `application_standards` | `complexity_level` |

### 9.2 Questionnaire JSONB Structure

```json
{
  "applicationForm": {
    "companyName": "...",
    "totalEmployees": 9,
    "managementCount": 2,
    "permanentCount": 7,
    "contractCount": 0,
    "industryType": "(28) Construction, (33) Information Technology"
  },
  "ABMS": {
    "publiclyListed": false,
    "auditedFinancially": true,
    "operationsInOtherCountries": false,
    "highCorruptionRiskCountry": false,
    "personnelHistory": {
      "bribery": false,
      "fraud": false,
      "legalProceedings": false
    },
    "complianceDepartment": true,
    "contractorsIntermediaries": true
  }
}
10. INTEGRATED (IMS) HANDLING
Untuk Integrated Management System (IMS):

Contoh: EMS + QMS integrated

text
Application Form (sekali)
   ↓
EMS Questionnaire
QMS Questionnaire
   ↓
Gabung — buang redundant:
- Name of Company — tanya sekali
- Scope — tanya sekali
- Sub-contracted — tanya sekali
- Declaration — tanya sekali
   ↓
Satu form output
Field is_integrated dalam application_standards — flag ini.

11. AUTO-DETECT COMPLEXITY
11.1 Logic
text
1. User isi questionnaire
2. Sistem baca jawapan
3. Sistem auto-detect complexity berdasarkan:
   - Sector (dari industry_type)
   - CPI score (untuk ABMS)
   - Risk factors (dari questionnaire)
4. Sistem suggest complexity
5. ATD boleh override
6. Manager boleh amend + approve
11.2 Priotity
text
1. Regulatory action → HIGH (highest priority)
2. Risk factors → HIGH
3. CPI score → HIGH/MEDIUM/LOW
4. Sector → HIGH/MEDIUM/LOW
5. Ambil TERTINGGI
12. NEXT STEPS
#	Item	Priority
1	Implement auto-detect complexity	High
2	Buat dynamic form (frontend)	High
3	Seed industry_type master	Medium
4	Integrate questionnaire ke backend API	High
5	ISMS questionnaire + logic	Fasa 2
Analisis questionnaire siap. Mapping ke database siap. Auto-detect logic siap.