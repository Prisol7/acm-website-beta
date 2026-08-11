import Image from 'next/image';
import styles from './page.module.css';

const FLYER_URL =
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/Fall%202026%2Fmentorship.png?alt=media&token=6f9913c6-4c71-4b3c-a930-730e9cf07a31';
const CLASSROOM_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Fclassroom-background.jpg?alt=media&token=9d645135-e7aa-47a6-838e-1ab5e6402421';

const SCHEDULE = [
  {
    day: 'Saturdays',
    time: '10:00 AM – 11:20 AM',
    mentors: 'David Tang & Virginia Gonzalez',
  },
  {
    day: 'Thursdays',
    time: '3:00 PM – 4:20 PM',
    mentors: 'Srivats Venkataraman & Wilson Thomas',
  },
];

const LEAD_MENTORS = [
  {
    name: 'David Tang',
    role: '(CS Class of 2021) Software Engineer @ Raytheon',
    tag: 'Every Saturday',
    img: '/mentor_pics/tang.png',
  },
  {
    name: 'Virginia Gonzalez',
    role: '(CS Class of 2024) Software Engineer @ Northrop Grumman',
    tag: 'Every Saturday',
    img: '/mentor_pics/virginia.png',
  },
  {
    name: 'Srivats Venkataraman',
    role: '(CS Class of 2022) Jr. Guidewire Developer @ Farmers Insurance',
    tag: 'Every Thursday',
    img: '/mentor_pics/venkataraman.png',
  },
  {
    name: 'Wilson Thomas',
    role: '(CS Class of 2019) Business Analyst @ Travis County',
    tag: 'Every Thursday • Finances',
    img: '/mentor_pics/wilson.png',
  },
];

const ONE_ON_ONE_MENTORS = [
  {
    name: 'Virginia Gonzalez',
    role: '(CS Class of 2024) Software Engineer @ Northrop Grumman',
    img: '/mentor_pics/virginia.png',
  },
  {
    name: 'Geovanny Huerta',
    role: '(CS Class of 2022) Software Engineer @ Northrop Grumman',
    img: '/mentor_pics/Huetra.png',
  },
  {
    name: 'Andrew Gonzalez',
    role: '(CS Class of 2021) Software Engineer @ Raytheon Intelligence & Space',
    img: '/mentor_pics/andrew.png',
  },
];

const TECHNICAL_INTERVIEWERS = [
  {
    name: 'Diego Flores',
    role: '(CS Class of 2023) Scientist @ Naval Information Warfare Center Pacific (NIWC PAC)',
    img: '/mentor_pics/flores.png',
  },
  // TODO: uncomment once we have his photo
  // {
  //   name: 'Allen Marques',
  //   role: '(CS Class of 2022) Systems Modeling & Simulation Engineer @ Northrop Grumman',
  //   img: '/mentor_pics/allen.png',
  // },
];

const MENTORSHIP_CHAIR = [
  {
    name: 'Charlie Kaing',
    role: 'Cal State LA Student - ACM Mentorship Chair',
    img: '/mentor_pics/charlie.png',
  },
];

const GUEST_SPEAKERS = [
  {
    name: 'Cristian Corrales Valle',
    role: '(CS Class of 2021) Business Analyst @ American Express',
    tag: '2 sessions',
    img: '/mentor_pics/valle.png',
  },
  {
    name: 'Luis Gonzalez',
    role: '(CS Class of 2021) Graduate Student, Financial Analyst @ American Express',
    tag: '1 session',
    img: '/mentor_pics/gonzalez.png',
  },
  {
    name: 'Daniel Ramirez',
    role: '(CS Class of 2024) Software Engineer @ Northrop Grumman',
    tag: '2 sessions',
    img: '/mentor_pics/Daniel_Ramirez.png',
  },
  {
    name: 'Gerardo Ibarra',
    role: '(CS Class of 2023) Former Software Engineer @ Dell Technologies',
    tag: '1 session',
    img: '/mentor_pics/gerardo_ibarra.png',
  },
  {
    name: 'Prime P. Hein',
    role: '(BS EE Class of 2018, MS EE Class of 2020) Street Lighting Engineering Associate III @ City of Los Angeles',
    tag: '1 session',
    img: '/mentor_pics/Prime.png',
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
  'Sessions are every Saturday 10:00am–11:20am and Thursday 3:00pm–4:20pm.',
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
          <h2 className={styles.sectionTitle}>Weekly Schedule</h2>
          <p className={styles.sectionBlurb}>
            Sessions run twice a week — join whichever time fits your schedule.
          </p>
          <div className={styles.scheduleGrid}>
            {SCHEDULE.map((slot) => (
              <div key={slot.day} className={styles.scheduleCard}>
                <div className={styles.scheduleCardDay}>{slot.day}</div>
                <div className={styles.scheduleCardTime}>{slot.time}</div>
                <div className={styles.scheduleCardMentors}>with {slot.mentors}</div>
              </div>
            ))}
          </div>
        </section>

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
          <h2 className={styles.sectionTitle}>Technical Interviewers</h2>
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
      {mentors.map(({ name, role, tag, img }) => (
        <div key={name} className={styles.mentorCard}>
          <Image src={img} alt={name} width={130} height={130} className={styles.mentorImg} />
          <h3 className={styles.mentorName}>{name}</h3>
          <p className={styles.mentorRole}>{role}</p>
          {tag && <span className={styles.mentorTag}>{tag}</span>}
        </div>
      ))}
    </div>
  );
}
