import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/User.dtos';
import { User } from '../../users/entities/User.entity';
import { UsersService } from '../../users/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email, password);
    return this.userToResp(user);
  }

  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return this.userToResp(user);
  }

  private userToResp(user: User) {
    return {
      ...user,
      accessToken: this.jwtService.sign(user),
    };
  }
}
