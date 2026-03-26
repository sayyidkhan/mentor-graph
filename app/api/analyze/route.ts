import { NextResponse } from "next/server";
import { analyzeRequestSchema } from "@/lib/schemas/analyze";
import { extractAndClassify } from "@/lib/ai/extractMentors";
import { generateInsights } from "@/lib/insight/generateInsights";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analyzeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid request" },
        { status: 400 },
      );
    }

    const { mentors, domains } = await extractAndClassify(parsed.data.text);
    const { insights, optimisations } = generateInsights(mentors, domains);

    return NextResponse.json({ mentors, domains, insights, optimisations });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
