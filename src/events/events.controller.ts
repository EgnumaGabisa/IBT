import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: FindEventsQueryDto) {
    return this.eventsService.findAll(query);
  }

  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  @Get(':id/sessions/:sessionId')
  findSingleSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findSingleSession(id, sessionId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}