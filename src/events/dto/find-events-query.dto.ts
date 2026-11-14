import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { EVENT_CATEGORIES } from './create-event.dto';
import type { EventCategory } from '../events.interfaces';

export class FindEventsQueryDto {
  @IsOptional()
  @IsIn(EVENT_CATEGORIES)
  category?: EventCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsIn(['startDate', 'title', 'capacity', 'registeredCount'])
  sortBy?: 'startDate' | 'title' | 'capacity' | 'registeredCount';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}