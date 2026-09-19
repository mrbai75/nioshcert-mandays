import { Module } from '@nestjs/common';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';
import { FteAdapter } from './adapters/fte.adapter';
import { ComplexityAdapter } from './adapters/complexity.adapter';

@Module({
  controllers: [CalculationController],
  providers: [CalculationService, FteAdapter, ComplexityAdapter],
})
export class CalculationModule {}