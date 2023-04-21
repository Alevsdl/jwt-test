import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../entities/usert.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(UserType)
  userType: UserType;
}
