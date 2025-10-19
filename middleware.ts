import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|woff|woff2|ttf|eot|otf)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  } else {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  }

  return response;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
