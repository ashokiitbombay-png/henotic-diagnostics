import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // Redirect non-www to www canonical domain at the edge
  if (host === 'henoticdiagnostics.com') {
    url.host = 'www.henoticdiagnostics.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Match all request paths except for files, assets, API routes, or Next.js internals
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)',
  ],
};
