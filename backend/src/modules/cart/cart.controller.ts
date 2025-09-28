import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartDTO } from './cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Получение корзины' })
  @ApiResponse({
    status: 200,
    description: 'Корзина успешно получена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  getCart(@Req() request) {
    const userId = request.user.id;
    return this.cartService.getCart(userId);
  }

  // ------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Добавление товара в корзину' })
  @ApiResponse({
    status: 200,
    description: 'Новый товар успешно добавлен в корзину',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  addProduct(@Req() request, @Body() dto: CartDTO) {
    const userId = request.user.id;
    return this.cartService.addProduct(userId, dto);
  }

  // ------------------------------------------------

  @Patch(':id')
  @ApiOperation({ summary: 'Изменить количество товара в корзине' })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно изменено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  updateCount(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
    @Body() body: { count: number },
  ) {
    const userId = request.user.id;
    return this.cartService.updateCount(id, body.count, userId);
  }

  // ------------------------------------------------

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар из корзины по ID' })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён из корзины',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  deleteProduct(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const userId = request.user.id;
    return this.cartService.deleteProduct(id, userId);
  }

  // ------------------------------------------------

  @Delete()
  @ApiOperation({ summary: 'Очистить всю корзину' })
  @ApiResponse({
    status: 200,
    description: 'Корзина успешно очищена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  clearCart(@Req() request) {
    const userId = request.user.id;
    return this.cartService.clearCart(userId);
  }
}
