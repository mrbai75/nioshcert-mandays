# CAS 15-01 (R1) — Certification Application Form - ISO

**Standard:** Common (semua standard: OSHMS, QMS, EMS, ABMS, ISMS)
**CAS Number:** CAS 15-01 (R1)
**Bilangan Soalan:** 45
**Status:** Draft

**Nota:**
- Setiap soalan traceable ke PDF CAS 15-01 (R1)
- Application Form diisi **sekali** oleh PIC — walaupun untuk IMS (multi-standard)
- `Guna: Kiraan` = input untuk formula-engine
- `Guna: Rekod` = simpan sahaja untuk auditor
- FTE calculation guna Q10-Q19
- `[PERLU SAHKAN]` = tunggu pengesahan NIOSHCert

---

## Section 1: Company Information

### Q1
- **Source:** CAS 15-01, Q1
- **Field:** `company_name`
- **Type:** `text`
- **Label:** Name of Company/Organisation
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q2
- **Source:** CAS 15-01, Q2
- **Field:** `address`
- **Type:** `textarea`
- **Label:** Address
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q3
- **Source:** CAS 15-01, Q3
- **Field:** `legal_status`
- **Type:** `text`
- **Label:** Legal Status (R.O.C. No. or R.O.B. No.)
- **Description:** Please provide us a copy of Registration of Company's Certificate and Corporate Information via email bizdev@nioshcert.com.my.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q4
- **Source:** CAS 15-01, Q4
- **Field:** `org_type`
- **Type:** `select`
- **Label:** Type of Organisation
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Government
  - Private
  - Other

### Q5
- **Source:** CAS 15-01, Q5
- **Field:** `is_bumiputera`
- **Type:** `boolean`
- **Label:** Is your organization Bumiputera?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

---

## Section 2: PIC Contact

### Q6
- **Source:** CAS 15-01, Q6
- **Field:** `contact_name`
- **Type:** `text`
- **Label:** Proposal to be issued to (please state full name as per IC)
- **Description:** Example: Mr./Ms./Pn./Dato'/Dr./Ir. Ali Bin Abu
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q7
- **Source:** CAS 15-01, Q7
- **Field:** `contact_designation`
- **Type:** `text`
- **Label:** Designation
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q8
- **Source:** CAS 15-01, Q8
- **Field:** `contact_phone`
- **Type:** `text`
- **Label:** H/Phone No
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q9
- **Source:** CAS 15-01, Q9
- **Field:** `contact_email`
- **Type:** `text`
- **Label:** Email
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

---

## Section 3: FTE Breakdown (PENTING — untuk kiraan)

### Q10
- **Source:** CAS 15-01, Q10
- **Field:** `total_employees`
- **Type:** `number`
- **Label:** Total Number of Employees
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE (total)
- **Validation:**
  - Type: integer
  - Min: 1

### Q11
- **Source:** CAS 15-01, Q11
- **Field:** `management_count`
- **Type:** `number`
- **Label:** Number of Employees (Management)
- **Description:** Example: Manager/ General Manager/ Director
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE (weight ×1.0)

### Q12
- **Source:** CAS 15-01, Q12
- **Field:** `permanent_count`
- **Type:** `number`
- **Label:** Number of Employees (Permanent Staffs For Head Office and/or Branches)
- **Description:** Example: Engineer/ Executive/ Officer
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE (weight ×1.0)

### Q13
- **Source:** CAS 15-01, Q13
- **Field:** `contract_count`
- **Type:** `number`
- **Label:** Number of Employees (Contract Workers For Head Office and/or Branches)
- **Description:** Example: Cleaner/ Security Guard/ Project Site Workers
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE (weight ×0.5)
- **Formula:** FTE = contract × 0.5

