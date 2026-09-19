import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('NIOSHCert Backend (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // ==========================================================================
  // HEALTH
  // ==========================================================================
  describe('GET /api/health', () => {
    it('returns ok status + db up', async () => {
      const res = await request(app.getHttpServer()).get('/api/health').expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.database).toBe('up');
    });
  });

  // ==========================================================================
  // STANDARDS
  // ==========================================================================
  describe('GET /api/standards', () => {
    it('returns paginated standards', async () => {
      const res = await request(app.getHttpServer()).get('/api/standards').expect(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBe(5);
    });

    it('returns OSHMS detail with complexity levels', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/standards/OSHMS')
        .expect(200);
      expect(res.body.data.code).toBe('OSHMS');
      expect(res.body.data.complexityLevels).toBeInstanceOf(Array);
    });

    it('returns 404 for unknown code', async () => {
      await request(app.getHttpServer()).get('/api/standards/UNKNOWN').expect(404);
    });
  });

  // ==========================================================================
  // COMPLEXITY
  // ==========================================================================
  describe('GET /api/complexity', () => {
    it('returns 13 complexity levels', async () => {
      const res = await request(app.getHttpServer()).get('/api/complexity').expect(200);
      expect(res.body.data.total).toBe(13);
    });

    it('filters by standard', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/complexity?standard=EMS')
        .expect(200);
      expect(res.body.data.total).toBe(4);
    });
  });

  // ==========================================================================
  // MANDAYS
  // ==========================================================================
  describe('GET /api/mandays', () => {
    it('lookup returns OSHMS HIGH FTE 9', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/mandays/lookup?standard=OSHMS&fte=9&complexity=HIGH')
        .expect(200);
      expect(res.body.data.fteMin).toBeLessThanOrEqual(9);
      expect(Number(res.body.data.auditDays)).toBe(3.5);
    });
  });

  // ==========================================================================
  // SECTORS
  // ==========================================================================
  describe('GET /api/sectors', () => {
    it('filters OSHMS HIGH sectors', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/sectors?standard=OSHMS&complexity=HIGH')
        .expect(200);
      expect(res.body.data.total).toBeGreaterThan(0);
    });

    it('searches construction', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/sectors?standard=OSHMS&search=construction')
        .expect(200);
      expect(res.body.data.total).toBeGreaterThanOrEqual(1);
    });
  });

  // ==========================================================================
  // QUESTIONNAIRE
  // ==========================================================================
  describe('GET /api/questionnaire', () => {
    it('returns ISMS questions', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/questionnaire/ISMS')
        .expect(200);
      expect(res.body.data.standards).toContain('ISMS');
      expect(res.body.data.total).toBeGreaterThan(0);
    });

    it('returns deduped IMS questions (ISMS+QMS+ABMS)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/questionnaire?standards=ISMS,QMS,ABMS')
        .expect(200);
      const allQuestions = res.body.data.sections.flatMap((s: any) => s.questions);
      const companyNames = allQuestions.filter((q: any) => q.key === 'company_name');
      expect(companyNames.length).toBe(1); // deduped
    });
  });

  describe('POST /api/questionnaire/detect-complexity', () => {
    it('detects HIGH for is_major_hazard=true', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/questionnaire/detect-complexity')
        .send({ standards: ['OSHMS'], answers: { is_major_hazard: true } })
        .expect(201);
      expect(res.body.data.complexity).toBe('HIGH');
    });
  });

  // ==========================================================================
  // CALCULATIONS
  // ==========================================================================
  describe('POST /api/calculations', () => {
    it('single OSHMS — FTE 9, HIGH, 4 MD', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/calculations')
        .send({
          standards: ['OSHMS'],
          applicationType: 'NEW',
          answers: {
            management_count: 2,
            permanent_count: 7,
            contract_count: 0,
            repetitive_count: 0,
            is_major_hazard: true,
          },
        })
        .expect(201);

      expect(res.body.data.fte).toBe(9);
      expect(res.body.data.isIms).toBe(false);
      expect(res.body.data.totalEffectiveMd).toBe(4);
      expect(res.body.data.standards[0].complexity).toBe('HIGH');
    });

    it('IMS OSHMS+EMS — auto reduction 20%', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/calculations')
        .send({
          standards: ['OSHMS', 'EMS'],
          applicationType: 'NEW',
          answers: {
            management_count: 2,
            permanent_count: 7,
            contract_count: 0,
            repetitive_count: 0,
            is_major_hazard: true,
            has_significant_emissions: true,
            has_hazardous_waste: true,
            manual_integrated: true,
            policy_integrated: true,
            internal_audit_integrated: true,
          },
        })
        .expect(201);

      expect(res.body.data.isIms).toBe(true);
      expect(res.body.data.ims.rawTotalMd).toBe(8);
      expect(res.body.data.ims.suggestedReduction).toBe(0.2);
      expect(res.body.data.ims.actualReduction).toBe(0.2);
      expect(res.body.data.ims.finalTotalMd).toBeCloseTo(6.4, 1);
    });

    it('IMS override — 10% reduction', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/calculations')
        .send({
          standards: ['OSHMS', 'EMS'],
          applicationType: 'NEW',
          imsReduction: 0.1,
          answers: {
            management_count: 2,
            permanent_count: 7,
            contract_count: 0,
            repetitive_count: 0,
            is_major_hazard: true,
            has_significant_emissions: true,
            has_hazardous_waste: true,
            manual_integrated: true,
            policy_integrated: true,
            internal_audit_integrated: true,
          },
        })
        .expect(201);

      expect(res.body.data.ims.source).toBe('OVERRIDE');
      expect(res.body.data.ims.actualReduction).toBe(0.1);
      expect(res.body.data.ims.finalTotalMd).toBeCloseTo(7.2, 1);
    });
  });
});