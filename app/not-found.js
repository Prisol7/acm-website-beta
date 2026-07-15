import Link from 'next/link';
import Script from 'next/script';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>404 — page not found</h1>

        <div className={styles.gifWrapper}>
          <div
            className="tenor-gif-embed"
            data-postid="3020397715460894213"
            data-share-method="host"
            data-aspect-ratio="1.33155"
            data-width="100%"
          >
            <a href="https://tenor.com/view/deal-with-it-trailblazer-honkai-star-rail-dancing-dance-gif-3020397715460894213">
              Deal With It Trailblazer Sticker
            </a>{' '}
            from <a href="https://tenor.com/search/deal+with+it-stickers">Deal With It Stickers</a>
          </div>
        </div>

        <Link href="/" className={styles.cta}>
          Back to home
        </Link>
      </div>

      <Script src="https://tenor.com/embed.js" strategy="afterInteractive" />
    </main>
  );
}
