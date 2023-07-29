import { Module } from '@nestjs/common';
import { HomesService } from './services/homes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/Home.entity';
import { Task } from './entities/Task.entity';
import { Meal } from './entities/Meal.entity';
import { User } from './entities/User.entity';
import { UsersService } from './services/users.service';
import { HomesController } from './controllers/homes.controller';
import { MealsController } from './controllers/meals.controller';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MealsService } from './services/meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Home, Task, Meal])],
  providers: [UsersService, HomesService, TasksService, MealsService],
  exports: [UsersService],
  controllers: [HomesController, MealsController, TasksController],
})
export class UsersModule {}
