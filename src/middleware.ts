import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are considered public (not requiring authentication)
  const isPublicPath = path === '/sign-in' || path === '/sign-up'

  // Check for the authentication token in the cookies
  const token = request.cookies.get('accessToken')?.value || ''

  // If the path is public and the user is logged in, redirect to the dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the path is not public and the user is not logged in, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}