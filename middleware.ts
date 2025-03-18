<<<<<<< HEAD
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth-storage');

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard'];
  
  // Public routes that should not be accessed when authenticated
  const publicOnlyRoutes = ['/login', '/register'];

  // Check if trying to access protected routes while not authenticated
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from public-only routes
  if (publicOnlyRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
=======
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
>>>>>>> 38cbfb7 (Your commit message)

  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
=======
  matcher: ["/dashboard/:path*", "/login", "/register"],
>>>>>>> 38cbfb7 (Your commit message)
};