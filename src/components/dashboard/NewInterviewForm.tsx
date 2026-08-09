"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import { generateQuestion } from "@/app/dashboard/interview/actions/generateQuestion";

export default function NewInterviewForm() {
  const router = useRouter();

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!position.trim()) {
      setError("Please enter the position you want to practice for.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const result = await generateQuestion(
        position,
        company,
        jobDescription,
        []
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      const interviewSetup = {
        position: position.trim(),
        company: company.trim(),
        jobDescription: jobDescription.trim(),
        firstQuestion: result.question,
      };

      window.sessionStorage.setItem(
        "interviewlab-current-interview",
        JSON.stringify(interviewSetup)
      );

      router.push("/dashboard/interview/session");
    } catch {
      setError("Unable to start the interview.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="position"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <BriefcaseBusiness
            size={16}
            className="text-blue-400"
          />

          Position
        </label>

        <input
          id="position"
          value={position}
          onChange={(event) =>
            setPosition(event.target.value)
          }
          placeholder="e.g. Frontend Developer"
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <Building2
            size={16}
            className="text-violet-400"
          />

          Company
          <span className="font-normal text-slate-600">
            optional
          </span>
        </label>

        <input
          id="company"
          value={company}
          onChange={(event) =>
            setCompany(event.target.value)
          }
          placeholder="e.g. Spotify"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="job-description"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <FileText
            size={16}
            className="text-emerald-400"
          />

          Job description
          <span className="font-normal text-slate-600">
            optional
          </span>
        </label>

        <textarea
          id="job-description"
          rows={10}
          value={jobDescription}
          onChange={(event) =>
            setJobDescription(event.target.value)
          }
          placeholder="Paste the job offer here for a more personalized interview..."
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-slate-600">
            {jobDescription.length.toLocaleString()} characters
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!position.trim() || isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
      >
        {isGenerating ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            Preparing interview...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate AI Interview
          </>
        )}
      </button>
    </form>
  );
}
