import { Controller, Get, Query } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { ListSectorsQueryDto } from './dto/list-sectors-query.dto';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  // GET /api/sectors
  @Get()
  async findAll(@Query() query: ListSectorsQueryDto) {
    const result = await this.sectorsService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }
}