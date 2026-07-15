import Link from 'next/link';
import styles from './page.module.css';

export default function UnderConstructionPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.scene}>
          <span className={`${styles.bug} ${styles.bugOne}`}>🐛</span>
          <span className={`${styles.bug} ${styles.bugTwo}`}>🐛</span>
          <span className={styles.cone}>🚧</span>
          <span className={styles.wrench}>🔧</span>
        </div>

        <span className={styles.eyebrow}>Page in progress</span>
        <h1 className={styles.title}>We&apos;re still building this one</h1>
        <p className={styles.subtitle}>
          Our team is out here laying the code down cone by cone (and squashing a
          few bugs along the way). Check back soon!
        </p>

        <div className={styles.tapeRow} aria-hidden="true">
          <span className={styles.tape} />
        </div>

        <Link href="/" className={styles.cta}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
