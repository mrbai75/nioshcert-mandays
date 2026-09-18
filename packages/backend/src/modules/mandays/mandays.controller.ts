import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MandaysService } from './mandays.service';
import { ListMandaysQueryDto } from './dto/list-mandays-query.dto';

@Controller('mandays')
export class MandaysController {
  constructor(private readonly mandaysService: MandaysService) {}

  // GET /api/mandays
  @Get()
  async findAll(@Query() query: ListMandaysQueryDto) {
    const result = await this.mandaysService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }

  // GET /api/mandays/lookup?standard=OSHMS&fte=9&complexity=HIGH
  @Get('lookup')
  async lookup(
    @Query('standard') standard: string,
    @Query('fte') fte: string,
    @Query('complexity') complexity: string,
  ) {
    if (!standard || !fte || !complexity) {
      throw new BadRequestException(
        'Query params "standard", "fte", and "complexity" are required',
      );
    }

    const fteNum = Number(fte);
    if (isNaN(fteNum) || fteNum < 0) {
      throw new BadRequestException('"fte" must be a non-negative number');
    }

    const result = await this.mandaysService.lookup(standard, fteNum, complexity);
    return {
      success: true,
      data: result,
    };
  }
}