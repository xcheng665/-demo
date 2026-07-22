export type KnowledgeRecord = {
  id: string;
  title: string;
  summary: string;
  href: string;
  tags: string[];
  facts: string[];
};

export type PublicEvidence = Pick<KnowledgeRecord, "id" | "title" | "summary" | "href">;

export type ChatPayload = {
  question?: unknown;
};

export function getQuestion(payload: ChatPayload): string | null {
  if (typeof payload.question !== "string") return null;
  const cleaned = payload.question.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned || cleaned.length > 280) return null;
  return cleaned;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
