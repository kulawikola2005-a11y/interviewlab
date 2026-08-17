"use client";

import { useRef, useState } from "react";
import {
  FileText,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";

import { processResume } from "@/app/dashboard/cv/actions/analyzeResume";
import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";
import ResumeAnalysisReport from "@/src/components/dashboard/ResumeAnalysisReport";
import AnalysisProgress from "@/src/components/dashboard/AnalysisProgress";
import Toast from "@/src/components/ui/Toast";

export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    setError("");
    setAnalysis(null);

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("PDF file cannot be larger than 5 MB.");
      return;
    }

    setFile(selectedFile);
  }

  async function handleAnalyze() {
    if (!file) return;

    setIsLoading(true);
    setError("");
    setAnalysis(null);
    setToast(null);
    setAnalysisStep(0);

    const timers = [
      window.setTimeout(() => setAnalysisStep(1), 1200),
      window.setTimeout(() => setAnalysisStep(2), 3200),
    ];

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const result = await processResume(formData);

      timers.forEach(window.clearTimeout);

      if (!result.success) {
        setError(result.error);

        setToast({
          type: "error",
          message: result.error,
        });

        return;
      }

      setAnalysisStep(2);
      setAnalysis(result.analysis);

      setToast({
        type: "success",
        message: "Your CV analysis is ready.",
      });

      window.setTimeout(() => {
        document
          .getElementById("resume-analysis-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch {
      timers.forEach(window.clearTimeout);

      const message = "Unable to analyze this CV.";

      setError(message);

      setToast({
        type: "error",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function removeFile() {
    setFile(null);
    setAnalysis(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#C7D6CF] bg-[#DCE7E1] p-6">
        <h2 className="text-xl font-semibold text-[#202522]">
          Upload your CV
        </h2>

        <p className="mt-2 text-sm text-[#69716C]">
          Upload a PDF and optionally paste a job description for a more targeted analysis.
        </p>

        {!file ? (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFile(event.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center transition ${
              isDragging
                ? "border-[#2f7a6f] bg-[#e8f1ed]"
                : "border-[#aebeb7] bg-[#f3f5f2] hover:border-[#6f8f86] hover:bg-[#eef2ef]"
            }`}
          >
            <Upload size={28} className="text-[#176B61]" />

            <p className="mt-4 font-medium text-[#202522]">
              Drop your CV here
            </p>

            <p className="mt-2 text-sm text-[#7E8781]">
              or click to browse
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(event) =>
                handleFile(event.target.files?.[0])
              }
            />
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-[#C7D6CF] bg-[#F5F7F4] p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-[#176B61]" />

              <div>
                <p className="font-medium text-[#202522]">
                  {file.name}
                </p>

                <p className="text-xs text-[#7E8781]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="rounded-lg p-2 text-[#7E8781] hover:bg-slate-800 hover:text-[#202522]"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[#4F5752]">
            Job description
          </label>

          <textarea
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
            rows={7}
            placeholder="Paste the job description here..."
            className="w-full resize-none rounded-xl border border-[#B9CCC3] bg-[#F5F7F4] p-4 text-sm text-[#202522] outline-none transition placeholder:text-[#9AA39D] focus:border-[#176B61]"
          />
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#125C52] px-5 py-3 font-semibold text-[#202522] transition hover:bg-[#0E4D45] disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-[#7E8781]"
        >
          {isLoading && (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          )}

          {isLoading ? "Analyzing CV..." : "Analyze CV"}
        </button>
      </div>

      {isLoading && (
        <AnalysisProgress step={analysisStep} />
      )}

      {analysis && (
        <div id="resume-analysis-results">
          <ResumeAnalysisReport analysis={analysis} />
        </div>
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
