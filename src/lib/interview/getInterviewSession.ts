import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getInterviewSession(
  id: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("interview_sessions")
    .select(`
      id,
      position,
      company,
      job_description,
      interview_style,
      overall_score,
      metrics,
      summary,
      strongest_areas,
      areas_to_improve,
      hiring_recommendation,
      hiring_reason,
      next_steps,
      turns,
      duration_seconds,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.log("Interview session query failed:");
    console.log("message:", error.message);
    console.log("code:", error.code);

    return null;
  }

  return data;
}
