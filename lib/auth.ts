"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, provider } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  getIdToken,
  onIdTokenChanged,
} from "firebase/auth";

interface AuthState {
  isAuthenticated: boolean;
  isAuthResolved: boolean;
  user: User | null;
  token: string | null;
  hasPurchased: boolean;
  hasCompletedSetup: boolean;
  initAuthListener: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setHasPurchased: (value: boolean) => void;
  setHasCompletedSetup: (value: boolean) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthResolved: false,
      user: null,
      token: null,
      hasPurchased: false,
      hasCompletedSetup: false,

      // 🔹 Initialize Auth Listener
      initAuthListener: () => {
        const fallback = setTimeout(() => {
          set({ isAuthResolved: true }); // Fallback in case Firebase hangs
        }, 5000); // 5-second timeout

        try {
          const unsubscribe = onIdTokenChanged(auth, async (user) => {
            clearTimeout(fallback); // Clear the fallback timer

            if (user) {
              const token = await user.getIdToken();
              console.log("🔑 Firebase ID Token:", token);
              set({
                isAuthenticated: true,
                user,
                token,
                isAuthResolved: true,
              });

              // Sync token with backend
              try {
                await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              } catch (err) {
                console.warn("⚠️ Backend sync failed:", err);
              }
            } else {
              // User logged out or token invalidated
              set({
                isAuthenticated: false,
                user: null,
                token: null,
                hasPurchased: false,
                hasCompletedSetup: false,
                isAuthResolved: true,
              });
            }
          });

          return () => unsubscribe(); // Cleanup listener
        } catch (error) {
          console.error("Firebase auth listener error:", error);
          set({ isAuthResolved: true }); // Ensure app loads even if Firebase fails
        }
      },

      // 🔹 Email/Password Login
      login: async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          const token = await getIdToken(user);
          console.log("🔑 Firebase ID Token:", token);

          set({ isAuthenticated: true, user, token });

          // Send token to backend for verification
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (err) {
            console.warn("⚠️ Backend user sync failed:", err);
          }
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Failed to login. Please check your credentials.");
        }
      },

      // 🔹 Register with Email/Password
      register: async (email: string, password: string, name: string) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          const token = await getIdToken(user);
          console.log("🔑 Firebase ID Token:", token);

          set({ isAuthenticated: true, user, token });

          // Send user info to backend
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (err) {
            console.warn("⚠️ Backend user sync failed:", err);
          }
        } catch (error) {
          console.error("Registration failed:", error);
          throw new Error("Failed to register. Try again.");
        }
      },

      // 🔹 Google Login
      loginWithGoogle: async () => {
        try {
          const userCredential = await signInWithPopup(auth, provider);
          const user = userCredential.user;
          const token = await getIdToken(user);
          console.log("🔑 Firebase ID Token:", token);
          set({ isAuthenticated: true, user, token });

          // Send token to backend for verification
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (err) {
            console.warn("⚠️ Backend user sync failed:", err);
          }
        } catch (error) {
          console.error("Google login failed:", error);
          throw new Error("Google authentication failed.");
        }
      },

      // 🔹 Logout
      logout: async () => {
        await signOut(auth);
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          hasPurchased: false,
          hasCompletedSetup: false,
          isAuthResolved: true,
        });
      },

      // 🔹 Set user properties
      setHasPurchased: (value: boolean) => set({ hasPurchased: value }),
      setHasCompletedSetup: (value: boolean) =>
        set({ hasCompletedSetup: value }),
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);
