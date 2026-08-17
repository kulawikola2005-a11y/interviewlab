"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  LoaderCircle,
} from "lucide-react";

import { generateQuestion } from "@/app/dashboard/interview/actions/generateQuestion";
import {
  interviewStyles,
  type InterviewStyle,
} from "@/src/types/interview-style";

export default function NewInterviewForm() {
  const router = useRouter();

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewStyle, setInterviewStyle] =
    useState<InterviewStyle>("friendly");

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!position.trim()) {
      setError(
        "Please enter the position you want to practice for."
      );
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const result = await generateQuestion(
        position,
        company,
        jobDescription,
        [],
        interviewStyle
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      const resumeContextRaw =
        window.sessionStorage.getItem(
          "interviewlab-resume-context"
        );

      const resumeContext = resumeContextRaw
        ? JSON.parse(resumeContextRaw)
        : null;

      const interviewSetup = {
        position: position.trim(),
        company: company.trim(),
        jobDescription: jobDescription.trim(),
        firstQuestion: result.question,
        interviewStyle,
        resumeContext,
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
    <form onSubmit={handleSubmit}>
      {/* ROLE DETAILS */}
      <section>
        <div className="flex items-center gap-3">
          <BriefcaseBusiness
            size={20}
            className="text-[#126d63]"
          />

          <h2 className="text-xl font-semibold text-[#202522]">
            1. Role details
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="position"
              className="mb-2 block text-sm font-medium text-[#303733]"
            >
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
              className="w-full rounded-xl border border-[#c9d1cd] bg-white px-4 py-3.5 text-[#202522] outline-none transition placeholder:text-[#9aa19c] focus:border-[#347e74] focus:ring-2 focus:ring-[#347e74]/10"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-[#303733]"
            >
              Company{" "}
              <span className="font-normal text-[#8b938e]">
                (optional)
              </span>
            </label>

            <input
              id="company"
              value={company}
              onChange={(event) =>
                setCompany(event.target.value)
              }
              placeholder="e.g. Spotify"
              className="w-full rounded-xl border border-[#c9d1cd] bg-white px-4 py-3.5 text-[#202522] outline-none transition placeholder:text-[#9aa19c] focus:border-[#347e74] focus:ring-2 focus:ring-[#347e74]/10"
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="job-description"
            className="mb-2 block text-sm font-medium text-[#303733]"
          >
            Job description{" "}
            <span className="font-normal text-[#8b938e]">
              (optional)
            </span>
          </label>

          <textarea
            id="job-description"
            rows={6}
            maxLength={5000}
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
            placeholder="Paste the job offer here for a more personalized interview..."
            className="w-full resize-none rounded-xl border border-[#c9d1cd] bg-white px-4 py-4 text-[#202522] outline-none transition placeholder:text-[#9aa19c] focus:border-[#347e74] focus:ring-2 focus:ring-[#347e74]/10"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-[#929a95]">
              {jobDescription.length.toLocaleString()} / 5000
            </span>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="my-8 border-t border-[#dde2df]" />

      {/* INTERVIEW PREFERENCES */}
      <section>
        <div className="flex items-center gap-3">
          <FileText
            size={20}
            className="text-[#126d63]"
          />

          <h2 className="text-xl font-semibold text-[#202522]">
            2. Interview preferences
          </h2>
        </div>

        <p className="mt-5 text-sm font-medium text-[#303733]">
          Interview style
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {interviewStyles.map((style) => {
            const selected =
              interviewStyle === style.id;

            return (
              <button
                key={style.id}
                type="button"
                onClick={() =>
                  setInterviewStyle(style.id)
                }
                className={`relative min-h-[112px] rounded-2xl border p-5 text-left transition-all duration-200 ${
                  selected
                    ? "border-[#176d63] bg-[#edf5f2] shadow-[0_0_0_1px_rgba(23,109,99,0.06)]"
                    : "border-[#d8ddda] bg-white hover:-translate-y-0.5 hover:border-[#aabbb5] hover:shadow-sm"
                }`}
              >
                {selected && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#176d63] text-xs font-bold text-white">
                    ✓
                  </div>
                )}

                <p
                  className={`pr-7 text-sm font-semibold ${
                    selected
                      ? "text-[#135d55]"
                      : "text-[#252b28]"
                  }`}
                >
                  {style.name}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#747d78]">
                  {style.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {error && (
        <div className="mt-6 rounded-xl border border-[#e2b9b2] bg-[#faeeeb] p-4 text-sm text-[#944f41]">
          {error}
        </div>
      )}

      {/* BUTTON */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={
            !position.trim() || isGenerating
          }
          className="flex min-w-[260px] items-center justify-center gap-3 rounded-xl bg-[#07564f] px-8 py-4 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#064b45] hover:shadow-md disabled:cursor-not-allowed disabled:bg-[#ccd4d0] disabled:text-[#929a95] disabled:shadow-none"
        >
          {isGenerating ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Preparing session...
            </>
          ) : (
            <>
              Start Interview
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
