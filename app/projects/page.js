import { getProjectEvents } from '@/lib/events';
import styles from './page.module.css';

const VIDEO_URL = 'https://www.youtube.com/embed/3T5pvRSK7dA?si=aNSw3OUa3S-jLvgb';

const INTEREST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdE8qdvwrX6eIQGylEWVFalwkasWyc9nOJR2Jp_KsiZCKbijA/viewform?pli=1';

const PAST_PROJECTS = [
  {
    alt: 'Spring 2026 Project Workshop',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Spring%202026%2FProject%20Workshop%20Flyer.png?alt=media&token=6b4c07f7-3c2c-496b-a7db-a4a9a44ecfe5',
  },
  {
    alt: 'Fall 2023 Advanced Workshop',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Fall%202023%2FAdvanced%20Workshop%20Flyer%20F23.png?alt=media&token=c0bb23e5-105c-41a1-9658-95a8281f9121',
  },
  {
    alt: 'Fall 2023 Beginners Workshop',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Fall%202023%2FBeginners%20Worksho%20Flyer%20F23.png?alt=media&token=7d8a2a26-249d-4144-818d-0cf9338e553d',
  },
];

const PROJECT_GALLERY = [
  {
    alt: 'ACM project workshop in session',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fproject1.jpg?alt=media&token=226f52d0-5105-47c4-8469-9bbc16441682',
  },
  {
    alt: 'ACM project workshop in session',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fproject2.jpg?alt=media&token=f8fdb602-cef4-4060-8b52-6ee23c13e71d',
  },
  {
    alt: 'ACM project workshop in session',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fproject3.jpg?alt=media&token=becb5aeb-daad-4a0b-9b55-ad8c717d57b5',
  },
  {
    alt: 'ACM project workshop in session',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fproject4.jpg?alt=media&token=0c5ba36d-080a-4f96-b934-4eee1f4f5850',
  },
];

const TAKEAWAYS = [
  'Hands on experience building a real project from start to finish',
  'Guidance and code reviews from experienced ACM leaders',
  'A finished project you can add straight to your resume and portfolio',
  'A track for every skill level, from first time coders to experienced developers',
];

export default async function ProjectsPage() {
  const projectEvents = await getProjectEvents();

  return (
    <main>
      <div className="Content flex flex-col" style={{ paddingTop: '3rem' }}>
        <div className={styles.intro}>
          <h1 className={styles.heading}>Projects</h1>
          <p className={styles.lead}>
            Our semester long Projects program pairs you with a hands on build and expert
            guidance from our ACM leaders, so you leave with real, practical experience and
            something concrete to show for it.
          </p>
          <p className={styles.lead}>
            We run tracks for both beginners and more advanced members, so wherever you&apos;re
            starting from, there&apos;s a project built for you.
          </p>
        </div>

        <section className="resources-section" style={{ padding: 0 }}>
          <div className="resources-card">
            <div className="resources-card-text">
              <h3>Ready to sign up?</h3>
              <p>Fill out our registration interest form to let us know you want in on a project or workshop.</p>
            </div>
            <a href={INTEREST_FORM_URL} target="_blank" rel="noopener noreferrer" className="resources-cta accent-blue">
              Fill out the form →
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="video-wrapper">
              <iframe
                src={VIDEO_URL}
                title="ACM Projects"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {projectEvents.length > 0 && (
          <section className={styles.section}>
            <div className={styles.projectGrid}>
              {projectEvents.map((event) => (
                <div key={event.id} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.imgUrl} alt={event.altText} />
                  </div>
                  <div className={styles.projectLabel}>{event.altText}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What you&apos;ll get</h2>
          <p className={styles.sectionBlurb}>
            Whether you&apos;re picking up your first real project or leveling up your skills,
            the Projects program is built to teach you by doing, with support from ACM leaders
            every step of the way.
          </p>
          <ul className={styles.list}>
            {TAKEAWAYS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>



        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects we&apos;ve done before</h2>
          <p className={styles.sectionBlurb}>
            A look at some of the project workshops we&apos;ve run in past semesters.
          </p>
          <div className={styles.projectGrid}>
            {PAST_PROJECTS.map((project) => (
              <div key={project.alt} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.imgUrl} alt={project.alt} />
                </div>
                <div className={styles.projectLabel}>{project.alt}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Moments from our workshops</h2>
          <p className={styles.sectionBlurb}>
            Members building, debugging, and shipping alongside our project leaders.
          </p>
          <div className={styles.galleryGrid}>
            {PROJECT_GALLERY.map((photo) => (
              <div key={photo.imgUrl} className={styles.galleryItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.imgUrl} alt={photo.alt} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
