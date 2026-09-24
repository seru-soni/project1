import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import styles from './Register.module.css';

export function Register() {
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const { isValid, errors } = validateRegisterForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard', { replace: true });
    } catch {
      // Handled via authError in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.card} glass-auth-card`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.subtitle}>Register to start analyzing job postings with JobShield</p>
      </div>

      {authError && <Alert type="error" message={authError} id="register-auth-error" />}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          id="register-name"
          label="Full name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="e.g. Alex Vance"
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
          helperText="Between 2 and 60 characters"
        />

        <Input
          id="register-email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />

        <Input
          id="register-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          allowPasswordToggle
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          helperText="Minimum 8 characters with at least one letter and one number"
        />

        <Input
          id="register-confirm-password"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          allowPasswordToggle
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
        />

        <div className={styles.actions}>
          <Button
            id="register-submit-btn"
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
          >
            Create Account
          </Button>
        </div>
      </form>

      <div className={styles.footerLinks}>
        <span>Already have an account?</span>
        <Link to="/login" className={styles.link}>
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Register;
