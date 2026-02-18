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

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [isDark, setIsDark]   = useState(false);
  const close = () => setIsOpen(false);

  // Initialise from localStorage (runs only on client — avoids SSR mismatch)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const ThemeToggle = () => (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Image
        src="/sun-moon.svg"
        width={22}
        height={22}
        alt=""
        aria-hidden="true"
      />
    </button>
  );

  return (
    <header>
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
            <ThemeToggle />
            <a href="/login" className={styles['btn-primary']}>member login</a>
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
          <ThemeToggle />
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

        <a href="/login" className={styles['btn-primary']} onClick={close}>
          member login
        </a>
      </div>
    </header>
  );
};

export default Navbar;
