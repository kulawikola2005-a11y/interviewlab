import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getResumeHistory() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("AUTH ERROR:", {
      message: userError.message,
      status: userError.status,
      name: userError.name,
    });

    return [];
  }

  if (!user) {
    console.error("AUTH ERROR: no authenticated user");
    return [];
  }

  const { data, error } = await supabase
    .from("resume_analyses")
    .select("id, file_name, overall_score, created_at")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("RESUME HISTORY ERROR:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return [];
  }

  return data ?? [];
}
