/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';
import { TaskFilterDto } from './dto/filter.dto';
import { Like } from 'typeorm';
@Injectable()
export class TaskService {
  constructor(readonly taskRepository: TaskRepository) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new Task();
    newTask.dateOfCreation = new Date();
    newTask.isActive = true;
    newTask.name = createTaskDto.name;
    newTask.dueDate = createTaskDto.dueDate;
    newTask.priority = createTaskDto.priority;
    newTask.status = createTaskDto.status;
    return await this.taskRepository.save(newTask);
  }

  async findAll(filter: TaskFilterDto) {
    const {
      page = 1,
      limit = 10,
      name,
      status,
      priority,
      dueDate,
      isActive,
    } = filter;
    const where: any = {};
    if (name) where.name = Like(`%${name}%`);
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (dueDate) where.dueDate = dueDate;
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const [data, total] = await this.taskRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { dateOfCreation: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException('Data is already updated');
    }
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    const updatedTask = await this.taskRepository.save({
      ...task,
      ...updateTaskDto,
    });
    return updatedTask;
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    task.isActive = false;
    await this.taskRepository.save(task);
    return `This action removes a #${id} task`;
  }
}
