import { NextResponse } from 'next/server';

// Pulls events from a public Google Calendar via the Calendar API (read-only,
// API-key auth — no OAuth needed since the calendar is public). Configure
// GOOGLE_CALENDAR_ID and GOOGLE_CALENDAR_API_KEY in .env.local.
export async function GET(request) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!calendarId || !apiKey) {
    return NextResponse.json(
      { events: [], error: 'Google Calendar is not configured (missing GOOGLE_CALENDAR_ID / GOOGLE_CALENDAR_API_KEY).' },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  const apiUrl = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );
  apiUrl.searchParams.set('key', apiKey);
  apiUrl.searchParams.set('singleEvents', 'true');
  apiUrl.searchParams.set('orderBy', 'startTime');
  if (timeMin) apiUrl.searchParams.set('timeMin', timeMin);
  if (timeMax) apiUrl.searchParams.set('timeMax', timeMax);

  let res;
  try {
    res = await fetch(apiUrl, { next: { revalidate: 300 } });
  } catch {
    return NextResponse.json({ events: [], error: 'Could not reach Google Calendar.' }, { status: 200 });
  }

  if (!res.ok) {
    return NextResponse.json(
      { events: [], error: `Google Calendar API error (${res.status}).` },
      { status: 200 }
    );
  }

  const data = await res.json();

  const events = (data.items || [])
    .filter((item) => item.status !== 'cancelled')
    .map((item) => ({
      id: item.id,
      title: item.summary || '(untitled event)',
      description: item.description || '',
      start: item.start?.dateTime || item.start?.date,
      allDay: !item.start?.dateTime,
    }));

  return NextResponse.json({ events });
}
