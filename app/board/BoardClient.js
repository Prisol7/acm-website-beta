'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function BoardClient({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);
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
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [sections]);

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
          {sections.map(({ id, label }) => (
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
        {sections.map(({ id, title, blurb, members }) => (
          <section key={id} id={id} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{title}</h2>
              <p className={styles.sectionBlurb}>{blurb}</p>
            </div>

            <div className={styles.boardGrid}>
              {members.map(({ role, name, img }) => (
                <article key={`${role}-${name}`} className={styles.member}>
                  {img ? (
                    // External Firestore image URL — host isn't known ahead of time,
                    // so this skips next/image's remotePatterns requirement.
                    <img src={img} alt={name} className={styles.memberImg} />
                  ) : (
                    <Image
                      src="/images/basketball-bird.png"
                      alt={name}
                      width={90}
                      height={90}
                      className={styles.memberImg}
                    />
                  )}
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
