import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: 'Товар' })
  @IsString()
  name: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  salePrice: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  count: number;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  currentTotalPrice: number;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  currentTotalSalePrice: number;
}
