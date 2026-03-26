"use client";

import {
  ANALYZE_MODEL_OPTIONS,
  type AnalyzeModelId,
} from "@/lib/schemas/analyze";

export function AnalyzeModelSelect({
  value,
  onChange,
  disabled,
}: {
  value: AnalyzeModelId;
  onChange: (id: AnalyzeModelId) => void;
  disabled?: boolean;
}) {
  return (
    <div className="glass animate-fade-up rounded-2xl border-sky-500/5 p-4 sm:p-5">
      <label
        htmlFor="analyze-model"
        className="text-sm font-semibold text-white"
      >
        OpenAI model
      </label>
      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
        Used only for mentor extraction and domain classification. Your API key
        must have access to the model you pick.
      </p>
      <select
        id="analyze-model"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as AnalyzeModelId)}
        className="mt-3 w-full cursor-pointer rounded-xl border border-slate-700/70 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 shadow-inner focus:border-sky-500/45 focus:outline-none focus:ring-1 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 sm:text-base"
      >
        {ANALYZE_MODEL_OPTIONS.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
