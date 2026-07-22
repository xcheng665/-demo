import { systemPrompt } from "../../prompts/system";
import { isRateLimited } from "./lib/rateLimit";
import { buildKnowledgeContext, publicEvidence, retrieveEvidence } from "./lib/retrieve";
import { getQuestion, json } from "./lib/schema";

type Env = { DEEPSEEK_API_KEY?: string };
type Context = { request: Request; env: Env };
type ModelResult = { answer?: unknown; evidenceIds?: unknown };

const noEvidenceAnswer = "公开资料中暂未找到可验证依据。为避免作出推测，建议直接联系程志远确认。";

function getClientKey(request: Request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "anonymous";
}

function readModelResult(value: string): ModelResult | null {
  try {
    const parsed = JSON.parse(value) as ModelResult;
    return typeof parsed.answer === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeFirstPersonAnswer(answer: string): string {
  return answer
    .replaceAll("程志远", "我")
    .replaceAll("Cheng Zhiyuan", "我")
    .replaceAll("CHENG ZHIYUAN", "我")
    .trim();
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (isRateLimited(getClientKey(request))) return json({ error: "提问过于频繁，请稍后再试。" }, 429);

  const payload = await request.json().catch(() => null);
  const question = getQuestion(payload ?? {});
  if (!question) return json({ error: "请输入 1 到 280 个字符的问题。" }, 400);

  const matchedRecords = retrieveEvidence(question);
  if (!matchedRecords.length) return json({ answer: noEvidenceAnswer, evidence: [] });
  if (!env.DEEPSEEK_API_KEY) return json({ error: "AI 服务暂未配置，请直接联系本人。" }, 503);

  const modelResponse = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      temperature: 0.2,
      max_tokens: 550,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `<knowledge>\n${buildKnowledgeContext(matchedRecords)}\n</knowledge>\n\n问题：${question}` }
      ]
    })
  }).catch(() => null);

  if (!modelResponse?.ok) return json({ error: "AI 服务暂时不可用，请稍后再试或直接联系本人。" }, 502);

  const modelPayload = await modelResponse.json().catch(() => null) as { choices?: Array<{ message?: { content?: string } }> } | null;
  const parsed = readModelResult(modelPayload?.choices?.[0]?.message?.content ?? "");
  if (!parsed || typeof parsed.answer !== "string" || !parsed.answer.trim()) {
    return json({ error: "AI 返回格式异常，请稍后再试或直接联系本人。" }, 502);
  }

  const availableIds = new Set(matchedRecords.map((record) => record.id));
  const requestedIds = Array.isArray(parsed.evidenceIds) ? parsed.evidenceIds.filter((id): id is string => typeof id === "string") : [];
  const validIds = requestedIds.filter((id) => availableIds.has(id)).slice(0, 3);
  const evidenceRecords = validIds.length
    ? matchedRecords.filter((record) => validIds.includes(record.id))
    : matchedRecords.slice(0, 2);

  return json({
    answer: normalizeFirstPersonAnswer(parsed.answer).slice(0, 420),
    evidence: publicEvidence(evidenceRecords)
  });
}
