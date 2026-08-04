import { ArrowDown, BrainCircuit, Database, FileCheck2, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";

type RagStage = {
  number: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  icon: typeof BrainCircuit;
  metric: string;
};

const ragStages: RagStage[] = [
  {
    number: "01",
    label: "QUERY REWRITE",
    title: "生成语义入口",
    description: "把访客的自然提问整理成更容易被知识库理解的检索意图。",
    detail: "先识别问题是在问研究方向、项目作品、工具能力还是课题协作，再把问题交给后续召回。",
    icon: BrainCircuit,
    metric: "理解问题语义"
  },
  {
    number: "02",
    label: "RETRIEVAL",
    title: "召回相关资料",
    description: "在 06 张公开资料卡中匹配最相关的主题与事实。",
    detail: "当前版本使用轻量标签与关键词匹配，先让作品集问答可验证、可控、可回溯。",
    icon: Search,
    metric: "知识卡片召回"
  },
  {
    number: "03",
    label: "EVIDENCE",
    title: "拼接回答依据",
    description: "只把命中的公开事实交给模型，并在答案下方保留来源。",
    detail: "证据卡片来自受控知识库，链接回作品、能力或公开成果页面，不采纳模型自行生成的链接。",
    icon: FileCheck2,
    metric: "最多 03 条依据"
  },
  {
    number: "04",
    label: "GROUNDED ANSWER",
    title: "输出有边界的回答",
    description: "基于证据回答设计、研究与协作问题，资料不足时明确说不知道。",
    detail: "这个分身是成果导览员，不替本人作承诺；重要判断仍以本人确认和正式材料为准。",
    icon: ShieldCheck,
    metric: "回答可追溯"
  }
];

export function RagOverview() {
  const [activeStage, setActiveStage] = useState(1);
  const active = ragStages[activeStage];
  const ActiveIcon = active.icon;

  return (
    <section className="rag-overview" aria-labelledby="rag-overview-title">
      <header className="rag-overview-head">
        <div>
          <span className="rag-kicker"><BrainCircuit size={16} /> RAG / EVIDENCE PIPELINE</span>
          <h2 id="rag-overview-title">让回答有出处，<br />让能力可被检索。</h2>
        </div>
        <div className="rag-index-badge" aria-label="6 张公开资料卡">
          <strong>06</strong>
          <small>公开资料卡</small>
        </div>
      </header>

      <div className="rag-flow" aria-label="RAG 检索增强回答流程">
        {ragStages.map((stage, index) => {
          const StageIcon = stage.icon;
          return (
            <div className="rag-flow-item" key={stage.number}>
              <button
                type="button"
                className={`rag-stage ${activeStage === index ? "is-active" : ""}`}
                onClick={() => setActiveStage(index)}
                aria-pressed={activeStage === index}
              >
                <span className="rag-stage-number">{stage.number}</span>
                <StageIcon size={16} strokeWidth={1.7} />
                <span className="rag-stage-label">{stage.label}</span>
              </button>
              {index < ragStages.length - 1 ? <ArrowDown className="rag-flow-arrow" size={14} aria-hidden="true" /> : null}
            </div>
          );
        })}
      </div>

      <div className="rag-detail" aria-live="polite">
        <div className="rag-detail-icon"><ActiveIcon size={21} strokeWidth={1.6} /></div>
        <div className="rag-detail-copy">
          <span>{active.number} / {active.label}</span>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
        </div>
        <strong className="rag-detail-metric">{active.metric}</strong>
      </div>

      <div className="rag-boundaries">
        <div>
          <Database size={15} />
          <span><strong>知识库</strong> 作品 / 研究 / 能力 / 成果</span>
        </div>
        <div>
          <Search size={15} />
          <span><strong>当前实现</strong> 轻量召回 · 可升级向量检索</span>
        </div>
        <div>
          <ShieldCheck size={15} />
          <span><strong>边界</strong> 只回答有公开依据的问题</span>
        </div>
      </div>
    </section>
  );
}
