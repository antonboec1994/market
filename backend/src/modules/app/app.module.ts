import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartModule } from '../cart/cart.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '../product/product.module';
import { ShowroomModule } from '../showroom/showroom.module';
import { BlogModule } from '../blog/blog.module';
import { GraphicModule } from '../graphics/graphics.module';

@Module({
  imports: [
    UsersModule,
    FeedbackModule,
    CartModule,
    ProductModule,
    ShowroomModule,
    BlogModule,
    GraphicModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
