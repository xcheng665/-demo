export type AiEvidence = {
  id: string;
  title: string;
  summary: string;
  href: string;
};

export type AiAnswer = {
  answer: string;
  evidence: AiEvidence[];
};

type ApiErrorPayload = {
  error?: string;
};

export async function sendQuestion(question: string): Promise<AiAnswer> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const payload = await response.json().catch(() => ({})) as AiAnswer & ApiErrorPayload;
  if (!response.ok || !payload.answer || !Array.isArray(payload.evidence)) {
    throw new Error(payload.error || "暂时无法生成回答，请稍后再试或直接联系本人。");
  }

  return { answer: payload.answer, evidence: payload.evidence };
}
