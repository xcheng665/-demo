# 首页标题滚动与作品深度轮播设计

## 目标

在首页首屏建立清晰的“文字 + 作品”双焦点：左侧以程志远的名字与研究公式说明方向，右侧以五张真实项目封面展示作品。动效应增强浏览节奏，不改变现有项目名称、内容或首页继续向下的作品预览。

## 版式

桌面端首页主视觉改为左右布局：

- 左侧保留 `ARCHITECTURE · COMPUTATION · RESEARCH`、姓名、身份信息和现有入口按钮。
- 主公式保持 `ARCHITECTURE + [关键词] = SPATIAL PRACTICE`；中间关键词逐字向上轮换。
- 右侧放置 `DepthCarousel`，高度约 500px，以首屏空间为边界，不覆盖顶部导航、底部学科条或页面控制器。
- 移动端恢复单列：文字在上，轮播在标题和按钮之间，降低轮播高度并保持可拖拽。

## 内容与组件

### RotatingText

新增独立组件及其 CSS。使用项目已经安装的 Motion 运行时；轮换词为 `DATA`、`CLIMATE`、`BIM`、`PARAMETRIC`、`PYTHON`，每两秒切换一次，逐字符向上进入并退出。屏幕阅读器只读取当前完整关键词。

### DepthCarousel

按用户指定的 React Bits JS-CSS 注册表安装 `@react-bits/DepthCarousel-JS-CSS`，并使用组件提供的源文件和所列依赖。首页数据从现有 `projects` 派生，取五张项目缩略图和项目标题作为 `items`，不引入示例图片。

组件参数固定为：`depth={220}`、`spread={90}`、`tilt={22}`、`tiltDirection="right"`、`perspective={1400}`、`visibleCards={4}`、`falloff={0.2}`、`blur={6}`、`autoplay` 和 `loop`。

## 交互与可访问性

- 轮播启用拖拽与自动播放；焦点在页面按钮与导航之间按原顺序移动，轮播不抢占键盘焦点。
- 每张图片保留项目标题作为替代文本。
- `prefers-reduced-motion` 下，关键词停止轮换，轮播不自动移动，避免持续动画。

## 验证

- 运行生产构建，确保 React Bits 源码与现有 Vite + React + TypeScript 工程兼容。
- 检查宽屏与 390px 窄屏：首页标题、轮播、底部学科条和两枚入口按钮均无重叠。
- 检查降动态设置下的静态呈现与文字可读性。

## 范围边界

仅新增两个动效组件并调整首页首屏布局、样式与必要依赖；不改项目标题、作品数据、详情页或未关联文件。