### Q14
- **Source:** CAS 15-01, Q14
- **Field:** `repetitive_count`
- **Type:** `textarea`
- **Label:** Number of Employees personnel perform certain activities/positions that are considered repetitive
- **Description:** Similar or repetitive process within scope (e.g. cleaners, security, transport, sales, call centers, etc.). Example Answer; Admin/Clerk: 10 staff Operator same production line: 50 staff Security: 20 staff Cleaner: 7 staff Driver: 5 staff Others: 30 staff
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE [PERLU SAHKAN]

### Q15
- **Source:** CAS 15-01, Q15
- **Field:** `outsource_activities`
- **Type:** `textarea`
- **Label:** Please state the outsource activities (if any)
- **Description:** Example: Logistic/ Transportation/ Design/ Packaging
- **Required:** No
- **Applies To:** ALL
- **Guna:** Rekod

---

## Section 4: Shift Operations

### Q16
- **Source:** CAS 15-01, Q16
- **Field:** `has_shift`
- **Type:** `boolean`
- **Label:** Does operation run in shift
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — FTE adjustment [PERLU SAHKAN]
- **Options:**
  - Yes
  - No

### Q17
- **Source:** CAS 15-01, Q17
- **Field:** `shift1_count`
- **Type:** `number`
- **Label:** If it's "yes", please indicate the number of employee per shift: 1st shift
- **Required:** No
- **Applies To:** ALL
- **Guna:** Kiraan — FTE [PERLU SAHKAN]
- **Depends On:** Q16 = Yes

### Q18
- **Source:** CAS 15-01, Q18
- **Field:** `shift2_count`
- **Type:** `number`
- **Label:** 2nd shift
- **Required:** No
- **Applies To:** ALL
- **Guna:** Kiraan — FTE [PERLU SAHKAN]
- **Depends On:** Q16 = Yes

### Q19
- **Source:** CAS 15-01, Q19
- **Field:** `shift3_count`
- **Type:** `number`
- **Label:** 3rd shift
- **Required:** No
- **Applies To:** ALL
- **Guna:** Kiraan — FTE [PERLU SAHKAN]
- **Depends On:** Q16 = Yes

---

## Section 5: Sites / Branches

### Q20
- **Source:** CAS 15-01, Q20
- **Field:** `include_sites`
- **Type:** `boolean`
- **Label:** Do you want to include your sites/branches into the certification? (optional)
- **Description:** a) Permanent Site - Site where an organization performs work on a continuing basis. b) Temporary Site - Site where an organization performs specific work for a finite period. c) Virtual Site - Virtual location using on-line environment.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — Sites count [PERLU SAHKAN]
- **Options:**
  - Yes
  - No

### Q21
- **Source:** CAS 15-01, Q21
- **Field:** `sites_count`
- **Type:** `number`
- **Label:** Please indicate total number of sites/branches
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — Sites count [PERLU SAHKAN]

### Q22
- **Source:** CAS 15-01, Q22
- **Field:** `sites_details`
- **Type:** `textarea`
- **Label:** Please indicate address, no. of employees and type of site for each branches
- **Description:** Please fill up the sites/branches details in multi sites excel spreadsheet provided, kindly click the link https://bit.ly/3JPzy8i and email to bizdev@nioshcert.com.my.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

---

## Section 6: Multi-Site Eligibility (IAF MD1:2023)

### Q23
- **Source:** CAS 15-01, Q23
- **Field:** `multisite_similar_processes`
- **Type:** `boolean`
- **Label:** The processes at all branches are being operated in similar methods and procedures. AND/OR The processes in each branch are not similar but are clearly linked
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod (eligibility check)
- **Options:**
  - Yes
  - No

### Q24
- **Source:** CAS 15-01, Q24
- **Field:** `multisite_central_mgmt`
- **Type:** `boolean`
- **Label:** The organization's management system shall be under controlled and administered plan under head office and be subject to central management review
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q25
- **Source:** CAS 15-01, Q25
- **Field:** `multisite_internal_audit`
- **Type:** `boolean`
- **Label:** All the relevant branches shall be subject to the organization's internal audit program and all shall have been audited prior to the certification body, NIOSH Certification starting its audit.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q26
- **Source:** CAS 15-01, Q26
- **Field:** `multisite_data_collection`
- **Type:** `boolean`
- **Label:** The organization's is able to collect and analyze data from all branches and authorize to initiate organizational change if required.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q27
- **Source:** CAS 15-01, Q27
- **Field:** `multisite_excel`
- **Type:** `text`
- **Label:** For ISO Multi Sites Certification - Please fill up the sites/branches details in multi sites excel spreadsheet provided
- **Description:** Once it has been completely fill in, please email the list via email bizdev@nioshcert.com.my.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

