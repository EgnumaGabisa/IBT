import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import type { EventCategory } from '../events.interfaces';

export const EVENT_CATEGORIES: EventCategory[] = [
  'academic',
  'cultural',
  'sports',
  'career',
  'social',
  'workshop',
];

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  speaker: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  room: string;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(EVENT_CATEGORIES)
  category: EventCategory;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  organizer: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  registeredCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSessionDto)
  sessions?: CreateSessionDto[];
}