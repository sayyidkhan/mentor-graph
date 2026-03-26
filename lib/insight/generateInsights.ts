import { DOMAINS } from "../schemas/analyze";

export function generateInsights(
  mentors: string[],
  domains: Record<string, string[]>,
): { insights: string[]; optimisations: string[] } {
  const insights: string[] = [];
  const optimisations: string[] = [];

  if (mentors.length === 0) {
    insights.push(
      "No mentors were detected in your text. Try pasting a longer conversation.",
    );
    return { insights, optimisations };
  }

  // Count mentors per domain
  const domainCounts: Record<string, number> = {};
  for (const domain of DOMAINS) {
    domainCounts[domain] = 0;
  }

  for (const mentorDomains of Object.values(domains)) {
    for (const domain of mentorDomains) {
      if (domain in domainCounts) {
        domainCounts[domain]++;
      }
    }
  }

  // Detect missing domains
  const missingDomains = DOMAINS.filter((d) => domainCounts[d] === 0);
  for (const domain of missingDomains) {
    insights.push(`You have no mentors in ${domain}.`);
    optimisations.push(
      `Consider adding a ${domain.toLowerCase()}-focused mentor to balance your thinking.`,
    );
  }

  // Detect dominant domains
  const totalMentions = Object.values(domainCounts).reduce((a, b) => a + b, 0);
  if (totalMentions > 0) {
    for (const [domain, count] of Object.entries(domainCounts)) {
      const ratio = count / totalMentions;
      if (ratio >= 0.5 && count >= 2) {
        insights.push(
          `Your thinking is heavily skewed towards ${domain} (${Math.round(ratio * 100)}% of mentor influence).`,
        );
      }
    }
  }

  // General suggestions
  if (mentors.length === 1) {
    insights.push(
      "You only have one mentor detected. A diverse mentor set leads to more balanced thinking.",
    );
    optimisations.push(
      "Try engaging with content from mentors across different domains.",
    );
  }

  if (missingDomains.length === 0 && mentors.length >= 3) {
    insights.push(
      "Your mentor coverage across domains looks well-balanced!",
    );
  }

  return { insights, optimisations };
}
