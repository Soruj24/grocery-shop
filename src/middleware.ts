import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 100;
const WINDOW = 60 * 1000;

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/api/products") ||
        pathname.startsWith("/api/categories") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/(_shop)")
      ) {
        return true;
      }

      if (pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
  ],
};
