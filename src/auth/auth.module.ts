import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
