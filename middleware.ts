// root/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth-client';

export async function middleware(request: NextRequest) {
  // 1. Check if Better Auth's session token cookie exists
  const sessionData = await auth.api.getSession({
    headers: request.headers,
  });

  const adminRoute = request.nextUrl.pathname.startsWith('/admin');

  // 2. Redirect logged-out users away from protected routes
  if (adminRoute) {
    if (!sessionData || sessionData.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Define which paths require authentication
  matcher: ['/admin/:path*'],
};
