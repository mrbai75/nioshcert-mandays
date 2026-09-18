import { Module } from '@nestjs/common';
import { MandaysController } from './mandays.controller';
import { MandaysService } from './mandays.service';

@Module({
  controllers: [MandaysController],
  providers: [MandaysService],
})
export class MandaysModule {}