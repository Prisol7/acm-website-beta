'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

const SECTIONS = [
  {
    id: 'board',
    label: 'Board',
    title: 'Executive Board',
    blurb: 'The elected students who lead ACM and keep everything running.',
    members: [
      { role: 'President', name: 'Roni' },
      { role: 'Secretary', name: 'TBD' },
      { role: 'Treasurer', name: 'AgustinL' },
      { role: 'Internal Affairs', name: 'TBD' },
      { role: 'External Affairs', name: 'TBD' },
      { role: 'Webmaster', name: 'TBD' },
      { role: 'Project Manager', name: 'TBD' },
    ],
  },
  {
    id: 'officers',
    label: 'Officers',
    title: 'Officers',
    blurb: 'Officers who support the board and help operations run smoothly.',
    members: [
      { role: 'Administrative Officer', name: 'TBD' },
    ],
  },
  {
    id: 'committees',
    label: 'Committees',
    title: 'Committees',
    blurb: 'Member-driven teams focused on events, workshops, and outreach.',
    members: [
      { role: 'Events Committee', name: 'Open' },
      { role: 'Workshops Committee', name: 'Open' },
      { role: 'Outreach Committee', name: 'Open' },
    ],
  },
  {
    id: 'advisors',
    label: 'Advisors',
    title: 'Faculty Advisors',
    blurb: 'Faculty who mentor the chapter and connect us with the department.',
    members: [
      { role: 'Faculty Advisor', name: 'TBD' },
    ],
  },
];

export default function BoardPage() {
  const [active, setActive] = useState('board');
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // account for fixed navbar (~84px) + sticky section nav
      { rootMargin: '-160px 0px -55% 0px', threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  const handleJump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <main>
      <div className="Content flex flex-col">
        {/* ── Hero image ── */}
        <div className={styles.card}>
          <Image
            src="/images/Fall-2025-Board.jpg"
            alt="Fall 2025 Board"
            width={860}
            height={480}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100% 30%', display: 'block' }}
          />
        </div>

        <div className={styles.intro}>
          <h1 className={styles.heading}>Meet the Team</h1>
          <p className={styles.muted}>
            The people who make ACM happen — from the executive board to committees and faculty advisors.
          </p>
        </div>
      </div>

      {/* ── Sticky in-page nav ── */}
      <nav className={styles.sectionNav} aria-label="Jump to section">
        <div className={styles.sectionNavInner}>
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleJump(e, id)}
              className={`${styles.pill} ${active === id ? styles.pillActive : ''}`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="Content flex flex-col">
        {SECTIONS.map(({ id, title, blurb, members }) => (
          <section key={id} id={id} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{title}</h2>
              <p className={styles.sectionBlurb}>{blurb}</p>
            </div>

            <div className={styles.boardGrid}>
              {members.map(({ role, name }) => (
                <article key={role} className={styles.member}>
                  <Image
                    src="/images/basketball-bird.png"
                    alt={name}
                    width={90}
                    height={90}
                    className={styles.memberImg}
                  />
                  <h3 className={styles.memberRole}>{role}</h3>
                  <p className={styles.memberName}>{name}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <p className={styles.muted}>
          Want to join the board? Get involved, attend meetings, and reach out to any of us! We&apos;re always looking for passionate members to help out with workshops, infrastructure, and more. No experience necessary, just a willingness to learn and contribute!
        </p>
      </div>
    </main>
  );
}
