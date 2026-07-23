import styles from './page.module.css';

const CALENDAR_ID = 'acm.calstatela@gmail.com';
const CALENDAR_LINK = 'https://calendar.google.com/calendar/u/0?cid=YWNtLmNhbHN0YXRlbGFAZ21haWwuY29t';
const EMBED_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FLos_Angeles`;

export default function CalendarPage() {
  return (
    <main>
      <div className="Content flex flex-col">
        <div className={styles.header}>
          <h1 className={styles.heading}>Calendar</h1>
          <p className={styles.subtitle}>Meetings, workshops, and events for ACM.</p>
        </div>

        <div className={styles.calendarEmbed}>
          <iframe
            src={EMBED_URL}
            title="ACM Calendar"
            frameBorder="0"
            scrolling="no"
          />
        </div>

        <a
          href={CALENDAR_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openLink}
        >
          Open in Google Calendar →
        </a>
      </div>
    </main>
  );
}
