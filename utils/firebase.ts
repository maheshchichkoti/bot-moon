import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  getIdToken,
} from "firebase/auth";

// 🔹 Firebase Config (Environment Variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 🔹 Ensure Firebase is only initialized once (Prevents Next.js hydration errors)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// 🔹 Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns Firebase User object
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw new Error("Google authentication failed.");
  }
};

// 🔹 Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed.");
  }
};

// 🔹 Retrieve User Token (For Backend Authentication)
export const getUserToken = async (user: User | null) => {
  if (!user) return null;
  try {
    return await getIdToken(user);
  } catch (error) {
    console.error("Token retrieval error:", error);
    return null;
  }
};
