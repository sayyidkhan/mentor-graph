import { z } from "zod";

export const INPUT_DRAFTS_STORAGE_KEY = "mentor-graph-saved-responses";

/** Max saved AI responses in step 2 (localStorage size guard). */
export const MAX_SAVED_RESPONSES = 30;

const savedResponseItemSchema = z.object({
  id: z.string(),
  text: z.string().max(50000),
  savedAt: z.string(),
});

const envelopeSchema = z.object({
  v: z.literal(1),
  items: z.array(savedResponseItemSchema),
});

export type SavedResponseDraft = z.infer<typeof savedResponseItemSchema>;

export function newResponseDraftId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function loadSavedResponses(): SavedResponseDraft[] {
  try {
    const raw = localStorage.getItem(INPUT_DRAFTS_STORAGE_KEY);
    if (!raw) return [];
    const json: unknown = JSON.parse(raw);
    const boxed = envelopeSchema.safeParse(json);
    if (boxed.success) {
      return boxed.data.items.slice(0, MAX_SAVED_RESPONSES);
    }
    const legacy = z.array(savedResponseItemSchema).safeParse(json);
    if (legacy.success) {
      return legacy.data.slice(0, MAX_SAVED_RESPONSES);
    }
    return [];
  } catch {
    return [];
  }
}

export function persistSavedResponses(items: SavedResponseDraft[]): void {
  const trimmed = items.slice(-MAX_SAVED_RESPONSES);
  localStorage.setItem(
    INPUT_DRAFTS_STORAGE_KEY,
    JSON.stringify({ v: 1 as const, items: trimmed }),
  );
}
