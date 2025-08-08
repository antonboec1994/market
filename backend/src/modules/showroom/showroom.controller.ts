import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ShowroomService } from './showroom.service';

@Controller('showroom')
@ApiTags('Showroom')
export class ShowroomController {
  constructor(private readonly ShowroomService: ShowroomService) {}

  @Get('get')
  @ApiOperation({ summary: 'Получить все шоурум' })
  @ApiResponse({ status: 200, description: 'Список шоурум' })
  async getAll() {
    return this.ShowroomService.getAll();
  }
}
