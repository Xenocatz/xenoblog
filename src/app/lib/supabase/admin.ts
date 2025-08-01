"use server";
import { createClient } from "@supabase/supabase-js";

export async function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
  );
}
