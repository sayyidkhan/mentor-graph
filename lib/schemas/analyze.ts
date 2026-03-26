import { z } from "zod";

export const DOMAINS = [
  "Wealth",
  "Business",
  "Engineering",
  "Investing",
] as const;

export type Domain = (typeof DOMAINS)[number];

/** OpenAI chat models allowed for mentor extraction (server validates; unknown IDs are rejected). */
export const ANALYZE_MODEL_IDS = [
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "gpt-4o",
  "gpt-4o-mini",
] as const;

export type AnalyzeModelId = (typeof ANALYZE_MODEL_IDS)[number];

export function isAnalyzeModelId(value: string): value is AnalyzeModelId {
  return (ANALYZE_MODEL_IDS as readonly string[]).includes(value);
}

/** Default: GPT-5.4 mini — good balance of quality, latency, and cost per OpenAI guidance. */
export const DEFAULT_ANALYZE_MODEL: AnalyzeModelId = "gpt-5.4-mini";

export const ANALYZE_MODEL_OPTIONS: { id: AnalyzeModelId; label: string }[] = [
  { id: "gpt-5.4", label: "GPT-5.4 — flagship" },
  { id: "gpt-5.4-mini", label: "GPT-5.4 mini — fast / economical" },
  { id: "gpt-5.4-nano", label: "GPT-5.4 nano — lowest latency" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o mini" },
];

export const analyzeRequestSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(50000, "Text exceeds maximum length"),
  model: z.enum(ANALYZE_MODEL_IDS).optional(),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export interface AnalyzeResponse {
  mentors: string[];
  domains: Record<string, string[]>;
  insights: string[];
  optimisations: string[];
}
