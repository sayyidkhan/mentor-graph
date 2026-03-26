"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadSavedResponses,
  persistSavedResponses,
  newResponseDraftId,
  MAX_SAVED_RESPONSES,
  type SavedResponseDraft,
} from "@/lib/input-drafts-storage";

interface InputPanelProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [text, setText] = useState("");
  const [drafts, setDrafts] = useState<SavedResponseDraft[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [saveHint, setSaveHint] = useState<{
    message: string;
    variant: "success" | "warn";
  } | null>(null);

  useEffect(() => {
    setDrafts(loadSavedResponses());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistSavedResponses(drafts);
  }, [drafts, hydrated]);

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value);
      if (selectedDraftId) {
        const d = drafts.find((x) => x.id === selectedDraftId);
        if (d && value !== d.text) {
          setSelectedDraftId(null);
        }
      }
    },
    [drafts, selectedDraftId],
  );

  function handleSaveResponse() {
    const trimmed = text.trim();
    setSaveHint(null);
    if (!trimmed) return;
    if (drafts.length >= MAX_SAVED_RESPONSES) {
      setSaveHint({
        message: `You can save up to ${MAX_SAVED_RESPONSES} responses. Delete one to add another.`,
        variant: "warn",
      });
      return;
    }
    const item: SavedResponseDraft = {
      id: newResponseDraftId(),
      text: trimmed,
      savedAt: new Date().toISOString(),
    };
    setDrafts((prev) => [...prev, item]);
    setSelectedDraftId(item.id);
    setSaveHint({ message: "Saved.", variant: "success" });
    window.setTimeout(() => setSaveHint(null), 2500);
  }

  function handleSelectDraft(id: string) {
    const d = drafts.find((x) => x.id === id);
    if (!d) return;
    setText(d.text);
    setSelectedDraftId(id);
    setSaveHint(null);
  }

  function handleDeleteDraft(id: string) {
    setDrafts((prev) => prev.filter((x) => x.id !== id));
    if (selectedDraftId === id) {
      setSelectedDraftId(null);
    }
    setSaveHint(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  }

  return (
    <div className="glass animate-fade-up delay-100 rounded-2xl border-sky-500/5 p-4 sm:p-6">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/25 to-indigo-500/20 text-xs font-bold text-sky-200 sm:h-9 sm:w-9 sm:text-sm">
          2
        </span>
        <div>
          <h2 className="text-sm font-semibold text-white sm:text-base">
            Offer the text to The Sage
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Paste the AI&rsquo;s reply or your notes — then run the mentor
            extraction. Save drafts to compare multiple replies.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:space-y-4">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="ChatGPT thread, Claude reply, or rough notes — anything that names who you learn from..."
          className="h-36 w-full resize-y rounded-xl border border-slate-700/50 bg-slate-950/50 p-3 text-sm text-slate-100 placeholder-slate-600 transition-shadow focus:border-sky-500/40 focus:outline-none focus:shadow-[0_0_24px_rgba(56,189,248,0.12)] sm:h-48 sm:p-4 sm:text-base"
          maxLength={50000}
          disabled={loading}
        />

        {drafts.length > 0 && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 sm:p-3.5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
              Saved responses
            </p>
            <div className="flex flex-wrap gap-2">
              {drafts.map((d, index) => {
                const n = index + 1;
                const active = d.id === selectedDraftId;
                const shell = active
                  ? "border-sky-500/50 bg-sky-500/15 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.12)]"
                  : "border-slate-600/60 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80";
                return (
                  <div
                    key={d.id}
                    className={`inline-flex items-stretch overflow-hidden rounded-full border text-xs font-medium transition-all sm:text-sm ${shell}`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectDraft(d.id)}
                      className="px-2.5 py-1 text-left hover:bg-white/5"
                    >
                      Prompt {n}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(d.id)}
                      className="flex min-w-[1.75rem] items-center justify-center border-l border-white/10 px-1 text-slate-500 hover:bg-red-500/20 hover:text-red-300"
                      aria-label={`Delete Prompt ${n}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {saveHint && (
          <p
            className={
              saveHint.variant === "warn"
                ? "text-xs text-amber-400/90 sm:text-sm"
                : "text-xs text-slate-400 sm:text-sm"
            }
          >
            {saveHint.message}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span className="text-xs text-slate-600 sm:text-sm">
            {text.length.toLocaleString()} / 50,000 characters
          </span>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
            <button
              type="button"
              onClick={handleSaveResponse}
              disabled={loading || !text.trim()}
              className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:py-2"
            >
              Save response
            </button>
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="btn-glow w-full rounded-lg bg-sky-600 px-8 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:py-2.5 sm:text-base"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Distilling&hellip;
                </span>
              ) : (
                "Analyse mentors"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
