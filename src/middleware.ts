import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
 
// Simple in-memory rate limit for middleware
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 100; // 100 requests per minute
const WINDOW = 60 * 1000;

export default withAuth(
  function middleware(req) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "127.0.0.1";
    const now = Date.now();
    
    // Rate Limiting for API routes
    if (req.nextUrl.pathname.startsWith("/api")) {
      const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
      
      if (now - userData.lastReset > WINDOW) {
        userData.count = 1;
        userData.lastReset = now;
      } else {
        userData.count++;
      }
      
      rateLimitMap.set(ip, userData);

      if (userData.count > LIMIT) {
        return new NextResponse("Too Many Requests", { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((userData.lastReset + WINDOW - now) / 1000).toString()
          }
        });
      }
    }

    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't need auth
        const publicPaths = ["/", "/login", "/signup", "/api/products", "/api/categories"];
        if (publicPaths.some(path => req.nextUrl.pathname === path)) return true;
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/api/:path*"],
};
