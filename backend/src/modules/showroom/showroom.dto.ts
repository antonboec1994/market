import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class ShowroomDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  slides: string[];
}
