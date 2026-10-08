import { betterFetch } from '@better-fetch/fetch';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Session = {
  user: {
    id: string;
    email: string;
    role: string;
  };
  session: {
    token: string;
  };
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionData = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  const adminRoute = pathname.startsWith('/admin');
  const loginLogout = pathname.startsWith('/auth');

  // Redirect logged-out users away from protected routes
  if (adminRoute) {
    if (!sessionData || sessionData.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Block access to login/create from logged in users
  if (loginLogout) {
    if (sessionData) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
