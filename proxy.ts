import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/login", "/signup", "/forgot-password"];
const protectedRoutePrefixes = ["/workflows", "/settings", "/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  // Early return for public pages to save compute
  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // ==============================================================================
  // 🚀 NEXT.JS 16 FAST EDGE CHECK (OPTIMISTIC AUTH)
  // ==============================================================================
  // We use `getSessionCookie` to simply verify the *existence* of a cookie string.
  //
  // THE ARCHITECTURAL DECISION:
  // - The Alternative: We could use `auth.api.getSession()` here to query the DB
  //   and strictly validate the session at the edge.
  // - The Problem: Opening a database connection on every single route change
  //   adds massive latency (50-200ms) and bottlenecks the DB.
  // - Our Solution: We optimistically accept the cookie here for instantaneous
  //   routing (0ms DB time). It is perfectly safe because our Layer 2 defense
  //   (`requireAuth`) strictly enforces the actual DB check inside every protected
  //   Server Component before rendering any sensitive data.
  const sessionCookie = getSessionCookie(request);

  // Scenario A: No cookie found, but trying to access protected route
  if (!sessionCookie && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  // Scenario B: Cookie exists, trying to go to login page
  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/workflows", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
