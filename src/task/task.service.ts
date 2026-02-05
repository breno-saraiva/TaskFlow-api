import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto, FindAllParameters, TaskDto } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: CreateTaskDto): { id: string } {
    const newTask: TaskDto = { id: uuid(), ...task };
    this.tasks.push(newTask);

    return { id: newTask.id };
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((i) => i.id === id);

    if (foundTask.length > 0) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }
      return match;
    });
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((i) => i.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((i) => i.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
