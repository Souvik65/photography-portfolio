import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Protect admin UI routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAdmin) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};