import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
