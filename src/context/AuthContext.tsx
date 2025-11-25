import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TEST_ACCOUNTS = [
  { email: 'demo@example.com', password: 'password123', username: 'Demo User' },
  { email: 'test@user.com', password: 'testpass', username: 'Test User' }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const account = TEST_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );

    if (!account) {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const registeredUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!registeredUser) {
        return false;
      }

      const newUser: User = {
        id: registeredUser.id,
        email: registeredUser.email,
        username: registeredUser.username,
        avatar: registeredUser.avatar
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      username: account.username
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser || TEST_ACCOUNTS.some(acc => acc.email === email)) {
      return false;
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      password
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    const userWithoutPassword: User = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    };

    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
