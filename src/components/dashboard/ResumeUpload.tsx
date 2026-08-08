"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  FileText,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";

import { processResume } from "@/app/dashboard/cv/actions/analyzeResume";
import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";
import ResumeAnalysisReport from "@/src/components/dashboard/ResumeAnalysisReport";

export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState("");

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

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const result = await processResume(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setAnalysis(result.analysis);
    } catch {
      setError("Unable to analyze this CV.");
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">
          Upload your CV
        </h2>

        <p className="mt-2 text-sm text-slate-400">
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
                ? "border-blue-500 bg-blue-500/10"
                : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
            }`}
          >
            <Upload size={28} className="text-blue-400" />

            <p className="mt-4 font-medium text-white">
              Drop your CV here
            </p>

            <p className="mt-2 text-sm text-slate-500">
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
          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-400" />

              <div>
                <p className="font-medium text-white">
                  {file.name}
                </p>

                <p className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Job description
          </label>

          <textarea
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
            rows={7}
            placeholder="Paste the job description here..."
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none transition focus:border-blue-500"
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
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
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

      {analysis && (
        <ResumeAnalysisReport analysis={analysis} />
      )}
    </div>
  );
}

function AnalysisList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex gap-3 text-sm leading-6 text-slate-300"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-blue-400"
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
