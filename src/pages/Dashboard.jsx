import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import StatCard from '../components/dashboard/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.welcomeHeader}>
        <div className={styles.welcomeText}>
          <h1 className={styles.title}>Welcome back, {user?.name || 'Investigator'}</h1>
          <p className={styles.subtitle}>
            Monitor postings and review security verification metrics in real-time.
          </p>
        </div>
        <div>
          <Badge variant="teal">Security Tier 1</Badge>
        </div>
      </header>

      {/* Stat Cards - Allowed Glass Surface */}
      <section className={styles.statsGrid} aria-label="System Metrics">
        <StatCard
          title="Monitored Posts"
          value="1,248"
          trend="+12%"
          trendDirection="positive"
          description="Total postings tracked across boards"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          }
        />

        <StatCard
          title="Scanned Today"
          value="142"
          trend="+5%"
          trendDirection="positive"
          description="New posts verified in the last 24h"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
        />

        <StatCard
          title="Risk Flags"
          value="18"
          trend="-3%"
          trendDirection="positive"
          description="Suspicious postings under review"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />

        <StatCard
          title="Trust Index"
          value="98.4%"
          trend="Stable"
          trendDirection="neutral"
          description="Platform reliability & verification score"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
      </section>

      {/* Overview Console Area */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Investigation Workspace</h2>
        </div>

        <div className={styles.placeholderBanner}>
          <div className={styles.placeholderIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className={styles.placeholderTitle}>Console Ready</h3>
          <p className={styles.placeholderText}>
            JobShield core authentication and interface shell are fully initialized. Investigation pipelines and analysis tools will be linked in upcoming modules.
          </p>
          <div className={styles.actionRow}>
            <Link to="/profile">
              <Button variant="secondary" size="md">
                Manage Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
