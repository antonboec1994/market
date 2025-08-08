import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
})
export class BlogModule {}
