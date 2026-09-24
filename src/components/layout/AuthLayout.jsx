import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export function AuthLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.brandHeader}>
        <div className={styles.logoIcon} aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <h1 className={styles.brandName}>JobShield</h1>
        <p className={styles.brandTagline}>Fraudulent Job Posting Detection & Verification</p>
      </header>

      <main className={styles.cardWrapper}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} JobShield Platform. Secured Authentication.</p>
      </footer>
    </div>
  );
}

export default AuthLayout;
