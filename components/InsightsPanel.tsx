interface InsightsPanelProps {
  insights: string[];
  optimisations: string[];
}

export function InsightsPanel({ insights, optimisations }: InsightsPanelProps) {
  return (
    <section className="animate-fade-up delay-100 space-y-6 sm:space-y-8">
      {insights.length > 0 && (
        <div>
          <h2 className="mb-1 text-lg font-bold sm:text-xl md:text-2xl">
            <span className="text-gradient-subtle">Counsel</span>
            <span className="text-slate-500"> — </span>
            <span className="text-base font-semibold text-slate-400 md:text-lg">
              insights
            </span>
          </h2>
          <p className="mb-3 text-xs text-slate-500 sm:mb-4 sm:text-sm">
            The Sage reads your mentor graph and names what stands out.
          </p>
          <ul className="space-y-3">
            {insights.map((insight, i) => (
              <li
                key={i}
                className="glass glass-hover flex items-start gap-3 rounded-xl p-4 sm:gap-4 sm:p-5"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/15 text-xs text-amber-400 sm:h-7 sm:w-7">
                  !
                </span>
                <span className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {insight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {optimisations.length > 0 && (
        <div>
          <h2 className="mb-1 text-lg font-bold sm:text-xl md:text-2xl">
            <span className="text-gradient-subtle">Paths to balance</span>
            <span className="text-slate-500"> — </span>
            <span className="text-base font-semibold text-slate-400 md:text-lg">
              optimisations
            </span>
          </h2>
          <p className="mb-3 text-xs text-slate-500 sm:mb-4 sm:text-sm">
            Practical nudges toward a stronger mentor mix (same engine as
            before).
          </p>
          <ul className="space-y-3">
            {optimisations.map((opt, i) => (
              <li
                key={i}
                className="glass glass-hover flex items-start gap-3 rounded-xl p-4 sm:gap-4 sm:p-5"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-xs text-emerald-400 sm:h-7 sm:w-7">
                  +
                </span>
                <span className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {opt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
