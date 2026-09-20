import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('calculations')
export class CalculationController {
  constructor(
    private readonly calculationService: CalculationService,
    private readonly prisma: PrismaService,
  ) {}

  // POST /api/calculations — kira mandays (+ save kalau ada application)
  @Post()
  async create(@Body() dto: CreateCalculationDto): Promise<{
    success: boolean;
    data: unknown;
  }> {
    const result = await this.calculationService.create(dto);
    return { success: true, data: result };
  }

  // GET /api/calculations/:id — detail calculation
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    success: boolean;
    data: unknown;
  }> {
    const calculation = await this.prisma.client.calculation.findUnique({
      where: { id },
      include: {
        application: {
          include: {
            client: true,
          },
        },
        applicationStandard: {
          include: {
            standard: true,
          },
        },
      },
    });

    if (!calculation) {
      throw new NotFoundException(`Calculation "${id}" not found`);
    }

    return { success: true, data: calculation };
  }

  // GET /api/calculations/by-application/:applicationId
  @Get('by-application/:applicationId')
  async findByApplication(
    @Param('applicationId') applicationId: string,
  ): Promise<{ success: boolean; data: unknown }> {
    const calculations = await this.prisma.client.calculation.findMany({
      where: { applicationId, deletedAt: null },
      include: {
        applicationStandard: {
          include: {
            standard: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return { success: true, data: calculations };
  }
}
