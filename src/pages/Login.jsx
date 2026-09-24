import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { validateLoginForm } from '../utils/validators';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return to intended page if redirected
  const from = location.state?.from?.pathname || '/dashboard';

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

    const { isValid, errors } = validateLoginForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch {
      // Error handled in AuthContext & displayed via authError
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: 'alex@jobshield.dev',
      password: 'Test1234'
    });
    setFieldErrors({});
    clearError();
  };

  return (
    <div className={`${styles.card} glass-auth-card`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sign in to your account</h2>
        <p className={styles.subtitle}>Enter your credentials to access the security console</p>
      </div>

      {authError && <Alert type="error" message={authError} id="login-auth-error" />}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          id="login-email"
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
          id="login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          allowPasswordToggle
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />

        <div className={styles.actions}>
          <Button
            id="login-submit-btn"
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
          >
            Sign In
          </Button>
        </div>
      </form>

      {/* Quick fill for instant testing without manual typing */}
      <div className={styles.demoBanner}>
        <div className={styles.demoHeader}>
          <span>🧪 Demo Test Account</span>
          <button
            type="button"
            className={styles.demoFillBtn}
            onClick={handleFillDemo}
            aria-label="Auto-fill demo test credentials"
          >
            Auto-fill Demo
          </button>
        </div>
        <div>Email: <span className={styles.demoCode}>alex@jobshield.dev</span></div>
        <div>Password: <span className={styles.demoCode}>Test1234</span></div>
      </div>

      <div className={styles.footerLinks}>
        <span>Don&apos;t have an account?</span>
        <Link to="/register" className={styles.link}>
          Create account
        </Link>
      </div>
    </div>
  );
}

export default Login;
