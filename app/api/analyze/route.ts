import { NextResponse } from "next/server";
import {
  analyzeRequestSchema,
  DEFAULT_ANALYZE_MODEL,
} from "@/lib/schemas/analyze";
import { extractAndClassify } from "@/lib/ai/extractMentors";
import { generateInsights } from "@/lib/insight/generateInsights";

export async function POST(request: Request) {
  const started = Date.now();

  try {
    if (!process.env.OPENAI_API_KEY?.trim()) {
      return NextResponse.json(
        {
          error:
            "OpenAI is not configured (missing OPENAI_API_KEY on the server). Analysis cannot run.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const parsed = analyzeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid request" },
        { status: 400 },
      );
    }

    const model = parsed.data.model ?? DEFAULT_ANALYZE_MODEL;

    const llmStarted = Date.now();
    const { mentors, domains } = await extractAndClassify(
      parsed.data.text,
      model,
    );
    const llmMs = Date.now() - llmStarted;

    const { insights, optimisations } = generateInsights(mentors, domains);

    const totalMs = Date.now() - started;

    if (process.env.NODE_ENV === "development") {
      console.info(
        `[analyze] OpenAI ${model} LLM: ${llmMs}ms · total: ${totalMs}ms · mentors: ${mentors.length}`,
      );
    }

    return NextResponse.json(
      { mentors, domains, insights, optimisations },
      {
        headers: {
          "X-Analyze-Duration-Ms": String(totalMs),
          "X-Analyze-Llm-Ms": String(llmMs),
          "X-Analyze-Model": model,
          "X-Analyze-Provider": "openai",
        },
      },
    );
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
