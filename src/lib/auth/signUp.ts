"use server";

import { createClient } from "@/src/lib/supabase/server";

export async function signUp(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}
