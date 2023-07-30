import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { MealsService } from '../services/meals.service';
import { CreateMealDto, UpdateMealDto } from '../dtos/Meal.dtos';
import { UsersService } from '../services/users.service';

@Controller('meals')
export class MealsController {
  constructor(
    private mealsService: MealsService,
    private usersService: UsersService,
  ) {}

  @Get()
  async findByHome(@Req() req) {
    const { id } = req.user;
    const user = await this.usersService.findById(id);
    if (!user.home) {
      return [];
    }
    const homeId = user.home.id;
    return this.mealsService.findByHome(homeId);
  }

  @Post()
  async create(@Body() payload: CreateMealDto, @Req() req) {
    const { id } = req.user;
    const user = await this.usersService.findById(id);
    if (!user.home) {
      throw new NotFoundException('Id de hogar no valido');
    }
    const homeId = user.home.id;
    return this.mealsService.create(homeId, payload);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMealDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const user = await this.usersService.findById(userId);
    const meal = await this.mealsService.findById(id);
    if (user?.home?.id !== meal?.home?.id) {
      throw new NotFoundException('No existe un comida con ese id');
    }
    return this.mealsService.update(id, payload);
  }
}
