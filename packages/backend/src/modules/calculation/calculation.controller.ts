import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';

@Controller('calculations')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  // POST /api/calculations — kira mandays
  @Post()
  async create(@Body() dto: CreateCalculationDto) {
    const result = await this.calculationService.create(dto);
    return { success: true, data: result };
  }
}