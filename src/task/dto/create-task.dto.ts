/* eslint-disable @typescript-eslint/no-unsafe-call */
// create-task.dto.ts

import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status, Priority } from '../enums/task.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Finish project documentation' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-05-01', type: String, format: 'date' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ enum: Status, example: Status.Pending })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: Priority, example: Priority.Medium })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
