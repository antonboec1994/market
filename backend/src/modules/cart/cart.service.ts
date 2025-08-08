import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartDTO } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

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
      return this.increaseProductCount(userId, dto);
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

  async increaseProductCount(userId: number, dto: CartDTO) {
    const existsProduct = await this.prisma.cart.findFirst({
      where: { productId: dto.productId, userId },
    });
    if (!existsProduct) {
      return this.addProduct(userId, dto);
    }
    const updatedCart = await this.prisma.cart.update({
      where: { id: existsProduct.id },
      data: {
        count: existsProduct.count + dto.count,
        currentTotalPrice:
          existsProduct.currentTotalPrice + existsProduct.price * dto.count,
        currentTotalSalePrice:
          existsProduct.currentTotalSalePrice +
          existsProduct.salePrice * dto.count,
      },
    });
    return {
      message: 'Количество товара успешно увеличено',
      cart: updatedCart,
    };
  }

  async plusProduct(userId: number, dto: CartDTO) {
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
    if (!existsProduct) {
      return this.addProduct(userId, dto);
    }
    const updatedCart = await this.prisma.cart.update({
      where: { id: existsProduct.id },
      data: {
        count: existsProduct.count + 1,
        currentTotalPrice:
          existsProduct.currentTotalPrice + existsProduct.price,
        currentTotalSalePrice:
          existsProduct.currentTotalSalePrice + existsProduct.salePrice,
      },
    });
    return {
      message: 'Количество товара успешно увеличено в корзине',
      cart: updatedCart,
    };
  }

  async minusProduct(userId: number, dto: CartDTO) {
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
      if (existsProduct.count <= 1) {
        await this.prisma.cart.delete({
          where: { id: existsProduct.id },
        });
        return {
          message: 'Товар успешно удален из корзины',
          cart: {
            ...existsProduct,
            count: 0,
            currentTotalPrice: 0,
            currentTotalSalePrice: 0,
          },
        };
      } else {
        const updatedCart = await this.prisma.cart.update({
          where: { id: existsProduct.id },
          data: {
            count: existsProduct.count - 1,
            currentTotalPrice:
              existsProduct.currentTotalPrice - existsProduct.price,
            currentTotalSalePrice:
              existsProduct.currentTotalSalePrice - existsProduct.salePrice,
          },
        });
        return {
          message: 'Количество товара успешно уменьшено в корзине',
          cart: updatedCart,
        };
      }
    }
  }

  async deleteProduct(userId: number, productId: number) {
    const existsProduct = await this.prisma.cart.findFirst({
      where: { productId: Number(productId), userId },
    });
    if (!existsProduct) {
      throw new NotFoundException('Товар не найден в корзине');
    }
    await this.prisma.cart.delete({
      where: { id: existsProduct.id },
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

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findMany({
      where: { userId },
    });
    return {
      message: 'Корзина успешно получена',
      cart: cart,
    };
  }
}
