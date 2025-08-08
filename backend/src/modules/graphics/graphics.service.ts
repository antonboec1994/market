import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GraphicDto } from './graphics.dto';
import { graphics } from 'src/data/data';

@Injectable()
export class GraphicService {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const existingArray = await this.prisma.graphics.findMany();
    if (existingArray.length === 0) {
      await this.addGraphicsFromArray(graphics);
      console.log(`Массив графиков успешно добавлен в базу данных!`);
    } else {
      console.log(`Массив графиков уже существует в базе данных!`);
    }
  }

  async addGraphicsFromArray(data: GraphicDto[]) {
    await this.prisma.graphics.createMany({
      data: data.map((item) => ({
        name: item.name,
        values: JSON.stringify(item.values.prices),
      })),
    });
  }

  async getAll() {
    return this.prisma.graphics.findMany();
  }
}
