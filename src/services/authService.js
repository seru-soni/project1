/**
 * TEMPORARY AND INSECURE MOCK AUTH SERVICE FOR FRONTEND DEVELOPMENT ONLY.
 * 
 * Note: This file uses localStorage and simulated ~400ms network delays to mock
 * backend authentication. It does NOT store real passwords or perform secure
 * server-side hashing.
 * 
 * This service exposes a stable interface (register, login, logout, getCurrentUser, updateProfile)
 * that will later be replaced with real Axios/fetch calls to /api/auth/* without modifying
 * consuming components or contexts.
 */

const STORAGE_USERS_KEY = 'jobshield_mock_users_db';
const STORAGE_CURRENT_USER_KEY = 'jobshield_mock_current_user';
const STORAGE_TOKEN_KEY = 'jobshield_mock_auth_token';

const MOCK_DELAY_MS = 400;

// Seed demo users if storage is empty
const INITIAL_DEMO_USERS = [
  {
    id: 'usr_demo_001',
    name: 'Alex Vance',
    email: 'alex@jobshield.dev',
    // Insecure placeholder mock password hash simulation
    passwordHash: 'demo_password_hash_Test1234',
    role: 'user',
    createdAt: '2026-09-01T10:00:00.000Z',
    avatar: null
  }
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return [...INITIAL_DEMO_USERS];
    }
    return JSON.parse(raw);
  } catch {
    return [...INITIAL_DEMO_USERS];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save mock users to localStorage', err);
  }
}

function delay(ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Insecure helper to simulate password verification for testing
function hashMockPassword(password) {
  return `mock_hash_${password}`;
}

/**
 * Register a new user
 * Always assigns role "user".
 * 
 * @param {{ name: string, email: string, password: string }} credentials
 * @returns {Promise<{ user: { id: string, name: string, email: string, role: string, createdAt: string }, token: string }>}
 */
export async function register({ name, email, password }) {
  await delay();

  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanName || !cleanEmail || !password) {
    throw new Error('Name, email, and password are required.');
  }

  const users = getStoredUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (existingUser) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: cleanName,
    email: cleanEmail,
    passwordHash: hashMockPassword(password),
    role: 'user', // Forced role "user"
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveStoredUsers(users);

  // Return safe user object (no password hash)
  const safeUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt
  };

  const mockToken = `mock_jwt_token_${newUser.id}_${Date.now()}`;
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(safeUser));
  localStorage.setItem(STORAGE_TOKEN_KEY, mockToken);

  return {
    user: safeUser,
    token: mockToken
  };
}

/**
 * Log in an existing user
 * 
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: { id: string, name: string, email: string, role: string, createdAt: string }, token: string }>}
 */
export async function login({ email, password }) {
  await delay();

  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Email and password are required.');
  }

  const users = getStoredUsers();
  const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!foundUser) {
    throw new Error('Invalid email or password.');
  }

  // Check demo password or hashed mock password
  const expectedHash = hashMockPassword(password);
  const isDemo = cleanEmail === 'alex@jobshield.dev' && (password === 'Test1234' || password === 'demo1234');
  
  if (foundUser.passwordHash !== expectedHash && !isDemo) {
    throw new Error('Invalid email or password.');
  }

  const safeUser = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
    createdAt: foundUser.createdAt
  };

  const mockToken = `mock_jwt_token_${foundUser.id}_${Date.now()}`;
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(safeUser));
  localStorage.setItem(STORAGE_TOKEN_KEY, mockToken);

  return {
    user: safeUser,
    token: mockToken
  };
}

/**
 * Log out the currently authenticated user
 * 
 * @returns {Promise<{ success: boolean }>}
 */
export async function logout() {
  await delay(150);
  localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  return { success: true };
}

/**
 * Retrieve the current authenticated user session
 * 
 * @returns {Promise<{ user: { id: string, name: string, email: string, role: string } | null, token: string | null }>}
 */
export async function getCurrentUser() {
  await delay(200);

  try {
    const rawUser = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);

    if (!rawUser || !token) {
      return { user: null, token: null };
    }

    const user = JSON.parse(rawUser);
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
}

/**
 * Update the current user's profile (name & email only).
 * Role is strictly protected and cannot be edited.
 * 
 * @param {{ name?: string, email?: string }} updateData
 * @returns {Promise<{ user: { id: string, name: string, email: string, role: string } }>}
 */
export async function updateProfile({ name, email }) {
  await delay();

  const rawUser = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
  if (!rawUser) {
    throw new Error('Not authenticated. Please log in again.');
  }

  const currentUser = JSON.parse(rawUser);
  const users = getStoredUsers();
  const userIndex = users.findIndex((u) => u.id === currentUser.id);

  if (userIndex === -1) {
    throw new Error('User account not found.');
  }

  const cleanName = name !== undefined ? name.trim() : users[userIndex].name;
  const cleanEmail = email !== undefined ? email.trim().toLowerCase() : users[userIndex].email;

  // If email changed, ensure no collision with another account
  if (cleanEmail !== users[userIndex].email) {
    const emailConflict = users.some(
      (u) => u.id !== currentUser.id && u.email.toLowerCase() === cleanEmail
    );
    if (emailConflict) {
      throw new Error('This email address is already in use by another account.');
    }
  }

  // Update record (role stays identical)
  users[userIndex].name = cleanName;
  users[userIndex].email = cleanEmail;
  saveStoredUsers(users);

  const safeUser = {
    id: users[userIndex].id,
    name: users[userIndex].name,
    email: users[userIndex].email,
    role: users[userIndex].role, // Retained strictly as 'user'
    createdAt: users[userIndex].createdAt
  };

  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(safeUser));

  return {
    user: safeUser
  };
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile
};