---

## Section 7: Scope & Industry

### Q28
- **Source:** CAS 15-01, Q28
- **Field:** `scope`
- **Type:** `textarea`
- **Label:** Scope of certification (Nature of business)
- **Description:** Example: 1. Manufacturing of table 2. Provision of project management
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q29
- **Source:** CAS 15-01, Q29
- **Field:** `industry_type`
- **Type:** `multiselect`
- **Label:** Type of Industry (Please tick the most relevant based on your nature of business)
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — Complexity (sector-based) [PERLU SAHKAN]
- **Options:**
  - Agriculture, forestry and fishing
  - Mining and Quarrying
  - Food products, beverages and tobacco
  - Textiles and Textiles Products
  - Leather and leather products
  - Wood and wood products
  - Pulp, paper and paper products
  - Publishing companies
  - Printing companies
  - Manufacture of coke and refined petroleum products
  - Nuclear fuel
  - Chemicals, chemical products and fibre
  - Pharmaceuticals
  - Rubber and plastic products
  - Non-metallic mineral products
  - Concrete, cement, lime, plaster etc.
  - Basic metals and fabricated metal products
  - Machinery and equipment
  - Electrical and optical equipment
  - Shipbuilding
  - Aerospace
  - Other transport equipment
  - Manufacturing not elsewhere classified
  - Recycling
  - Electricity supply
  - Gas supply
  - Water supply
  - Construction
  - Wholesale and retail trade; Repair of motor Vehicles, motorcycles and personal and household goods
  - Hotels and restaurant
  - Transport, Storage and Communication
  - Financial intermediation; real estate; renting
  - Information technology
  - Engineering services
  - Other services
  - Public administration
  - Education
  - Health and social work
  - Other social activities
  - Palm Oil Industry

### Q30
- **Source:** CAS 15-01, Q30
- **Field:** `certifications_required`
- **Type:** `multiselect`
- **Label:** Certification(s) Required
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Kiraan — determine which questionnaire + formula
- **Options:**
  - CAS 15-08 OHS Management Systems (OSHMS)
  - CAS 15-09 Environmental Management Systems (EMS)
  - CAS 15-10 Quality Management Systems (QMS)
  - CAS 15-11 Food Safety Management Systems
  - CAS 15-14 HACCP / HACCP Codex
  - CAS 15-16 Anti-Bribery Management Systems (ABMS)
  - CAS 15-17 Road Traffic Safety Management Systems
  - CAS 15-18 Adventure Tourism Safety Management Systems
  - CAS 15-19 Information Security Management Systems (ISMS)
  - CAS 15-23 Shariah-Based Quality Management Systems
  - CAS 15-24 Energy Management Systems
  - CAS 15-25 Medical Device Quality Management System
  - CAS 15-26 Business Management System

---

## Section 8: Additional Info

### Q31
- **Source:** CAS 15-01, Q31
- **Field:** `questionnaire_links`
- **Type:** `text`
- **Label:** Questionnaire (info sahaja)
- **Description:** Please select and complete the relevant questionnaire based on the applied certification(s)
- **Required:** No
- **Applies To:** ALL
- **Guna:** Rekod (navigation)

