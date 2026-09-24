import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { validateProfileForm } from '../utils/validators';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import styles from './Profile.module.css';

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Keep form synchronized with user context changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (formError) setFormError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setFormError('');

    const { isValid, errors } = validateProfileForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email
      });
      setSuccessMessage('Profile details updated successfully.');
    } catch (err) {
      setFormError(err.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const hasChanges =
    formData.name !== (user?.name || '') ||
    formData.email !== (user?.email || '');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>
          Manage your personal information and view your security role
        </p>
      </header>

      {/* Profile Card - Permitted Glass Surface */}
      <div className={`${styles.profileCard} glass-profile-card`}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarLarge} aria-hidden="true">
            {initials}
          </div>
          <div className={styles.avatarInfo}>
            <div className={styles.avatarName}>{user?.name}</div>
            <div className={styles.avatarMeta}>
              <Badge variant="primary">{user?.role || 'user'}</Badge>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                ID: {user?.id || 'usr_001'}
              </span>
            </div>
          </div>
        </div>

        {successMessage && (
          <Alert type="success" message={successMessage} id="profile-success-alert" />
        )}
        {formError && (
          <Alert type="error" message={formError} id="profile-error-alert" />
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            id="profile-name"
            label="Full name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            helperText="2 to 60 characters"
          />

          <Input
            id="profile-email"
            label="Email address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
          />

          {/* System Role (Strictly Read-Only as required) */}
          <div className={styles.readOnlyField}>
            <label className={styles.readOnlyLabel} htmlFor="profile-role-display">
              System Access Role
            </label>
            <div id="profile-role-display" className={styles.readOnlyBox}>
              <span>{user?.role || 'user'}</span>
              <Badge variant="neutral">Read Only</Badge>
            </div>
            <span className={styles.readOnlyHelp}>
              User role is managed by platform security policies and cannot be modified from the UI.
            </span>
          </div>

          <div className={styles.actions}>
            <Button
              id="profile-save-btn"
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
