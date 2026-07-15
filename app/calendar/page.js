'use client';

import { useMemo, useState } from 'react';
import styles from './page.module.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Event type → legend label + chip color.
const EVENT_TYPES = {
  workshop: { label: 'Workshop', color: 'purple' },
  speaker: { label: 'Speaker', color: 'blue' },
  special: { label: 'Special Event', color: 'pink' },
};

const key = (y, m, d) => `${y}-${m}-${d}`;

const EVENT_TIME = '3:00 PM';

function getTuesdays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const tuesdays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (new Date(year, month, d).getDay() === 2) tuesdays.push(d);
  }
  return tuesdays;
}

export default function CalendarPage() {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  // Full schedule is still TBD — placeholder events just preview the layout
  // and color-coding, on every Tuesday of this month at 3pm.
  const EVENTS = useMemo(() => {
    const y = today.getFullYear();
    const m = today.getMonth();
    const types = Object.keys(EVENT_TYPES);
    return Object.fromEntries(
      getTuesdays(y, m).map((d, i) => [
        key(y, m, d),
        [{ title: 'TBD', type: types[i % types.length], time: EVENT_TIME }],
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = useMemo(() => {
    const { year, month } = view;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const result = [];
    // leading days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({ day: daysInPrev - i, current: false });
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ day: d, current: true });
    }
    // trailing days to complete the last week
    while (result.length % 7 !== 0) {
      result.push({ day: result.length % 7, current: false });
    }
    return result;
  }, [view]);

  const changeMonth = (delta) => {
    setView(({ year, month }) => {
      const next = month + delta;
      return {
        year: year + Math.floor(next / 12),
        month: ((next % 12) + 12) % 12,
      };
    });
  };

  const goToday = () =>
    setView({ year: today.getFullYear(), month: today.getMonth() });

  const isToday = (d) =>
    view.year === today.getFullYear() &&
    view.month === today.getMonth() &&
    d === today.getDate();

  const upcoming = Object.entries(EVENTS)
    .map(([k, evs]) => {
      const [y, m, d] = k.split('-').map(Number);
      return { date: new Date(y, m, d), evs };
    })
    .filter(({ date }) => date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  return (
    <main>
      <div className="Content flex flex-col">
        <div className={styles.header}>
          <h1 className={styles.heading}>Calendar</h1>
          <p className={styles.subtitle}>Meetings, workshops, and events for ACM.</p>
        </div>

        <div className={styles.calendar}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.monthLabel}>
              {MONTHS[view.month]} <span className={styles.year}>{view.year}</span>
            </div>
            <div className={styles.controls}>
              <button className={styles.todayBtn} onClick={goToday}>Today</button>
              <button
                className={styles.navBtn}
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                ‹
              </button>
              <button
                className={styles.navBtn}
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className={styles.weekdays}>
            {WEEKDAYS.map((w) => (
              <div key={w} className={styles.weekday}>
                <span className={styles.weekdayFull}>{w}</span>
                <span className={styles.weekdayShort}>{w[0]}</span>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className={styles.grid}>
            {cells.map((cell, i) => {
              const evs = cell.current ? EVENTS[key(view.year, view.month, cell.day)] : null;
              return (
                <div
                  key={i}
                  className={`${styles.cell} ${cell.current ? '' : styles.muted} ${isToday(cell.day) && cell.current ? styles.today : ''}`}
                >
                  <span className={styles.dayNum}>{cell.day}</span>
                  {evs && (
                    <div className={styles.events}>
                      {evs.map((ev, j) => (
                        <span
                          key={j}
                          className={`${styles.event} ${styles[EVENT_TYPES[ev.type].color]}`}
                          title={`${EVENT_TYPES[ev.type].label} — ${ev.title} @ ${ev.time}`}
                        >
                          {ev.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming list */}
        <div className={styles.upcoming}>
          <h2 className={styles.upcomingHeading}>Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className={styles.subtitle}>No upcoming events scheduled.</p>
          ) : (
            <ul className={styles.upcomingList}>
              {upcoming.map(({ date, evs }) =>
                evs.map((ev, j) => (
                  <li key={`${date}-${j}`} className={styles.upcomingItem}>
                    <div className={`${styles.dateChip} ${styles[EVENT_TYPES[ev.type].color]}`}>
                      <span className={styles.chipMonth}>{MONTHS[date.getMonth()].slice(0, 3)}</span>
                      <span className={styles.chipDay}>{date.getDate()}</span>
                    </div>
                    <div>
                      <p className={styles.eventTitle}>{ev.title}</p>
                      <p className={styles.eventMeta}>
                        {WEEKDAYS[date.getDay()]}, {MONTHS[date.getMonth()]} {date.getDate()} · {ev.time}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          {Object.values(EVENT_TYPES).map(({ label, color }) => (
            <div key={label} className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles[color]}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
