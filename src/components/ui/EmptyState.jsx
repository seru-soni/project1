import React from 'react';
import styles from './EmptyState.module.css';

export function EmptyState({
  icon,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  compact = false,
  className = '',
  id
}) {
  return (
    <div
      id={id}
      className={`${styles.container} ${compact ? styles.compact : ''} ${className}`.trim()}
    >
      {icon && (
        <div className={styles.iconWrapper} aria-hidden="true">
          {icon}
        </div>
      )}

      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}

      {children}

      {(primaryAction || secondaryAction) && (
        <div className={styles.actions}>
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
