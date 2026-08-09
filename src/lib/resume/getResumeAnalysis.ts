import "server-only";

import { createClient } from "@/src/lib/supabase/server";

export async function getResumeAnalysis(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resume_analyses")
    .select(`
      id,
      file_name,
      job_description,
      overall_score,
      metrics,
      summary,
      strengths,
      weaknesses,
      improvements,
      interview_questions,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("RESUME ANALYSIS ERROR:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return null;
  }

  return data;
}
