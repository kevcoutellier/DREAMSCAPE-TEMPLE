import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  type?: 'business' | 'leisure' | 'bleisure';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, userType: string) => Promise<void>;
  logout: () => void;
}

// Test users with different travel types
const TEST_USERS = {
  business: {
    email: 'business@example.com',
    password: 'business123',
    name: 'Sarah Johnson',
    role: 'user' as const,
    id: 'business-1',
    type: 'business' as const
  },
  leisure: {
    email: 'leisure@example.com',
    password: 'leisure123',
    name: 'Mike Chen',
    role: 'user' as const,
    id: 'leisure-1',
    type: 'leisure' as const
  },
  bleisure: {
    email: 'bleisure@example.com',
    password: 'bleisure123',
    name: 'Emma Davis',
    role: 'user' as const,
    id: 'bleisure-1',
    type: 'bleisure' as const
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    id: 'admin-1'
  }
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Check all test users
        const user = Object.values(TEST_USERS).find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userData } = user;
          set({ user: userData, isAuthenticated: true });
          return;
        }

        throw new Error('Invalid credentials');
      },
      signup: async (name: string, email: string, password: string, userType: string) => {
        // For now, just create a basic user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: 'user' as const,
          type: userType as 'business' | 'leisure' | 'bleisure'
        };
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export { useAuth };