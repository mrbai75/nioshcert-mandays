# 06 — Database Schema

**Last Updated:** 16 September 2026
**Version:** 2.0

---

## 1. DATABASE

| Item | Value |
|---|---|
| DBMS | PostgreSQL 16 |
| Hosting (Dev) | Docker |
| Hosting (Prod) | Azure |
| ORM | Prisma 5.22.0 |
| Prinsip | Relational + JSONB (hybrid) |

**Design:**
- Column-based untuk query-able fields
- JSONB untuk dynamic fields (questionnaire, audit trail)
- Versionable untuk standard
- Soft delete (jangan hard delete)
- Audit trail lengkap

---

## 2. TABLE UTAMA (10 TABLE)

### 2.1 clients

Info company/PIC.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(50) | Unique |
| name | VARCHAR(255) | Nama company |
| address | TEXT | |
| legal_status | VARCHAR(100) | ROC/ROB |
| org_type | VARCHAR(50) | Government/Private |
| is_bumiputera | BOOLEAN | |
| contact_name | VARCHAR(255) | PIC |
| contact_designation | VARCHAR(100) | |
| contact_phone | VARCHAR(50) | |
| contact_email | VARCHAR(255) | |
| is_active | BOOLEAN | |
| deleted_at | TIMESTAMPTZ | Soft delete |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |
| created_by | VARCHAR(100) | |
| updated_by | VARCHAR(100) | |

### 2.2 users

Multi-role users.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| email | VARCHAR(255) | Unique |
| name | VARCHAR(255) | |
| role | VARCHAR(50) | PIC, BD, ATD_OFFICER, ATD_MANAGER, SUPER_ADMIN |
| client_id | UUID | FK (untuk PIC) |
| microsoft_id | VARCHAR(255) | SSO (Fasa 2) |
| is_active | BOOLEAN | |
| last_login_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### 2.3 applications

Application submission.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| reference_no | VARCHAR(50) | Unique |
| client_id | UUID | FK → clients |
| application_type | VARCHAR(50) | NEW, RECERT, TRANSFER, EXTENSION |
| certification_type | VARCHAR(50) | SINGLE, MULTISITE, MULTI_COMPANY, INTEGRATED |
| total_fte | INT | |
| industry_type | VARCHAR(255) | |
| cpi_score | INT | |
| **fte_breakdown** | **JSONB** | Dynamic |
| **questionnaire** | **JSONB** | Dynamic ikut standard |
| **client_snapshot** | **JSONB** | Snapshot masa apply |
| status | VARCHAR(50) | DRAFT, SUBMITTED, UNDER_BD_REVIEW, UNDER_ATD_REVIEW, UNDER_MANAGER_APPROVAL, APPROVED, REJECTED, CANCELLED |
| submitted_at | TIMESTAMPTZ | |
| submitted_by | VARCHAR(100) | |
| bd_reviewed_at | TIMESTAMPTZ | |
| bd_reviewed_by | VARCHAR(100) | |
| atd_reviewed_at | TIMESTAMPTZ | |
| atd_reviewed_by | VARCHAR(100) | |
| approved_at | TIMESTAMPTZ | |
| approved_by | VARCHAR(100) | |
| rejected_at | TIMESTAMPTZ | |
| rejected_by | VARCHAR(100) | |
| rejection_reason | TEXT | |
| deleted_at | TIMESTAMPTZ | Soft delete |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### 2.4 standards

Master standard (versionable).

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(20) | OSHMS, QMS, EMS, ABMS, ISMS |
| version | VARCHAR(20) | Versioning |
| name | VARCHAR(255) | |
| reference_doc | VARCHAR(100) | IAF MD 5:2023 |
| effective_date | DATE | |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |

Unique: (code, version)

### 2.5 complexity_levels

Complexity per standard.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| level_code | VARCHAR(20) | HIGH, MEDIUM, LOW, LIMITED |
| label | VARCHAR(100) | |
| description | TEXT | |
| created_at | TIMESTAMPTZ | |

Unique: (standard_id, level_code)

### 2.6 mandays_table

Jadual mandays (versionable).

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| complexity_id | UUID | FK → complexity_levels |
| fte_min | INT | |
| fte_max | INT | NULL = infinity |
| audit_days | DECIMAL(5,2) | |
| version | VARCHAR(20) | |
| effective_date | DATE | |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |

### 2.7 sector_complexity

Sector → complexity mapping.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| complexity_id | UUID | FK → complexity_levels |
| sector_name | VARCHAR(255) | |
| sector_code | VARCHAR(20) | |
| keywords | TEXT[] | Untuk matching |
| notes | TEXT | |
| version | VARCHAR(20) | |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### 2.8 application_standards

**Relation table** — multi-standard per application.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| application_id | UUID | FK → applications |
| standard_id | UUID | FK → standards |
| complexity_level | VARCHAR(20) | HIGH/MEDIUM/LOW/LIMITED |
| complexity_source | VARCHAR(50) | AUTO, OVERRIDE, MANUAL |
| complexity_reason | TEXT | |
| is_integrated | BOOLEAN | Integrated IMS? |
| status | VARCHAR(50) | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

