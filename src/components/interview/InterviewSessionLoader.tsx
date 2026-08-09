"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";

import InterviewRoom from "@/src/components/interview/InterviewRoom";

type InterviewSetup = {
  position: string;
  company: string;
  jobDescription: string;
  firstQuestion: string;
};

export default function InterviewSessionLoader() {
  const [setup, setSetup] =
    useState<InterviewSetup | null>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(
      "interviewlab-current-interview"
    );

    if (stored) {
      try {
        const parsed = JSON.parse(
          stored
        ) as InterviewSetup;

        if (
          parsed.position &&
          parsed.firstQuestion
        ) {
          setSetup(parsed);
        }
      } catch {
        window.sessionStorage.removeItem(
          "interviewlab-current-interview"
        );
      }
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
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

  if (!setup) {
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

  return (
    <InterviewRoom
      position={setup.position}
      company={setup.company}
      jobDescription={setup.jobDescription}
      firstQuestion={setup.firstQuestion}
    />
  );
}
