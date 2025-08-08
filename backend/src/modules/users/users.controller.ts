import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
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

  @Post('get')
  @ApiOperation({ summary: 'Получение данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно получены',
  })
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request) {
    const userId = request.user.id;
    return this.userService.getUser(userId);
  }

  // ------------------------------------------------

  @Patch('updateUser')
  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно обновлены',
  })
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() updateDto: UpdateUserDTO, @Req() request) {
    const user = request.user as { id: number };
    await this.userService.updateUser(user.id, updateDto);
    return updateDto;
  }

  // ------------------------------------------------

  @Patch('updatePassword')
  @ApiOperation({ summary: 'Обновление пароля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пароль пользователя успешно обновлен',
  })
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDTO,
    @Req() request,
  ) {
    const user = request.user as { id: number };
    return this.userService.updatePassword(user.id, updatePasswordDto);
  }

  // ------------------------------------------------

  @Delete('delete')
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
  async delete(@Req() request): Promise<DeleteUserResponseDto> {
    const user = request.user as { id: number };
    return this.userService.delete(user.id);
  }
}
