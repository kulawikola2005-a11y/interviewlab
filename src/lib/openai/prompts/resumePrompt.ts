export function buildResumePrompt(
  resume: string,
  jobDescription: string
) {
  return `
You are an experienced technical recruiter.

Analyze the following resume.

Return ONLY valid JSON.

The JSON schema must be:

{
  "overallScore": number,
  "summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "improvements": string[],
  "interviewQuestions": string[]
}

Resume:

${resume}

Job description:

${jobDescription}
`;
}
