import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    const triboMatch = pathname.match(/^\/tribo\/([^/]+)/);
    if (triboMatch) {
      const triboName = triboMatch[1];

      if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const isAdmin = token.cargo === "ADMIN";
      const isOwnTribo = token.triboSlug === triboName;

      if (!isAdmin && !isOwnTribo) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/tribo/:path*"],
};
