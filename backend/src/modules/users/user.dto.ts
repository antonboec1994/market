import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class GetUserDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;
}

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: 'Пользователь успешно удалён' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;
}