Unique: (application_id, standard_id)

### 2.9 calculations

Hasil kiraan per standard.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| reference_no | VARCHAR(50) | Unique |
| application_id | UUID | FK → applications |
| application_standard_id | UUID | FK → application_standards |
| standard_code | VARCHAR(20) | |
| fte | INT | |
| complexity | VARCHAR(20) | |
| default_base_md | DECIMAL(6,2) | |
| default_effective_md | DECIMAL(6,2) | |
| **default_output** | **JSONB** | Snapshot |
| **default_trace** | **JSONB** | Formula trace |
| is_overridden | BOOLEAN | |
| override_complexity | VARCHAR(20) | |
| override_base_md | DECIMAL(6,2) | |
| override_effective_md | DECIMAL(6,2) | |
| override_justification | TEXT | |
| **override_reference** | **JSONB** | |
| override_by | VARCHAR(100) | |
| override_at | TIMESTAMPTZ | |
| is_amended | BOOLEAN | |
| amended_by | VARCHAR(100) | |
| amended_at | TIMESTAMPTZ | |
| amendment_justification | TEXT | |
| final_base_md | DECIMAL(6,2) | |
| final_effective_md | DECIMAL(6,2) | |
| final_stage1_md | DECIMAL(6,2) | |
| final_stage2_md | DECIMAL(6,2) | |
| final_surveillance_md | DECIMAL(6,2) | |
| final_recert_md | DECIMAL(6,2) | |
| **final_output** | **JSONB** | |
| approved_by | VARCHAR(100) | |
| approved_at | TIMESTAMPTZ | |
| **audit_trail** | **JSONB** | |
| pdf_url | TEXT | |
| pdf_generated_at | TIMESTAMPTZ | |
| version | INT | |
| parent_calculation_id | UUID | |
| deleted_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### 2.10 audit_logs

Detailed audit trail.

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| action | VARCHAR(100) | CREATE, UPDATE, DELETE, APPROVE, REJECT, OVERRIDE |
| entity_type | VARCHAR(50) | Application, Calculation, Client |
| entity_id | UUID | |
| user_id | UUID | FK → users |
| user_email | VARCHAR(255) | |
| user_role | VARCHAR(50) | |
| **before_state** | **JSONB** | |
| **after_state** | **JSONB** | |
| **changes** | **JSONB** | Diff |
| **metadata** | **JSONB** | IP, user agent |
| notes | TEXT | |
| application_id | UUID | FK |
| calculation_id | UUID | FK |
| created_at | TIMESTAMPTZ | |

---

## 3. JSONB FIELDS

### 3.1 fte_breakdown

```json
{
  "total": 9,
  "management": 2,
  "permanent": 7,
  "contract": 0,
  "repetitive": 0,
  "shifts": {
    "count": 0,
    "employeesPerShift": []
  },
  "formula": "9 + (0.5)(0) = 9"
}
3.2 questionnaire
json
{
  "applicationForm": {
    "companyName": "HYTRO VISTA SDN BHD",
    "totalEmployees": 9,
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
3.3 audit_trail
json
{
  "events": [
    {
      "action": "SUBMITTED",
      "by": "pic@hytro.com",
      "at": "2026-09-16T10:00:00Z",
      "ip": "192.168.1.1"
    },
    {
      "action": "BD_REVIEW",
      "by": "bd@nioshcert.com",
      "at": "2026-09-16T11:00:00Z"
    }
  ]
}
3.4 default_trace
Formula Engine trace.

json
{
  "steps": [
    {
      "tier": "TIER_1",
      "description": "Base MD lookup",
      "formula": "lookup(FTE=9, complexity=HIGH)",
      "output": { "value": 3.5 }
    },
    {
      "tier": "TIER_2",
      "description": "Rounding",
      "formula": "ceil(3.5) = 4.0",
      "output": { "effectiveMd": 4.0 }
    }
  ]
}
4. PRINSIP DATABASE
Hybrid — column (query-able) + JSONB (dynamic)

Versionable — standards, mandays_table

Soft delete — deleted_at column

Audit trail — audit_logs table + JSONB audit_trail

Multi-standard — relation table application_standards

Multi-role — users table

5. PRISMA SCHEMA
Lokasi: packages/database/prisma/schema.prisma

Commands:

bash
pnpm db:generate    # Generate client
pnpm db:migrate     # Run migration
pnpm db:studio      # Open GUI
pnpm db:seed        # Seed data
pnpm db:reset       # Reset database
Migration history: packages/database/prisma/migrations/

6. NEXT STEPS
#	Item	Priority
1	Seed data (standards + mandays)	High
2	Backend API integration	High
3	Frontend UI integration	High
4	Fasa 2 tables (notifications, pdf_documents)	Low
Database 10 table siap. Migration init berjaya. Prisma Client generated.

