import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FeedbackDTO } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeedbacks(userId: number | null) {
    const where = userId ? { userId: userId } : {};
    const message = userId
      ? `Отзывы текущего пользователя ${userId} успешно получены`
      : 'Все отзывы успешно получены';

    const feedbacks = await this.prisma.feedbacks.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      include: {
        users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return {
      message: message,
      feedbacks: feedbacks,
    };
  }

  async addFeedback(userId: number, dto: FeedbackDTO) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existsUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    const sanitizedData = {
      productId: dto.productId,
      date: sanitizeString(dto.date),
      time: sanitizeString(dto.time),
      rating: dto.rating,
      userId: existsUser.id,
      userEmail: sanitizeString(dto.userEmail),
      userName: sanitizeString(dto.userName),
      feedbackMessage: sanitizeString(dto.feedbackMessage),
    };

    await this.prisma.feedbacks.create({
      data: sanitizedData,
    });
    return {
      message: 'Отзыв успешно добавлен',
    };
  }

  async deleteFeedback(feedbackId: number, userId: number) {
    const feedback = await this.prisma.feedbacks.findUnique({
      where: {
        id: feedbackId,
      },
    });
    if (!feedback) {
      throw new NotFoundException('Отзыв не найден');
    }
    if (feedback.userId !== userId) {
      throw new ForbiddenException('Отзыв принадлежит другому пользователю');
    }
    await this.prisma.feedbacks.delete({
      where: {
        id: feedbackId,
      },
    });
    return {
      message: 'Отзыв успешно удалён',
      success: true,
    };
  }
}
export function sanitizeString(str: string): string {
  return str.replace(/\0/g, '');
}
