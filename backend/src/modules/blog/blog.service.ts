import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BlogDto } from './blog.dto';
import { blog } from 'src/data/data';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const existingArray = await this.prisma.blog.findMany();
    if (existingArray.length === 0) {
      await this.addBlogsFromArray(blog);
      console.log(`Массив постов успешно добавлен в базу данных!`);
    } else {
      console.log(`Массив постов уже существует в базе данных!`);
    }
  }

  async addBlogsFromArray(data: BlogDto[]) {
    const blogs = data.map((item) => ({
      imageUrl: item.imageUrl,
      title: item.title,
      date: item.date,
      description: item.description,
    }));
    await this.prisma.blog.createMany({
      data: blogs,
    });
  }

  async getAll() {
    return this.prisma.blog.findMany();
  }
}
