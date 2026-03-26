"use client";

import { useState } from "react";

const SAMPLE_PROMPT = `List all the mentors, thought leaders, entrepreneurs, investors, and influential people I've referenced or discussed in our conversations. For each person, include a brief note on what topic or domain we discussed them in.`;

export function PromptGuide() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(SAMPLE_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="glass animate-fade-up rounded-2xl border-sky-500/5 p-4 sm:p-6">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/25 to-indigo-500/20 text-xs font-bold text-sky-200 sm:h-9 sm:w-9 sm:text-sm">
          1
        </span>
        <div>
          <h2 className="text-sm font-semibold text-white sm:text-base">
            Ask your AI — The Sage&rsquo;s prompt
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Copy it into ChatGPT or Claude, then return with the reply so we
            can map your mentors.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-slate-700/50 bg-slate-950/40 p-4 sm:p-5">
        <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
          {SAMPLE_PROMPT}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className={`mt-4 w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-all sm:w-auto sm:py-2 sm:text-sm ${
            copied
              ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
              : "btn-glow bg-sky-600 text-white"
          }`}
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>
      </div>
    </div>
  );
}
