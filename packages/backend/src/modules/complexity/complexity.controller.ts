import { Controller, Get, Query } from '@nestjs/common';
import { ComplexityService } from './complexity.service';
import { ListComplexityQueryDto } from './dto/list-complexity-query.dto';

@Controller('complexity')
export class ComplexityController {
  constructor(private readonly complexityService: ComplexityService) {}

  // GET /api/complexity
  @Get()
  async findAll(@Query() query: ListComplexityQueryDto) {
    const result = await this.complexityService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }
}