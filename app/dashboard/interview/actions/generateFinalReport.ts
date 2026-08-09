"use server";

import { generateFinalInterviewReport } from "@/src/lib/openai/services/finalInterview";

import type {
  FinalInterviewReport,
  InterviewTurn,
} from "@/src/types/interview";

export type FinalReportResult =
  | {
      success: true;
      report: FinalInterviewReport;
    }
  | {
      success: false;
      error: string;
    };

export async function generateFinalReport({
  position,
  turns,
}: {
  position: string;
  turns: InterviewTurn[];
}): Promise<FinalReportResult> {
  if (turns.length === 0) {
    return {
      success: false,
      error: "Interview has no completed answers.",
    };
  }

  try {
    const report = await generateFinalInterviewReport({
      position,
      turns,
    });

    return {
      success: true,
      report,
    };
  } catch (error) {
    console.log(
      "Final interview report failed:",
      error instanceof Error
        ? error.message
        : error
    );

    return {
      success: false,
      error:
        "Unable to generate the final interview report.",
    };
  }
}
