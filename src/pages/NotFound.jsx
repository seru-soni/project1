import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={styles.container}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
