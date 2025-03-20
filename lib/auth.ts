"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  hasPurchased: boolean;
  hasCompletedSetup: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
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

      // Login function with error handling
      login: async (email: string, password: string) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            isAuthenticated: true,
            user: {
              name: "John Doe",
              email,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            },
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Failed to login. Please try again.");
        }
      },

      // Register function with error handling
      register: async (email: string, password: string, name: string) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            isAuthenticated: true,
            user: {
              name,
              email,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            },
          });
        } catch (error) {
          console.error("Registration failed:", error);
          throw new Error("Failed to register. Please try again.");
        }
      },

      // Logout function
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          hasPurchased: false,
          hasCompletedSetup: false,
        });
      },

      // Set hasPurchased state
      setHasPurchased: (value: boolean) => set({ hasPurchased: value }),

      // Set hasCompletedSetup state
      setHasCompletedSetup: (value: boolean) =>
        set({ hasCompletedSetup: value }),
    }),
    {
      name: "auth-storage", // Key for persisted state in localStorage
    }
  )
);
