import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/Task.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/Task.dtos';
import { HomesService } from './homes.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private homesService: HomesService,
  ) {}

  async findByHome(homeId: string) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return this.taskRepository.find({
      where: {
        home: {
          id: homeId,
        },
        date: MoreThan(date),
      },
    });
  }

  async create(homeId: string, payload: CreateTaskDto) {
    const home = await this.homesService.findById(homeId);
    const task = this.taskRepository.create(payload);
    task.home = home;
    return this.taskRepository.save(task);
  }

  update(id: string, payload: UpdateTaskDto) {
    return this.taskRepository.update(id, payload);
  }

  delete(id: string) {
    return this.taskRepository.delete(id);
  }
}
