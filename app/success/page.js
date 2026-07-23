import Image from 'next/image';
import Link from 'next/link';
import MembershipForm from './MembershipForm';
import styles from './page.module.css';

const NEXT_STEPS = [
  {
    title: 'Check your inbox',
    text: "We just sent your Welcome Email, that's where the project workshop sign-up form lives.",
  },
  {
    title: 'Sign up for a workshop',
    text: 'Beginner or advanced, pick whichever track sounds fun and start building.',
  },
  {
    title: 'Come say hi',
    text: "You are part of our computer netowkr now. We'd love to meet you in person at our next event.",
  },
];

export default function SuccessPage() {
  return (
    <main className={styles.page}>
      {/* ── Mobile hero image ── */}
      <div className={styles.mobileHero}>
        <Image
          src="/images/tall_landscape.jpeg"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.mobileHeroOverlay} />
      </div>

      <div className={styles.split}>
        {/* ── Content ── */}
        <div className={styles.content}>
          <span className={styles.checkmark}>✓</span>
          <span className={styles.eyebrow}>Payment confirmed</span>
          <div className={styles.titleRow}>
            <Image
              src="/logos/microchip.png"
              alt=""
              width={44}
              height={44}
              className={styles.titleIcon}
            />
            <h1 className={styles.title}>Welcome to ACM! </h1>
            <Image
              src="/logos/microchip.png"
              alt=""
              width={44}
              height={44}
              className={styles.titleIcon}
            />
          </div>
          <p className={styles.subtitle}>
            Your membership is officially active. We&apos;re so glad you&apos;re here.
          </p>

          <p className={styles.body}>
            Thank you for joining our community. Over the next school year you&apos;ll get access to
            workshops, hackathons, game nights, and a whole lot of people who are excited about the
            same things you are. Here&apos;s what happens next:
          </p>

          <div className={styles.steps}>
            {NEXT_STEPS.map(({ title, text }, i) => (
              <div key={title} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepText}>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <Link href="/calendar" className={styles.ctaPrimary}>
              Explore upcoming events
            </Link>
            <Link href="/" className={styles.ctaSecondary}>
              Back to home
            </Link>
          </div>

          <p className={styles.footnote}>
            Questions? Email us anytime at{' '}
            <a href="mailto:acm.calstatela@gmail.com">acm.calstatela@gmail.com</a>.
          </p>
        </div>

        {/* ── Desktop image panel ── */}
        <div className={styles.imagePanel}>
          <Image
            src="/images/wide_landscape.jpeg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.imagePanelOverlay} />
        </div>
      </div>

      <MembershipForm />
    </main>
  );
}
