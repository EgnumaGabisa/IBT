'use client';

import React, { useEffect, useState } from 'react';
import { CampusEvent, getEvents, registerEvent } from '@/lib/api';

const SAMPLE_EVENTS: CampusEvent[] = [
  {
    id: '1',
    title: 'Annual Tech & AI Hackathon',
    description: 'Build innovative campus solutions in 24 hours with mentors and prizes.',
    date: '2026-12-05',
    location: 'Main ICT Auditorium',
    availableSeats: 45,
  },
  {
    id: '2',
    title: 'Inter-Faculty Football Tournament',
    description: 'Cheer for your department team in the campus championship.',
    date: '2026-12-10',
    location: 'Campus Sports Complex',
    availableSeats: 120,
  },
  {
    id: '3',
    title: 'Cultural & Heritage Showcase',
    description: 'Celebrate student diversity through music, traditional food, and art.',
    date: '2026-12-15',
    location: 'Student Union Hall',
    availableSeats: 80,
  },
];

export default function CampusEventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const apiEvents = await getEvents();
      if (!active) return;
      setEvents(apiEvents.length > 0 ? apiEvents : SAMPLE_EVENTS);
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const filteredEvents = events.filter((ev) => {
    const q = search.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      (ev.location && ev.location.toLowerCase().includes(q)) ||
      (ev.description && ev.description.toLowerCase().includes(q))
    );
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!fullName.trim() || !email.trim() || !studentId.trim()) {
      setFeedback({ type: 'error', message: 'Please fill in Full Name, Email, and Student ID.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      await registerEvent(selectedEvent.id, {
        fullName: fullName.trim(),
        email: email.trim(),
        studentId: studentId.trim(),
      });

      setEvents((prev) =>
        prev.map((item) =>
          item.id === selectedEvent.id && typeof item.availableSeats === 'number'
            ? { ...item, availableSeats: Math.max(0, item.availableSeats - 1) }
            : item
        )
      );

      setFeedback({
        type: 'success',
        message: `Registered successfully for "${selectedEvent.title}"!`,
      });
      setFullName('');
      setEmail('');
      setStudentId('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not complete registration.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campus Events Hub</h1>
            <p className="text-slate-600 mt-1">
              Browse upcoming university events and reserve your spot.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search events or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No matching campus events found.
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <article
                  key={event.id}
                  className={`rounded-xl border bg-white p-5 shadow-sm flex flex-col justify-between transition ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-slate-900">{event.title}</h2>
                    {event.description && (
                      <p className="text-sm text-slate-600">{event.description}</p>
                    )}
                    <div className="text-xs text-slate-500 pt-2 space-y-1">
                      {event.date && <p>Date: {event.date}</p>}
                      {event.location && <p>Location: {event.location}</p>}
                      {typeof event.availableSeats === 'number' && (
                        <p className="font-medium text-slate-700">
                          Available Seats: {event.availableSeats}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEvent(event);
                      setFeedback(null);
                    }}
                    className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer"
                  >
                    {isSelected ? 'Selected for Registration' : 'Register for Event'}
                  </button>
                </article>
              );
            })}
          </section>
        )}

        {selectedEvent && (
          <section className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Event Registration</h3>
                <p className="text-sm text-slate-600">
                  Registering for: <span className="font-semibold">{selectedEvent.title}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>

            {feedback && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Student ID</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. UGR/1234/16"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Confirm Registration'}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}