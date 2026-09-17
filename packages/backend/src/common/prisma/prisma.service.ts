import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { prisma, PrismaClient } from '@nioshcert/database';

// Wrapper PrismaClient supaya boleh inject ke module lain
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  // Type annotation eksplisit untuk elak TS2742
  public readonly client: PrismaClient = prisma;

  async onModuleInit() {
    await this.client.$connect();
    this.logger.log('Prisma connected to database');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    this.logger.log('Prisma disconnected');
  }
}
