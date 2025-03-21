import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuth } from "@/lib/auth";

export const initAuthListener = () => {
  const set = useAuth.getState(); // Direct Zustand access

  onIdTokenChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();

      set.isAuthenticated = true;
      set.user = user;
      set.token = token;

      // 🔁 Re-send token to backend to refresh session, if needed
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/firebase-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // User logged out or token invalidated
      set.isAuthenticated = false;
      set.user = null;
      set.token = null;
    }
  });
};
