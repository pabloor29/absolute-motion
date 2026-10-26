import { createBrowserClient } from "@supabase/ssr";
import { DB_SCHEMA, SUPABASE_ANON_KEY, SUPABASE_URL } from "./schema";

// Browser Supabase client (Client Components).
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: DB_SCHEMA },
  });
}
