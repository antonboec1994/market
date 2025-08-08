import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Post('add')
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

  @Post('plus')
  @ApiOperation({ summary: 'Увеличить количество товара в корзине' })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно увеличено в корзине',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  plusProduct(@Req() request, @Body() dto: CartDTO) {
    const userId = request.user.id;
    return this.cartService.plusProduct(userId, dto);
  }

  // ------------------------------------------------

  @Post('minus')
  @ApiOperation({ summary: 'Уменьшить количество товара в корзине' })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно уменьшено в корзине',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  minusProduct(@Req() request, @Body() dto: CartDTO) {
    const userId = request.user.id;
    return this.cartService.minusProduct(userId, dto);
  }

  // ------------------------------------------------

  @Delete('delete')
  @ApiOperation({ summary: 'Удалить товар из корзины' })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён из корзины',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  deleteProduct(@Query('productId') productId: number, @Req() request) {
    const userId = request.user.id;
    return this.cartService.deleteProduct(userId, productId);
  }

  // ------------------------------------------------

  @Delete('clear')
  @ApiOperation({ summary: 'Очистить корзину' })
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

  // ------------------------------------------------

  @Get('get')
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
}
