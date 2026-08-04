'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import styles from './page.module.css';

export default function BoardClient({ sections, years = [], currentBoardId, currentSchoolyear }) {
  const [active, setActive] = useState(sections[0]?.id);
  const observerRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const yearMenuRef = useRef(null);

  useEffect(() => {
    if (!yearMenuOpen) return;
    const onClickOutside = (e) => {
      if (yearMenuRef.current && !yearMenuRef.current.contains(e.target)) {
        setYearMenuOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setYearMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [yearMenuOpen]);

  const selectYear = (id) => {
    setYearMenuOpen(false);
    if (id === currentBoardId) return;
    startTransition(() => {
      router.push(`/board?board=${encodeURIComponent(id)}`, { scroll: false });
    });
  };

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
            The people who make ACM happen — from the ACM Board to committees and faculty advisors.
          </p>
        </div>
      </div>

      {/* ── Sticky in-page nav ── */}
      <nav className={styles.sectionNav} aria-label="Jump to section">
        <div className={styles.sectionNavInner}>
          <div className={styles.sectionNavPills}>
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

          {years.length > 0 && (
            <div className={styles.yearPicker} ref={yearMenuRef}>
              <button
                type="button"
                className={styles.yearPickerButton}
                onClick={() => setYearMenuOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={yearMenuOpen}
                disabled={isPending}
              >
                {isPending ? 'Loading…' : currentSchoolyear || 'Select year'}
                <span className={styles.yearPickerChevron} aria-hidden="true">▾</span>
              </button>

              {yearMenuOpen && (
                <ul className={styles.yearMenu} role="listbox">
                  {years.map(({ id, schoolyear }) => (
                    <li key={id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={id === currentBoardId}
                        className={`${styles.yearMenuItem} ${id === currentBoardId ? styles.yearMenuItemActive : ''}`}
                        onClick={() => selectYear(id)}
                      >
                        {schoolyear}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="Content flex flex-col">
        {sections.map(({ id, title, blurb, members }) => (
          <section key={id} id={id} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{title}</h2>
              <p className={styles.sectionBlurb}>{blurb}</p>
            </div>

            <MemberGrid members={members} />
          </section>
        ))}

        <p className={styles.muted}>
          Want to join the board? Get involved, attend meetings, and reach out to any of us! We&apos;re always looking for passionate members to help out with workshops, infrastructure, and more. No experience necessary, just a willingness to learn and contribute!
        </p>
      </div>
    </main>
  );
}

function MemberGrid({ members }) {
  return (
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
  );
}
