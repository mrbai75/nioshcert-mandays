import { Controller, Get, Param, Query } from '@nestjs/common';
import { StandardsService } from './standards.service';
import { ListStandardsQueryDto } from './dto/list-standards-query.dto';

@Controller('standards')
export class StandardsController {
  constructor(private readonly standardsService: StandardsService) {}

  // GET /api/standards
  @Get()
  async findAll(@Query() query: ListStandardsQueryDto) {
    const result = await this.standardsService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }

  // GET /api/standards/:code
  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const result = await this.standardsService.findByCode(code);
    return {
      success: true,
      data: result,
    };
  }
}