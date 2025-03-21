"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { routes } from "@/lib/navigation";

export function NavigationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAuthenticated,
    hasPurchased,
    hasCompletedSetup,
    isAuthResolved, // <-- make sure this is exposed from useAuth
  } = useAuth();

  useEffect(() => {
    if (!isAuthResolved) return;

    // Protected routes check
    if (pathname.startsWith("/dashboard") && !isAuthenticated) {
      if (pathname !== routes.auth.login) {
        router.push(`${routes.auth.login}?returnUrl=${pathname}`);
      }
      return;
    }

    // Registration flow check
    if (pathname === routes.auth.register && !hasPurchased) {
      if (pathname !== routes.public.invest) {
        router.push(routes.public.invest);
      }
      return;
    }

    // Post-purchase flow
    if (
      hasPurchased &&
      !hasCompletedSetup &&
      !pathname.startsWith("/register")
    ) {
      if (pathname !== routes.auth.register) {
        router.push(routes.auth.register);
      }
      return;
    }

    // Redirect authenticated users from public-only routes
    if (
      isAuthenticated &&
      [routes.auth.login, routes.auth.register].includes(pathname)
    ) {
      if (pathname !== routes.auth.dashboard) {
        router.push(routes.auth.dashboard);
      }
      return;
    }
  }, [
    pathname,
    isAuthenticated,
    hasPurchased,
    hasCompletedSetup,
    isAuthResolved,
    router,
  ]);

  return children;
}
