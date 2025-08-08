import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto, ProductFilterDto } from './product.dto';
import { products } from 'src/data/data';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const existingArray = await this.prisma.products.findMany();
    if (existingArray.length === 0) {
      await this.addProductsFromArray(products);
      console.log(`Массив продуктов успешно добавлен в базу данных!`);
    } else {
      console.log(`Массив продуктов уже существует в базе данных!`);
    }
  }

  async addProductsFromArray(data: ProductDto[]) {
    const products = data.map((item) => ({
      imageUrl: item.imageUrl,
      name: item.name,
      art: item.art,
      rating: item.rating,
      price: item.price,
      salePrice: item.salePrice,
      inStock: item.inStock,
      category: item.category,
      slides: item.slides,
      description: item.description,
      featured: item.featured,
      color: item.color,
      saveImage: item.saveImage,
      hotImage: item.hotImage,
      recommend: item.recommend,
      saler: item.saler,
      bestRating: item.bestRating,
      salehit: item.salehit,
    }));
    await this.prisma.products.createMany({
      data: products,
    });
  }

  async getAllProducts() {
    return await this.prisma.products.findMany();
  }

  async getProducts(filters: ProductFilterDto = {}) {
    const where: any = {};

    if (filters.category !== undefined) {
      where.category = filters.category;
    }
    if (filters.color) {
      where.color = filters.color;
    }
    if (filters.rating_gte !== undefined) {
      where.rating = {
        gte: filters.rating_gte,
      };
    }
    if (
      filters.salePrice_gte !== undefined ||
      filters.salePrice_lte !== undefined
    ) {
      where.salePrice = {};
      if (filters.salePrice_gte !== undefined) {
        where.salePrice.gte = filters.salePrice_gte;
      }
      if (filters.salePrice_lte !== undefined) {
        where.salePrice.lte = filters.salePrice_lte;
      }
    }

    const page = filters._page ?? 1;
    const limit = filters._limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      this.prisma.products.findMany({
        where,
        orderBy: this.getOrderBy(filters._sort, filters._order),
        skip,
        take: limit,
      }),
      this.prisma.products.count({ where }),
    ]);

    return {
      items,
      headersCount: totalCount,
    };
  }

  private getOrderBy(sort: string, order: 'asc' | 'desc') {
    const allowedSortFields = ['price', 'salePrice', 'rating'] as const;
    const field =
      sort &&
      allowedSortFields.includes(sort as (typeof allowedSortFields)[number])
        ? sort
        : 'id';

    const direction = order === 'desc' ? 'desc' : 'asc';

    return {
      [field]: direction,
    };
  }
}
