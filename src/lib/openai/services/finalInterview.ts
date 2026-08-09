import "server-only";

import { openai } from "./openai";
import { buildFinalInterviewPrompt } from "../prompts/finalInterviewPrompt";

import type {
  FinalInterviewReport,
  InterviewTurn,
} from "@/src/types/interview";

export async function generateFinalInterviewReport({
  position,
  turns,
}: {
  position: string;
  turns: InterviewTurn[];
}): Promise<FinalInterviewReport> {
  const response = await openai.responses.create({
    model: "gpt-5.6",

    input: buildFinalInterviewPrompt({
      position,
      turns,
    }),

    text: {
      format: {
        type: "json_schema",
        name: "final_interview_report",
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
                communication: { type: "number" },
                specificity: { type: "number" },
                structure: { type: "number" },
                relevance: { type: "number" },
                confidence: { type: "number" },
              },

              required: [
                "communication",
                "specificity",
                "structure",
                "relevance",
                "confidence",
              ],

              additionalProperties: false,
            },

            summary: {
              type: "string",
            },

            strongestAreas: {
              type: "array",
              items: {
                type: "string",
              },
            },

            areasToImprove: {
              type: "array",
              items: {
                type: "string",
              },
            },

            hiringRecommendation: {
              type: "string",
              enum: [
                "strong_yes",
                "yes",
                "maybe",
                "no",
              ],
            },

            hiringReason: {
              type: "string",
            },

            nextSteps: {
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
            "strongestAreas",
            "areasToImprove",
            "hiringRecommendation",
            "hiringReason",
            "nextSteps",
          ],

          additionalProperties: false,
        },
      },
    },
  });

  if (!response.output_text) {
    throw new Error(
      "AI returned an empty final interview report."
    );
  }

  return JSON.parse(
    response.output_text
  ) as FinalInterviewReport;
}
