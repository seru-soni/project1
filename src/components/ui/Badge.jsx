import React from 'react';
import styles from './Badge.module.css';

export function Badge({
  children,
  variant = 'primary',
  className = '',
  id
}) {
  return (
    <span
      id={id}
      className={`${styles.badge} ${styles[variant] || styles.primary} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export default Badge;
