import type { AnalyzeResponse } from "@/lib/schemas/analyze";

export function buildDomainEntries(
  result: AnalyzeResponse,
): [string, string[]][] {
  const domainMap: Record<string, string[]> = {};

  for (const mentor of result.mentors) {
    const mentorDomains = result.domains[mentor] || ["Uncategorised"];
    for (const domain of mentorDomains) {
      if (!domainMap[domain]) {
        domainMap[domain] = [];
      }
      if (!domainMap[domain].includes(mentor)) {
        domainMap[domain].push(mentor);
      }
    }
  }

  return Object.entries(domainMap).sort(([a], [b]) => a.localeCompare(b));
}

export function formatAsciiTree(result: AnalyzeResponse): string {
  const entries = buildDomainEntries(result);
  const lines: string[] = ["You"];
  entries.forEach(([domain, mentors], i) => {
    const isLast = i === entries.length - 1;
    const branch = isLast ? "└── " : "├── ";
    lines.push(`${branch}${domain}`);
    mentors.forEach((m, j) => {
      const isLastMentor = j === mentors.length - 1;
      const indent = isLast ? "    " : "│   ";
      const twig = isLastMentor ? "└── " : "├── ";
      lines.push(`${indent}${twig}${m}`);
    });
  });
  return lines.join("\n");
}
