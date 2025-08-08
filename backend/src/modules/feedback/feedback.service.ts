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

  async getFeedbacks(userId: number) {
    const feedbacks = await this.prisma.feedbacks.findMany({
      where: { userId },
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
      message: 'Все отзывы текущего пользователя успешно получены',
      data: { feedbacks },
    };
  }

  async getFeedbacksAll() {
    const feedbacks = await this.prisma.feedbacks.findMany({
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
      message: 'Все отзывы успешно получены',
      data: { feedbacks },
    };
  }

  async deleteFeedback(userId: number, feedbackId: string) {
    const feedback = await this.prisma.feedbacks.findUnique({
      where: {
        id: Number(feedbackId),
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
        id: Number(feedbackId),
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
