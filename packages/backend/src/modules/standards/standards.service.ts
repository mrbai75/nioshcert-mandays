import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListStandardsQueryDto } from './dto/list-standards-query.dto';

// Service untuk module standards
@Injectable()
export class StandardsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Senarai semua standard dengan pagination + filter.
   * Scalable: boleh handle N standard.
   */
  async findAll(query: ListStandardsQueryDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    if (query.search) {
      where.OR = [
        { code: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {};
    const sortBy = query.sortBy ?? 'code';
    const sortOrder = query.sortOrder ?? 'asc';
    orderBy[sortBy] = sortOrder;

    const [items, total] = await Promise.all([
      this.prisma.client.standard.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      this.prisma.client.standard.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Detail standard by code — versi terkini (isActive = true).
   */
  async findByCode(code: string) {
    const standard = await this.prisma.client.standard.findFirst({
      where: {
        code,
        isActive: true,
      },
      include: {
        complexityLevels: true,
      },
      orderBy: {
        effectiveDate: 'desc',
      },
    });

    if (!standard) {
      throw new NotFoundException(`Standard with code "${code}" not found`);
    }

    return standard;
  }
}