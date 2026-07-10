import EventsClient from './EventsClient';
import { getUpcomingEvent, getSemesterEvents, getPastEvents } from '@/lib/events';

// Past events are randomly picked, so this page must render per-request, not be cached at build time.
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const [upcomingEvent, semesterEvents, pastEvents] = await Promise.all([
    getUpcomingEvent(),
    getSemesterEvents(),
    getPastEvents(),
  ]);

  return (
    <EventsClient
      upcomingEvent={upcomingEvent}
      semesterEvents={semesterEvents}
      pastEvents={pastEvents}
    />
  );
}
