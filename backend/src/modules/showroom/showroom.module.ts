import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShowroomController } from './showroom.controller';
import { ShowroomService } from './showroom.service';

@Module({
  controllers: [ShowroomController],
  providers: [ShowroomService, PrismaService],
})
export class ShowroomModule {}
