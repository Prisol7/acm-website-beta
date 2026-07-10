import Image from 'next/image';
import styles from './page.module.css';

// TODO: replace with the real payment/sign-up form link.
const MEMBERSHIP_SIGNUP_URL = '';

const BENEFITS = [
  {
    icon: '📰',
    text: 'Receive weekly newsletters, including news about ACM exclusive scholarships.',
  },
  {
    icon: '🛠️',
    text: 'Access to project workshops (Beginner and Advanced).',
  },
  {
    icon: '🎉',
    text: 'Access to other ACM events such as Game Night, Movie Night, Hackathon, and many more.',
  },
  {
    icon: '🤝',
    text: 'Become part of the ever expanding ACM community!',
  },
];

const STEPS = [
  {
    title: 'Click the button below',
    text: "Hit “Become a member!” to head over to our sign up form.",
  },
  {
    title: 'Fill out the sign up form',
    text: "You'll be redirected back to us automatically after a successful payment.",
  },
];

export default function MembershipPage() {
  return (
    <main>
      <div className="Content flex flex-col">

        {/* ── Hero banner ── */}
        <div className={styles.hero}>
          <Image src="/images/acm_swe.jpg" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>2025 – 2026</span>
            <h1 className={styles.heroTitle}>ACM Membership</h1>
            <p className={styles.heroSubtitle}>
              One membership, a full year of workshops, events, and community.
            </p>
          </div>
        </div>

        {/* ── Intro ── */}
        <div className={styles.intro}>
          <p className={styles.leadText}>
            When you join ACM, you get all of these benefits for the <strong>whole school year</strong>:
          </p>
        </div>

        {/* ── Benefits ── */}
        <div className={styles.benefitsGrid}>
          {BENEFITS.map(({ icon, text }) => (
            <div key={text} className={styles.benefitCard}>
              <span className={styles.benefitIcon}>{icon}</span>
              <p className={styles.benefitText}>{text}</p>
            </div>
          ))}
        </div>

        {/* ── Spotlight ── */}
        <div className={styles.spotlightRow}>
          <div className={styles.spotlight}>
            <div className={styles.spotlightImage}>
              <Image src="/images/hackathon.png" alt="ACM hackathon" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.spotlightText}>
              <h2 className={styles.spotlightTitle}>More than just workshops</h2>
              <p className={styles.spotlightBlurb}>
                From hands on hackathons to game nights and movie nights, ACM membership gets you into
                every event we run. A full year of chances to learn, build, and hang out with a
                community of people who get excited about the same things you do.
              </p>
            </div>
          </div>

          <div className={styles.mascotCard}>
            <div className={styles.mascotImage}>
              <Image src="/images/cat.png" alt="ACM mascot" fill style={{ objectFit: 'contain' }} />
            </div>
            <p className={styles.mascotCaption}>Our community is looking forward to meeting you!</p>
          </div>
        </div>

        {/* ── How to join ── */}
        <section>
          <h2 className={styles.sectionHeading}>How to become an ACM member</h2>
          <p className={styles.sectionSubheading}>Follow these two steps:</p>
          <div className={styles.steps}>
            {STEPS.map(({ title, text }, i) => (
              <div key={title} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.ctaWrapper}>
          <a
            href={MEMBERSHIP_SIGNUP_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Become a member!
          </a>
        </div>

        {/* ── Heads up ── */}
        <div className={styles.callout}>
          <h2 className={styles.calloutTitle}>Heads up!</h2>
          <ul className={styles.calloutList}>
            <li>You&apos;ll receive our full benefits after a small member&apos;s fee of $5.</li>
            <li>
              The project workshop sign-up form will be in your Welcome Email, sent after you
              become an ACM member.
            </li>
            <li>
              Send us an email if you have any questions or concerns:{' '}
              <a href="mailto:acm.calstatela@gmail.com">acm.calstatela@gmail.com</a>
            </li>
            <li>ACM memberships are good for one school year (Fall 2026 – Spring 2027).</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
