import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip tracking for API routes and admin panel
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.includes('._next')) {
    return NextResponse.next();
  }

  const ip = request.ip || 
    request.headers.get('x-real-ip') || 
    request.headers.get('x-forwarded-for') || 
    '0.0.0.0';

  try {
    await fetch(`${request.nextUrl.origin}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip,
        path: request.nextUrl.pathname,
        userAgent: request.headers.get('user-agent') || '',
      }),
    });
  } catch (error) {
    console.error('Failed to track visitor:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
} 