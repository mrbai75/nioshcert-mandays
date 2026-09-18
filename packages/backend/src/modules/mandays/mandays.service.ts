import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListMandaysQueryDto } from './dto/list-mandays-query.dto';

// Service untuk module mandays
@Injectable()
export class MandaysService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Senarai mandays table.
   * Filter: ?standard=OSHMS&complexity=HIGH&fte=9
   * Jika fte diberi, cari band yang match sahaja.
   */
  async findAll(query: ListMandaysQueryDto): Promise<{ items: any[]; total: number }> {
    const where: any = {
      isActive: true,
    };

    if (query.standard) {
      where.standard = { code: query.standard };
    }

    if (query.complexity) {
      where.complexity = { levelCode: query.complexity };
    }

    if (query.fte !== undefined) {
      where.fteMin = { lte: query.fte };
      where.OR = [
        { fteMax: null },
        { fteMax: { gte: query.fte } },
      ];
    }

    const items = await this.prisma.client.mandaysTable.findMany({
      where,
      orderBy: [
        { standardId: 'asc' },
        { complexityId: 'asc' },
        { fteMin: 'asc' },
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

  /**
   * Lookup mandays untuk FTE + standard + complexity.
   * Return satu row yang match.
   */
  async lookup(
    standardCode: string,
    fte: number,
    complexityCode: string,
  ): Promise<any> {
    const row = await this.prisma.client.mandaysTable.findFirst({
      where: {
        isActive: true,
        standard: { code: standardCode },
        complexity: { levelCode: complexityCode },
        fteMin: { lte: fte },
        OR: [
          { fteMax: null },
          { fteMax: { gte: fte } },
        ],
      },
      include: {
        standard: { select: { code: true, name: true } },
        complexity: { select: { levelCode: true, label: true } },
      },
    });

    if (!row) {
      throw new NotFoundException(
        `No mandays entry for standard=${standardCode}, complexity=${complexityCode}, fte=${fte}`,
      );
    }

    return row;
  }
}