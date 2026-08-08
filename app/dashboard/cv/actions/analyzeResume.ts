"use server";

import { extractTextFromPdf } from "@/src/lib/pdf/extractText";
import { analyzeResume } from "@/src/lib/openai/services/resume";
import { createClient } from "@/src/lib/supabase/server";
import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";

export type ResumeUploadResult =
  | {
      success: true;
      analysis: ResumeAnalysis;
      analysisId: string;
    }
  | {
      success: false;
      error: string;
    };

export async function processResume(
  formData: FormData
): Promise<ResumeUploadResult> {
  const file = formData.get("resume");
  const jobDescription = formData.get("jobDescription");

  if (!(file instanceof File)) {
    return {
      success: false,
      error: "Please select a PDF file.",
    };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "You must be signed in to analyze a CV.",
      };
    }

    const resumeText = await extractTextFromPdf(file);

    const description =
      typeof jobDescription === "string"
        ? jobDescription
        : "";

    const analysis = await analyzeResume(
      resumeText,
      description
    );

    const { data: savedAnalysis, error: databaseError } =
      await supabase
        .from("resume_analyses")
        .insert({
          user_id: user.id,
          file_name: file.name,
          job_description: description || null,
          overall_score: analysis.overallScore,
          summary: analysis.summary,
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          improvements: analysis.improvements,
          interview_questions:
            analysis.interviewQuestions,
        })
        .select("id")
        .single();

    if (databaseError) {
      console.error(
        "Database error:",
        databaseError
      );

      return {
        success: false,
        error:
          "Your CV was analyzed, but the result could not be saved.",
      };
    }

    return {
      success: true,
      analysis,
      analysisId: savedAnalysis.id,
    };
  } catch (error) {
    console.error(
      "Resume analysis error:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to analyze this CV.",
    };
  }
}
