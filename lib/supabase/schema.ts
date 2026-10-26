// Postgres schema dedicated to the Absolute Motion site inside the shared project.
export const DB_SCHEMA = "absolute_motion" as const;

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
