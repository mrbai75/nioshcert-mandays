# 06 — Database Schema

**Last Updated:** 16 September 2026

---

## 1. DATABASE

| Item | Value |
|---|---|
| DBMS | PostgreSQL 16 |
| Hosting (Dev) | Docker |
| Hosting (Prod) | Azure |
| ORM | Prisma |
| Prinsip | Relational, versionable, audit-ready |

---

## 2. TABLE UTAMA

### 2.1 standards

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(20) | 'OSHMS', 'QMS', dll. |
| name | VARCHAR(255) | |
| reference_doc | VARCHAR(100) | 'IAF MD 5:2023' |
| effective_date | DATE | |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |

### 2.2 complexity_levels

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| level_code | VARCHAR(20) | 'HIGH', 'MEDIUM', 'LOW', 'LIMITED' |
| label | VARCHAR(100) | |

### 2.3 mandays_table

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| complexity_id | UUID | FK → complexity_levels |
| fte_min | INTEGER | |
| fte_max | INTEGER | NULL = infinity |
| audit_days | NUMERIC(5,2) | |

### 2.4 isms_factors

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| factor_group | VARCHAR(50) | 'BUSINESS_ORG', 'IT_ENV' |
| factor_name | VARCHAR(100) | |
| grade | INTEGER | 1, 2, 3 |
| description | TEXT | |

### 2.5 isms_impact_matrix

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| business_min | INTEGER | |
| business_max | INTEGER | |
| it_min | INTEGER | |
| it_max | INTEGER | |
| percent_min | NUMERIC(5,2) | |
| percent_max | NUMERIC(5,2) | |

### 2.6 sector_complexity

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| standard_id | UUID | FK → standards |
| sector_name | VARCHAR(255) | |
| complexity_id | UUID | FK → complexity_levels |
| notes | TEXT | |

### 2.7 calculations (audit trail)

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| reference_no | VARCHAR(50) | UNIQUE |
| client_name | VARCHAR(255) | |
| standard_id | UUID | FK → standards |
| fte | INTEGER | |
| sites | INTEGER | |
| is_integrated | BOOLEAN | |
| application_type | VARCHAR(50) | |
| created_at | TIMESTAMPTZ | |
| created_by | VARCHAR(100) | |
| default_complexity | VARCHAR(20) | Default |
| default_base_md | NUMERIC(6,2) | Default |
| default_output | JSONB | Default |
| is_overridden | BOOLEAN | Override |
| override_complexity | VARCHAR(20) | Override |
| override_base_md | NUMERIC(6,2) | Override |
| override_effective_md | NUMERIC(6,2) | Override |
| override_justification | TEXT | Override |
| override_reference | JSONB | Override |
| override_by | VARCHAR(100) | Override |
| override_at | TIMESTAMPTZ | Override |
| approved_by | VARCHAR(100) | Override |
| approved_at | TIMESTAMPTZ | Override |
| final_output | JSONB | Final |
| final_stage1_md | NUMERIC(6,2) | Final |
| final_stage2_md | NUMERIC(6,2) | Final |
| final_surveillance_md | NUMERIC(6,2) | Final |
| final_recert_md | NUMERIC(6,2) | Final |
| audit_trail | JSONB | Audit |
| pdf_url | TEXT | Audit |

### 2.8 calculation_details

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| calculation_id | UUID | FK → calculations, ON DELETE CASCADE |
| standard_id | UUID | FK → standards |
| complexity_id | UUID | FK → complexity_levels |
| base_days | NUMERIC(6,2) | |
| adjusted_days | NUMERIC(6,2) | |
| adjustment_pct | NUMERIC(5,2) | |
| stage1_days | NUMERIC(6,2) | |
| stage2_days | NUMERIC(6,2) | |
| surveillance_days | NUMERIC(6,2) | |
| recert_days | NUMERIC(6,2) | |
| justification | JSONB | |

---

## 3. PRINSIP DATABASE

1. **Relational** (PostgreSQL) — bukan NoSQL
2. **JSONB** untuk snapshot (input, output, justification)
3. **Immutable** untuk calculation record (append, bukan edit)
4. **Versionable** untuk standard (IAF MD 5:2023 vs 2019)