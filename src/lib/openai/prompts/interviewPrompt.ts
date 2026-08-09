import type { InterviewStyle } from "@/src/types/interview-style";

const styleInstructions: Record<InterviewStyle, string> = {
  friendly:
    "Be warm, conversational and encouraging while still asking meaningful professional questions.",

  hr:
    "Behave like an HR recruiter. Focus on motivation, teamwork, communication, conflict, values and culture fit.",

  technical:
    "Behave like an experienced technical or functional lead. Focus on role-specific knowledge, decisions, trade-offs and practical experience.",

  startup:
    "Behave like a startup founder. Focus on ownership, initiative, adaptability, learning speed, resourcefulness and measurable impact.",

  stress:
    "Conduct a challenging but professional stress interview. Question vague claims, ask tougher follow-ups and require specific evidence. Never insult or demean the candidate.",
};

export function buildInterviewQuestionPrompt({
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
  return `
You are conducting a realistic professional job interview.

Interview style:
${styleInstructions[interviewStyle]}

Target position:
${position}

Company:
${company || "Not specified"}

Job description:
${jobDescription || "Not provided"}

Candidate resume context:
${resumeSummary || "Not provided"}

Questions already asked:
${previousQuestions?.join("\n") || "None"}

Generate ONE interview question.

Requirements:
- Follow the selected interview style.
- Make the question relevant to the target position.
- Do not repeat previous questions.
- Prefer questions that reveal real experience, judgment, skills or motivation.
- Keep it natural, as if spoken by a real interviewer.
- Return ONLY the question text.
`;
}
