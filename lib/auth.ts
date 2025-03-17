"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  hasPurchased: boolean;
  hasCompletedSetup: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setHasPurchased: (value: boolean) => void;
  setHasCompletedSetup: (value: boolean) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasPurchased: false,
      hasCompletedSetup: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({
          isAuthenticated: true,
          user: {
            name: 'John Doe',
            email: email,
          },
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          hasPurchased: false,
          hasCompletedSetup: false,
        });
      },
      setHasPurchased: (value: boolean) => set({ hasPurchased: value }),
      setHasCompletedSetup: (value: boolean) => set({ hasCompletedSetup: value }),
    }),
    {
      name: 'auth-storage',
    }
  )
);