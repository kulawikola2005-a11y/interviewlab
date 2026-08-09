"use client";

import { CheckCircle2, CircleAlert, X } from "lucide-react";

type ToastProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function Toast({
  type,
  message,
  onClose,
}: ToastProps) {
  const success = type === "success";

  return (
    <div className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm animate-[toast-in_0.25s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
          success
            ? "border-emerald-500/20 bg-slate-950/95"
            : "border-red-500/20 bg-slate-950/95"
        }`}
      >
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            success
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {success ? (
            <CheckCircle2 size={19} />
          ) : (
            <CircleAlert size={19} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            {success ? "Success" : "Something went wrong"}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-400">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-600 transition hover:bg-slate-800 hover:text-white"
          aria-label="Close notification"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
