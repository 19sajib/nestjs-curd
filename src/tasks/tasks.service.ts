import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.schema';
import { User } from 'src/auth/user.schema';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  // constructor(@InjectModel('Task') private taskModel: mongoose.Model<Task>)
  // {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status);
  }
}
