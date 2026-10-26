import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: "absolute_motion" },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh the session and find out who (if anyone) is signed in.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Auth is shared across the whole Supabase project, so being signed in is
  // not enough — the account must be registered as an absolute_motion admin.
  let isAdmin = false;
  if (user) {
    const { data } = await supabase.rpc("is_admin");
    isAdmin = data === true;
  }

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  // Public auth pages (reachable without an admin session): login + password reset.
  const isPublicAuthPage = isLogin || pathname === "/admin/reset";

  if (pathname.startsWith("/admin") && !isPublicAuthPage && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
