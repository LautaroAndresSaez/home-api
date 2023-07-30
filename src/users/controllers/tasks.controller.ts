import { CreateTaskDto, UpdateTaskDto } from './../dtos/Task.dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  @Get()
  async findAll(@Req() req) {
    const { id } = req.user;
    const user = await this.usersService.findById(id);
    if (!user.home) {
      return [];
    }
    const homeId = user.home.id;
    return this.tasksService.findByHome(homeId);
  }

  @Post()
  async create(@Body() payload: CreateTaskDto, @Req() req) {
    const { id } = req.user;
    const user = await this.usersService.findById(id);
    if (!user.home) {
      return [];
    }
    const homeId = user.home.id;
    return this.tasksService.create(homeId, payload);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTaskDto,
    @Req() req,
  ) {
    const { id: userId } = req.user;
    const user = await this.usersService.findById(userId);
    const task = await this.tasksService.findById(id);
    if (user?.home?.id !== task?.home?.id) {
      throw new NotFoundException('La tarea no existe');
    }
    console.log(payload);
    return this.tasksService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const { id: userId } = req.user;
    const user = await this.usersService.findById(userId);
    const task = await this.tasksService.findById(id);
    if (user?.home.id !== task?.home.id) {
      throw new NotFoundException('La tarea no existe');
    }

    return this.tasksService.delete(id);
  }

  @Put(':id/complete')
  async complete(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const { id: userId } = req.user;
    const user = await this.usersService.findById(userId);
    const task = await this.tasksService.findById(id);
    if (user?.home.id !== task?.home.id) {
      throw new NotFoundException('La tarea no existe');
    }

    return this.tasksService.update(id, {
      isCompleted: true,
    });
  }
}
