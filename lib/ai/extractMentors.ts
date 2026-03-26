import OpenAI from "openai";
import { DOMAINS, type AnalyzeModelId } from "../schemas/analyze";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractAndClassify(
  text: string,
  model: AnalyzeModelId,
): Promise<{ mentors: string[]; domains: Record<string, string[]> }> {
  const response = await openai.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert at identifying influential mentors and thought leaders from text.

Your task:
1. Extract all real people (mentors, thought leaders, entrepreneurs, investors, engineers, authors) mentioned in the text.
2. Classify each person into one or more domains: ${DOMAINS.join(", ")}.
3. Only include real, well-known people. Exclude fictional characters, generic names, or the user themselves.

Respond with valid JSON in this exact format:
{
  "mentors": ["Person Name 1", "Person Name 2"],
  "domains": {
    "Person Name 1": ["Domain1", "Domain2"],
    "Person Name 2": ["Domain1"]
  }
}

If no mentors are found, respond with:
{ "mentors": [], "domains": {} }`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return { mentors: [], domains: {} };
  }

  try {
    const parsed = JSON.parse(content);

    const validDomains: Record<string, string[]> = {};
    for (const [mentor, mentorDomains] of Object.entries(
      parsed.domains || {},
    )) {
      validDomains[mentor] = (mentorDomains as string[]).filter((d) =>
        DOMAINS.includes(d as (typeof DOMAINS)[number]),
      );
    }

    return {
      mentors: Array.isArray(parsed.mentors) ? parsed.mentors : [],
      domains: validDomains,
    };
  } catch {
    return { mentors: [], domains: {} };
  }
}
