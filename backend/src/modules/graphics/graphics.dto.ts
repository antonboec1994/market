import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class GraphicValuesDto {
  prices: number[][];
}

export class GraphicDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => GraphicValuesDto })
  @IsObject()
  values: GraphicValuesDto;
}
