import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { DB_SCHEMA, SUPABASE_ANON_KEY, SUPABASE_URL } from "./schema";

// Server-side Supabase client (Server Components, Server Actions, Route Handlers).
// Reads the auth session from cookies. In plain Server Components cookie writes
// are no-ops (guarded) — session refresh happens in middleware instead.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: DB_SCHEMA },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore, middleware refreshes.
        }
      },
    },
  });
}
