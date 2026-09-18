import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListComplexityQueryDto } from './dto/list-complexity-query.dto';

// Service untuk module complexity
@Injectable()
export class ComplexityService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Senarai complexity levels.
   * Filter: ?standard=OSHMS&levelCode=HIGH
   */
  async findAll(query: ListComplexityQueryDto) {
    const where: any = {};

    if (query.standard) {
      where.standard = { code: query.standard };
    }

    if (query.levelCode) {
      where.levelCode = query.levelCode;
    }

    const items = await this.prisma.client.complexityLevel.findMany({
      where,
      orderBy: [
        { standardId: 'asc' },
        { levelCode: 'asc' },
      ],
      include: {
        standard: {
          select: {
            code: true,
            name: true,
            version: true,
          },
        },
      },
    });

    return {
      items,
      total: items.length,
    };
  }
}