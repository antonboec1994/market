import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductFilterDto } from './product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить продукты (с фильтрацией, пагинацией, сортировкой)',
  })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов',
  })
  async getProducts(@Query() filters: ProductFilterDto) {
    return this.productService.getProducts(filters);
  }
}
