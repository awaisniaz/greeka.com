/* eslint-disable @typescript-eslint/no-unsafe-call */
// update-task.dto.ts

import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status, Priority } from '../enums/task.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Updated task name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: Status, example: Status.InProgress })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ enum: Priority, example: Priority.High })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
