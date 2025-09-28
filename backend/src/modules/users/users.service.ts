import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async register(dto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = {
      name: dto.name,
      login: dto.login,
      email: dto.email,
      password: hashedPassword,
    };
    const existsUser = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existsUser) {
      throw new UnauthorizedException(
        'Пользователь с таким email уже существует',
      );
    }
    const createdUser = await this.prisma.users.create({
      data: newUser,
    });
    return {
      message: 'Регистрация прошла успешно',
      user: {
        email: createdUser.email,
      },
    };
  }

  async login(email: string, password: string) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!existsUser) {
      throw new UnauthorizedException(
        'Пользователь с таким email не существует',
      );
    }
    const isPasswordValid = await bcrypt.compare(password, existsUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }
    const payload = {
      id: existsUser.id,
      email: existsUser.email,
    };
    return {
      message: 'Вход успешно выполнен',
      access_token: this.jwtService.sign(payload),
      user: {
        id: existsUser.id,
        email: existsUser.email,
        name: existsUser.name,
        login: existsUser.login,
        createdAt: existsUser.createdAt,
        updatedAt: existsUser.updatedAt,
      },
    };
  }

  async updateUser(id: number, dto: UpdateUserDTO) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!existsUser) {
      throw new UnauthorizedException('Пользователь с таким id не существует');
    }

    if (dto.email && dto.email !== existsUser.email) {
      const existsEmail = await this.getUserByEmail(dto.email);
      if (existsEmail) {
        throw new BadRequestException(
          'Пользователь с таким email уже существует',
        );
      }
    }

    const updatedUser = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        login: dto.login,
      },
    });
    return {
      message: 'Пользователь успешно изменён',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        login: updatedUser.login,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    };
  }

  async updatePassword(id: number, dto: UpdatePasswordDTO) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!existsUser) {
      throw new UnauthorizedException('Пользователь с таким id не существует');
    }
    const isOldPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      existsUser.password,
    );
    if (!isOldPasswordValid) {
      throw new BadRequestException('Старый пароль указан неверно');
    }
    const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.users.update({
      where: { id },
      data: { password: newHashedPassword },
    });
    return { message: 'Пароль успешно изменён' };
  }

  async delete(id: number) {
    await this.prisma.users.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Пользователь успешно удалён',
      success: true,
    };
  }
}
