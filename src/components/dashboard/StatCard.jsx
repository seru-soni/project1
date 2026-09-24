import React from 'react';
import styles from './StatCard.module.css';

export function StatCard({
  title,
  value,
  trend,
  trendDirection = 'positive',
  description,
  icon
}) {
  const trendClass =
    trendDirection === 'positive'
      ? styles.trendPositive
      : trendDirection === 'negative'
      ? styles.trendNegative
      : styles.trendNeutral;

  return (
    <div className={`${styles.card} glass-stat-card`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.iconWrapper} aria-hidden="true">{icon}</div>}
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {trend && (
          <span className={`${styles.trend} ${trendClass}`}>
            {trendDirection === 'positive' && '↑'}
            {trendDirection === 'negative' && '↓'}
            {trend}
          </span>
        )}
      </div>

      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export default StatCard;
