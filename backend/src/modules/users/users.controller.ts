import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDTO,
  DeleteUserResponseDto,
  LoginUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from './user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Новый пользователь успешно зарегистрирован',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  })
  register(@Body() dto: CreateUserDTO) {
    return this.userService.register(dto);
  }

  // ------------------------------------------------

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Вход выполнен успешно',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
  login(@Body() dto: LoginUserDTO) {
    return this.userService.login(dto.email, dto.password);
  }

  // ------------------------------------------------

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление данных пользователя по ID' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно обновлены',
  })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDTO,
    @Req() request,
  ) {
    const currentUser = request.user as { id: number };
    if (currentUser.id !== id) {
      throw new UnauthorizedException(
        'Вы можете редактировать только свой профиль',
      );
    }
    return this.userService.updateUser(id, updateDto);
  }

  // ------------------------------------------------

  @Patch(':id/password')
  @ApiOperation({ summary: 'Обновление пароля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пароль пользователя успешно обновлен',
  })
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDTO,
    @Req() request,
  ) {
    const currentUser = request.user as { id: number };
    if (currentUser.id !== id) {
      throw new UnauthorizedException('Вы можете изменить только свой пароль');
    }
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  // ------------------------------------------------

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удалён',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ): Promise<DeleteUserResponseDto> {
    const currentUser = request.user as { id: number };
    if (currentUser.id !== id) {
      throw new UnauthorizedException('Вы можете удалить только свой аккаунт');
    }
    return this.userService.delete(id);
  }
}
