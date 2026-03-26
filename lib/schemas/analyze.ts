import { z } from "zod";

export const DOMAINS = [
  "Wealth",
  "Business",
  "Engineering",
  "Investing",
] as const;

export type Domain = (typeof DOMAINS)[number];

export const analyzeRequestSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(50000, "Text exceeds maximum length"),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export interface AnalyzeResponse {
  mentors: string[];
  domains: Record<string, string[]>;
  insights: string[];
  optimisations: string[];
}
