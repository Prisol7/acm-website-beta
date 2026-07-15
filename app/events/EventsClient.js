'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

export default function EventsClient({ upcomingEvent, semesterEvents, pastEvents }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <main>
      <div className="Content flex flex-col">

        {/* ── Hero banner ── */}
        <div className={styles.banner}>
          <Image src="/images/group.jpg" alt="ACM group" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className={styles.intro}>
          <h1 className={styles.pageHeading}>General Meetings</h1>
          <p className={styles.muted}>
            Workshops, socials, and general meetings we host all semester long. See what&apos;s coming up next and catch up on what you missed.
          </p>
        </div>

        {/* ── Upcoming Event ── */}
        {upcomingEvent && (
          <section>
            <h2 className={styles.sectionHeading}>Upcoming Event</h2>
            <div className={styles.upcomingWrapper}>
              <div
                className={styles.upcomingPoster}
                onClick={() => setActiveImage(upcomingEvent)}
                role="button"
                tabIndex={0}
              >
                <span className={styles.featuredBadge}>Next Up</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={upcomingEvent.imgUrl} alt={upcomingEvent.altText} />
              </div>
            </div>
          </section>
        )}

        {/* ── Semester Events ── */}
        <section>
          <h2 className={styles.sectionHeading}>Semester Events</h2>
          <div className={styles.postersGrid}>
            {semesterEvents.map((event) => (
              <div
                key={event.id}
                className={styles.posterCard}
                onClick={() => setActiveImage(event)}
                role="button"
                tabIndex={0}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.imgUrl} alt={event.altText} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Past Events ── */}
        <section>
          <div className={styles.sectionHeadRow}>
            <h2 className={styles.sectionHeading}>Past Events</h2>
            <Link href="/events/past" className={styles.viewAllLink}>
              View all past events →
            </Link>
          </div>
          <div className={styles.postersGrid}>
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className={styles.posterCard}
                onClick={() => setActiveImage(event)}
                role="button"
                tabIndex={0}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.imgUrl} alt={event.altText} />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Lightbox ── */}
      {activeImage && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setActiveImage(null)}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setActiveImage(null)}
            aria-label="Close"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.imgUrl}
            alt={activeImage.altText}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
