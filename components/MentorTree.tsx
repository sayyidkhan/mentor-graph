const DOMAIN_COLORS: Record<string, string> = {
  Wealth: "text-emerald-400",
  Business: "text-violet-400",
  Engineering: "text-pink-400",
  Investing: "text-amber-400",
};

const DOMAIN_RING: Record<string, string> = {
  Wealth: "ring-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  Business: "ring-violet-500/40 bg-violet-500/15 text-violet-300",
  Engineering: "ring-pink-500/40 bg-pink-500/15 text-pink-300",
  Investing: "ring-amber-500/40 bg-amber-500/15 text-amber-300",
};

const DOMAIN_ACCENT_BAR: Record<string, string> = {
  Wealth: "from-emerald-500/80 to-emerald-600/40",
  Business: "from-violet-500/80 to-violet-600/40",
  Engineering: "from-pink-500/80 to-pink-600/40",
  Investing: "from-amber-500/80 to-amber-600/40",
};

interface MentorTreeProps {
  mentors: string[];
  domains: Record<string, string[]>;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] ?? "";
    const b = parts[parts.length - 1][0] ?? "";
    return (a + b).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}

/** Orthogonal lines from mentor row down to domain card (pedigree style). */
function MentorToDomainWires({ count }: { count: number }) {
  if (count < 1) return null;
  const yJoin = 38;
  const yBottom = 100;
  if (count === 1) {
    return (
      <svg
        className="w-full text-slate-500"
        style={{ height: "3rem" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={`M 50 0 L 50 ${yBottom}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
  const xs = Array.from(
    { length: count },
    (_, i) => ((i + 0.5) / count) * 100,
  );
  const midX = (xs[0]! + xs[count - 1]!) / 2;
  const d = [
    ...xs.map((x) => `M ${x} 0 L ${x} ${yJoin}`),
    `M ${xs[0]} ${yJoin} L ${xs[count - 1]} ${yJoin}`,
    `M ${midX} ${yJoin} L ${midX} ${yBottom}`,
  ].join(" ");
  return (
    <svg
      className="w-full text-slate-500"
      style={{ height: "3rem" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Trunk from domain row down to You (single root at bottom). */
function DomainsToYouWires({ count }: { count: number }) {
  if (count < 1) return null;
  const yJoin = 36;
  const yBottom = 100;
  if (count === 1) {
    return (
      <svg
        className="w-full text-slate-500"
        style={{ height: "2.75rem" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={`M 50 0 L 50 ${yBottom}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
  const xs = Array.from(
    { length: count },
    (_, i) => ((i + 0.5) / count) * 100,
  );
  const midX = 50;
  const d = [
    ...xs.map((x) => `M ${x} 0 L ${x} ${yJoin}`),
    `M ${xs[0]} ${yJoin} L ${xs[count - 1]} ${yJoin}`,
    `M ${midX} ${yJoin} L ${midX} ${yBottom}`,
  ].join(" ");
  return (
    <svg
      className="w-full text-slate-500"
      style={{ height: "2.75rem" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function MentorPedigreeCard({
  name,
  domainKey,
}: {
  name: string;
  domainKey: string;
}) {
  const ring =
    DOMAIN_RING[domainKey] ?? "ring-slate-500/40 bg-slate-500/15 text-slate-300";
  return (
    <div className="mentor-pedigree-card w-[5.75rem] shrink-0 rounded-lg border border-slate-600/50 bg-slate-950/90 p-2 shadow-sm sm:w-[6.5rem] sm:p-2.5">
      <div
        className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ring-2 ring-inset sm:h-12 sm:w-12 sm:text-sm ${ring}`}
      >
        {initials(name)}
      </div>
      <p
        className="mt-2 text-center text-[10px] font-medium leading-tight text-slate-200 sm:text-xs"
        title={name}
      >
        {name.length > 22 ? `${name.slice(0, 20)}…` : name}
      </p>
      <p className="mt-1 h-1.5 w-3/4 mx-auto rounded-full bg-slate-700/80" />
    </div>
  );
}

function DomainPedigreeCard({
  domain,
  mentorCount,
}: {
  domain: string;
  mentorCount: number;
}) {
  const color = DOMAIN_COLORS[domain] ?? "text-slate-400";
  const bar =
    DOMAIN_ACCENT_BAR[domain] ?? "from-slate-500/80 to-slate-600/40";
  return (
    <div className="w-full max-w-[9.5rem] rounded-lg border border-slate-600/50 bg-slate-950/90 shadow-sm sm:max-w-[10.5rem]">
      <div className={`h-1 rounded-t-lg bg-gradient-to-r ${bar}`} />
      <div className="px-3 py-2.5 sm:px-3.5 sm:py-3">
        <p className={`text-center text-xs font-bold sm:text-sm ${color}`}>
          {domain}
        </p>
        <p className="mt-1.5 h-1.5 w-2/3 mx-auto rounded-full bg-slate-700/70" />
        <p className="mt-2 text-center text-[10px] text-slate-500 sm:text-xs">
          {mentorCount} mentor{mentorCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}

function YouRootCard() {
  return (
    <div className="relative w-[8.5rem] shrink-0 rounded-lg border border-sky-500/35 bg-slate-950/95 p-3 shadow-[0_0_32px_rgba(56,189,248,0.12)] sm:w-[9.5rem] sm:p-3.5">
      <div className="h-1 rounded-full bg-gradient-to-r from-sky-400/90 to-cyan-500/60" />
      <div className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/25 to-cyan-600/20 text-sm font-bold text-sky-200 ring-2 ring-sky-400/30 ring-inset sm:h-14 sm:w-14 sm:text-base">
        You
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-slate-200 sm:text-sm">
        Your thinking
      </p>
      <p className="mt-1 h-1.5 w-3/4 mx-auto rounded-full bg-slate-700/80" />
    </div>
  );
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

  if (domainEntries.length === 0) {
    return (
      <section className="animate-fade-up">
        <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
          Your <span className="text-gradient">mentor graph</span>
        </h2>
        <p className="mt-3 text-sm text-slate-500">No mentors to chart yet.</p>
      </section>
    );
  }

  return (
    <section className="animate-fade-up">
      <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
        Your <span className="text-gradient">mentor graph</span>
      </h2>
      <p className="mb-4 mt-1 text-xs text-slate-500 sm:mb-5 sm:text-sm">
        Pedigree-style tree: influences above, you at the root — like a family
        tree of ideas.
      </p>

      <div className="glass glow-blue overflow-x-auto rounded-2xl border-sky-500/10 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex min-w-max flex-col items-stretch">
          {/* Tier: mentors + wires + domains — one column per domain */}
          <div className="flex flex-1 flex-row items-end justify-center gap-3 sm:gap-5 md:gap-8">
            {domainEntries.map(([domain, domainMentors]) => (
              <div
                key={domain}
                className="flex min-w-[6.5rem] flex-1 flex-col items-center sm:min-w-[7.5rem]"
              >
                <div
                  className="grid w-full gap-2 sm:gap-2.5"
                  style={{
                    gridTemplateColumns: `repeat(${domainMentors.length}, minmax(0, 1fr))`,
                  }}
                >
                  {domainMentors.map((mentor) => (
                    <div key={`${domain}-${mentor}`} className="flex justify-center">
                      <MentorPedigreeCard
                        name={mentor}
                        domainKey={domain}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full px-0.5">
                  <MentorToDomainWires count={domainMentors.length} />
                </div>
                <DomainPedigreeCard
                  domain={domain}
                  mentorCount={domainMentors.length}
                />
              </div>
            ))}
          </div>

          <div className="w-full">
            <DomainsToYouWires count={domainEntries.length} />
          </div>

          <div className="flex justify-center">
            <YouRootCard />
          </div>
        </div>
      </div>
    </section>
  );
}
