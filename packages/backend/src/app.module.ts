import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { FormulaModule } from './formula/formula.module';
import { HealthModule } from './modules/health/health.module';
import { StandardsModule } from './modules/standards/standards.module';
import { ComplexityModule } from './modules/complexity/complexity.module';
import { MandaysModule } from './modules/mandays/mandays.module';
import { SectorsModule } from './modules/sectors/sectors.module';

// Root module — daftar semua module di sini
@Module({
  imports: [
    PrismaModule,
    FormulaModule,
    HealthModule,
    StandardsModule,
    ComplexityModule,
    MandaysModule,
    SectorsModule,
  ],
})
export class AppModule {}