"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ReportDocument } from "@/components/ReportDocument";
import {
  loadAnalyzeResult,
  type LoadedReport,
} from "@/lib/mentor-graph-storage";
import { downloadMentorGraphPdf } from "@/lib/download-mentor-report-pdf";
import type { AnalyzeResponse } from "@/lib/schemas/analyze";

type ReportState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "ready"; data: AnalyzeResponse; savedAt: Date | null };

export default function ReportPage() {
  const [state, setState] = useState<ReportState>({ status: "loading" });

  useEffect(() => {
    const r: LoadedReport = loadAnalyzeResult();
    if (r.ok) {
      setState({ status: "ready", data: r.data, savedAt: r.savedAt });
    } else {
      setState({ status: "empty" });
    }
  }, []);

  function handlePrint() {
    window.print();
  }

  function handleDownloadPdf() {
    if (state.status !== "ready") return;
    downloadMentorGraphPdf(state.data, state.savedAt);
  }

  if (state.status === "loading") {
    return (
      <div className="sage-canvas relative min-h-dvh">
        <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center text-slate-500">
          Loading report&hellip;
        </main>
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="sage-canvas relative min-h-dvh">
        <main className="relative z-10 mx-auto max-w-lg px-5 py-16 text-center">
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            No saved report yet
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Run an analysis first — your latest results are stored in this
            browser and shown here as a report.
          </p>
          <Link
            href="/analyze"
            className="btn-glow mt-8 inline-flex rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Go to analyse
          </Link>
          <div className="mt-6">
            <Link
              href="/"
              className="text-sm text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
            >
              Back home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="sage-canvas relative min-h-dvh">
      <main className="relative z-10 mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="no-print mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-slate-700/60 bg-slate-950/50 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-sky-500/25 hover:text-slate-200 sm:text-sm"
            >
              Home
            </Link>
            <Link
              href="/analyze"
              className="rounded-lg border border-slate-700/60 bg-slate-950/50 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-sky-500/25 hover:text-slate-200 sm:text-sm"
            >
              Analyse
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 sm:text-sm"
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="btn-glow rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white sm:text-sm"
            >
              Download PDF
            </button>
          </div>
        </nav>

        <p className="no-print mb-6 text-xs text-slate-500 sm:text-sm">
          <strong className="font-medium text-slate-400">Print / Save as PDF</strong>{" "}
          uses your browser&apos;s print dialog — choose &quot;Save as PDF&quot;
          as the destination if you want a PDF without using the download
          button.
        </p>

        <ReportDocument data={state.data} savedAt={state.savedAt} />
      </main>
    </div>
  );
}
