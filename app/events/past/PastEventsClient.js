'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '../page.module.css';

export default function PastEventsClient({ pastEvents }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <main>
      <div className="Content flex flex-col">

        <Link href="/events" className={styles.backLink}>
          ← Back to Events
        </Link>

        <div className={styles.intro}>
          <h1 className={styles.pageHeading}>Past Events</h1>
          <p className={styles.muted}>
            A look back at the workshops, hackathons, and socials ACM has hosted —
            from beginner-friendly project nights to full weekend hackathons.
            Every flyer below is a real event we ran, made by our own members.
          </p>
        </div>

        <section>
          {pastEvents.length > 0 ? (
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
          ) : (
            <p className={styles.muted}>No past events to show yet — check back soon.</p>
          )}
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
