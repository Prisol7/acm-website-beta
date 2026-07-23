'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const CONFERENCES = [
  {
    title: 'GMiS Conference',
    subtitle: 'Great Minds in STEM',
    date: 'September 17–19 · Albuquerque, New Mexico',
    text: 'A national conference celebrating Hispanic and underrepresented talent in STEM, with recruiters, workshops, and scholarships.',
    href: 'https://gmisconference.org/',
  },
  {
    title: 'SHPE National Convention',
    subtitle: 'Society of Hispanic Professional Engineers',
    date: 'October 28–31 · Indianapolis, Indiana',
    text: 'One of the largest STEM diversity conferences in the country — career fairs, technical sessions, and networking with top employers.',
    href: 'https://shpe.org/engage/events/national-convention/',
  },
];

const CATEGORIES = [
  {
    icon: '💼',
    title: 'Career Development',
    blurb: 'Start preparing for internships and full-time careers early.',
    groups: [
      {
        items: [
          { text: 'Career Center — counseling, resume reviews, mock interviews, career fairs, Handshake', href: 'https://www.calstatela.edu/careercenter' },
          { text: 'Handshake job & internship portal' },
          { text: 'Career workshops & networking events' },
          { text: 'Graduate school preparation' },
          { text: 'Alumni career resources (via the Career Center)' },
        ],
      },
    ],
  },
  {
    icon: '🎓',
    title: 'Scholarships & Financial Assistance',
    groups: [
      { heading: 'Scholarships', items: [
        { text: 'General Scholarships — apply for the Spring 2027 Cal State LA General Scholarship', href: 'https://www.calstatela.edu/financialaid/scholarships' },
      ] },
      { heading: 'Grants', items: [
        { text: 'Grants overview', href: 'https://www.calstatela.edu/financialaid/grants' },
      ] },
      { heading: 'Loans', items: [
        { text: 'Loans overview', href: 'https://www.calstatela.edu/financialaid/loans' },
      ] },
      { heading: 'Special Aid Programs', items: [
        { text: 'Emergency assistance & special financial aid programs', href: 'https://www.calstatela.edu/financialaid/special-aid-programs' },
      ] },
      { heading: 'Funding for Engineering & CS', items: [
        { text: 'ECST funding opportunities', href: 'https://www.calstatela.edu/ecst/ce/funding-opportunities' },
      ] },
    ],
  },
  {
    icon: '💵',
    title: 'Student Employment',
    blurb: 'Find paid work while attending school.',
    groups: [
      {
        items: [
          { text: 'Federal Work Study', href: 'https://www.calstatela.edu/financialaid/federal-work-study' },
          { text: 'Dream Act Service Incentive Grant (DSIG)', href: 'https://www.calstatela.edu/financialaid/dream-act-service-incentive-grant-dsig' },
          { text: 'On-campus employment' },
          { text: 'Student assistant positions' },
          { text: 'Research assistant positions' },
          { text: 'ASI job openings', href: 'https://asicalstatela.org/about-us/employment-opportunities' },
        ],
      },
    ],
  },
  {
    icon: '💻',
    title: 'Free Software & Technology',
    blurb: 'Software included with your tuition (availability depends on your college or major).',
    groups: [
      {
        items: [
          { text: 'Microsoft Office', href: 'https://www.calstatela.edu/ecst/free-software' },
          { text: 'MATLAB (eligible students), Azure Dev Tools, programming & security software, remote access tools', href: 'https://www.calstatela.edu/its/software/personal-computers' },
        ],
      },
    ],
  },
  {
    icon: '🛠️',
    title: 'Technology Support',
    blurb: 'Computer labs, tech support, laptop assistance, and laptop/equipment loans.',
    groups: [
      {
        items: [
          { text: 'ITS Student Resources — labs, help desk, and technology loans', href: 'https://www.calstatela.edu/its' },
        ],
      },
    ],
  },
  {
    icon: '📜',
    title: 'Free Training & Certifications',
    blurb: 'Improve your technical skills: Office, Excel, cybersecurity, Canvas, Zoom, and more.',
    groups: [
      {
        items: [
          { text: 'Online training', href: 'https://www.calstatela.edu/its/training/resources' },
          { text: 'In-person training', href: 'https://www.calstatela.edu/its/training' },
        ],
      },
    ],
  },
  {
    icon: '🔬',
    title: 'Research Opportunities',
    blurb: 'Build your resume and prep for grad school through faculty and undergrad research.',
    groups: [
      {
        items: [
          { text: 'Faculty, undergraduate & graduate research, conference presentations, and funding', href: 'https://www.calstatela.edu/ecst/research' },
        ],
      },
    ],
  },
  {
    icon: '📚',
    title: 'Academic Success Resources',
    blurb: 'Stay on track toward graduation.',
    groups: [
      {
        items: [
          { text: 'Center for Academic Success — tutoring, writing support, study skills', href: 'https://www.calstatela.edu/academic-success/student-resources' },
          { text: 'University Library — research help, study rooms, databases, printing, equipment checkout' },
          { text: 'Academic Advising — degree planning, graduation checks, major exploration' },
        ],
      },
    ],
  },
  {
    icon: '🍎',
    title: 'Basic Needs & Student Support',
    blurb: 'No student should struggle alone.',
    groups: [
      {
        items: [
          { text: 'Basic Needs Assistance — emergency aid, food, housing, CalFresh', href: 'https://www.calstatela.edu/deanofstudents/basic-needs-assistance' },
          { text: 'Cal State LA Food Pantry', href: 'https://www.calstatela.edu/deanofstudents/cal-state-la-food-pantry' },
        ],
      },
    ],
  },
  {
    icon: '🩺',
    title: 'Health & Wellness',
    groups: [
      {
        items: [
          { text: 'Student Health Center — medical appointments, immunizations, lab services', href: 'https://www.calstatela.edu/studenthealthcenter' },
          { text: 'Counseling & Psychological Services (CAPS) — free, confidential counseling' },
        ],
      },
    ],
  },
  {
    icon: '🚗',
    title: 'Transportation & Parking',
    groups: [
      {
        items: [
          { text: 'Permits, visitor parking, maps, and EV charging stations', href: 'https://www.calstatela.edu/parking' },
        ],
      },
    ],
  },
  {
    icon: '🎟️',
    title: 'Student Discounts & Freebies',
    groups: [
      {
        items: [
          { text: 'Free Blue Books & Scantrons, discounted movie & theme park tickets', href: 'https://asicalstatela.org/services/student-services' },
        ],
      },
    ],
  },
  {
    icon: '🌐',
    title: 'Student Success & Support Programs',
    groups: [
      {
        items: [
          { text: 'Dreamers Resource Center, Veterans Resource Center, OSD, EOP, Guardian Scholars, International Student Advising, Cross Cultural Centers, Dean of Students Office', href: 'https://www.calstatela.edu/deanofstudents/campus-resources-0' },
        ],
      },
    ],
  },
  {
    icon: '🚀',
    title: 'Leadership & Campus Involvement',
    blurb: 'Get involved outside the classroom — strengthen your resume and build lasting friendships.',
    groups: [
      {
        items: [
          { text: 'Student orgs, ASI, Center for Student Involvement, volunteering, leadership programs, campus events', href: 'https://www.calstatela.edu/eop/student-resources' },
        ],
      },
    ],
  },
  {
    icon: '🤝',
    title: 'Alumni Resources',
    blurb: 'Many resources remain available even after graduation.',
    groups: [
      {
        items: [
          { text: 'Career counseling, resume reviews, career fairs, mentorship & professional development', href: 'https://www.calstate.edu/attend/student-services/career-services/' },
          { text: 'Free alumni membership — includes free parking twice a semester', href: 'https://www.calstatela.edu/alumni' },
        ],
      },
    ],
  },
  {
    icon: '✍️',
    title: 'Get Paid as a Note-Taker',
    blurb: 'Get paid to take notes for one of your classes.',
    groups: [
      {
        items: [
          { text: 'How it works', href: 'https://www.calstatela.edu/osd/note-taking-services' },
          { text: 'Sign up to become a note-taker', href: 'https://www.calstatela.edu/osd/become-osd-note-taker' },
        ],
      },
    ],
  },
  {
    icon: '💎',
    title: "Hidden Gems Many Students Don't Use",
    groups: [
      {
        items: [
          { text: 'Handshake for internships & on-campus jobs' },
          { text: 'Career Center resume & mock interview services' },
          { text: 'Free Microsoft Office & software licenses' },
          { text: 'ITS technical training workshops' },
          { text: 'Faculty research opportunities' },
          { text: 'Food Pantry & Basic Needs programs' },
          { text: 'CAPS mental health counseling' },
          { text: 'Center for Academic Success tutoring & writing help' },
          { text: 'Technology loan program (laptops & equipment)' },
          { text: 'National & International Scholarships and Fellowships Program (NISFeP)' },
        ],
      },
    ],
  },
];

