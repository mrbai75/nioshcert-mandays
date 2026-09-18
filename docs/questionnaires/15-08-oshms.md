# CAS 15-08-R02 — OSHMS Questionnaire

**Standard:** OSHMS (ISO 45001)
**CAS Number:** CAS 15-08-R02
**Bilangan Soalan:** 32
**Status:** Draft

**Nota:**
- Setiap soalan traceable ke PDF CAS 15-08-R02
- `Guna: Kiraan` = input untuk formula-engine
- `Guna: Rekod` = simpan sahaja untuk auditor
- Complexity rules: IAF MD 5:2023 + CAP 03-01
- `[PERLU SAHKAN]` = tunggu pengesahan NIOSHCert

---

## Section: Criteria

### Q1
- **Source:** CAS 15-08-R02, Q1
- **Field:** `company_name`
- **Type:** `text`
- **Label:** Name of Company/Organisation
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Rekod

### Q2
- **Source:** CAS 15-08-R02, Q2
- **Field:** `is_major_hazard`
- **Type:** `boolean`
- **Label:** Is your site categorized as 'Major Hazard'?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q3
- **Source:** CAS 15-08-R02, Q3
- **Field:** `hazardous_chemicals`
- **Type:** `text`
- **Label:** If yes, please specify hazardous chemicals used
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Rekod
- **Depends On:** Q2 = Yes

### Q4
- **Source:** CAS 15-08-R02, Q4
- **Field:** `stores_dangerous_substance`
- **Type:** `boolean`
- **Label:** Do you store significant quantities of dangerous substance?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q5
- **Source:** CAS 15-08-R02, Q5
- **Field:** `dangerous_substance_details`
- **Type:** `text`
- **Label:** What kind? How much?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Rekod
- **Depends On:** Q4 = Yes

### Q6
- **Source:** CAS 15-08-R02, Q6
- **Field:** `asbestos_removal`
- **Type:** `boolean`
- **Label:** Does the work activity include asbestos removal operations?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q7
- **Source:** CAS 15-08-R02, Q7
- **Field:** `has_temporary_site`
- **Type:** `boolean`
- **Label:** Do you also have other temporary site?
- **Description:** A temporary site is a place where one or more of the company's employee work but which is remote from the main site. E.g. mobile workplaces such as vehicles, transient such as construction/demolition site, contracted maintenance, cleaning work etc. where the work performed away from the main site.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment [PERLU SAHKAN]

### Q8
- **Source:** CAS 15-08-R02, Q8
- **Field:** `oshms_varies_across_sites`
- **Type:** `boolean`
- **Label:** Does the OSHMS implemented in different ways across the sites?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment [PERLU SAHKAN]

### Q9
- **Source:** CAS 15-08-R02, Q9
- **Field:** `powered_mobile_plant`
- **Type:** `boolean`
- **Label:** Any powered mobile plant used on site?
- **Description:** Plant that is provided with some form of self-propulsion that is ordinarily under the direct control of the operator e.g. lift trucks, mobile cranes, elevating work platforms, forklift truck etc.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM [PERLU SAHKAN]

### Q10
- **Source:** CAS 15-08-R02, Q10
- **Field:** `high_risk_plant`
- **Type:** `boolean`
- **Label:** Any high risk plant used on site?
- **Description:** E.g. pressure equipment, gas cylinders, cranes, lifts and hoists, temporary access equipment such as scaffold, gondola, vehicle hoist etc.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM/HIGH [PERLU SAHKAN]

### Q11
- **Source:** CAS 15-08-R02, Q11
- **Field:** `other_plant_hazards`
- **Type:** `boolean`
- **Label:** Other plant and mechanical hazards not mentioned?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM [PERLU SAHKAN]

### Q12
- **Source:** CAS 15-08-R02, Q12
- **Field:** `hazardous_manual_handling`
- **Type:** `boolean`
- **Label:** Do most operations require hazardous manual handling?
- **Description:** E.g. repetitive or sustained application of force, awkward posture or movement, application of force, exposure to sustained vibration, handling of live person or animals, handling of unbalanced loads or difficult to grasp.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM [PERLU SAHKAN]

### Q13
- **Source:** CAS 15-08-R02, Q13
- **Field:** `airborne_contaminant`
- **Type:** `boolean`
- **Label:** Does airborne contaminant exist at your site?
- **Description:** Any dust, fume, mist, vapor, biological matter, gas or other substance in liquid or solid form which may be harmful
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q14
- **Source:** CAS 15-08-R02, Q14
- **Field:** `biological_hazards`
- **Type:** `boolean`
- **Label:** Does the worker been exposed to any biological hazards, infectious materials and/or zoonosis?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH/MEDIUM [PERLU SAHKAN]

