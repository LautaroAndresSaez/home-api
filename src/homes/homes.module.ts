import { Module } from '@nestjs/common';
import { HomesService } from './services/homes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/Home.entity';
import { Task } from './entities/Task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, Task])],
  providers: [HomesService],
})
export class HomesModule {}
