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
<<<<<<< HEAD
    if (pathname === routes.auth.register && !hasPurchased) {
      router.push(routes.public.invest);
      return;
    }

    // Post-purchase flow
    if (hasPurchased && !hasCompletedSetup && !pathname.startsWith("/register")) {
=======
    // if (pathname === routes.auth.register && !hasPurchased) {
    //   router.push(routes.public.invest);
    //   return;
    // }

    // Post-purchase flow
    if (
      hasPurchased &&
      !hasCompletedSetup &&
      !pathname.startsWith("/register")
    ) {
>>>>>>> 38cbfb7 (Your commit message)
      router.push(routes.auth.register);
      return;
    }

    // Redirect authenticated users from public-only routes
<<<<<<< HEAD
    if (isAuthenticated && [routes.auth.login, routes.auth.register].includes(pathname)) {
=======
    if (
      isAuthenticated &&
      [routes.auth.login, routes.auth.register].includes(pathname)
    ) {
>>>>>>> 38cbfb7 (Your commit message)
      router.push(routes.auth.dashboard);
      return;
    }
  }, [pathname, isAuthenticated, hasPurchased, hasCompletedSetup, router]);

  return children;
<<<<<<< HEAD
}
=======
}
>>>>>>> 38cbfb7 (Your commit message)
