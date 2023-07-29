import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/User.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 16;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const { password, email } = payload;
    const hashedPassword = bcrypt.hashSync(password, this.SALT);
    const user = await this.userRepository.save({
      ...payload,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    delete user.password;
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  async findUserByEmail(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    const isMatch = bcrypt.compareSync(password, user?.password);
    if (!isMatch) return null;
    delete user.password;
    return user;
  }

  //TODO: implement update
  update(id: string, payload: UpdateUserDto) {
    throw new Error('This method is not implemented');
  }
}