function CategoryCard({ category, isOpen, onToggle }) {
  return (
    <div className={styles.card}>
      <button className={styles.cardHeader} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.cardIcon}>{category.icon}</span>
        <span className={styles.cardTitle}>{category.title}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>⌄</span>
      </button>

      {isOpen && (
        <div className={styles.cardBody}>
          {category.blurb && <p className={styles.cardBlurb}>{category.blurb}</p>}
          {category.groups.map((group, i) => (
            <div key={group.heading || i} className={styles.group}>
              {group.heading && <h4 className={styles.groupHeading}>{group.heading}</h4>}
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const [openTitle, setOpenTitle] = useState(CATEGORIES[0].title);

  const toggle = (title) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  return (
    <main>
      <div className="Content flex flex-col">
        <div className={styles.hero}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/acm-calstatela.appspot.com/o/website_Images%2Ftabling.png?alt=media&token=9b2a4a1e-7a54-4878-9dbd-49dabfb2dae3"
            alt="ACM tabling on campus"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
          <h1 className={styles.heroTitle}>Resources</h1>
        </div>

        <div className={styles.intro}>
          <p className={styles.subtitle}>
            A guide to the scholarships, career tools, tech perks, and support programs available
            to Cal State LA students — many of which go unused every semester.
          </p>
        </div>

        {/* ── Featured conferences ── */}
        <section>
          <h2 className={styles.sectionTitle}>Featured Conferences</h2>
          <div className={styles.confGrid}>
            {CONFERENCES.map(({ title, subtitle, date, text, href }) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={styles.confCard}>
                <span className={styles.confSubtitle}>{subtitle}</span>
                <h3 className={styles.confTitle}>{title}</h3>
                <span className={styles.confDate}>{date}</span>
                <p className={styles.confText}>{text}</p>
                <span className={styles.confCta}>Visit site →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Resource categories ── */}
        <section>
          <h2 className={styles.sectionTitle}>Student Resources</h2>
          <div className={styles.cardStack}>
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.title}
                category={category}
                isOpen={openTitle === category.title}
                onToggle={() => toggle(category.title)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
