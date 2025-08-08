import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GraphicController } from './graphics.controller';
import { GraphicService } from './graphics.service';

@Module({
  controllers: [GraphicController],
  providers: [GraphicService, PrismaService],
})
export class GraphicModule {}
