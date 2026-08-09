import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getInterviewHistory() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("interview_sessions")
    .select(`
      id,
      position,
      overall_score,
      hiring_recommendation,
      duration_seconds,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log("Interview history query failed:");
    console.log("message:", error.message);
    console.log("code:", error.code);

    return [];
  }

  return data ?? [];
}
