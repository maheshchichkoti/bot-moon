"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { routes } from "@/lib/navigation";

export function NavigationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasPurchased, hasCompletedSetup } = useAuth();

  useEffect(() => {
    // Protected routes check
    if (pathname.startsWith("/dashboard") && !isAuthenticated) {
      router.push(routes.auth.login + `?returnUrl=${pathname}`);
      return;
    }

    // Registration flow check
    if (pathname === routes.auth.register && !hasPurchased) {
      router.push(routes.public.invest);
      return;
    }

    // Post-purchase flow
    if (hasPurchased && !hasCompletedSetup && !pathname.startsWith("/register")) {
      router.push(routes.auth.register);
      return;
    }

    // Redirect authenticated users from public-only routes
    if (isAuthenticated && [routes.auth.login, routes.auth.register].includes(pathname)) {
      router.push(routes.auth.dashboard);
      return;
    }
  }, [pathname, isAuthenticated, hasPurchased, hasCompletedSetup, router]);

  return children;
}