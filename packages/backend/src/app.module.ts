import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { FormulaModule } from './formula/formula.module';
import { HealthModule } from './modules/health/health.module';

// Root module — daftar semua module di sini
@Module({
  imports: [
    PrismaModule,
    FormulaModule,
    HealthModule,
    // Module lain akan ditambah dalam fasa 7.2+
  ],
})
export class AppModule {}
