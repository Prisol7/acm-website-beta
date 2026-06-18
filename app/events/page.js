import Image from 'next/image';
import styles from './page.module.css';

const SEMESTER_POSTERS = [
  //get ides from firebase later on
  //should not need firebase auth to get images from firebase storage
  {id: 1 },
  {id: 2 },
  {id: 3 },
  {id: 4 },
  {id: 5 },
  {id: 6 },
];

export default function EventsPage() {
  return (
    <main>
      <div className="Content flex flex-col">

        {/* ── Upcoming Event ── */}
        <section>
          <h2 className={styles.sectionHeading}>Upcoming Event</h2>
          <div className={styles.upcomingWrapper}>
            <div className={styles.upcomingPoster}>
              <span className={styles.featuredBadge}>Next Up</span>
              <Image src="/images/template.png" alt="Upcoming event poster" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* ── Semester Posters ── */}
        <section>
          <h2 className={styles.sectionHeading}>Fall 2026 Events</h2>
          <div className={styles.postersGrid}>
            {SEMESTER_POSTERS.map((poster) => (
              <div key={poster.id} className={styles.posterCard}>
                <Image src="/images/template.png" alt="Event poster" fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
