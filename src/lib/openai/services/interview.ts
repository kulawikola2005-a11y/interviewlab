import "server-only";

import { openai } from "./openai";
import { buildInterviewQuestionPrompt } from "../prompts/interviewPrompt";

export async function generateInterviewQuestion({
  position,
  company,
  jobDescription,
  resumeSummary,
  previousQuestions,
}: {
  position: string;
  company?: string;
  jobDescription?: string;
  resumeSummary?: string;
  previousQuestions?: string[];
}) {
  const prompt = buildInterviewQuestionPrompt({
    position,
    company,
    jobDescription,
    resumeSummary,
    previousQuestions,
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