### Q15
- **Source:** CAS 15-08-R02, Q15
- **Field:** `hazardous_substance_handling`
- **Type:** `boolean`
- **Label:** Does most of the work include handling, mixing, spraying, disposal or other use of hazardous substance?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q16
- **Source:** CAS 15-08-R02, Q16
- **Field:** `asbestos_processing`
- **Type:** `boolean`
- **Label:** Does any of the work include asbestos processing (other than removal)?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q17
- **Source:** CAS 15-08-R02, Q17
- **Field:** `lead_exposure`
- **Type:** `boolean`
- **Label:** Any of the workers exposed to lead?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH/MEDIUM [PERLU SAHKAN]

### Q18
- **Source:** CAS 15-08-R02, Q18
- **Field:** `radiation_exposure`
- **Type:** `boolean`
- **Label:** Do any of the processes involve the use of ionising or non-ionising radiation?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH/MEDIUM [PERLU SAHKAN]

### Q19
- **Source:** CAS 15-08-R02, Q19
- **Field:** `noise_vibration`
- **Type:** `boolean`
- **Label:** Does the workers exposed to excessive noise & vibration?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM [PERLU SAHKAN]

### Q20
- **Source:** CAS 15-08-R02, Q20
- **Field:** `confined_space`
- **Type:** `boolean`
- **Label:** Do any of the processes involve entry into confined spaces?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q21
- **Source:** CAS 15-08-R02, Q21
- **Field:** `fall_from_heights`
- **Type:** `boolean`
- **Label:** Are the workers exposed to the risks of falls from heights?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity HIGH [PERLU SAHKAN]

### Q22
- **Source:** CAS 15-08-R02, Q22
- **Field:** `violence_assault`
- **Type:** `boolean`
- **Label:** Are the workers exposed to threats of violence or occupational assault?
- **Description:** Involve high degree of public contact e.g. hospitals, aged care facilities, banking, correctional facilities, police and security services.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM [PERLU SAHKAN]

### Q23
- **Source:** CAS 15-08-R02, Q23
- **Field:** `animal_insect_attack`
- **Type:** `boolean`
- **Label:** Are the workers exposed to potential animal or insect attack?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM/LOW [PERLU SAHKAN]

### Q24
- **Source:** CAS 15-08-R02, Q24
- **Field:** `thermal_environment`
- **Type:** `boolean`
- **Label:** Are the workers exposed to thermal environment (extremes of heat, cold, humidity, UV)?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Complexity MEDIUM/LOW [PERLU SAHKAN]

### Q25
- **Source:** CAS 15-08-R02, Q25
- **Field:** `language_barrier`
- **Type:** `boolean`
- **Label:** Does more than 50% of your workforce do not speak the same language as audit team?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q26
- **Source:** CAS 15-08-R02, Q26
- **Field:** `casual_contract_workers`
- **Type:** `boolean`
- **Label:** Does more than 20% of your workforce are casuals, part time or contract workers?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q27
- **Source:** CAS 15-08-R02, Q27
- **Field:** `shift_work`
- **Type:** `boolean`
- **Label:** Does more than 50% of your workforce work on shift work?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q28
- **Source:** CAS 15-08-R02, Q28
- **Field:** `field_mobile_workers`
- **Type:** `boolean`
- **Label:** Does more than 50% of your workforce are field operatives or mobile workers?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q29
- **Source:** CAS 15-08-R02, Q29
- **Field:** `weekend_work`
- **Type:** `boolean`
- **Label:** Are there regularly scheduled week-end work?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q30
- **Source:** CAS 15-08-R02, Q30
- **Field:** `isolated_work`
- **Type:** `boolean`
- **Label:** Does any of your employees work in isolation from others?
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Kiraan — Adjustment (time) [PERLU SAHKAN]

### Q31
- **Source:** CAS 15-08-R02, Q31
- **Field:** `other_info`
- **Type:** `textarea`
- **Label:** Other information
- **Required:** No
- **Applies To:** OSHMS
- **Guna:** Rekod

### Q32
- **Source:** CAS 15-08-R02, Q32
- **Field:** `declaration`
- **Type:** `boolean`
- **Label:** Have you answered all the questions in application form as required.
- **Required:** Yes
- **Applies To:** OSHMS
- **Guna:** Rekod (declaration)
- **Options:**
  - Yes
  - No

---

## Ringkasan

| Kategori | Bilangan |
|----------|----------|
| Kiraan — Complexity | 20 |
| Kiraan — Adjustment | 7 |
| Rekod | 5 |
| **Total** | **32** |

**Semua `[PERLU SAHKAN]`** — tunggu pengesahan NIOSHCert untuk complexity rules.