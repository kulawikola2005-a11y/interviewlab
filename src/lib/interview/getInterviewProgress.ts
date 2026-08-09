import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getInterviewProgress() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("interview_sessions")
    .select(`
      id,
      position,
      overall_score,
      metrics,
      created_at
    `)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.log("Interview progress query failed:");
    console.log("message:", error.message);
    console.log("code:", error.code);

    return [];
  }

  return data ?? [];
}
