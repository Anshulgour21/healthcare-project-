import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearStoredUser, getStoredUser, setStoredUser } from '../utils/pocStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  async function login(email, password) {
    if (!email || !password) throw new Error('Enter email and password');
    const nextUser = {
      id: `demo-${email.toLowerCase()}`,
      email,
      name: email.split('@')[0] || 'Demo User',
      roles: ['learner'],
    };
    setStoredUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }

  async function signup(payload) {
    if (!payload.email || !payload.password) throw new Error('Enter email and password');
    const nextUser = {
      id: `demo-${payload.email.toLowerCase()}`,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0] || 'Demo User',
      roles: ['learner'],
    };
    setStoredUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }

  async function logout() {
    clearStoredUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
