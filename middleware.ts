import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes, isProtectedRoute, isPublicOnlyRoute } from "@/lib/navigation";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("auth-storage");

  // Check if trying to access protected routes while not authenticated
  // if (isProtectedRoute(pathname) && !isAuthenticated) {
  //   const url = new URL(routes.auth.login, request.url);
  //   url.searchParams.set("returnUrl", pathname);
  //   return NextResponse.redirect(url);
  // }

  // Redirect authenticated users away from public-only routes
  // if (isPublicOnlyRoute(pathname) && isAuthenticated) {
  //   return NextResponse.redirect(new URL(routes.auth.dashboard, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};