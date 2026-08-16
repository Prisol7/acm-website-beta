import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getMentorshipFlyer } from '@/lib/events';

const PROJECTS_FLYER_URL =
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Spring%202026%2FProject%20Workshop%20Flyer.png?alt=media&token=6b4c07f7-3c2c-496b-a7db-a4a9a44ecfe5';

export default async function ProgramsPage() {
  const mentorshipFlyer = await getMentorshipFlyer();

  const PROGRAMS = [
    {
      id: 'mentorship',
      title: 'Mentorship Program',
      href: '/mentorships',
      flyerUrl: mentorshipFlyer?.imgUrl,
      flyerAlt: mentorshipFlyer?.altText || 'Mentorship program flyer',
      blurb:
        'A semester-long program pairing you with industry professionals and ACM alumni to build professional skills like resumes, interviews, financial literacy, and more. Open to ACM members at every level.',
    },
    {
      id: 'projects',
      title: 'Projects',
      href: '/projects',
      flyerUrl: PROJECTS_FLYER_URL,
      flyerAlt: 'Projects workshop flyer',
      blurb:
        'A semester-long, hands-on build with guidance from ACM leaders. Tracks for both beginners and advanced members, so you leave with a real project for your resume and portfolio.',
    },
  ];

  return (
    <main>
      <div className="Content flex flex-col">
        <div>
          <h1 className={styles.heading}>Programs</h1>
          <p className={styles.subheading}>
            Ways to grow your skills and career through ACM.
          </p>
        </div>

        {PROGRAMS.filter((p) => p.flyerUrl).map(({ id, title, href, flyerUrl, flyerAlt, blurb }) => (
          <section key={id} id={id} className={styles.section}>
            <div className={styles.sectionRow}>
              <Link href={href} className={styles.flyerLink}>
                <Image
                  src={flyerUrl}
                  alt={flyerAlt}
                  width={420}
                  height={540}
                  className={styles.flyer}
                />
              </Link>

              <div className={styles.sectionText}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionBlurb}>{blurb}</p>
                <Link href={href} className={styles.learnMore}>
                  Learn more →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
