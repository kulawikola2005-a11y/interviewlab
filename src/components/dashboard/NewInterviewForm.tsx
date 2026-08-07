"use client";

import { useState } from "react";

export default function NewInterviewForm() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  return (
    <form className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Position
        </label>

        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Frontend Developer"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Company (optional)
        </label>

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="OpenAI"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Job description
        </label>

        <textarea
          rows={12}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job offer here..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Generate AI Interview
      </button>
    </form>
  );
}
