-- CreateTable
CREATE TABLE "sections" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "condition" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "source" VARCHAR(50),
    "type" VARCHAR(20) NOT NULL,
    "label" VARCHAR(1000) NOT NULL,
    "description" TEXT,
    "placeholder" VARCHAR(255),
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "validation" JSONB,
    "options" JSONB,
    "complexity_impact" JSONB,
    "fte_impact" JSONB,
    "mandays_impact" JSONB,
    "depends_on" JSONB,
    "section_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_standards" (
    "question_id" UUID NOT NULL,
    "standard_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_standards_pkey" PRIMARY KEY ("question_id","standard_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sections_key_key" ON "sections"("key");

-- CreateIndex
CREATE INDEX "sections_key_idx" ON "sections"("key");

-- CreateIndex
CREATE UNIQUE INDEX "questions_key_key" ON "questions"("key");

-- CreateIndex
CREATE INDEX "questions_key_idx" ON "questions"("key");

-- CreateIndex
CREATE INDEX "questions_section_id_idx" ON "questions"("section_id");

-- CreateIndex
CREATE INDEX "questions_is_active_idx" ON "questions"("is_active");

-- CreateIndex
CREATE INDEX "question_standards_standard_id_idx" ON "question_standards"("standard_id");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_standards" ADD CONSTRAINT "question_standards_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_standards" ADD CONSTRAINT "question_standards_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
