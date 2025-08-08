import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GraphicService } from './graphics.service';

@Controller('graphics')
@ApiTags('Graphics')
export class GraphicController {
  constructor(private readonly GraphicService: GraphicService) {}

  @Get('get')
  @ApiOperation({ summary: 'Получить все графики' })
  @ApiResponse({ status: 200, description: 'Список графиков' })
  async getAll() {
    return this.GraphicService.getAll();
  }
}
