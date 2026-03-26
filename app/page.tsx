"use client";

import { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { MentorTree } from "@/components/MentorTree";
import { InsightsPanel } from "@/components/InsightsPanel";
import type { AnalyzeResponse } from "@/lib/schemas/analyze";

export default function Home() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(text: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Mentor Graph</h1>
        <p className="mt-2 text-lg text-gray-400">
          Identify the best mentors that shape your thinking from your AI
          conversations.
        </p>
      </header>

      <InputPanel onSubmit={handleAnalyze} loading={loading} />

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-8">
          <MentorTree mentors={result.mentors} domains={result.domains} />
          <InsightsPanel
            insights={result.insights}
            optimisations={result.optimisations}
          />
        </div>
      )}
    </main>
  );
}
