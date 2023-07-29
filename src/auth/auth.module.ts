import { Module } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import config, { Config } from 'src/env/config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule {}
