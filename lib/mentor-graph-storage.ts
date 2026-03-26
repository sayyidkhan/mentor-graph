import { z } from "zod";
import type { AnalyzeResponse } from "@/lib/schemas/analyze";

export const MENTOR_GRAPH_STORAGE_KEY = "mentor-graph-last-result";

const analyzeResponseSchema = z.object({
  mentors: z.array(z.string()),
  domains: z.record(z.string(), z.array(z.string())),
  insights: z.array(z.string()),
  optimisations: z.array(z.string()),
});

const storedV1Schema = analyzeResponseSchema.extend({
  v: z.literal(1),
  savedAt: z.string(),
});

export type StoredReportV1 = z.infer<typeof storedV1Schema>;

export function saveAnalyzeResult(data: AnalyzeResponse): void {
  const payload: StoredReportV1 = {
    v: 1,
    savedAt: new Date().toISOString(),
    ...data,
  };
  localStorage.setItem(MENTOR_GRAPH_STORAGE_KEY, JSON.stringify(payload));
}

export type LoadedReport =
  | { ok: true; data: AnalyzeResponse; savedAt: Date | null }
  | { ok: false };

export function loadAnalyzeResult(): LoadedReport {
  try {
    const raw = localStorage.getItem(MENTOR_GRAPH_STORAGE_KEY);
    if (!raw) return { ok: false };
    const json: unknown = JSON.parse(raw);

    const v1 = storedV1Schema.safeParse(json);
    if (v1.success) {
      const { v: _v, savedAt, ...data } = v1.data;
      return { ok: true, data, savedAt: new Date(savedAt) };
    }

    const legacy = analyzeResponseSchema.safeParse(json);
    if (legacy.success) {
      return { ok: true, data: legacy.data, savedAt: null };
    }

    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export function clearAnalyzeResult(): void {
  localStorage.removeItem(MENTOR_GRAPH_STORAGE_KEY);
}
