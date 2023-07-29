import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/Meal.entity';
import { Repository } from 'typeorm';
import { CreateMealDto, UpdateMealDto } from '../dtos/Meal.dtos';
import { HomesService } from './homes.service';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    private homesServices: HomesService,
  ) {}

  findByHome(homeId: string) {
    return this.mealRepository.find({
      where: {
        home: {
          id: homeId,
        },
      },
    });
  }

  async create(homeId: string, payload: CreateMealDto) {
    const meal = this.mealRepository.create(payload);
    const home = await this.homesServices.findById(homeId);
    meal.home = home;

    return await this.mealRepository.save(meal);
  }

  update(id: string, payload: UpdateMealDto) {
    return this.mealRepository.update(id, payload);
  }

  delete(id: string) {
    return this.mealRepository.delete(id);
  }
}
