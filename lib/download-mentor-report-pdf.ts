import { jsPDF } from "jspdf";
import type { AnalyzeResponse } from "@/lib/schemas/analyze";
import { buildDomainEntries, formatAsciiTree } from "@/lib/report-format";

function formatGeneratedAt(savedAt: Date | null): string {
  if (!savedAt || Number.isNaN(savedAt.getTime())) return "Date unknown";
  try {
    return savedAt.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return savedAt.toISOString();
  }
}

/**
 * Builds a text-based PDF (no HTML canvas) for reliable export on any theme.
 */
export function downloadMentorGraphPdf(
  data: AnalyzeResponse,
  savedAt: Date | null,
): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  const maxW = pageW - margin * 2;
  let y = margin;

  function ensureSpace(mm: number) {
    if (y + mm > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function writeHeading(text: string) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    ensureSpace(8);
    doc.text(text, margin, y);
    y += 7;
  }

  function writeBody(text: string, extraGap = 4) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxW);
    for (const line of lines) {
      ensureSpace(6);
      doc.text(line, margin, y);
      y += 5;
    }
    y += extraGap;
  }

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Mentor Graph Report", margin, y);
  y += 9;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  writeBody(
    `Generated: ${formatGeneratedAt(savedAt)}\nIdentify mentors that shape your thinking from AI conversations.`,
    6,
  );

  writeHeading("Summary");
  writeBody(
    `${data.mentors.length} mentor(s) identified across ${buildDomainEntries(data).length} domain group(s).`,
  );

  writeHeading("Mentor tree");
  writeBody(formatAsciiTree(data));

  const domainBlock = buildDomainEntries(data)
    .map(([d, ms]) => `${d}: ${ms.join(", ")}`)
    .join("\n");
  writeHeading("By domain");
  writeBody(domainBlock.length ? domainBlock : "—");

  if (data.insights.length > 0) {
    writeHeading("Counsel — insights");
    writeBody(
      data.insights.map((s, i) => `${i + 1}. ${s}`).join("\n\n"),
    );
  }

  if (data.optimisations.length > 0) {
    writeHeading("Paths to balance — optimisations");
    writeBody(
      data.optimisations.map((s, i) => `${i + 1}. ${s}`).join("\n\n"),
    );
  }

  const day = new Date().toISOString().slice(0, 10);
  doc.save(`mentor-graph-report-${day}.pdf`);
}
