import { readFile } from "node:fs/promises";

const source = new URL("../knowledge/index.json", import.meta.url);
const records = JSON.parse(await readFile(source, "utf8"));
const seenIds = new Set();

for (const record of records) {
  const required = ["id", "title", "summary", "href"];
  if (required.some((key) => typeof record[key] !== "string" || !record[key].trim())) {
    throw new Error(`资料卡缺少基础字段：${record.id || "未知 ID"}`);
  }
  if (seenIds.has(record.id)) throw new Error(`资料卡 ID 重复：${record.id}`);
  if (!Array.isArray(record.tags) || !record.tags.length || !Array.isArray(record.facts) || !record.facts.length) {
    throw new Error(`资料卡缺少标签或事实：${record.id}`);
  }
  seenIds.add(record.id);
}

console.log(`知识库验证通过：${records.length} 张公开资料卡。`);
