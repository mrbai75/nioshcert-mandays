import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListSectorsQueryDto } from './dto/list-sectors-query.dto';

// Service untuk module sectors
@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Senarai sector complexity mapping.
   * Filter: ?standard=OSHMS&complexity=HIGH&search=construction
   */
  async findAll(query: ListSectorsQueryDto) {
    const where: any = {
      isActive: true,
    };

    if (query.standard) {
      where.standard = { code: query.standard };
    }

    if (query.complexity) {
      where.complexity = { levelCode: query.complexity };
    }

    if (query.search) {
      where.OR = [
        { sectorName: { contains: query.search, mode: 'insensitive' } },
        { sectorCode: { contains: query.search, mode: 'insensitive' } },
        { keywords: { has: query.search } },
      ];
    }

    const items = await this.prisma.client.sectorComplexity.findMany({
      where,
      orderBy: [
        { standardId: 'asc' },
        { sectorName: 'asc' },
      ],
      include: {
        standard: {
          select: { code: true, name: true, version: true },
        },
        complexity: {
          select: { levelCode: true, label: true },
        },
      },
    });

    return {
      items,
      total: items.length,
    };
  }
}