"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { InputPanel } from "@/components/InputPanel";
import { PromptGuide } from "@/components/PromptGuide";
import { MentorTree } from "@/components/MentorTree";
import { InsightsPanel } from "@/components/InsightsPanel";
import { SageFigure } from "@/components/SageFigure";
import {
  DEFAULT_ANALYZE_MODEL,
  isAnalyzeModelId,
  type AnalyzeModelId,
  type AnalyzeResponse,
} from "@/lib/schemas/analyze";
import { AnalyzeModelSelect } from "@/components/AnalyzeModelSelect";
import {
  saveAnalyzeResult,
  loadAnalyzeResult,
  clearAnalyzeResult,
} from "@/lib/mentor-graph-storage";

const MODEL_PREF_STORAGE_KEY = "mentor-graph-preferred-model";

function readStoredPreferredModel(): AnalyzeModelId {
  if (typeof window === "undefined") return DEFAULT_ANALYZE_MODEL;
  try {
    const raw = localStorage.getItem(MODEL_PREF_STORAGE_KEY);
    if (raw && isAnalyzeModelId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_ANALYZE_MODEL;
}

type AnalyzeRunMeta = {
  totalMs: number;
  llmMs: number;
  model: string;
  provider: string;
};

function readAnalyzeRunMeta(res: Response): AnalyzeRunMeta | null {
  const totalMs = Number.parseInt(
    res.headers.get("X-Analyze-Duration-Ms") ?? "",
    10,
  );
  const llmMs = Number.parseInt(res.headers.get("X-Analyze-Llm-Ms") ?? "", 10);
  if (Number.isNaN(totalMs)) return null;
  return {
    totalMs,
    llmMs: Number.isNaN(llmMs) ? totalMs : llmMs,
    model: res.headers.get("X-Analyze-Model") || "unknown",
    provider: res.headers.get("X-Analyze-Provider") || "openai",
  };
}

export default function AnalyzePage() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [runMeta, setRunMeta] = useState<AnalyzeRunMeta | null>(null);
  const [selectedModel, setSelectedModel] = useState<AnalyzeModelId>(
    readStoredPreferredModel,
  );

  useEffect(() => {
    const loaded = loadAnalyzeResult();
    if (loaded.ok) {
      setResult(loaded.data);
      setRunMeta(null);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(MODEL_PREF_STORAGE_KEY, selectedModel);
    } catch {
      /* ignore */
    }
  }, [selectedModel]);

  async function handleAnalyze(text: string) {
    setLoading(true);
    setError(null);
    try {
      const clientStart = performance.now();
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model: selectedModel }),
      });
      const clientRoundTripMs = Math.round(performance.now() - clientStart);
      let meta = readAnalyzeRunMeta(res);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }
      const data = await res.json();
      if (!meta) {
        meta = {
          totalMs: clientRoundTripMs,
          llmMs: clientRoundTripMs,
          model: selectedModel,
          provider: "API (client clock — server timing headers missing)",
        };
      }
      setResult(data);
      setRunMeta(meta);
      saveAnalyzeResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setResult(null);
    setError(null);
    setRunMeta(null);
    clearAnalyzeResult();
  }

  return (
    <div className="sage-canvas relative min-h-dvh">
      <div className="orb animate-pulse-glow top-[4%] left-[12%] h-[360px] w-[360px] bg-sky-500/10 sm:h-[460px] sm:w-[460px]" />
      <div className="orb animate-pulse-glow delay-300 top-[38%] right-[4%] h-[300px] w-[300px] bg-indigo-500/10 sm:h-[380px] sm:w-[380px]" />

      <main className="relative z-10 mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12 md:py-16">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <Link
            href="/"
            className="animate-fade-in mb-6 inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-950/50 px-4 py-1.5 text-xs text-slate-400 transition-all hover:border-sky-500/25 hover:text-slate-200 sm:text-sm"
          >
            &larr; Back to The Sage
          </Link>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8 md:gap-10">
            <div
              className={`shrink-0 ${loading ? "animate-pulse opacity-90" : ""}`}
            >
              <SageFigure size="md" />
            </div>
            <div className="animate-fade-up text-center sm:text-left">
              <p className="text-xs font-semibold tracking-widest text-sky-400/70 sm:text-sm">
                THE SAGE · MENTOR GRAPH
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
                Trace the minds that{" "}
                <span className="text-gradient">shape your thinking</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400 sm:mt-3 sm:text-base md:text-lg">
                Paste an AI reply or notes. The Sage extracts mentors, sorts
                them by domain, and offers counsel — the same mentor graph flow
                as always, framed as a path to better sources.
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-4 sm:space-y-5">
          <AnalyzeModelSelect
            value={selectedModel}
            onChange={setSelectedModel}
            disabled={loading}
          />
          <PromptGuide />
          <InputPanel onSubmit={handleAnalyze} loading={loading} />
        </div>

        {loading && (
          <div
            className="glass animate-fade-up mt-5 flex flex-col items-center gap-3 rounded-2xl border-sky-500/15 p-6 text-center sm:mt-6 sm:flex-row sm:text-left"
            role="status"
            aria-live="polite"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400/30 border-t-sky-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 sm:text-base">
                Sifting through the noise&hellip;
              </p>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Distilling names, domains, and patterns from your text.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="glass animate-fade-up mt-5 flex items-start gap-3 rounded-xl border-red-500/25 bg-red-950/20 p-4 sm:mt-6 sm:p-5">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-xs font-bold text-red-300 sm:h-8 sm:w-8">
              !
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-300/90 sm:text-sm">
                The Sage is concerned
              </p>
              <p className="mt-1 text-sm leading-relaxed text-red-200/90 sm:text-base">
                {error}
              </p>
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="divider-gradient mx-auto my-8 max-w-xs sm:my-12" />
            <div className="mb-6 flex flex-col gap-4 sm:mb-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    Your mentor graph
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Presented by The Sage — structure unchanged; clarity added.
                  </p>
                  {runMeta && (
                    <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                      Last run used{" "}
                      <span className="font-medium text-slate-400">
                        {runMeta.provider}/{runMeta.model}
                      </span>{" "}
                      · API round-trip{" "}
                      <span className="font-mono text-slate-400">
                        {runMeta.totalMs}ms
                      </span>
                      {runMeta.llmMs !== runMeta.totalMs && (
                        <>
                          {" "}
                          (LLM call{" "}
                          <span className="font-mono text-slate-400">
                            {runMeta.llmMs}ms
                          </span>
                          )
                        </>
                      )}
                      . Fast runs are common for short text on smaller models; larger
                      models may take longer.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/report"
                    className="rounded-lg border border-sky-500/35 bg-sky-950/30 px-4 py-2 text-xs font-medium text-sky-200 transition-all hover:border-sky-400/50 hover:bg-sky-950/50 sm:text-sm"
                  >
                    View report page
                  </Link>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-lg border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:border-slate-600 hover:text-slate-200 sm:text-sm"
                  >
                    Clear results
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 sm:text-sm">
                The report page includes{" "}
                <strong className="font-medium text-slate-500">Download PDF</strong>{" "}
                and{" "}
                <strong className="font-medium text-slate-500">
                  Print / Save as PDF
                </strong>
                .
              </p>
            </div>
            <div className="space-y-8 sm:space-y-10">
              <MentorTree mentors={result.mentors} domains={result.domains} />
              <InsightsPanel
                insights={result.insights}
                optimisations={result.optimisations}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
