"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";

import InterviewRoom from "@/src/components/interview/InterviewRoom";
import type { InterviewStyle } from "@/src/types/interview-style";

type InterviewSetup = {
  position: string;
  company: string;
  jobDescription: string;
  firstQuestion: string;
  interviewStyle?: InterviewStyle;

  resumeContext?: {
    overallScore: number;
    summary: string;

    metrics?: {
      atsCompatibility: number;
      skillsMatch: number;
      experienceRelevance: number;
      impact: number;
      formatting: number;
    };

    strengths: string[];
    weaknesses: string[];
    improvements: string[];
    interviewQuestions: string[];
  } | null;
};

const STORAGE_KEY = "interviewlab-current-interview";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return window.sessionStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export default function InterviewSessionLoader() {
  const storedInterview = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setup = useMemo<InterviewSetup | null>(() => {
    if (!storedInterview) {
      return null;
    }

    try {
      const parsed = JSON.parse(
        storedInterview
      ) as InterviewSetup;

      if (
        !parsed.position ||
        !parsed.firstQuestion
      ) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }, [storedInterview]);

  if (storedInterview === null) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center">
        <h1 className="text-2xl font-bold text-white">
          No interview in progress
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Start a new interview and InterviewLab will generate a personalized
          first question for you.
        </p>

        <Link
          href="/dashboard/interview/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <ArrowLeft size={17} />
          Create interview
        </Link>
      </div>
    );
  }

  if (!setup) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={28}
            className="mx-auto animate-spin text-blue-400"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading your interview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <InterviewRoom
      position={setup.position}
      company={setup.company}
      jobDescription={setup.jobDescription}
      resumeContext={setup.resumeContext}
      interviewStyle={setup.interviewStyle ?? "friendly"}
      firstQuestion={setup.firstQuestion}
    />
  );
}