### Q32
- **Source:** CAS 15-01, Q32
- **Field:** `iso_37301_risk`
- **Type:** `textarea`
- **Label:** For ISO 37301, Please state the type of compliance risk involved in your organization
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q33
- **Source:** CAS 15-01, Q33
- **Field:** `target_date`
- **Type:** `text`
- **Label:** When do you plan to receive the certificate? (estimation)
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q34
- **Source:** CAS 15-01, Q34
- **Field:** `ms_documentation_established`
- **Type:** `boolean`
- **Label:** Has your management system documentation been established?
- **Description:** Example: Policy, manual and relevant procedures
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q35
- **Source:** CAS 15-01, Q35
- **Field:** `ms_documentation_type`
- **Type:** `select`
- **Label:** Type of management system documentation established?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Individual
  - Integrated

### Q36
- **Source:** CAS 15-01, Q36
- **Field:** `manual_integrated`
- **Type:** `boolean`
- **Label:** Has your manual and relevant procedures established in integrated?
- **Description:** e.g: ISO 45001 & ISO 14001 integrated into one manual. Please provide copy of integrated manual & copy of masterlist
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q37
- **Source:** CAS 15-01, Q37
- **Field:** `policy_integrated`
- **Type:** `boolean`
- **Label:** Has your policy established in integrated?
- **Description:** Please provide copy of integrated policy
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q38
- **Source:** CAS 15-01, Q38
- **Field:** `internal_audit_integrated`
- **Type:** `boolean`
- **Label:** Is there internal audit and management review for all applied scheme been carried out as integrated?
- **Description:** e.g. ISO 45001 & ISO 14001 integrated into one internal audit programme.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q39
- **Source:** CAS 15-01, Q39
- **Field:** `multi_ms_personnel`
- **Type:** `number`
- **Label:** How many organization's personnel to respond to questions concerning more than one management systems standard?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod

### Q40
- **Source:** CAS 15-01, Q40
- **Field:** `has_other_certs`
- **Type:** `boolean`
- **Label:** Apart from the certification that you intended to apply, has the company been certified to any other ISO certification(s)?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q41
- **Source:** CAS 15-01, Q41
- **Field:** `other_certs_details`
- **Type:** `textarea`
- **Label:** If "Yes", please specify the ISO certification(s)
- **Description:** Please provide a copy of the certificate via email bizdev@nioshcert.com.my.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Depends On:** Q40 = Yes

### Q42
- **Source:** CAS 15-01, Q42
- **Field:** `has_consultant`
- **Type:** `boolean`
- **Label:** Did you engage a consultant to setup the management system?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Yes
  - No

### Q43
- **Source:** CAS 15-01, Q43
- **Field:** `consultant_name`
- **Type:** `text`
- **Label:** If "Yes", please state the consultant's name
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Depends On:** Q42 = Yes

### Q44
- **Source:** CAS 15-01, Q44
- **Field:** `marketing_source`
- **Type:** `select`
- **Label:** How did you hear of NIOSH Certification?
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod
- **Options:**
  - Facebook/LinkedIn/NIOSH Certification Website
  - Exhibition/Seminar
  - Consultant
  - Newspaper
  - Friend/company that has been certified by NIOSH Certification
  - Other

### Q45
- **Source:** CAS 15-01, Q45
- **Field:** `declaration`
- **Type:** `boolean`
- **Label:** Have you clicked the link and answered the relevant questionnaire as required.
- **Required:** Yes
- **Applies To:** ALL
- **Guna:** Rekod (declaration)
- **Options:**
  - Yes
  - No

---

## Ringkasan

| Kategori | Bilangan |
|----------|----------|
| Kiraan — FTE | 8 (Q10-Q17) |
| Kiraan — Complexity (industry) | 1 (Q29) |
| Kiraan — Sites | 2 (Q20, Q21) |
| Kiraan — Certifications | 1 (Q30) |
| Rekod | 33 |
| **Total** | **45** |

**FTE Formula (dari CR HYTRO):**
FTE = Management + Permanent + (Contract × 0.5) + Repetitive

**Nota:**
- Application Form diisi sekali — walaupun IMS
- Q29 (industry_type) → trigger complexity detection untuk OSHMS/EMS/ABMS
- Q30 (certifications) → tentukan questionnaire mana muncul