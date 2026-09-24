import React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from '../ui/Badge';
import styles from './Sidebar.module.css';

export function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      )
    },
    {
      to: '/profile',
      label: 'Profile & Settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} glass-sidebar ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label="Main Navigation"
      >
        <div className={styles.navSection}>
          <div className={styles.sectionGroup}>
            <span className={styles.sectionTitle}>Navigation</span>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
                end={item.to === '/dashboard'}
              >
                <div className={styles.navItemLeft}>
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className={styles.footerNote}>
          <strong>JobShield Core</strong>
          <span>Investigation Platform v0.1.0</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
