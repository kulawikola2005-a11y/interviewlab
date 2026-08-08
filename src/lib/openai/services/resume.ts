import { openai } from "./openai";
import { buildResumePrompt } from "../prompts/resumePrompt";
import type { ResumeAnalysis } from "../types/resume-analysis";

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<ResumeAnalysis> {
  const prompt = buildResumePrompt(resume, jobDescription);

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: prompt,
  });

  const text = response.output_text;

  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }

  return JSON.parse(text) as ResumeAnalysis;
}
