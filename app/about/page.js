import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const TECHS = [
  { name: 'C', img: '/images/c-.png' },
  { name: 'Python', img: '/images/python.png' },
  { name: 'Java', img: '/images/java.png' },
  { name: 'HTML5', img: '/images/html-5.png' },
];

const AWARDS = [
  {
    title: "CSI's Organization of the Year",
    subtitle: '2018–2019',
    img: 'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Forg_of_the_year_acm.png?alt=media&token=8e7a55c3-ef6d-4c23-be07-c1695f04a9a3',
  },
  {
    title: "CSI's Collaboration of the Year",
    subtitle: 'JPL Trip ACM x SWE · 2025–2026',
    img: 'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fcollaborative_award_jpl.jpg?alt=media&token=72ec23a7-aeb1-49dd-8ab2-4fdfd890646e',
  },
];

export default function AboutPage() {
  return (
    <main>
      <div className="Content flex flex-col">

        {/* ── Hero photos ── */}
        <div className={styles.heroGrid}>
          <div className={styles.heroImage}>
            <Image src="/images/tabling1.png" alt="ACM tabling on campus" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.heroImage}>
            <Image src="/images/nasa2.png" alt="ACM members at a NASA event" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div className={styles.intro}>
          <h1 className={styles.heading}>About Us</h1>
          <p className={styles.subtitle}>
            We are the Association for Computing Machinery (ACM) student chapter, a community
            of students passionate about technology, software, and everything in between.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionBlurb}>
            To inspire and empower students to explore computer science through workshops,
            hackathons, networking events, and collaborative projects.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          <ul className={styles.list}>
            <li>Host weekly tech talks and workshops</li>
            <li>Organize annual hackathons</li>
            <li>Connect members with industry professionals</li>
            <li>Support open-source and research projects</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Languages &amp; Tools We Explore</h2>
          <p className={styles.sectionBlurb}>
            From the fundamentals to full-stack development, here&apos;s some of what
            you&apos;ll get hands-on with at our workshops.
          </p>
          <div className={styles.techGrid}>
            {TECHS.map(({ name, img }) => (
              <div key={name} className={styles.techCard}>
                <Image src={img} alt={name} width={48} height={48} />
                <span className={styles.techName}>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Awards</h2>
          <div className={styles.awardGrid}>
            {AWARDS.map(({ title, subtitle, img }) => (
              <div key={title} className={styles.awardCard}>
                <div className={styles.awardImage}>
                  <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 className={styles.awardTitle}>{title}</h3>
                <p className={styles.awardSubtitle}>{subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Get Involved</h2>
          <p className={styles.sectionBlurb}>
            All students are welcome, regardless of major or experience level. Come to a
            meeting, join our Discord, or reach out to an officer to learn more.
          </p>
          <Link href="/membership" className={styles.cta}>
            Join ACM
          </Link>
        </section>

      </div>
    </main>
  );
}
