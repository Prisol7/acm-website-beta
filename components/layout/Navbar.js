'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';



const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/board',    label: 'Board' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/events',   label: 'Events' },
  { href: '/programs', label: 'Programs' },
  { href: '/about',    label: 'About' },
];

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    className={styles.themeToggle}
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    suppressHydrationWarning
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v2"/>
      <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/>
      <path d="M16 12a4 4 0 0 0-4-4"/>
      <path d="m19 5-1.256 1.256"/>
      <path d="M20 12h2"/>
    </svg>
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const close = () => setIsOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className={styles.navHeader}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>

          {/* Logo */}
          <a href="/" className={styles.logo}>
            <Image
              src="/acmlogo1.png"
              width={120}
              height={48}
              alt="ACM Logo"
              style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
              priority
            />
          </a>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>

          {/* Desktop: theme toggle + login + hamburger */}
          <div className={styles.actions}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <a href="/membership" className={styles['btn-primary']}>membership</a>
            <button
              className={styles.hamburger}
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* Gradient accent line */}
      <div className={styles['nav-gradient-border']} />

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-out drawer (from right) */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.drawerHeader}>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <button className={styles.closeBtn} onClick={close} aria-label="Close menu">
            ✕
          </button>
        </div>

        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={close}>{label}</a>
            </li>
          ))}
        </ul>

        <a href="/membership" className={styles['btn-primary']} onClick={close}>membership</a>
      </div>
    </header>
  );
};

export default Navbar;
