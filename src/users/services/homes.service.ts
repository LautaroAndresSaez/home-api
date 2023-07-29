import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from '../entities/Home.entity';
import { Repository } from 'typeorm';
import { CreateHomeDto } from '../dtos/Home.dtos';
import { UsersService } from './users.service';

@Injectable()
export class HomesService {
  constructor(
    @InjectRepository(Home) private homeRepository: Repository<Home>,
    private usersService: UsersService,
  ) {}

  findById(id: string) {
    return this.homeRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async create(userId: string, payload: CreateHomeDto) {
    const user = await this.usersService.findById(userId);
    if (user.home) {
      throw new NotFoundException('El usuario ya tiene un hogar');
    }
    const home = this.homeRepository.create(payload);
    const createdHome = await this.homeRepository.save(home);
    await this.usersService.addHome(userId, createdHome);
    return createdHome;
  }

  async addUserToHome(userId: string, id: string) {
    const home = await this.findById(id);
    await this.usersService.addHome(userId, home);
    return await this.homeRepository.findOne({
      where: { id },
    });
  }
}
