import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { FeedbackDTO } from './feedback.dto';

@Controller('feedbacks')
@ApiTags('Feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех отзывов' })
  @ApiResponse({
    status: 200,
    description: 'Отзывы успешно получены',
  })
  getFeedbacks(@Query('userId') userId: string) {
    return this.feedbackService.getFeedbacks(userId ? +userId : null);
  }

  // ------------------------------------------------

  @Post()
  @ApiOperation({ summary: 'Добавление нового отзыва' })
  @ApiResponse({
    status: 200,
    description: 'Новый отзыв успешно добавлен',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @UseGuards(JwtAuthGuard)
  addFeedback(@Body() dto: FeedbackDTO, @Req() request) {
    const userId = request.user.id;
    return this.feedbackService.addFeedback(userId, dto);
  }

  // ------------------------------------------------

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление текущего отзыва' })
  @ApiResponse({
    status: 200,
    description: 'Текущий отзыв успешно удалён',
  })
  @ApiResponse({
    status: 404,
    description: 'Отзыв не найден',
  })
  @UseGuards(JwtAuthGuard)
  deleteFeedback(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const userId = request.user.id;
    return this.feedbackService.deleteFeedback(id, userId);
  }
}
