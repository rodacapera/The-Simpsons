import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionUser = await AuthService.getSession();
      if (sessionUser) {
        setUser(sessionUser);
      }
    } catch (e) {
      console.error('Session check failed', e);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, pass: string) => {
    const loggedUser = await AuthService.login(email, pass);
    setUser(loggedUser);
  };

  const signUp = async (email: string, pass: string) => {
    const newUser = await AuthService.register(email, pass);
    setUser(newUser);
  };

  const signOut = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
