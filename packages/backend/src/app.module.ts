import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { FormulaModule } from './formula/formula.module';
import { HealthModule } from './modules/health/health.module';
import { StandardsModule } from './modules/standards/standards.module';
import { ComplexityModule } from './modules/complexity/complexity.module';

// Root module — daftar semua module di sini
@Module({
  imports: [
    PrismaModule,
    FormulaModule,
    HealthModule,
    StandardsModule,
    ComplexityModule,
  ],
})
export class AppModule {}