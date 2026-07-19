# 发现与决策

## 需求
- 改造 `/other` 页面为 5 个新主题：`vibe coding`、`数据科研`、`数学建模`、`绿色性能`、`实习项目`
- 保留现有的五卡轮播结构和左右切换方式
- `vibe coding` 需要使用 `E:\Users\czy\Desktop\UI设计` 中的 5 张图片
- `vibe coding` 详情区展示为 5 个手机框同时出现，且每个手机内部纵向滚动长图

## 研究发现
- `/other` 页当前由 `src/App.tsx` 中的 `practices` 数据和 `OtherPage` 组件控制
- 现有视觉结构为：标题区 + 扇形卡片轮播 + 下方详情说明
- 相关样式集中在 `src/styles.css` 的 `.other-*`、`.practice-*` 区域
- 当前卡片使用统一插画 `public/assets/practice-cards/architecture-card.png`

## 技术决策
| 决策 | 理由 |
|------|------|
| 保留 `OtherPage` 的轮播逻辑 | 可最小化改动范围并保持交互一致 |
| 新增手机展示组件而非复用现有插画图层 | 只有这样才能满足 5 个手机框同时展示和长图纵向滚动 |
| 将外部 UI 图片复制到站点 `public` 目录中 | 便于 Vite 正常静态引用和部署 |
| 移动端将 5 台手机降级为横向滚动 | 防止窄屏下 5 台设备同时展示造成拥挤和遮挡 |

## 遇到的问题
| 问题 | 解决方案 |
|------|---------|
| 外部图片位于项目目录外 | 复制到 `public/assets` 下作为站点资源使用 |

## 资源
- `E:\Users\czy\Desktop\UI设计\总览.jpg`
- `E:\Users\czy\Desktop\UI设计\环境.jpg`
- `E:\Users\czy\Desktop\UI设计\告警.jpg`
- `E:\Users\czy\Desktop\UI设计\储能.jpg`
- `E:\Users\czy\Desktop\UI设计\设置.jpg`
- 设计说明：`docs/superpowers/specs/2026-07-19-other-page-design.md`

## 视觉/浏览器发现
- 当前 `/other` 页的核心辨识度来自顶部扇形卡组，适合保留
- `vibe coding` 的视觉重心需要从“插画卡”切换为“设备中的真实界面”
- 手机组件需要桌面端 5 台同时出现，移动端应降级为横向滚动或分行，避免拥挤
- 构建已通过，开发预览服务可正常启动到 `http://localhost:5173/other`

---
*每执行2次查看/浏览器/搜索操作后更新此文件*
*防止视觉信息丢失*
