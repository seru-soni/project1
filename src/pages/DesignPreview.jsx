import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import EmptyState from '../components/ui/EmptyState';
import styles from './DesignPreview.module.css';

export function DesignPreview() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testPassword, setTestPassword] = useState('Secret123');
  const [dismissedAlert, setDismissedAlert] = useState(false);

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <header className={styles.hero}>
        <span className={styles.heroTag}>Design System & UI Component Library</span>
        <h1 className={styles.heroTitle}>JobShield UI Preview</h1>
        <p className={styles.heroSubtitle}>
          Review all design system primitives, glassmorphic surfaces, accessible inputs, and state progressions.
        </p>
      </header>

      {/* 1. Design Tokens */}
      <section className={styles.section} aria-labelledby="tokens-heading">
        <div className={styles.sectionHeader}>
          <h2 id="tokens-heading" className={styles.sectionTitle}>1. Core Design Tokens & Palette</h2>
          <span className={styles.sectionNote}>styles/tokens.css & styles/base.css</span>
        </div>

        <div className={styles.tokenSwatches}>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-primary-500)' }} />
            <span className={styles.swatchName}>Primary-500</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-primary-400)' }} />
            <span className={styles.swatchName}>Primary-400</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-teal-500)' }} />
            <span className={styles.swatchName}>Teal-500</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-teal-400)' }} />
            <span className={styles.swatchName}>Teal-400</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-danger)' }} />
            <span className={styles.swatchName}>Danger</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-success)' }} />
            <span className={styles.swatchName}>Success</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-warning)' }} />
            <span className={styles.swatchName}>Warning</span>
          </div>
          <div className={styles.swatch}>
            <div className={styles.swatchColor} style={{ background: 'var(--color-info)' }} />
            <span className={styles.swatchName}>Info</span>
          </div>
        </div>
      </section>

      {/* 2. Button Component */}
      <section className={styles.section} aria-labelledby="btn-heading">
        <div className={styles.sectionHeader}>
          <h2 id="btn-heading" className={styles.sectionTitle}>2. Button (components/ui/Button)</h2>
          <span className={styles.sectionNote}>Variants: primary, secondary, ghost | Loading | Sizes</span>
        </div>

        <div className={styles.grid3}>
          {/* Variants */}
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Variants</span>
            <div className={styles.componentRow}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Sizes</span>
            <div className={styles.componentRow}>
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large</Button>
            </div>
          </div>

          {/* States */}
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>States & Interactive</span>
            <div className={styles.componentRow}>
              <Button disabled variant="primary">Disabled</Button>
              <Button
                variant="primary"
                loading={btnLoading}
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => setBtnLoading(false), 2000);
                }}
              >
                {btnLoading ? 'Processing...' : 'Click for Loading'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Input Component */}
      <section className={styles.section} aria-labelledby="input-heading">
        <div className={styles.sectionHeader}>
          <h2 id="input-heading" className={styles.sectionTitle}>3. Input (components/ui/Input)</h2>
          <span className={styles.sectionNote}>Labels, error states, helper text, password toggle</span>
        </div>

        <div className={styles.grid2}>
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Standard & Helper Text</span>
            <Input
              id="preview-demo-email"
              label="Email Address"
              placeholder="alex@jobshield.dev"
              helperText="We will never share your email address."
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
            />
          </div>

          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Error State with WCAG aria-invalid</span>
            <Input
              id="preview-demo-error"
              label="Target Job Posting URL"
              required
              value="invalid-url"
              error="Please enter a valid HTTP or HTTPS URL."
              onChange={() => {}}
            />
          </div>

          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Password with Toggle</span>
            <Input
              id="preview-demo-password"
              label="Account Password"
              type="password"
              allowPasswordToggle
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              helperText="Click the eye icon to toggle visibility."
            />
          </div>

          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Disabled Input</span>
            <Input
              id="preview-demo-disabled"
              label="System Security Key"
              disabled
              value="SEC-9021-PROTECTED"
              helperText="This field is read-only in preview mode."
            />
          </div>
        </div>
      </section>

      {/* 4. Card Component */}
      <section className={styles.section} aria-labelledby="card-heading">
        <div className={styles.sectionHeader}>
          <h2 id="card-heading" className={styles.sectionTitle}>4. Card (components/ui/Card)</h2>
          <span className={styles.sectionNote}>Glassmorphism, elevated, header, footer, interactive</span>
        </div>

        <div className={styles.grid3}>
          <Card variant="glass" padding="md">
            <Card.Header
              title="Glass Card (Default)"
              description="Backdrop-filter blur(16px) with translucent border."
            />
            <Card.Body>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                This is the standard SaaS surface used across dashboard widgets and panels.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="secondary">Cancel</Button>
              <Button size="sm" variant="primary">Confirm</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated" padding="md">
            <Card.Header
              title="Elevated Card"
              description="Higher opacity glass fill for modal & prominent views."
            />
            <Card.Body>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Provides higher contrast and separation against complex gradient backdrops.
              </p>
            </Card.Body>
          </Card>

          <Card variant="glass" padding="md" interactive>
            <Card.Header
              title="Interactive Card (Hover Me)"
              description="Includes subtle translateY and indigo border glow."
            />
            <Card.Body>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Hover to see smooth elevation micro-interaction without motion distortion.
              </p>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* 5. Avatar Component */}
      <section className={styles.section} aria-labelledby="avatar-heading">
        <div className={styles.sectionHeader}>
          <h2 id="avatar-heading" className={styles.sectionTitle}>5. Avatar (components/ui/Avatar)</h2>
          <span className={styles.sectionNote}>Initials fallback, sizes (xs to xl), status dots</span>
        </div>

        <div className={styles.grid2}>
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Sizes (xs, sm, md, lg, xl)</span>
            <div className={styles.componentRow}>
              <Avatar name="Alex Vance" size="xs" />
              <Avatar name="Alex Vance" size="sm" />
              <Avatar name="Alex Vance" size="md" />
              <Avatar name="Alex Vance" size="lg" />
              <Avatar name="Alex Vance" size="xl" />
            </div>
          </div>

          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Status Indicators (Online, Busy, Away, Offline)</span>
            <div className={styles.componentRow}>
              <Avatar name="Sarah Connor" size="lg" status="online" />
              <Avatar name="John Doe" size="lg" status="busy" />
              <Avatar name="Dana Scully" size="lg" status="away" />
              <Avatar name="Fox Mulder" size="lg" status="offline" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Spinner Component */}
      <section className={styles.section} aria-labelledby="spinner-heading">
        <div className={styles.sectionHeader}>
          <h2 id="spinner-heading" className={styles.sectionTitle}>6. Spinner (components/ui/Spinner)</h2>
          <span className={styles.sectionNote}>Variants, sizes, accessible role="status"</span>
        </div>

        <div className={styles.grid2}>
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Color Variants & Labels</span>
            <div className={styles.componentRow}>
              <Spinner variant="primary" label="Verifying certificate..." />
              <Spinner variant="teal" label="Scanning domain..." />
              <Spinner variant="white" label="Loading..." />
            </div>
          </div>

          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>Sizes (sm, md, lg, xl)</span>
            <div className={styles.componentRow}>
              <Spinner size="sm" variant="primary" />
              <Spinner size="md" variant="primary" />
              <Spinner size="lg" variant="primary" />
              <Spinner size="xl" variant="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Alert Component */}
      <section className={styles.section} aria-labelledby="alert-heading">
        <div className={styles.sectionHeader}>
          <h2 id="alert-heading" className={styles.sectionTitle}>7. Alert (components/ui/Alert)</h2>
          <span className={styles.sectionNote}>Error, Success, Warning, Info | Dismissable</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Alert
            type="error"
            title="Suspicious Posting Detected"
            message="This posting matches high-risk phishing signatures across multiple indicator databases."
          />
          <Alert
            type="success"
            title="Domain Verified"
            message="Employer domain matches official registered enterprise DNS records."
          />
          <Alert
            type="warning"
            title="Unverified Telegram Contact"
            message="The recruiter requested communication outside standard email channels."
          />
          {!dismissedAlert ? (
            <Alert
              type="info"
              title="System Notice"
              message="JobShield engine is operating with updated security signatures."
              onDismiss={() => setDismissedAlert(true)}
            />
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setDismissedAlert(false)}>
              Restore Dismissed Info Alert
            </Button>
          )}
        </div>
      </section>

      {/* 8. EmptyState Component */}
      <section className={styles.section} aria-labelledby="empty-heading">
        <div className={styles.sectionHeader}>
          <h2 id="empty-heading" className={styles.sectionTitle}>8. EmptyState (components/ui/EmptyState)</h2>
          <span className={styles.sectionNote}>Icons, messages, action triggers, compact layouts</span>
        </div>

        <div className={styles.grid2}>
          <EmptyState
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
            title="No Scanned Job Postings Yet"
            description="Submit a job posting link or paste description text to begin your first fraudulent activity analysis."
            primaryAction={<Button variant="primary" size="md">Submit Job URL</Button>}
            secondaryAction={<Button variant="secondary" size="md">Paste Text</Button>}
          />

          <EmptyState
            compact
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
            title="Protection Shield Ready"
            description="No security threats or suspicious activity detected in the active workspace."
            primaryAction={<Button variant="secondary" size="sm">Learn More</Button>}
          />
        </div>
      </section>
    </div>
  );
}

export default DesignPreview;
