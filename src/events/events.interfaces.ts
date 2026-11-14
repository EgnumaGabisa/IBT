export type EventCategory =
  | 'academic'
  | 'cultural'
  | 'sports'
  | 'career'
  | 'social'
  | 'workshop';

export interface Session {
  id: string;
  title: string;
  speaker: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  organizer: string;
  startDate: string;
  endDate: string;
  capacity: number;
  registeredCount: number;
  tags: string[];
  sessions: Session[];
  createdAt: string;
}

export interface PaginatedEventsResponse {
  data: Event[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}