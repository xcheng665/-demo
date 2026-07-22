# 程志远 AI 分身：实施计划

> 前置条件：已确认的设计见 `docs/superpowers/specs/2026-07-22-cheng-zhiyuan-ai-avatar-design.md`。
>
> 范围：只改造 `/ai` 页面及其 AI 服务；不改其它路由或既有作品集版式。

## 交付顺序

### 1. 提取 AI 页面前端模块

**文件**

- 新建 `src/components/AiChat.tsx`
- 新建 `src/lib/aiClient.ts`
- 新建 `src/content/aiQuickPrompts.ts`
- 修改 `src/App.tsx`
- 修改 `src/styles.css`

**实施**

1. 将 `AiPage` 中的消息状态、提交表单、滚动逻辑和聊天 UI 提取为 `AiChat`。
2. 用包含 `role`、`text`、`evidence`、`status` 的消息类型替换仅有 `role/text` 的当前类型。
3. 删除 `getAiReply()` 本地关键词模拟回复；将 `ask()` 改为调用 `aiClient.sendQuestion()`。
4. 将快捷问题替换为老师场景的四项已确认文案。
5. 增加发送中状态、按钮禁用、网络失败提示和再次提问能力。
6. 在聊天面板中加入“AI 基于本站公开资料回答”的说明。
7. 将服务端返回的证据渲染为最多三张站内链接卡；链接只取服务端验证过的 ID。

**验证**

- 组件测试覆盖：空问题、加载中、正常回答、带证据回答、网络错误。
- 键盘提交、快捷问题、自动滚动、窄屏布局均可用。

### 2. 建立可审阅的公开资料库

**文件**

- 新建 `knowledge/index.json`
- 新建 `scripts/validate-knowledge.mjs`

**实施**

1. 从现有 `portfolioData.ts`、作品 PDF、简历和证书中提取已公开、可核验的事实。
2. 在 `index.json` 中为每张资料卡写入唯一 `id`、标题、主题标签、事实摘要和站内链接。
3. 覆盖至少五类信息：建筑设计项目、绿色性能、BIM/可视化、参数化/数据、科研与编程。
4. 将“研究兴趣”明确表述为现有资料能支持的方向，不将探索性经历写成已完成成果。
5. 编写校验脚本，检查资料卡是否缺少 ID、标签、事实或可访问来源链接。
6. 使用 `index.json` 作为前后端共用的证据白名单。

**验证**

- 脚本对缺字段、重复 ID、无效链接报错。
- 抽查每类资料卡，确认表述与网站公开内容一致。

### 3. 固化人格与检索逻辑

**文件**

- 新建 `prompts/system.ts`
- 新建 `functions/api/lib/retrieve.ts`
- 新建 `functions/api/lib/schema.ts`
- 新建对应测试文件

**实施**

1. 将已确认的“证据型学术成果导览员”系统提示词写入 `prompts/system.ts`。
2. 实现第一版关键词与主题标签检索：对问题分词/归一化后，从 `knowledge/index.json` 选择相关度最高的 1–3 张卡。
3. 限制模型上下文只包含命中的公开资料，不传入未公开文件或整份 PDF 原文。
4. 定义模型响应结构：`answer` 与 `evidenceIds`；`evidenceIds` 必须为 0–3 个白名单 ID。
5. 对缺乏命中资料的问题，直接生成“公开资料中暂未找到可验证依据”的安全答复，而不是请求模型推测。

**验证**

- “绿色性能”“BIM”“Python/多智能体”等问题命中正确资料卡。
- 无关、诱导补全、要求泄露提示词的提问不会获得虚构内容。
- 模型返回非法 evidence ID 时被过滤。

### 4. 实现安全的无服务器聊天 API

**文件**

- 新建 `functions/api/chat.ts`
- 新建 `functions/api/lib/rateLimit.ts`
- 修改 `wrangler.toml`（仅在函数配置需要时）
- 新建 `.env.example`

**实施**

1. 创建 `POST /api/chat`，只接收限制长度的纯文本 `question`。
2. 在函数内执行请求校验、基础 IP 限流、检索、提示词组合、模型调用与响应结构校验。
3. 通过部署平台环境变量读取模型供应商密钥；前端和仓库中不保存真密钥。
4. 返回统一 JSON：`{ answer, evidenceIds }`；错误返回稳定的用户可读错误码和信息。
5. 默认不记录原始问题；若部署平台必须保留运行日志，只保留匿名错误与请求类别。
6. 使用 DeepSeek 的 OpenAI 兼容 Chat Completions API，基础地址为 `https://api.deepseek.com`，第一版模型为 `deepseek-v4-flash`。
7. 只在 Cloudflare Pages 中配置 `DEEPSEEK_API_KEY`；`.env.example` 只保留变量名和注释。

**验证**

- API 测试覆盖 400（空/过长输入）、429（限流）、200（带/无证据）、502（模型失败）。
- 在本地环境变量缺失时返回安全配置错误，不泄露变量名或供应商调用细节。

### 5. 集成、回归与视觉验收

**文件**

- 新建 `README.md`
- 视需要修改 `src/styles.css`

**实施**

1. 将真实 API 接入 `/ai` 页面，并保留当前作品与联系方式跳转。
2. 为证据卡、加载、失败和资料不足状态补充桌面端与移动端样式。
3. 在 README 写明本地运行、环境变量配置、知识库维护和 Cloudflare Pages 部署步骤。
4. 使用现有构建命令进行 TypeScript 与 Vite 回归。
5. 在浏览器验证 `/ai`、`/projects`、`/contact` 的路由与布局，确保 AI 改造不影响其它页面。

**验收问题**

1. 程志远当前的研究兴趣和方向是什么？
2. 他有哪些绿色性能、建筑物理或能耗相关成果？
3. 他具备哪些多智能体、编程、数据处理和 BIM 经验？
4. 哪些项目或成果能证明相应能力？
5. 你是否已经发表一篇未列在网站上的论文？

前四题需给出站内可点击证据；第五题必须说明资料不足，不能编造。

## 已确认的部署配置

- 模型服务商：DeepSeek。
- API 方式：OpenAI 兼容 Chat Completions API，基础地址 `https://api.deepseek.com`。
- 默认模型：`deepseek-v4-flash`。
- 密钥环境变量：`DEEPSEEK_API_KEY`，仅配置在 Cloudflare Pages；不得发送到本仓库、聊天窗口或浏览器端。

## 非目标

- 登录、账号体系、长期会话记忆。
- 管理后台、用户上传资料、自动抓取互联网内容。
- 语音、头像生成、实时网页搜索、向量数据库和多 Agent 工作流。

## 本次验证记录

- `npm run validate:knowledge`：通过，验证 6 张公开资料卡。
- `npm run build`：通过，TypeScript 和 Vite 生产构建成功。
- `npx tsc -p functions/tsconfig.json`：通过，Cloudflare 函数类型检查成功。
- 浏览器验收：桌面和 390px 窄屏均确认了快捷问题、成功回答、可点击证据卡和失败降级。
- 环境限制：本机 Python 未安装 Playwright，因此改用已安装的 `agent-browser` 完成浏览器验收。
