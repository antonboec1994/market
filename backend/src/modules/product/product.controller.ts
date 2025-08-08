import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductFilterDto } from './product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAll')
  @ApiOperation({
    summary: 'Получить все продукты ',
  })
  @ApiResponse({ status: 200, description: 'Список продуктов' })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('get')
  @ApiOperation({
    summary: 'Получить продукты по фильтрации, или по поиску',
  })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов по фильтрации, или по поиску',
  })
  async getProducts(@Query() filters: ProductFilterDto) {
    return this.productService.getProducts(filters);
  }
}
