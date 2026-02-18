import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'virox-user';
const AuthContext = createContext(null);

function loadInitialUser() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadInitialUser);

  const login = (email, password) => {
    const safeEmail = email.trim().toLowerCase();
    if (!safeEmail || !password.trim()) {
      throw new Error('Email and password are required.');
    }

    if (!/^\S+@\S+\.\S+$/.test(safeEmail)) {
      throw new Error('Enter a valid email address.');
    }

    const profile = {
      email: safeEmail,
      displayName: safeEmail.split('@')[0],
      role: 'creator'
    };

    setUser(profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
