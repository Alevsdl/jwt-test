import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { IsAuthorizedGuard } from 'src/auth/guards/is-authorized.guard';
import CreateUserDTO from './dtos/create-user.dto';
import { UserService } from './user.service';

@UseGuards(IsAuthorizedGuard)
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @SetMetadata('is-public', true)
  @Get('/')
  index() {
    return this.usersService.findMany();
  }

  @Post('/')
  create(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }
}
