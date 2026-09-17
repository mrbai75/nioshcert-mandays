import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global — tak perlu import berulang dalam setiap module
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
