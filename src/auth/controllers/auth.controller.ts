import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/User.dtos';
import { AuthService } from '../services/auth.service';
import { IsPublic } from '../decorators/access.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @IsPublic()
  signUp(@Body() payload: CreateUserDto) {
    return this.authService.signUp(payload);
  }

  @Post('sign-in')
  signIn() {}
}
