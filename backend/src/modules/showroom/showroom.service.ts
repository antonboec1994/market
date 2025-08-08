import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShowroomDto } from './showroom.dto';
import { showroom } from 'src/data/data';

@Injectable()
export class ShowroomService {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const existingArray = await this.prisma.showroom.findMany();
    if (existingArray.length === 0) {
      await this.addShowroomsFromArray(showroom);
      console.log(`Массив шоурум успешно добавлен в базу данных!`);
    } else {
      console.log(`Массив шоурум уже существует в базе данных!`);
    }
  }

  async addShowroomsFromArray(data: ShowroomDto[]) {
    const Showrooms = data.map((item) => ({
      name: item.name,
      slides: item.slides,
    }));
    await this.prisma.showroom.createMany({
      data: Showrooms,
    });
  }

  async getAll() {
    return this.prisma.showroom.findMany();
  }
}
