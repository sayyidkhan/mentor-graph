interface MentorTreeProps {
  mentors: string[];
  domains: Record<string, string[]>;
}

export function MentorTree({ mentors, domains }: MentorTreeProps) {
  const domainMap: Record<string, string[]> = {};

  for (const mentor of mentors) {
    const mentorDomains = domains[mentor] || ["Uncategorised"];
    for (const domain of mentorDomains) {
      if (!domainMap[domain]) {
        domainMap[domain] = [];
      }
      if (!domainMap[domain].includes(mentor)) {
        domainMap[domain].push(mentor);
      }
    }
  }

  const domainEntries = Object.entries(domainMap).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Your Mentor Graph</h2>
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <div className="font-mono text-sm">
          <div className="font-semibold text-blue-400">You</div>
          {domainEntries.map(([domain, domainMentors], i) => {
            const isLast = i === domainEntries.length - 1;
            return (
              <div key={domain} className="ml-2">
                <div className="text-gray-400">
                  {isLast ? "└── " : "├── "}
                  <span className="font-semibold text-emerald-400">
                    {domain}
                  </span>
                </div>
                {domainMentors.map((mentor, j) => {
                  const isLastMentor = j === domainMentors.length - 1;
                  return (
                    <div key={mentor} className="ml-8 text-gray-300">
                      {isLast ? "    " : "│   "}
                      {isLastMentor ? "└── " : "├── "}
                      {mentor}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
