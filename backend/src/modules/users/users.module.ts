import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService, PrismaService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
