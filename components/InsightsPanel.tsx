interface InsightsPanelProps {
  insights: string[];
  optimisations: string[];
}

export function InsightsPanel({ insights, optimisations }: InsightsPanelProps) {
  return (
    <section className="space-y-6">
      {insights.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-semibold">Insights</h2>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900 p-4"
              >
                <span className="mt-0.5 text-yellow-400">*</span>
                <span className="text-gray-200">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {optimisations.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-semibold">
            Optimisation Suggestions
          </h2>
          <ul className="space-y-2">
            {optimisations.map((opt, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900 p-4"
              >
                <span className="mt-0.5 text-green-400">+</span>
                <span className="text-gray-200">{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
