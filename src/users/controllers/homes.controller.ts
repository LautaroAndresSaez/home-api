import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { HomesService } from '../services/homes.service';
import { CreateHomeDto } from '../dtos/Home.dtos';
import { User } from '../entities/User.entity';

@Controller('homes')
export class HomesController {
  constructor(private homesService: HomesService) {}

  @Post()
  create(@Body() payload: CreateHomeDto, @Req() req) {
    const user = req.user as User;
    return this.homesService.create(user.id, payload);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id') id: string) {
    const home = await this.homesService.findById(id);
    return home;
  }

  @Post(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async addUser(@Param('id') id: string, @Req() req) {
    const user = req.user;
    const home = await this.homesService.addUserToHome(user.id, id);
    return home;
  }
}
