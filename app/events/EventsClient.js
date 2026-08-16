'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

const HACKATHON_MAIN = 'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2FScreenshot%202026-07-15%20021720.png?alt=media&token=d4d1c271-3ffe-444e-bdb4-16f846766c32';

const HACKATHON_GALLERY = [
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2FScreenshot%202026-07-23%20at%202.59.28%E2%80%AFPM.png?alt=media&token=6035ed79-ee4c-4579-8f5a-db580db61ff9',
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2FScreenshot%202026-07-23%20at%202.58.55%E2%80%AFPM.png?alt=media&token=a7c47ccd-98f2-4642-859e-29185d1891fa',
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2FScreenshot%202026-07-23%20at%202.58.37%E2%80%AFPM.png?alt=media&token=a6147260-d03a-404a-85b1-5586eb2a4e0b',
];

export default function EventsClient({ upcomingEvent, semesterEvents, pastEvents }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <main>
      <div className="Content flex flex-col">

        {/* ── Hero banner ── */}
        <div className={styles.banner}>
          <Image src="/images/group.jpg" alt="ACM group" fill style={{ objectFit: 'cover', objectPosition: 'center 35%' }} />
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
          <p className={styles.sectionNote}>Flyers are subject to change.</p>
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

        {/* ── ACM Hackathon Fall 2025 ── */}
        <section>
          <h2 className={styles.sectionHeading}>ACM Hackathon — Fall 2025</h2>
          <div className={styles.upcomingWrapper}>
            <div
              className={styles.upcomingPoster}
              onClick={() => setActiveImage({ imgUrl: HACKATHON_MAIN, altText: 'ACM Hackathon Fall 2025' })}
              role="button"
              tabIndex={0}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HACKATHON_MAIN} alt="ACM Hackathon Fall 2025" />
            </div>
          </div>
          <div className={styles.hackathonGrid}>
            {HACKATHON_GALLERY.map((src, i) => (
              <div
                key={src}
                className={styles.posterCard}
                onClick={() => setActiveImage({ imgUrl: src, altText: `ACM Hackathon Fall 2025 photo ${i + 1}` })}
                role="button"
                tabIndex={0}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`ACM Hackathon Fall 2025 photo ${i + 1}`} />
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
