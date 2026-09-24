import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize and hydrate authentication state on mount
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const session = await authService.getCurrentUser();
        if (isMounted && session.user) {
          setUser(session.user);
          setToken(session.token);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Session hydration error:', err);
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (credentials) => {
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    }
  }, []);

  const register = useCallback(async (data) => {
    setError(null);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setToken(null);
      setError(null);
    }
  }, []);

  const updateProfile = useCallback(async (updateData) => {
    setError(null);
    try {
      const response = await authService.updateProfile(updateData);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Profile update failed.');
      throw err;
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    loading,
    error,
    clearError,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
