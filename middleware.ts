import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req: NextRequest & { auth: { user?: { email?: string } } | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Pass the pathname to Server Components via request header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  // Protect admin API routes — return 401 JSON
  if (pathname.startsWith('/api/admin')) {
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Protect admin UI routes — redirect to login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session?.user) {
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
