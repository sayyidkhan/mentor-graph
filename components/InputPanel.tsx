"use client";

import { useState } from "react";

interface InputPanelProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your ChatGPT conversation, notes, or any text here..."
        className="h-48 w-full resize-y rounded-lg border border-gray-700 bg-gray-900 p-4 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        maxLength={50000}
        disabled={loading}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {text.length.toLocaleString()} / 50,000 characters
        </span>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analysing..." : "Analyse"}
        </button>
      </div>
    </form>
  );
}
