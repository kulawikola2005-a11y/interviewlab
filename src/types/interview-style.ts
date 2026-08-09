export type InterviewStyle =
  | "friendly"
  | "hr"
  | "technical"
  | "startup"
  | "stress";

export const interviewStyles = [
  {
    id: "friendly" as const,
    name: "Friendly Recruiter",
    description:
      "A supportive recruiter who keeps the conversation natural and encouraging.",
  },
  {
    id: "hr" as const,
    name: "HR Interview",
    description:
      "Focuses on motivation, teamwork, communication and culture fit.",
  },
  {
    id: "technical" as const,
    name: "Technical Lead",
    description:
      "Challenges your knowledge, decisions and role-specific skills.",
  },
  {
    id: "startup" as const,
    name: "Startup Founder",
    description:
      "Focuses on ownership, adaptability, initiative and fast learning.",
  },
  {
    id: "stress" as const,
    name: "Stress Interview",
    description:
      "Uses tougher follow-ups and challenges vague or unsupported answers.",
  },
];
