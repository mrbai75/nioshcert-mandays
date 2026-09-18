import { Module } from '@nestjs/common';
import { ComplexityController } from './complexity.controller';
import { ComplexityService } from './complexity.service';

@Module({
  controllers: [ComplexityController],
  providers: [ComplexityService],
})
export class ComplexityModule {}