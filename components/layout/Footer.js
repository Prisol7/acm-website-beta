import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.quip}>It&apos;s not a bug. <span className={styles.feature}>It&apos;s a feature.</span></p>
      <p className={styles.copy}>
        &copy; Association of Computing Machinery &mdash; California State University, Los Angeles.
      </p>
      <Link href="/terms" className={styles.link}>
        Terms of Service
      </Link>
    </footer>
  );
}
