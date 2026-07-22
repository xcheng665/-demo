import { Bot, ExternalLink, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { aiQuickPrompts } from "../content/aiQuickPrompts";
import { sendQuestion } from "../lib/aiClient";
import type { AiEvidence } from "../lib/aiClient";

type AiMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  evidence?: AiEvidence[];
  pending?: boolean;
  error?: boolean;
};

const initialMessage: AiMessage = {
  id: 0,
  role: "assistant",
  text: "你好，我是程志远的 AI 分身。我会基于本站公开的作品与成果，帮助老师快速核验设计、研究和技术经历。"
};

export function AiChat() {
  const [messages, setMessages] = useState<AiMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript) return;
    const frame = window.requestAnimationFrame(() => {
      transcript.scrollTo({ top: transcript.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages]);

  const ask = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isSending) return;

    const userId = nextId.current++;
    const assistantId = nextId.current++;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: question },
      { id: assistantId, role: "assistant", text: "正在核对本站公开资料…", pending: true }
    ]);
    setDraft("");
    setIsSending(true);

    try {
      const result = await sendQuestion(question);
      setMessages((current) => current.map((message) => (
        message.id === assistantId
          ? { ...message, text: result.answer, evidence: result.evidence, pending: false }
          : message
      )));
    } catch (error) {
      const text = error instanceof Error ? error.message : "暂时无法生成回答，请稍后再试或直接联系本人。";
      setMessages((current) => current.map((message) => (
        message.id === assistantId ? { ...message, text, pending: false, error: true } : message
      )));
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(draft);
  };

  return (
    <section className="ai-chat-panel" aria-label="程志远 AI 分身问答">
      <header>
        <span className="ai-avatar-icon"><Bot size={20} /></span>
        <div><small>CHENG ZHIYUAN / AI</small><strong>和我的 AI 分身聊聊</strong></div>
        <span className="ai-status"><i /> 在线</span>
      </header>
      <p className="ai-disclosure">AI 仅依据本站公开资料回答；重要事项请以本人确认为准。</p>
      <div className="ai-transcript" aria-live="polite" ref={transcriptRef}>
        {messages.map((message) => (
          <article className={`ai-message ${message.role}${message.pending ? " is-pending" : ""}${message.error ? " is-error" : ""}`} key={message.id}>
            <p>{message.text}</p>
            {message.evidence?.length ? (
              <div className="ai-evidence-list" aria-label="相关公开资料">
                {message.evidence.map((evidence) => (
                  <a className="ai-evidence-card" href={evidence.href} key={evidence.id}>
                    <span><small>公开依据</small><strong>{evidence.title}</strong><em>{evidence.summary}</em></span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <div className="ai-prompts" aria-label="高校老师常问问题">
        {aiQuickPrompts.map((prompt) => (
          <button type="button" disabled={isSending} onClick={() => void ask(prompt)} key={prompt}>{prompt}</button>
        ))}
      </div>
      <form className="ai-input" onSubmit={onSubmit}>
        <input
          value={draft}
          maxLength={280}
          disabled={isSending}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="输入想了解的问题"
          aria-label="向 AI 分身提问"
        />
        <button type="submit" disabled={isSending || !draft.trim()} aria-label="发送问题"><Send size={17} /></button>
      </form>
    </section>
  );
}
