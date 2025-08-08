import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class ProductFilterDto {
  @ApiProperty({
    description: 'Поиск по имени товара',
    required: false,
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({
    description: 'Фильтр по категории',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  category?: number;

  @ApiProperty({
    description: 'Цвет товара',
    example: 'red',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'Минимальный рейтинг',
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  rating_gte?: number;

  @ApiProperty({
    description: 'Минимальная цена',
    example: 50000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  salePrice_gte?: number;

  @ApiProperty({
    description: 'Максимальная цена',
    example: 100000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  salePrice_lte?: number;

  @ApiProperty({
    description: 'Поле для сортировки',
    enum: ['price', 'salePrice', 'rating'],
    required: false,
  })
  @IsOptional()
  @IsString()
  _sort?: 'price' | 'salePrice' | 'rating';

  @ApiProperty({
    description: 'Направление сортировки',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsString()
  _order?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Номер страницы',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  _page?: number;

  @ApiProperty({
    description: 'Количество товаров на странице',
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
  })
  _limit?: number;
}

export class ProductDto {
  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  art: string;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  salePrice: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty()
  @IsNumber()
  category: number;

  @ApiProperty({ type: [String] })
  slides: string[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  saveImage?: string;

  @ApiProperty()
  @IsString()
  hotImage?: string;

  @ApiProperty()
  @IsString()
  recommend?: boolean;

  @ApiProperty()
  @IsString()
  saler?: boolean;

  @ApiProperty()
  @IsString()
  bestRating?: boolean;

  @ApiProperty()
  @IsString()
  salehit?: boolean;
}
