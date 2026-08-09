import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getResumeComparisons() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resume_analyses")
    .select(`
      id,
      file_name,
      overall_score,
      metrics,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log("Resume comparison query failed:");
    console.log("message:", error.message);
    console.log("code:", error.code);
    console.log("details:", error.details);
    console.log("hint:", error.hint);

    return [];
  }

  return data ?? [];
}
