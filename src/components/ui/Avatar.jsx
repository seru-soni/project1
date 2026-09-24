import React, { useState } from 'react';
import styles from './Avatar.module.css';

export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status,      // 'online' | 'busy' | 'away' | 'offline'
  className = '',
  id
}) {
  const [imageError, setImageError] = useState(false);

  // Derive initials from name
  const getInitials = (text) => {
    if (!text || typeof text !== 'string') return 'U';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  const sizeClass = styles[size] || styles.md;

  const statusClass =
    status === 'online'
      ? styles.statusOnline
      : status === 'busy'
      ? styles.statusBusy
      : status === 'away'
      ? styles.statusAway
      : status === 'offline'
      ? styles.statusOffline
      : null;

  return (
    <div id={id} className={`${styles.avatarWrapper} ${sizeClass} ${className}`.trim()}>
      <div className={styles.avatar} aria-label={name || alt || 'User Avatar'}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={styles.avatarImg}
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {statusClass && (
        <span
          className={`${styles.statusDot} ${statusClass}`}
          aria-label={`Status: ${status}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default Avatar;
