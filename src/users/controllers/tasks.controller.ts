import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}
}
