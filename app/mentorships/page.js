import Image from 'next/image';
import styles from './page.module.css';

const FLYER_URL =
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Fall%202026%2Fmentorship.png?alt=media&token=6f9913c6-4c71-4b3c-a930-730e9cf07a31';
const CLASSROOM_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fclassroom-background.jpg?alt=media&token=9d645135-e7aa-47a6-838e-1ab5e6402421';

const LEAD_MENTORS = [
  {
    name: 'Srivats Venkataraman',
    role: 'Guidewire Developer @ Farmers Insurance',
    img: '/mentor_pics/venkataraman.png',
    linkedin: 'https://www.linkedin.com/in/srivatsvenk/',
  },
  {
    name: 'David Tang',
    role: 'Software Engineer @ Raytheon',
    img: '/mentor_pics/tang.png',
    linkedin: 'https://www.linkedin.com/in/david-t-tang/',
  },
  {
    name: 'Wilson Thomas',
    role: 'Business Analyst II @ Travis County',
    img: '/mentor_pics/wilson.png',
    linkedin: 'https://www.linkedin.com/in/wilsonthomas01/?skipRedirect=true',
  },
  {
    name: 'Virginia Gonzalez',
    role: 'Software Engineer @ Northrop Grumman',
    img: '/mentor_pics/virginia.png',
    linkedin: 'https://www.linkedin.com/in/virginiagonz/',
  },
];

const ONE_ON_ONE_MENTORS = [
  {
    name: 'Geovanny Huerta',
    role: 'Software Engineer @ Northrop Grumman',
    img: '/mentor_pics/Huetra.png',
    linkedin: 'https://www.linkedin.com/in/geovanny-huerta/',
  },
];

const TECHNICAL_INTERVIEWERS = [
  {
    name: 'Diego Flores',
    role: 'Computer Scientist | Infrastructure & Systems @ Naval Information Warfare Center Pacific',
    img: '/mentor_pics/flores.png',
    linkedin: 'https://www.linkedin.com/in/dflores13/',
  },
];

const MENTORSHIP_CHAIR = [
  {
    name: 'Charlie Kaing',
    role: 'Cal State LA Student - ACM Mentorship Chair',
    img: '/mentor_pics/charlie.png',
    linkedin: 'https://www.linkedin.com/in/charlie-kaing-a5468b2a9/',
  },
];

const GUEST_SPEAKERS = [
  {
    name: 'Cristian Corrales Valle',
    role: 'Business Analyst @ American Express',
    img: '/mentor_pics/valle.png',
    linkedin: 'https://www.linkedin.com/in/ccorra15/',
  },
  {
    name: 'Luis Gonzalez',
    role: 'Financial Systems Analyst @ American Express',
    img: '/mentor_pics/gonzalez.png',
    linkedin: 'https://www.linkedin.com/in/lgon070/',
  },
];

const TOPICS = [
  'Making a resume',
  'Getting an internship',
  'Financial literacy',
  'Management',
  'Technical and behavioral mock interviews',
  'Conferences (SHPE and GMIS)',
];

const HEADS_UP = [
  'ACM membership is required to apply for the program. If you are not a member, you will not be allowed in.',
  'This is a semester-long program.',
  'Sessions are every Thursday 4:30pm–5:50pm and Saturday 9:00am–10:20am.',
];

export default function MentorshipsPage() {
  return (
    <main>
      <div className="Content flex flex-col" style={{ paddingTop: '3rem' }}>
        <div className={styles.flyer}>
          <Image src={FLYER_URL} alt="Mentorship program flyer" width={860} height={1080} />
        </div>

        <div className={styles.intro}>
          <h1 className={styles.heading}>Mentorship Program</h1>
          <p className={styles.lead}>
            If you feel that you are lacking professional skills, or you seek more involvement in
            the tech industry, then this program is perfect for you! The mentorship program will
            teach valuable skills and provide resources that are crucial for a professional.
            Additionally, the program helps increase your opportunity in landing jobs and improves
            your financial status. By applying, you will have the opportunity to learn important
            life lessons from your mentors that are not taught in the typical classroom
            environment. Overall, this program will benefit you professionally and academically by
            the time you graduate.
          </p>
          <p className={styles.lead}>
            Mentorships are open for sign up to all ACM members at all different levels
            (Freshmen, Sophomores, Juniors and Seniors).
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.introRow}>
            <div className={styles.introRowText}>
              <h2 className={styles.sectionTitle}>What mentorship is</h2>
              <p className={styles.sectionBlurb}>
                This program will teach you about how to get internships/full time positions, getting
                prepared for conferences, how interviews work, and much more! The sessions will be
                taught by our very own alumni that have years of experience in the field, led by
                industry professionals who are California State University Los Angeles and ACM alumni.
              </p>
              <ul className={styles.list}>
                {TOPICS.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>

              <div className={styles.schedule}>
                <h3 className={styles.scheduleTitle}>Heads up!</h3>
                <ul className={styles.list} style={{ marginBottom: 0 }}>
                  {HEADS_UP.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.introRowImage}>
              <Image
                src={CLASSROOM_IMAGE_URL}
                alt="ACM classroom session"
                width={640}
                height={720}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Lead Mentors</h2>
          <MentorGrid mentors={LEAD_MENTORS} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>One on One Mentor</h2>
          <MentorGrid mentors={ONE_ON_ONE_MENTORS} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Interviewer</h2>
          <MentorGrid mentors={TECHNICAL_INTERVIEWERS} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mentorship Chair</h2>
          <MentorGrid mentors={MENTORSHIP_CHAIR} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Guest Speakers</h2>
          <MentorGrid mentors={GUEST_SPEAKERS} />
        </section>
      </div>
    </main>
  );
}

function MentorGrid({ mentors }) {
  return (
    <div className={styles.mentorGrid}>
      {mentors.map(({ name, role, img, linkedin }) => (
        <a
          key={name}
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mentorCard}
        >
          <Image src={img} alt={name} width={130} height={130} className={styles.mentorImg} />
          <h3 className={styles.mentorName}>{name}</h3>
          <p className={styles.mentorRole}>{role}</p>
          <span className={styles.mentorLink}>LinkedIn →</span>
        </a>
      ))}
    </div>
  );
}
