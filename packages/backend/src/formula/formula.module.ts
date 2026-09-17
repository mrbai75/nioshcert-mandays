import { Global, Module } from '@nestjs/common';
import { FormulaService } from './formula.service';

// Global — formula digunakan oleh module calculation
@Global()
@Module({
  providers: [FormulaService],
  exports: [FormulaService],
})
export class FormulaModule {}
