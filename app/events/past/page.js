import PastEventsClient from './PastEventsClient';
import { getAllPastEvents } from '@/lib/events';

export default async function PastEventsPage() {
  const pastEvents = await getAllPastEvents();

  return <PastEventsClient pastEvents={pastEvents} />;
}
