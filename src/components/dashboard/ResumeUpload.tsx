"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Upload your CV
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Upload a PDF resume and InterviewLab will analyze it before your mock interview.
        </p>
      </div>

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

            const droppedFile = event.dataTransfer.files?.[0];
            handleFile(droppedFile);
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center transition ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/70"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Upload size={26} />
          </div>

          <p className="mt-5 font-medium text-white">
            Drop your CV here
          </p>

          <p className="mt-2 text-sm text-slate-500">
            or click to browse files
          </p>

          <p className="mt-4 text-xs text-slate-600">
            PDF only
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FileText size={23} />
            </div>

            <div>
              <p className="font-medium text-white">{file.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={() => setFile(null)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>
      )}

      <button
        disabled={!file}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
      >
        Analyze CV
      </button>
    </div>
  );
}
