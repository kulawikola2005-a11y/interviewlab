import "server-only";

import { openai } from "./openai";
import { buildResumePrompt } from "../prompts/resumePrompt";
import type { ResumeAnalysis } from "../types/resume-analysis";

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<ResumeAnalysis> {
  const prompt = buildResumePrompt(resume, jobDescription);

  const response = await openai.responses.create({
    model: "gpt-5.6",
    input: prompt,

    text: {
      format: {
        type: "json_schema",
        name: "resume_analysis",
        strict: true,

        schema: {
          type: "object",

          properties: {
            overallScore: {
              type: "number",
            },

            metrics: {
              type: "object",

              properties: {
                atsCompatibility: {
                  type: "number",
                },

                skillsMatch: {
                  type: "number",
                },

                experienceRelevance: {
                  type: "number",
                },

                impact: {
                  type: "number",
                },

                formatting: {
                  type: "number",
                },
              },

              required: [
                "atsCompatibility",
                "skillsMatch",
                "experienceRelevance",
                "impact",
                "formatting",
              ],

              additionalProperties: false,
            },

            summary: {
              type: "string",
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            weaknesses: {
              type: "array",
              items: {
                type: "string",
              },
            },

            improvements: {
              type: "array",
              items: {
                type: "string",
              },
            },

            interviewQuestions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "overallScore",
            "metrics",
            "summary",
            "strengths",
            "weaknesses",
            "improvements",
            "interviewQuestions",
          ],

          additionalProperties: false,
        },
      },
    },
  });

  if (!response.output_text) {
    throw new Error("OpenAI returned an empty resume analysis.");
  }

  const analysis = JSON.parse(
    response.output_text
  ) as ResumeAnalysis;

  return analysis;
}
