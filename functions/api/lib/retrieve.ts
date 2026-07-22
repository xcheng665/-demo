import knowledgeIndex from "../../../knowledge/index.json";
import type { KnowledgeRecord, PublicEvidence } from "./schema";

const records = knowledgeIndex as KnowledgeRecord[];

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

export function retrieveEvidence(question: string, limit = 3): KnowledgeRecord[] {
  const normalizedQuestion = normalize(question);
  return records
    .map((record) => {
      const score = record.tags.reduce((total, tag) => total + (normalizedQuestion.includes(normalize(tag)) ? 3 : 0), 0)
        + record.facts.reduce((total, fact) => total + (normalizedQuestion.includes(normalize(fact.slice(0, 6))) ? 1 : 0), 0);
      return { record, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ record }) => record);
}

export function publicEvidence(recordsToExpose: KnowledgeRecord[]): PublicEvidence[] {
  return recordsToExpose.map(({ id, title, summary, href }) => ({ id, title, summary, href }));
}

export function buildKnowledgeContext(recordsToExpose: KnowledgeRecord[]): string {
  return recordsToExpose.map((record) => (
    `ID: ${record.id}\n标题: ${record.title}\n事实:\n${record.facts.map((fact) => `- ${fact}`).join("\n")}`
  )).join("\n\n");
}
