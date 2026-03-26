import type { AnalyzeResponse } from "@/lib/schemas/analyze";
import { buildDomainEntries, formatAsciiTree } from "@/lib/report-format";

function formatDate(savedAt: Date | null): string {
  if (!savedAt || Number.isNaN(savedAt.getTime())) return "—";
  try {
    return savedAt.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return savedAt.toISOString();
  }
}

export function ReportDocument({
  data,
  savedAt,
}: {
  data: AnalyzeResponse;
  savedAt: Date | null;
}) {
  const domainEntries = buildDomainEntries(data);

  return (
    <article
      id="report-print-root"
      className="report-document mx-auto max-w-3xl rounded-2xl border border-slate-700/50 bg-slate-950/80 px-6 py-8 shadow-xl sm:px-10 sm:py-10"
    >
      <header className="border-b border-slate-700/60 pb-6">
        <p className="report-kicker text-xs font-semibold tracking-widest text-sky-400/80">
          MENTOR GRAPH
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Report
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Generated:{" "}
          <span className="text-slate-300">{formatDate(savedAt)}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Snapshot of mentors, domains, and counsel from your last analysis.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Summary
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          {data.mentors.length} mentor{data.mentors.length === 1 ? "" : "s"}{" "}
          across {domainEntries.length} domain
          {domainEntries.length === 1 ? "" : "s"}.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Mentor tree
        </h2>
        <pre className="report-pre mt-3 overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900/80 p-4 font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
          {formatAsciiTree(data)}
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          By domain
        </h2>
        <ul className="mt-3 space-y-3 text-sm text-slate-300">
          {domainEntries.map(([domain, mentors]) => (
            <li key={domain}>
              <span className="font-semibold text-white">{domain}</span>
              <span className="text-slate-500"> — </span>
              {mentors.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      {data.insights.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Counsel — insights
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            {data.insights.map((line, i) => (
              <li key={i} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.optimisations.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Paths to balance — optimisations
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            {data.optimisations.map((line, i) => (
              <li key={i} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ol>
        </section>
      )}

      <footer className="report-footer mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
        Mentor Graph — don&apos;t just map mentors; choose better ones.
      </footer>
    </article>
  );
}
