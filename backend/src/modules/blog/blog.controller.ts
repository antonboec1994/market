import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}

  @Get('get')
  @ApiOperation({ summary: 'Получить все статьи' })
  @ApiResponse({ status: 200, description: 'Список блогов' })
  async getAll() {
    return this.BlogService.getAll();
  }
}
