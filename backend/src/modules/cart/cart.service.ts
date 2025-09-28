import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartDTO } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
    return {
      message: 'Корзина успешно получена',
      cart: cart,
    };
  }

  async addProduct(userId: number, dto: CartDTO) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existsUser) {
      throw new NotFoundException('Пользователь не найден');
    }
    const existsProduct = await this.prisma.cart.findFirst({
      where: {
        productId: dto.productId,
        userId: userId,
      },
    });
    if (existsProduct) {
      const newCount = existsProduct.count + 1;
      return this.updateCount(existsProduct.id, newCount, userId);
    }
    const newCart = await this.prisma.cart.create({
      data: {
        productId: dto.productId,
        imageUrl: dto.imageUrl,
        name: dto.name,
        price: dto.price,
        salePrice: dto.salePrice,
        count: dto.count,
        currentTotalPrice: dto.currentTotalPrice,
        currentTotalSalePrice: dto.currentTotalSalePrice,
        userId,
      },
    });
    return {
      message: 'Товар успешно добавлен в корзину',
      cart: newCart,
    };
  }

  async updateCount(productId: number, newCount: number, userId: number) {
    const currentProduct = await this.prisma.cart.findUnique({
      where: {
        id: productId,
        userId: userId,
      },
    });

    if (!currentProduct) throw new NotFoundException('Товар с не найден');

    if (newCount <= 0) {
      await this.prisma.cart.delete({
        where: { id: productId },
      });
      return {
        message: 'Товар успешно удалён из корзины',
        cart: null,
      };
    }

    const newCart = await this.prisma.cart.update({
      where: { id: currentProduct.id },
      data: {
        count: newCount,
        currentTotalPrice: currentProduct.price * newCount,
        currentTotalSalePrice: currentProduct.salePrice * newCount,
      },
    });

    return {
      message: 'Количество товара в корзине успешно изменилось',
      cart: newCart,
    };
  }

  async deleteProduct(productId: number, userId: number) {
    const existsProduct = await this.prisma.cart.findFirst({
      where: { id: productId, userId },
    });
    if (!existsProduct) {
      throw new NotFoundException('Товар не найден в корзине');
    }
    await this.prisma.cart.delete({
      where: { id: existsProduct.id, userId },
    });
    return {
      message: 'Товар успешно удалён из корзины',
      success: true,
    };
  }

  async clearCart(userId: number) {
    await this.prisma.cart.deleteMany({
      where: { userId },
    });
    return {
      message: 'Корзина успешно очищена',
      success: true,
    };
  }
}
