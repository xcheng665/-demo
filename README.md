# 程志远建筑作品集

Vite + React 构建的个人作品集，包含面向高校老师的“证据型 AI 分身”页面。

## AI 分身

访问 `/ai` 后，分身会：

- 基于 `knowledge/index.json` 中的公开事实卡检索相关经历；
- 调用 DeepSeek 的 Chat Completions API 生成克制、可核验的中文回答；
- 只展示服务端验证过的站内证据链接；
- 在没有匹配资料或服务不可用时明确降级，不编造事实。

前端不会接触模型密钥。Cloudflare Pages 会将 `functions/api/chat.ts` 映射为 `/api/chat`。

## 本地开发

```bash
npm install
npm run validate:knowledge
npm run dev
```

`npm run dev` 只运行前端页面；由于 Vite 不执行 Cloudflare Pages Functions，本地聊天会显示服务未配置的降级提示。

## 部署到 Cloudflare Pages

1. 在 Cloudflare Pages 中连接此仓库，构建命令设为 `npm run build`，输出目录设为 `dist`。
2. 在 Pages 的环境变量中添加 `DEEPSEEK_API_KEY`。请只在部署平台中设置真实值，不要写入 `.env`、GitHub 或浏览器端代码。
3. 部署后，Cloudflare 会根据 `functions/api/chat.ts` 自动提供 `/api/chat`。

默认模型为 `deepseek-v4-flash`。模型调用使用 DeepSeek 的 OpenAI 兼容接口 `https://api.deepseek.com/chat/completions`。

## 质量检查

```bash
npm run validate:knowledge
npm run build
npx tsc -p functions/tsconfig.json
```

## 资料维护

编辑 `knowledge/index.json` 时，每条资料都必须具有唯一 ID、标题、摘要、站内链接、标签和可验证事实。更新后运行 `npm run validate:knowledge`。
