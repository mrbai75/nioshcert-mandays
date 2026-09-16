-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "legal_status" VARCHAR(100),
    "org_type" VARCHAR(50),
    "is_bumiputera" BOOLEAN NOT NULL DEFAULT false,
    "contact_name" VARCHAR(255),
    "contact_designation" VARCHAR(100),
    "contact_phone" VARCHAR(50),
    "contact_email" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by" VARCHAR(100),
    "updated_by" VARCHAR(100),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "client_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "microsoft_id" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "last_login_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL,
    "reference_no" VARCHAR(50) NOT NULL,
    "client_id" UUID NOT NULL,
    "application_type" VARCHAR(50) NOT NULL,
    "certification_type" VARCHAR(50) NOT NULL,
    "total_fte" INTEGER NOT NULL,
    "industry_type" VARCHAR(255),
    "cpi_score" INTEGER,
    "fte_breakdown" JSONB,
    "questionnaire" JSONB,
    "client_snapshot" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    "submitted_at" TIMESTAMPTZ,
    "submitted_by" VARCHAR(100),
    "bd_reviewed_at" TIMESTAMPTZ,
    "bd_reviewed_by" VARCHAR(100),
    "atd_reviewed_at" TIMESTAMPTZ,
    "atd_reviewed_by" VARCHAR(100),
    "approved_at" TIMESTAMPTZ,
    "approved_by" VARCHAR(100),
    "rejected_at" TIMESTAMPTZ,
    "rejected_by" VARCHAR(100),
    "rejection_reason" TEXT,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by" VARCHAR(100),
    "updated_by" VARCHAR(100),

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standards" (
    "id" UUID NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "name" VARCHAR(255) NOT NULL,
    "reference_doc" VARCHAR(100) NOT NULL,
    "effective_date" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "standards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complexity_levels" (
    "id" UUID NOT NULL,
    "standard_id" UUID NOT NULL,
    "level_code" VARCHAR(20) NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complexity_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mandays_table" (
    "id" UUID NOT NULL,
    "standard_id" UUID NOT NULL,
    "complexity_id" UUID,
    "fte_min" INTEGER NOT NULL,
    "fte_max" INTEGER,
    "audit_days" DECIMAL(5,2) NOT NULL,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "effective_date" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mandays_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sector_complexity" (
    "id" UUID NOT NULL,
    "standard_id" UUID NOT NULL,
    "complexity_id" UUID NOT NULL,
    "sector_name" VARCHAR(255) NOT NULL,
    "sector_code" VARCHAR(20),
    "keywords" TEXT[],
    "notes" TEXT,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "sector_complexity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_standards" (
    "id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "standard_id" UUID NOT NULL,
    "complexity_level" VARCHAR(20),
    "complexity_source" VARCHAR(50),
    "complexity_reason" TEXT,
    "is_integrated" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "application_standards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculations" (
    "id" UUID NOT NULL,
    "reference_no" VARCHAR(50) NOT NULL,
    "application_id" UUID NOT NULL,
    "application_standard_id" UUID NOT NULL,
    "standard_code" VARCHAR(20) NOT NULL,
    "fte" INTEGER NOT NULL,
    "complexity" VARCHAR(20),
    "default_base_md" DECIMAL(6,2),
    "default_effective_md" DECIMAL(6,2),
    "default_output" JSONB,
    "default_trace" JSONB,
    "is_overridden" BOOLEAN NOT NULL DEFAULT false,
    "override_complexity" VARCHAR(20),
    "override_base_md" DECIMAL(6,2),
    "override_effective_md" DECIMAL(6,2),
    "override_justification" TEXT,
    "override_reference" JSONB,
    "override_by" VARCHAR(100),
    "override_at" TIMESTAMPTZ,
    "is_amended" BOOLEAN NOT NULL DEFAULT false,
    "amended_by" VARCHAR(100),
    "amended_at" TIMESTAMPTZ,
    "amendment_justification" TEXT,
    "final_base_md" DECIMAL(6,2),
    "final_effective_md" DECIMAL(6,2),
    "final_stage1_md" DECIMAL(6,2),
    "final_stage2_md" DECIMAL(6,2),
    "final_surveillance_md" DECIMAL(6,2),
    "final_recert_md" DECIMAL(6,2),
    "final_output" JSONB,
    "approved_by" VARCHAR(100),
    "approved_at" TIMESTAMPTZ,
    "audit_trail" JSONB,
    "pdf_url" TEXT,
    "pdf_generated_at" TIMESTAMPTZ,
    "version" INTEGER NOT NULL DEFAULT 1,
    "parent_calculation_id" UUID,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by" VARCHAR(100),
    "updated_by" VARCHAR(100),

    CONSTRAINT "calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID NOT NULL,
    "user_id" UUID,
    "user_email" VARCHAR(255),
    "user_role" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "before_state" JSONB,
    "after_state" JSONB,
    "changes" JSONB,
    "metadata" JSONB,
    "notes" TEXT,
    "application_id" UUID,
    "calculation_id" UUID,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_code_key" ON "clients"("code");

-- CreateIndex
CREATE INDEX "clients_name_idx" ON "clients"("name");

-- CreateIndex
CREATE INDEX "clients_contact_email_idx" ON "clients"("contact_email");

-- CreateIndex
CREATE INDEX "clients_is_active_idx" ON "clients"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "applications_reference_no_key" ON "applications"("reference_no");

-- CreateIndex
CREATE INDEX "applications_client_id_idx" ON "applications"("client_id");

-- CreateIndex
CREATE INDEX "applications_status_idx" ON "applications"("status");

-- CreateIndex
CREATE INDEX "applications_reference_no_idx" ON "applications"("reference_no");

-- CreateIndex
CREATE INDEX "applications_application_type_idx" ON "applications"("application_type");

-- CreateIndex
CREATE INDEX "applications_created_at_idx" ON "applications"("created_at");

-- CreateIndex
CREATE INDEX "standards_code_idx" ON "standards"("code");

-- CreateIndex
CREATE INDEX "standards_is_active_idx" ON "standards"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "standards_code_version_key" ON "standards"("code", "version");

-- CreateIndex
CREATE UNIQUE INDEX "complexity_levels_standard_id_level_code_key" ON "complexity_levels"("standard_id", "level_code");

-- CreateIndex
CREATE INDEX "mandays_table_standard_id_complexity_id_fte_min_fte_max_idx" ON "mandays_table"("standard_id", "complexity_id", "fte_min", "fte_max");

-- CreateIndex
CREATE INDEX "mandays_table_standard_id_version_idx" ON "mandays_table"("standard_id", "version");

-- CreateIndex
CREATE INDEX "sector_complexity_standard_id_sector_name_idx" ON "sector_complexity"("standard_id", "sector_name");

-- CreateIndex
CREATE INDEX "application_standards_application_id_idx" ON "application_standards"("application_id");

-- CreateIndex
CREATE INDEX "application_standards_standard_id_idx" ON "application_standards"("standard_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_standards_application_id_standard_id_key" ON "application_standards"("application_id", "standard_id");

-- CreateIndex
CREATE UNIQUE INDEX "calculations_reference_no_key" ON "calculations"("reference_no");

-- CreateIndex
CREATE INDEX "calculations_application_id_idx" ON "calculations"("application_id");

-- CreateIndex
CREATE INDEX "calculations_application_standard_id_idx" ON "calculations"("application_standard_id");

-- CreateIndex
CREATE INDEX "calculations_standard_code_idx" ON "calculations"("standard_code");

-- CreateIndex
CREATE INDEX "calculations_approved_at_idx" ON "calculations"("approved_at");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complexity_levels" ADD CONSTRAINT "complexity_levels_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandays_table" ADD CONSTRAINT "mandays_table_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandays_table" ADD CONSTRAINT "mandays_table_complexity_id_fkey" FOREIGN KEY ("complexity_id") REFERENCES "complexity_levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_complexity" ADD CONSTRAINT "sector_complexity_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_complexity" ADD CONSTRAINT "sector_complexity_complexity_id_fkey" FOREIGN KEY ("complexity_id") REFERENCES "complexity_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_standards" ADD CONSTRAINT "application_standards_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_standards" ADD CONSTRAINT "application_standards_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculations" ADD CONSTRAINT "calculations_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculations" ADD CONSTRAINT "calculations_application_standard_id_fkey" FOREIGN KEY ("application_standard_id") REFERENCES "application_standards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_calculation_id_fkey" FOREIGN KEY ("calculation_id") REFERENCES "calculations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
