
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface CampusEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  availableSeats?: number;
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  studentId: string;
}

export async function getEvents(): Promise<CampusEvent[]> {
  try {
    const res = await fetch(`${API_BASE}/events`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.items ?? data.data ?? [];
  } catch {
    return [];
  }
}

export async function registerEvent(eventId: string, payload: RegistrationPayload) {
  const res = await fetch(`${API_BASE}/events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
}