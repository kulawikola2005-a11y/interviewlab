"use server";

import { createClient } from "@/src/lib/supabase/server";

import type {
  FinalInterviewReport,
  InterviewTurn,
} from "@/src/types/interview";

export async function saveInterview({
  position,
  turns,
  report,
  durationSeconds,
}: {
  position: string;
  turns: InterviewTurn[];
  report: FinalInterviewReport;
  durationSeconds: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  const { data, error } = await supabase
    .from("interview_sessions")
    .insert({
      user_id: user.id,
      position,
      overall_score: report.overallScore,
      metrics: report.metrics,
      summary: report.summary,
      strongest_areas: report.strongestAreas,
      areas_to_improve: report.areasToImprove,
      hiring_recommendation: report.hiringRecommendation,
      hiring_reason: report.hiringReason,
      next_steps: report.nextSteps,
      turns,
      duration_seconds: durationSeconds,
    })
    .select("id")
    .single();

  if (error) {
    console.log("Interview save failed:", error.message);

    return {
      success: false,
      error: "Unable to save interview.",
    };
  }

  return {
    success: true,
    id: data.id,
  };
}
