"use server";

import { generateInterviewQuestion } from "@/src/lib/openai/services/interview";

export type GenerateQuestionResult =
  | {
      success: true;
      question: string;
    }
  | {
      success: false;
      error: string;
    };

export async function generateQuestion(
  position: string,
  company: string,
  jobDescription: string,
  previousQuestions: string[]
): Promise<GenerateQuestionResult> {
  if (!position.trim()) {
    return {
      success: false,
      error: "Position is required.",
    };
  }

  try {
    const question = await generateInterviewQuestion({
      position,
      company,
      jobDescription,
      previousQuestions,
    });

    return {
      success: true,
      question,
    };
  } catch (error) {
    console.log(
      "Interview question generation failed:",
      error instanceof Error ? error.message : error
    );

    return {
      success: false,
      error: "Unable to generate interview question.",
    };
  }
}
