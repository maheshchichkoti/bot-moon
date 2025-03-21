"use client";

import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuth } from "@/lib/auth";

export default function AuthListener() {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        // Update Zustand state with new token and user info
        useAuth.setState({ isAuthenticated: true, user, token });
        // Optionally, notify your backend of the new token:
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // User signed out or token invalidated
        useAuth.setState({ isAuthenticated: false, user: null, token: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return null; // This component doesn’t render any visible UI.
}
