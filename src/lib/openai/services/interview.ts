import "server-only";

import { openai } from "./openai";
import { buildInterviewQuestionPrompt } from "../prompts/interviewPrompt";
import type { InterviewStyle } from "@/src/types/interview-style";

export async function generateInterviewQuestion({
  position,
  company,
  jobDescription,
  resumeSummary,
  previousQuestions,
  interviewStyle,
}: {
  position: string;
  company?: string;
  jobDescription?: string;
  resumeSummary?: string;
  previousQuestions?: string[];
  interviewStyle: InterviewStyle;
}) {
  const prompt = buildInterviewQuestionPrompt({
    position,
    company,
    jobDescription,
    resumeSummary,
    previousQuestions,
    interviewStyle,
  });

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: prompt,
  });

  const question = response.output_text?.trim();

  if (!question) {
    throw new Error("AI did not generate an interview question.");
  }

  return question;
}
