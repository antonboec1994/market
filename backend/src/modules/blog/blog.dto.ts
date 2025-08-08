import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BlogDto {
  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  description: string;
}
