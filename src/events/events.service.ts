import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';
import {
  Event,
  PaginatedEventsResponse,
  Session,
} from './events.interfaces';
import { SEED_EVENTS } from './events.seed';

@Injectable()
export class EventsService {
  private readonly events: Event[] = structuredClone(SEED_EVENTS);

  findAll(query: FindEventsQueryDto): PaginatedEventsResponse {
    const {
      category,
      search,
      tag,
      sortBy = 'startDate',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    let filtered = [...this.events];

    if (category) {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (search) {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword) ||
          event.location.toLowerCase().includes(keyword) ||
          event.organizer.toLowerCase().includes(keyword),
      );
    }

    if (tag) {
      const normalizedTag = tag.toLowerCase();
      filtered = filtered.filter((event) =>
        event.tags.some((t) => t.toLowerCase() === normalizedTag),
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'startDate') {
        comparison =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'capacity') {
        comparison = a.capacity - b.capacity;
      } else if (sortBy === 'registeredCount') {
        comparison = a.registeredCount - b.registeredCount;
      }

      return order === 'desc' ? -comparison : comparison;
    });

    const total = filtered.length;
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  findUpcoming(): Event[] {
    const now = Date.now();
    return this.events
      .filter((event) => new Date(event.startDate).getTime() > now)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
  }

  findOne(id: string): Event {
    const event = this.events.find((item) => item.id === id);
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  findSessions(eventId: string): Session[] {
    const event = this.findOne(eventId);
    return event.sessions;
  }

  findSingleSession(eventId: string, sessionId: string): Session {
    const event = this.findOne(eventId);
    const session = event.sessions.find((s) => s.id === sessionId);
    if (!session) {
      throw new NotFoundException(
        `Session with ID "${sessionId}" not found in event "${eventId}"`,
      );
    }
    return session;
  }

  create(dto: CreateEventDto): Event {
    const startMs = new Date(dto.startDate).getTime();
    const endMs = new Date(dto.endDate).getTime();

    if (endMs <= startMs) {
      throw new BadRequestException('endDate must be after startDate');
    }

    const registeredCount = dto.registeredCount ?? 0;
    if (registeredCount > dto.capacity) {
      throw new BadRequestException(
        'registeredCount cannot exceed event capacity',
      );
    }

    const newId = `evt-${String(this.events.length + 1).padStart(3, '0')}`;
    const sessions: Session[] = (dto.sessions ?? []).map((s, idx) => {
      if (new Date(s.endTime).getTime() <= new Date(s.startTime).getTime()) {
        throw new BadRequestException(
          `Session "${s.title}" endTime must be after startTime`,
        );
      }
      return {
        id: `ses-${Date.now()}-${idx + 1}`,
        title: s.title,
        speaker: s.speaker,
        startTime: s.startTime,
        endTime: s.endTime,
        room: s.room,
      };
    });

    const newEvent: Event = {
      id: newId,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      location: dto.location,
      organizer: dto.organizer,
      startDate: dto.startDate,
      endDate: dto.endDate,
      capacity: dto.capacity,
      registeredCount,
      tags: dto.tags ?? [],
      sessions,
      createdAt: new Date().toISOString(),
    };

    this.events.push(newEvent);
    return newEvent;
  }
}