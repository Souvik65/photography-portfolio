import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Client for server-side reads (uses anon key with public access).
 * Use for data fetching in Server Components.
 */
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Client for admin writes (uses service role key - full access).
 * Use only in API route handlers that are protected by auth.
 */
export function createAdminSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}
