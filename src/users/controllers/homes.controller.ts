import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { HomesService } from '../services/homes.service';
import { CreateHomeDto } from '../dtos/Home.dtos';
import { User } from '../entities/User.entity';
import { classToPlain } from 'class-transformer';

@Controller('homes')
export class HomesController {
  constructor(private homesService: HomesService) {}

  @Post()
  create(@Body() payload: CreateHomeDto, @Req() req) {
    const user = req.user as User;
    return this.homesService.create(user.id, payload);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const home = await this.homesService.findById(id);
    return classToPlain(home);
  }

  @Post(':id')
  async addUser(@Param('id') id: string, @Req() req) {
    const user = req.user;
    const home = await this.homesService.addUserToHome(user.id, id);
    return classToPlain(home);
  }
}
