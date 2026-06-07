import React from 'react';
import styles from './HeaderBasic.module.css';
import Link from 'next/link';

const HeaderBasic = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoSection}>
          {/* Replaced static asset import with standard img tag for Next.js compatibility */}
          <img loading="lazy" decoding="async" src="/logo.svg" alt="Henotic Diagnostics Logo" className={styles.logoImage} />
          <h1 className={styles.brandName}>Henotic Diagnostics</h1>
        </Link>
        <nav className={styles.navLinks}>
          <Link href="#services" className={styles.navItem}>Services</Link>
          <Link href="#about" className={styles.navItem}>About Us</Link>
          <Link href="#contact" className={styles.navItem}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};
export default HeaderBasic;