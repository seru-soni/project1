import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Dropdown from '../ui/Dropdown';
import styles from './Navbar.module.css';

export function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className={`${styles.navbar} glass-navbar`} role="banner">
      <div className={styles.leftSection}>
        {onToggleSidebar && (
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        )}

        <Link to="/dashboard" className={styles.brand} aria-label="JobShield Home">
          <div className={styles.logoIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className={styles.brandTitle}>
            <span>Job<span className={styles.brandHighlight}>Shield</span></span>
            <span className={styles.badgeShield}>PRO</span>
          </div>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.systemStatus} aria-label="System status: Active Protection">
          <span className={styles.statusDot} aria-hidden="true" />
          <span>System Active</span>
        </div>

        <Dropdown user={user} onLogout={logout} />
      </div>
    </header>
  );
}

export default Navbar;
