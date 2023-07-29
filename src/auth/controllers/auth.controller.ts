import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/User.dtos';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post()
  signUp(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
