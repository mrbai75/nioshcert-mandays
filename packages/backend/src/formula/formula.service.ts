import { Injectable, Logger } from '@nestjs/common';
import * as formulaEngine from '@nioshcert/formula-engine';

// Wrapper @nioshcert/formula-engine supaya boleh inject
@Injectable()
export class FormulaService {
  private readonly logger = new Logger(FormulaService.name);

  // Expose semua fungsi formula-engine
  public readonly engine = formulaEngine;

  // Placeholder — akan diimplement dalam fasa 7.4
  async calculate(input: unknown): Promise<unknown> {
    this.logger.warn('FormulaService.calculate() belum diimplement');
    return input;
  }
}
