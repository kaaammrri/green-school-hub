import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'school' | 'driver' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolName?: string;
  avatar?: string;
  points?: number;
  level?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: Record<string, User> = {
  'school@demo.com': {
    id: '1',
    email: 'school@demo.com',
    name: 'Green Valley School',
    role: 'school',
    schoolName: 'Green Valley Public School',
    points: 15420,
    level: 12,
  },
  'driver@demo.com': {
    id: '2',
    email: 'driver@demo.com',
    name: 'Rajesh Kumar',
    role: 'driver',
  },
  'admin@demo.com': {
    id: '3',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any credentials and create a user based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: role === 'school' ? 'Demo School' : role === 'driver' ? 'Demo Driver' : 'Demo Admin',
      role,
      schoolName: role === 'school' ? 'Demo Public School' : undefined,
      points: role === 'school' ? 15420 : undefined,
      level: role === 'school' ? 12 : undefined,
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      schoolName: role === 'school' ? name : undefined,
      points: role === 'school' ? 0 : undefined,
      level: role === 'school' ? 1 : undefined,
    };
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
