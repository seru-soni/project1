import React from 'react';
import styles from './Spinner.module.css';

export function Spinner({
  size = 'md',        // 'sm' | 'md' | 'lg' | 'xl'
  variant = 'primary', // 'primary' | 'teal' | 'white' | 'muted'
  label,
  className = '',
  id
}) {
  const sizeClass = styles[size] || styles.md;
  const variantClass = styles[variant] || styles.primary;

  return (
    <div
      id={id}
      className={`${styles.wrapper} ${sizeClass} ${variantClass} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label || 'Loading...'}
    >
      <span className={styles.spinner} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

export default Spinner;
