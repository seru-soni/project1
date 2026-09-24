/**
 * JobShield Form and Field Validators
 * Strict validation utilities for auth and profile actions
 */

// Email regex complying with RFC standard email structure
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates a user's full name.
 * Rule: 2 to 60 characters, non-empty after trimming.
 * @param {string} name 
 * @returns {string|null} Error message or null if valid
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.';
  }
  if (trimmed.length > 60) {
    return 'Full name cannot exceed 60 characters.';
  }
  return null;
}

/**
 * Validates an email address.
 * Rule: Valid email format, non-empty.
 * @param {string} email 
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return 'Email address is required.';
  }
  const trimmed = email.trim();
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return null;
}

/**
 * Validates a password.
 * Rule: Min 8 chars, at least one letter, at least one number.
 * @param {string} password 
 * @returns {string|null} Error message or null if valid
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return 'Password must contain at least one letter and one number.';
  }
  return null;
}

/**
 * Validates that confirm password matches the initial password.
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns {string|null} Error message or null if valid
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
}

/**
 * Validates entire registration form.
 * @param {{ name?: string, email?: string, password?: string, confirmPassword?: string }} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(password, confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates entire login form.
 * @param {{ email?: string, password?: string }} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateLoginForm({ email, password }) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (!password || typeof password !== 'string') {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates profile update form.
 * Role cannot be modified.
 * @param {{ name?: string, email?: string }} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateProfileForm({ name, email }) {
  const errors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
