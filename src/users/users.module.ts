import { Module } from '@nestjs/common';
import { HomesService } from './services/homes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/Home.entity';
import { Task } from './entities/Task.entity';
import { Meal } from './entities/Meal.entity';
import { User } from './entities/User.entity';
import { UsersService } from './services/users.service';
import { HomesController } from './controllers/homes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Home, Task, Meal])],
  providers: [UsersService, HomesService],
  exports: [UsersService],
  controllers: [HomesController],
})
export class UsersModule {}
