import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Code2,
  Compass,
  Download,
  DraftingCompass,
  ExternalLink,
  FileText,
  Layers3,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode, TouchEvent, WheelEvent as ReactWheelEvent } from "react";
import { AiChat } from "./components/AiChat";
import BorderGlow from "./components/BorderGlow";
// @ts-expect-error The official React Bits JS-CSS registry component is intentionally JavaScript-only.
import DepthCarousel from "./components/DepthCarousel/DepthCarousel";
import { RagOverview } from "./components/RagOverview";
import { RotatingText } from "./components/RotatingText/RotatingText";
import { modelingPapers, projects, publicPath, researchPapers, services } from "./portfolioData";
import type { Project, ResearchPaper } from "./portfolioData";

type MainRoutePath = "/" | "/abilities" | "/about" | "/projects" | "/other" | "/contact" | "/ai";
type ProjectRoutePath = `/projects/${string}`;
type RoutePath = MainRoutePath | ProjectRoutePath;

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: RoutePath;
  navigate: (to: RoutePath) => void;
};

type SkillItem = {
  title: string;
  level: "熟练" | "能运用" | "研究中";
  summary: string;
  experience: string;
};

type SkillGroup = {
  title: string;
  titleEn: string;
  icon: LucideIcon;
  items: SkillItem[];
};

const portfolioPdfUrl = publicPath("portfolio-preview.pdf");
const resumePdfUrl = publicPath("resume.pdf");
const practiceCardImages = {
  frontend: publicPath("assets/practice-cards/frontend-ui-tarot-card.png"),
  research: publicPath("assets/practice-cards/research-papers-tarot-card-v2.png"),
  modeling: publicPath("assets/practice-cards/modeling-tarot-card.png"),
  green: publicPath("assets/practice-cards/green-performance-male-card.png"),
  drawings: publicPath("assets/practice-cards/working-drawings-male-card.png")
} as const;
const communitySceneUrl = publicPath("assets/community-helper/community-scene.png");
const energySceneUrl = publicPath("assets/energy-manager/energy-scene.png");
const homeProjectPreviewColumns = [0, 1, 2].map((columnIndex) =>
  projects
    .flatMap((project) => project.images.map((src) => ({ project, src })))
    .filter((_, itemIndex) => itemIndex % 3 === columnIndex)
);
const homeCarouselItems = projects.slice(0, 5).map((project) => ({
  image: project.thumbnail,
  alt: `${project.title} · ${project.titleEn}`,
  project
}));

const routes: { path: MainRoutePath; label: string; labelEn: string }[] = [
  { path: "/", label: "首页", labelEn: "Home" },
  { path: "/about", label: "关于我", labelEn: "About" },
  { path: "/abilities", label: "能力", labelEn: "Abilities" },
  { path: "/projects", label: "项目", labelEn: "Project" },
  { path: "/other", label: "其他", labelEn: "Extras" },
  { path: "/contact", label: "联系方式", labelEn: "Contact" },
  { path: "/ai", label: "分身", labelEn: "AI" }
];

function projectRoute(project: Project): ProjectRoutePath {
  return `/projects/${project.number}`;
}

function projectForPath(pathname: string): Project | undefined {
  return projects.find((project) => projectRoute(project) === pathname);
}

const skillGroups: SkillGroup[] = [
  {
    title: "建筑设计与表达",
    titleEn: "Architecture & Representation",
    icon: DraftingCompass,
    items: [
      {
        title: "建筑设计",
        level: "熟练",
        summary: "公共建筑 / 居住原理 / 城市设计 / 空间叙事",
        experience: services[0].experience
      },
      {
        title: "场地与策略",
        level: "熟练",
        summary: "场地研究 / 人群与流线 / 气候适应 / 功能组织",
        experience: "从三亚滨海度假酒店到海口新区综合体，持续用场地条件建立方案逻辑，并通过轴线、节点与公共空间组织设计。"
      },
      {
        title: "图纸与汇报",
        level: "熟练",
        summary: "总图 / 平立剖 / 分析图 / 竞赛级版式",
        experience: "能够独立完成从设计推演到成套图纸、渲染图与汇报文本的整合表达。"
      }
    ]
  },
  {
    title: "绿色建筑与模拟",
    titleEn: "Green Building & Simulation",
    icon: Leaf,
    items: [
      {
        title: "建筑物理",
        level: "熟练",
        summary: "热工 / 声环境 / 光环境 / 气候响应",
        experience: services[1].experience
      },
      {
        title: "性能分析",
        level: "能运用",
        summary: "日照时数 / 通风模拟 / 能耗判断 / 数据可视化",
        experience: "在城市综合体与绿色建筑竞赛中，将日照和通风结果用于建筑朝向、体量与景观空间的调整。"
      },
      {
        title: "低能耗研究",
        level: "研究中",
        summary: "围护结构 / 椰壳材料 / 绿色策略验证",
        experience: "参与椰壳围护结构能耗研究，关注材料、构造与建筑性能之间的量化关系。"
      }
    ]
  },
  {
    title: "BIM 与可视化",
    titleEn: "BIM & Visualization",
    icon: Layers3,
    items: [
      {
        title: "BIM 建模",
        level: "熟练",
        summary: "Revit / 协同建模 / 构件信息 / 施工模拟",
        experience: services[2].experience
      },
      {
        title: "三维表达",
        level: "熟练",
        summary: "SketchUp / Rhino / 建筑动画 / 漫游",
        experience: "使用 SketchUp 与 Rhino 快速完成体量推演、精细建模，并衔接渲染与漫游动画流程。"
      },
      {
        title: "渲染与后期",
        level: "熟练",
        summary: "效果图 / Photoshop / Illustrator / 版面整合",
        experience: "能够独立控制建筑效果图、分析图和版面视觉的一致性，形成可直接汇报的成果。"
      }
    ]
  },
  {
    title: "参数化、数据与科研",
    titleEn: "Computation, Data & Research",
    icon: Code2,
    items: [
      {
        title: "参数化设计",
        level: "能运用",
        summary: "Grasshopper / 几何推演 / 参数控制 / 方案比较",
        experience: services[3].experience
      },
      {
        title: "Python 数据处理",
        level: "熟练",
        summary: "Python / NumPy / Pandas / 图表与研究建模",
        experience: "使用 Python 完成数据整理、指标计算与研究建模，并把结果转化为可读图表和设计判断。"
      },
      {
        title: "科研与系统开发",
        level: "研究中",
        summary: "多智能体流程 / 规范校验 / Git / GitHub",
        experience: services[4].experience
      }
    ]
  }
];

type PracticeCard = {
  title: string;
  titleEn: string;
  eyebrow: string;
  description: string;
  image: string;
  detail: string;
  tags?: string[];
  mode?: "text" | "phones";
  uiProjects?: {
    project: "community" | "energy";
    title: string;
    titleEn: string;
    description: string;
    tags: string[];
  }[];
  videos?: { label: string; src: string }[];
  papers?: ResearchPaper[];
};

const practices: PracticeCard[] = [
  {
    title: "UI设计",
    titleEn: "Mobile UI Design",
    eyebrow: "01 / 05",
    description: "围绕社区互助与绿色能源管理，完成两套面向真实生活场景的移动端界面设计与前端实现。",
    image: practiceCardImages.frontend,
    detail: "十个页面均由 React 与 CSS 构建，以真实场景照片承托信息判断，并按两个完整产品案例纵向展开。",
    tags: ["社区互助", "储能管理", "移动端 UI", "前端实现"],
    mode: "phones",
    uiProjects: [
      {
        project: "community",
        title: "邻里帮",
        titleEn: "Neighborhood Helper",
        description: "以真实社区地图与生活场景为入口，串联快递代取、物品互借、顺路拼车与个人信用的完整邻里互助流程。",
        tags: ["社区互助", "地图任务", "邻里信用"]
      },
      {
        project: "energy",
        title: "绿能管家",
        titleEn: "Smart Energy Manager",
        description: "将能耗总览、环境监测、异常告警、储能调控与个人设置整合为可读、可操作的社区能源运维体验。",
        tags: ["储能管理", "设备告警", "绿色社区"]
      }
    ]
  },
  {
    title: "数据科研",
    titleEn: "Research Papers",
    eyebrow: "02 / 05",
    description: "围绕数据整理、研究分析与成果表达，完成三篇论文的内容组织、图表整理与研究输出。",
    image: practiceCardImages.research,
    detail: "重点体现数据处理、研究判断、论文写作与结果可视化之间的完整链路。",
    tags: ["论文三篇", "研究分析"],
    papers: researchPapers
  },
  {
    title: "数学建模",
    titleEn: "Modeling Paper",
    eyebrow: "03 / 05",
    description: "从问题抽象、模型建立到结果验证和成文表达，形成完整的数学建模论文工作流。",
    image: practiceCardImages.modeling,
    detail: "重点体现建模分析、参数推导、结果解释以及数模论文的结构化表达。",
    tags: ["数模论文", "模型分析"],
    papers: modelingPapers
  },
  {
    title: "绿色性能",
    titleEn: "Simulation & Energy",
    eyebrow: "04 / 05",
    description: "结合动画模拟、性能分析与节能大创实践，把绿色策略与技术路径转化为可读的成果展示。",
    image: practiceCardImages.green,
    detail: "重点体现模拟过程、节能研究、方案验证与项目成果之间的关联。",
    tags: ["动画模拟", "节能大创"],
    videos: [
      { label: "风环境模拟", src: publicPath("assets/practice-videos/wind-environment-simulation.mp4") },
      { label: "剖面模拟", src: publicPath("assets/practice-videos/section-simulation.mp4") }
    ]
  },
  {
    title: "实习项目",
    titleEn: "Working Drawings",
    eyebrow: "05 / 05",
    description: "在实习中参与施工图设计与表达，关注制图规范、节点细化和设计成果的工程落地。",
    image: practiceCardImages.drawings,
    detail: "重点体现施工图设计、图纸表达标准、协作流程与项目执行能力。",
    tags: ["施工图设计", "实习经历"]
  }
];

type CodePhoneProps = { label: string; index: number; children: ReactNode };

function CodePhone({ label, index, children }: CodePhoneProps) {
  return <article className="phone-mockup code-phone" style={{ "--phone-delay": `${index * 0.12}s` } as CSSProperties}>
    <div className="phone-mockup-top"><span className="phone-mockup-camera" /></div>
    <div className="phone-screen code-phone-screen">{children}</div>
    <div className="phone-mockup-label">{label}</div>
  </article>;
}

function AppNav({ active, insight }: { active: string; insight: string }) {
  return <><div className="app-presence"><span>●</span>{insight}<b>›</b></div><nav className="app-bottom-nav" aria-label="应用导航">{["附近", "互助", "发布", "消息", "我的"].map((item) => <span className={active === item ? "is-active" : ""} key={item}><b>{item === "发布" ? "+" : item === "附近" ? "⌂" : item === "互助" ? "♧" : item === "消息" ? "◌" : "◉"}</b>{item}</span>)}</nav></>;
}

function AppPhoto({ src, className = "" }: { src: string; className?: string }) {
  return <img className={`app-photo ${className}`} src={src} alt="社区实景" />;
}

function CommunityAppScreen({ view }: { view: number }) {
  const labels = ["附近地图", "快递代取", "物品互借", "顺路拼车", "我的邻里"];
  const card = (title: string, text: string, tone = "") => <div className={`code-task-card ${tone}`}><small>翠湖花园 · 260m</small><b>{title}</b><p>{text}</p><i>顺路可帮</i></div>;
  return <CodePhone label={labels[view]} index={view}><div className="app-code community-code">
    {view === 0 && <><header><strong>附近的互助</strong><span>程</span></header><div className="app-search">⌕ 搜索快递、借物、拼车</div><div className="app-chip-row"><i>距我最近</i><i>紧急</i><i>新发布</i></div><div className="code-map"><em className="map-road r1"/><em className="map-road r2"/><em className="map-road r3"/><AppPhoto src={communitySceneUrl} className="map-scene"/><b className="map-pin p1">取</b><b className="map-pin p2">车</b><b className="map-pin p3">借</b><small>翠湖花园</small></div>{card("帮忙取一下驿站快递", "今晚加班，取件码已备好。")}</>}
    {view === 1 && <><header><strong>快递代取</strong><span>筛选</span></header><div className="app-tabs"><b>待取件 2</b><span>已取件</span><span>代收中</span></div><div className="code-photo-card"><AppPhoto src={communitySceneUrl} className="parcel-photo"/><div><b>2号驿站 · 取件码 6682</b><p>丰巢智能柜 · 北门隔壁</p><button>我已取件</button></div></div>{card("再带一件 1 栋的快递", "同一路线，还差 1 位邻居。", "compact")}</>}
    {view === 2 && <><header><strong>物品互借</strong><span>分类</span></header><div className="app-chip-row"><i>全部</i><i>工具</i><i>家居</i><i>运动</i></div>{[["电钻（含钻头）", "9成新 · 3人借过"], ["折叠梯", "可借 2 小时"], ["工具箱套装", "周末可取"]].map(([title, meta], item) => <div className="borrow-row" key={title}><AppPhoto src={communitySceneUrl} className={`borrow-photo photo-${item}`}/><div><b>{title}</b><p>{meta}</p><span>查看详情 ›</span></div></div>)}</>}
    {view === 3 && <><header><strong>顺路出行</strong><span>发布</span></header><div className="carpool-hero"><AppPhoto src={communitySceneUrl}/><div><small>明天 08:30</small><b>翠湖花园 → 交管路地铁站</b><p>还剩 2 个座位 · 车主已认证</p></div></div><div className="app-chip-row"><i>今天 16:30</i><i>明天 08:30</i></div>{["李师傅 · 5.0分", "王女士 · 4.9分"].map((driver) => <div className="driver-row" key={driver}><span>李</span><div><b>{driver}</b><p>翠湖花园出发 · 准点</p></div><i>加入</i></div>)}</>}
    {view === 4 && <><header><strong>我的</strong><span>⚙</span></header><div className="profile-cover"><AppPhoto src={communitySceneUrl}/><div><b>程知远</b><small>翠湖花园 · 已认证居民</small></div></div><div className="app-stats"><span><b>18</b>帮助邻居</span><span><b>96</b>邻里信用</span><span><b>7</b>收到感谢</span></div><p className="app-section-title">MY NEIGHBORHOOD</p>{["我发布的需求", "我响应的请求", "我的借用记录", "常用地点"].map((item, idx) => <div className="code-menu" key={item}>{item}<span>{idx < 3 ? [2, 1, 3][idx] : ""}　›</span></div>)}</>}
    <AppNav active={view === 0 ? "附近" : view === 4 ? "我的" : "互助"} insight={["附近还有 3 个需求等待回应", "今日已有 6 件快递被顺路带回", "你的物品借用守约率 100%", "同路线还有 2 位邻居准备出发", "本周收到 2 句邻里感谢"][view]}/>
  </div></CodePhone>;
}

function EnergyAppScreen({ view }: { view: number }) {
  const labels = ["能耗总览", "环境监测", "告警中心", "储能调控", "个人设置"];
  return <CodePhone label={labels[view]} index={view}><div className="app-code energy-code">
    {view === 0 && <><header><strong>绿能管家</strong><span>⌁</span></header><div className="energy-aerial"><AppPhoto src={energySceneUrl}/><b className="energy-marker m1">☀</b><b className="energy-marker m2">⌁</b><b className="energy-marker m3">⚡</b></div><div className="energy-kpi"><span><b>286</b>今日发电 kWh</span><span><b>72%</b>电池 SOC</span></div><div className="bar-chart">{[35, 42, 58, 49, 74, 85, 68].map((n) => <i style={{ height: `${n}%` }} key={n}/>)}</div></>}
    {view === 1 && <><header><strong>环境监测</strong><span>☘</span></header><div className="energy-photo"><AppPhoto src={energySceneUrl}/></div><div className="energy-grid"><div><small>日照强度</small><b>92</b><em>舒适</em></div><div><small>实时温度</small><b>26°</b><em>正常</em></div><div><small>空气质量</small><b>42</b><em>优</em></div><div><small>光伏效率</small><b>81%</b><em>稳定</em></div></div><div className="curve-line"><span/></div></>}
    {view === 2 && <><header><strong>告警中心</strong><span>···</span></header><div className="alert-strip">▲ 1 项异常待处理 <b>›</b></div><div className="alert-photo"><AppPhoto src={energySceneUrl}/><span>设备现场照片</span></div><div className="severity"><b>高优先级</b><p>储能柜温度持续偏高，请在 2 小时内检查。</p></div><div className="thumb-row">{[1,2,3,4].map((x) => <AppPhoto src={energySceneUrl} key={x}/>)}</div><button className="app-main-button">派发工单</button></>}
    {view === 3 && <><header><strong>储能调控</strong><span>⌁</span></header><div className="energy-flow"><span>☀</span><i/> <b>⚡</b><i/> <span>▯</span></div><div className="energy-kpi triple"><span><b>3.21</b>光伏输入</span><span><b>2.48</b>储能功率</span><span><b>0.73</b>负载</span></div><div className="storage-photo"><AppPhoto src={energySceneUrl}/><b>储能柜运行中</b></div><div className="blue-chart"><span/></div></>}
    {view === 4 && <><header><strong>系统设置</strong><span>⚙</span></header><div className="energy-profile"><AppPhoto src={energySceneUrl}/><div><b>绿能管家</b><p>翠湖花园 A 区</p></div></div><div className="goal-card"><b>68%</b><span/><p>本月绿色用能目标</p></div>{["告警通知", "节能建议", "设备巡检", "隐私与权限"].map((item, idx) => <div className="code-menu" key={item}>{item}<span>{idx === 0 ? "●" : "›"}</span></div>)}</>}
    <AppNav active={view === 3 ? "发布" : view === 4 ? "我的" : "附近"} insight={["当前社区绿色用能率 72%", "环境舒适，适合开启自然通风", "1 项异常已进入优先处理队列", "预计今晚可释放 5.7h 储能空间", "通知设置已同步至社区运维中心"][view]}/>
  </div></CodePhone>;
}

function PhoneShowcase({ project }: { project: "community" | "energy" }) {
  return <div className="phone-showcase code-phone-showcase" aria-label="代码实现的 APP 页面展示">{Array.from({ length: 5 }, (_, index) => project === "community" ? <CommunityAppScreen key={index} view={index}/> : <EnergyAppScreen key={index} view={index}/>)}</div>;
}

function UiProjectStack({ projects }: { projects: NonNullable<PracticeCard["uiProjects"]> }) {
  return (
    <div className="ui-project-stack" aria-label="UI 设计案例">
      {projects.map((item, index) => (
        <section className="ui-project-section" key={item.project} aria-labelledby={`ui-project-${item.project}`}>
          <div className="ui-project-heading">
            <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <small>{item.titleEn}</small>
            <h3 id={`ui-project-${item.project}`}>{item.title}</h3>
            <p>{item.description}</p>
            <div className="ui-project-tags" aria-label={`${item.title}标签`}>
              {item.tags.map((tag) => <i key={tag}>{tag}</i>)}
            </div>
          </div>
          <PhoneShowcase project={item.project} />
        </section>
      ))}
    </div>
  );
}

function PracticeVideoShowcase({ videos }: { videos: { label: string; src: string }[] }) {
  return (
    <div className="practice-video-showcase" aria-label="绿色性能模拟视频">
      {videos.map((video) => (
        <figure key={video.src}>
          <figcaption>{video.label}</figcaption>
          <video controls preload="metadata" playsInline>
            <source src={video.src} type="video/mp4" />
            您的浏览器不支持视频播放。
          </video>
        </figure>
      ))}
    </div>
  );
}

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (routes.some((route) => route.path === clean)) return clean as MainRoutePath;
  return projectForPath(clean) ? (clean as ProjectRoutePath) : "/";
}

function useRoute() {
  const [route, setRoute] = useState<RoutePath>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: RoutePath) => {
    if (to !== route) window.history.pushState({}, "", to);
    setRoute(to);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return { route, navigate };
}

function RouteLink({ to, navigate, onClick, children, ...props }: RouteLinkProps) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function useCurrentTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Shanghai"
    }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function SiteHeader({ current, navigate, dark = false }: { current: RoutePath; navigate: (to: RoutePath) => void; dark?: boolean }) {
  const time = useCurrentTime();

  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <div className="site-meta" aria-label="Location and local time">
        <span><MapPin size={14} /> HAIKOU, CN</span>
        <span><Clock3 size={14} /> {time} CST</span>
        <span><Compass size={14} /> 20.02° N, 110.35° E</span>
      </div>
      <nav className="top-nav" aria-label="Primary navigation">
        {routes.map((item) => (
          <RouteLink
            className={current === item.path || (item.path === "/projects" && current.startsWith("/projects/")) ? "is-active" : ""}
            key={item.path}
            to={item.path}
            navigate={navigate}
          >
            <span>{item.label}</span>
            <small>{item.labelEn}</small>
          </RouteLink>
        ))}
      </nav>
    </header>
  );
}

function PageRail({ current, navigate, dark = false }: { current: RoutePath; navigate: (to: RoutePath) => void; dark?: boolean }) {
  return (
    <nav className={`page-rail ${dark ? "page-rail-dark" : ""}`} aria-label="Page index">
      {routes.map((item) => (
        <RouteLink
          className={current === item.path || (item.path === "/projects" && current.startsWith("/projects/")) ? "is-active" : ""}
          key={item.path}
          to={item.path}
          navigate={navigate}
          aria-label={item.label}
          title={item.label}
        >
          <Circle size={11} fill={current === item.path ? "currentColor" : "none"} />
        </RouteLink>
      ))}
    </nav>
  );
}

function PageControls({
  previous,
  next,
  navigate,
  dark = false
}: {
  previous?: RoutePath;
  next?: RoutePath;
  navigate: (to: RoutePath) => void;
  dark?: boolean;
}) {
  return (
    <div className={`page-controls ${dark ? "page-controls-dark" : ""}`}>
      {previous ? (
        <RouteLink className="outline-control" to={previous} navigate={navigate}>
          <ArrowUp size={14} /> UP
        </RouteLink>
      ) : null}
      {next ? (
        <RouteLink className="outline-control" to={next} navigate={navigate}>
          NEXT <ArrowDown size={14} />
        </RouteLink>
      ) : null}
    </div>
  );
}

function HomePage({ navigate }: { navigate: (to: RoutePath) => void }) {
  const [activeHomeProjectIndex, setActiveHomeProjectIndex] = useState(0);
  const activeHomeProject = homeCarouselItems[activeHomeProjectIndex]?.project ?? projects[0];

  return (
    <main className="home-page">
      <section className="home-hero page-screen">
        <img className="home-background" src={publicPath("assets/home-architecture-collage.png")} alt="建筑设计与表达拼贴" fetchPriority="high" />
        <div className="home-perimeter-glow" aria-hidden="true" />
        <SiteHeader current="/" navigate={navigate} />
        <motion.section
          className="home-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="home-kicker">ARCHITECTURE · COMPUTATION · RESEARCH</span>
          <h1>程志远</h1>
          <p className="home-formula">
            <span>ARCHITECTURE +</span>
            <RotatingText
              texts={["DATA", "CLIMATE", "BIM", "PARAMETRIC", "PYTHON"]}
              className="home-formula-rotating"
            />
            <span>= SPATIAL PRACTICE</span>
          </p>
          <p className="home-identity">CHENG ZHIYUAN <i /> 海南 · HAINAN</p>
          <div className="home-actions">
            <RouteLink className="primary-action" to="/projects" navigate={navigate}>
              查看作品集 <ArrowRight size={18} />
            </RouteLink>
            <RouteLink className="text-action" to="/contact" navigate={navigate}>
              联系方式 <ChevronRight size={17} />
            </RouteLink>
          </div>
        </motion.section>
        <motion.aside
          className="home-showcase"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="home-depth-carousel" aria-label="作品封面轮播">
            <div className="home-carousel-caption" aria-live="polite">
              <div>
                <small>FEATURED PROJECT / {activeHomeProject.number}</small>
                <strong>{activeHomeProject.title}</strong>
                <span>{activeHomeProject.titleEn}</span>
              </div>
              <RouteLink to={projectRoute(activeHomeProject)} navigate={navigate}>查看项目 <ArrowRight size={14} /></RouteLink>
            </div>
            <DepthCarousel
              items={homeCarouselItems}
              cardWidth={280}
              cardHeight={354}
              depth={150}
              spread={54}
              tilt={18}
              tiltDirection="right"
              perspective={1400}
              visibleCards={3}
              falloff={0.2}
              blur={6}
              autoplay
              loop
              showControls={false}
              showAutoplayToggle={false}
              ariaLabel="作品封面轮播"
              onChange={(index: number) => setActiveHomeProjectIndex(index)}
              onItemActivate={(_: number, item: (typeof homeCarouselItems)[number]) => navigate(projectRoute(item.project))}
            />
          </div>
        </motion.aside>
        <div className="home-discipline-strip">
          建筑设计 <i /> 绿色模拟 <i /> BIM 可视化 <i /> 参数化设计 <i /> Python 研究
        </div>
        <div className="availability"><Circle size={10} fill="currentColor" /> OPEN TO 2026 OPPORTUNITIES</div>
        <PageControls next="/abilities" navigate={navigate} />
        <PageRail current="/" navigate={navigate} />
      </section>

      <section className="home-project-preview" aria-label="项目详情滚动预览">
        <div className="home-project-preview-gallery">
          {homeProjectPreviewColumns.map((column, columnIndex) => (
            <div className={`home-project-preview-column column-${columnIndex + 1}`} key={columnIndex}>
              <div className="home-project-preview-track">
                {[...column, ...column].map((item, itemIndex) => (
                  <RouteLink
                    className="home-project-preview-card"
                    key={`${item.src}-${itemIndex}`}
                    to={projectRoute(item.project)}
                    navigate={navigate}
                    aria-label={`打开${item.project.title}项目`}
                    title={item.project.title}
                  >
                    <img src={item.src} alt={`${item.project.title}项目详情图`} />
                  </RouteLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AbilitiesPage({ navigate }: { navigate: (to: RoutePath) => void }) {
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  return (
    <main className="editorial-page abilities-page page-screen">
      <SiteHeader current="/abilities" navigate={navigate} />
      <div className="page-eyebrow">ABOUT ME · 子篇 B · 具备技能</div>
      <section className="abilities-heading">
        <p>BUILT THROUGH DESIGN STUDIOS, COMPETITIONS AND RESEARCH</p>
        <h1>已掌握的硬技能</h1>
        <div>
          按真实项目经验分为熟练、能运用与研究中。<br />点击每一项可查看对应的个人经历。
        </div>
      </section>
      <section className="skill-grid" aria-label="Professional abilities">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <motion.article
              className="skill-column"
              key={group.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.08, duration: 0.5 }}
            >
              <header>
                <span className="skill-column-icon"><Icon size={23} /></span>
                <div><h2>{group.title}</h2><p>{group.titleEn}</p></div>
              </header>
              <div className="skill-items">
                {group.items.map((item) => {
                  const key = `${group.title}-${item.title}`;
                  const isOpen = openSkill === key;
                  return (
                    <button
                      className={`skill-item ${isOpen ? "is-open" : ""}`}
                      type="button"
                      key={key}
                      onClick={() => setOpenSkill(isOpen ? null : key)}
                      aria-expanded={isOpen}
                    >
                      <span className="skill-item-title">
                        <strong>{item.title}</strong>
                        <em>{item.level}</em>
                      </span>
                      <span className="skill-summary">{item.summary}</span>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.span
                            className="skill-experience"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {item.experience}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </section>
      <PageControls previous="/" next="/about" navigate={navigate} />
      <PageRail current="/abilities" navigate={navigate} />
    </main>
  );
}

function AboutPage({ navigate }: { navigate: (to: RoutePath) => void }) {
  return (
    <main className="editorial-page about-page-new page-screen">
      <SiteHeader current="/about" navigate={navigate} />
      <div className="page-eyebrow">PROFILE · ARCHITECTURE STUDENT · HAINAN UNIVERSITY</div>
      <section className="about-layout">
        <motion.aside
          className="resume-profile-panel"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="resume-profile-top">
            <img src={publicPath("assets/profile-color.png")} alt="程志远彩色证件照" />
            <div>
              <small>ARCHITECTURE · RESEARCH · COMPUTATION</small>
              <h1>程志远</h1>
              <p>CHENG ZHIYUAN</p>
            </div>
          </div>
          <div className="resume-contact-row">
            <a href="tel:18879819661"><Phone size={17} /> 18879819661</a>
            <a href="mailto:18879819661@163.com"><Mail size={17} /> 18879819661@163.com</a>
          </div>
          <div className="resume-metrics" aria-label="Academic profile">
            <div><strong>3.65 / 4.0</strong><span>GPA</span></div>
            <div><strong>4 / 57</strong><span>专业绩点排名</span></div>
            <div><strong>492</strong><span>CET-6</span></div>
          </div>
          <dl className="resume-education">
            <div><dt>EDUCATION</dt><dd>海南大学 · 建筑学<br /><span>2022.09 — 至今</span></dd></div>
            <div><dt>TOOLS</dt><dd>Revit / SketchUp / Rhino / Grasshopper / Python</dd></div>
            <div><dt>RESEARCH</dt><dd>绿色建筑性能 / 多智能体灾后恢复 / 建筑知识图谱</dd></div>
          </dl>
          <a className="resume-document-link" href={resumePdfUrl} target="_blank" rel="noreferrer">
            查看完整简历 PDF <ExternalLink size={16} />
          </a>
        </motion.aside>
        <motion.div
          className="about-story"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>ABOUT ME</span>
          <h1>建筑技术，是我理解<br />场地与人的方式。</h1>
          <p>我是程志远，海南大学土木建筑工程学院建筑学专业学生。我的设计与研究关注在地性、气候适应、绿色建筑性能与数字工具的结合。</p>
          <p>我希望把建筑设计、BIM、参数化流程和 Python 数据分析放在同一条工作链中，让空间判断既有感受，也有证据。</p>
          <dl className="about-facts">
            <div><dt>EDUCATION</dt><dd>海南大学 · 建筑学</dd></div>
            <div><dt>FOCUS</dt><dd>绿色性能 · 数字建造 · 韧性研究</dd></div>
            <div><dt>WORKFLOW</dt><dd>Design → Simulation → Data → Story</dd></div>
          </dl>
          <div className="inline-actions">
            <a className="primary-action" href={resumePdfUrl} target="_blank" rel="noreferrer">查看简历 <ExternalLink size={17} /></a>
            <RouteLink className="text-action" to="/contact" navigate={navigate}>联系我 <ChevronRight size={17} /></RouteLink>
          </div>
        </motion.div>
      </section>
      <PageControls previous="/abilities" next="/projects" navigate={navigate} />
      <PageRail current="/about" navigate={navigate} />
    </main>
  );
}

function ProjectIndexCard({ project, navigate }: { project: Project; navigate: (to: RoutePath) => void }) {
  return (
    <RouteLink className="project-index-card" to={projectRoute(project)} navigate={navigate} aria-label={`查看项目：${project.title}`}>
      <BorderGlow className="project-index-glow" borderRadius={14} glowRadius={22}>
        <figure>
          <img src={project.thumbnail} alt={`${project.title}项目封面`} />
          <span>VIEW PROJECT <ArrowRight size={15} /></span>
        </figure>
      </BorderGlow>
      <div>
        <strong>{project.number} / {project.title}</strong>
        <small>{project.categoryEn}</small>
      </div>
    </RouteLink>
  );
}

function ProjectsPage({ navigate }: { navigate: (to: RoutePath) => void }) {
  return (
    <main className="editorial-page projects-page page-screen">
      <SiteHeader current="/projects" navigate={navigate} />
      <div className="page-eyebrow">SELECTED WORKS · 2022—2026</div>
      <section className="projects-title-block">
        <span>ABOUT ME</span>
        <h1>Project</h1>
        <p>项目</p>
      </section>
      <section className="project-index-grid" aria-label="项目列表">
        {projects.map((project) => <ProjectIndexCard project={project} navigate={navigate} key={project.number} />)}
      </section>
      <PageControls previous="/about" next="/other" navigate={navigate} />
      <PageRail current="/projects" navigate={navigate} />
    </main>
  );
}

function ProjectDetailPage({ project, navigate }: { project: Project; navigate: (to: RoutePath) => void }) {
  const projectIndex = projects.findIndex((item) => item.number === project.number);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const coverCards = project.coverMedia ?? [
    { src: project.images[0], type: "image" as const, size: "landscape" as const, label: "项目封面" },
    { type: "image" as const, size: "portrait" as const, label: "项目补充图片一" },
    { type: "image" as const, size: "landscape" as const, label: "项目补充图片二" }
  ];
  const galleryImages = project.images.filter((src) => !coverCards.some((card) => card.src === src));
  const closingMedia = project.closingMedia ?? [];
  const detailPages = [
    { label: "概览" },
    ...project.preludeMedia?.map((media, index) => ({ label: media.label || `视频 ${index + 1}` })) ?? [],
    ...galleryImages.map((_, index) => ({ label: `图纸 ${String(index + 1).padStart(2, "0")}` })),
    ...closingMedia.map((media, index) => ({ label: media.label || `结尾 ${index + 1}` }))
  ];
  const usesLandscapeTriptych = coverCards.length === 3 && coverCards.every((card) => card.size === "landscape");
  const projectSplashImage = project.splashImage ?? coverCards.find((card) => card.type === "image" && card.src)?.src ?? project.thumbnail;
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const projectPageRef = useRef<HTMLElement>(null);
  const wheelLockUntil = useRef(0);
  const verticalWheelLockUntil = useRef(0);
  const autoAdvanceResumeAt = useRef(0);
  const [activeDetailPage, setActiveDetailPage] = useState(0);

  const scrollToDetailPage = (pageIndex: number) => {
    const container = detailScrollRef.current;
    if (!container) return;

    autoAdvanceResumeAt.current = performance.now() + 30_000;
    const target = container.querySelector<HTMLElement>(`[data-detail-page="${pageIndex}"]`);
    setActiveDetailPage(pageIndex);
    if (window.matchMedia("(min-width: 761px)").matches) {
      container.scrollTo({ left: pageIndex * container.clientWidth, behavior: "smooth" });
      return;
    }
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleProjectPageWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (event.defaultPrevented || !window.matchMedia("(min-width: 761px)").matches) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || !event.deltaY) return;

    const container = event.currentTarget;
    const now = performance.now();
    if (now < verticalWheelLockUntil.current) {
      event.preventDefault();
      return;
    }

    const maxScrollTop = container.scrollHeight - container.clientHeight;
    const currentPage = Math.round(container.scrollTop / container.clientHeight);
    const nextPage = Math.max(0, Math.min(Math.round(maxScrollTop / container.clientHeight), currentPage + (event.deltaY > 0 ? 1 : -1)));
    const nextScrollTop = nextPage * container.clientHeight;
    if (nextScrollTop === container.scrollTop) return;

    event.preventDefault();
    verticalWheelLockUntil.current = now + 700;
    container.scrollTo({ top: nextScrollTop, behavior: "smooth" });
  };

  const handleDetailWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(min-width: 761px)").matches) return;

    const container = event.currentTarget;
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const now = performance.now();
    if (now < wheelLockUntil.current || maxScrollLeft <= 0) {
      event.preventDefault();
      return;
    }

    const currentPage = Math.round(container.scrollLeft / container.clientWidth);
    const nextPage = Math.max(0, Math.min(Math.round(maxScrollLeft / container.clientWidth), currentPage + (delta > 0 ? 1 : -1)));
    const nextScrollLeft = nextPage * container.clientWidth;
    if (nextScrollLeft === container.scrollLeft) return;

    event.preventDefault();
    wheelLockUntil.current = now + 700;
    container.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  };

  const handleDetailKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(min-width: 761px)").matches) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    event.currentTarget.scrollBy({
      left: event.key === "ArrowRight" ? event.currentTarget.clientWidth : -event.currentTarget.clientWidth,
      behavior: "smooth"
    });
  };

  const handleDetailScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    if (!window.matchMedia("(min-width: 761px)").matches || !container.clientWidth) return;
    setActiveDetailPage(Math.max(0, Math.min(detailPages.length - 1, Math.round(container.scrollLeft / container.clientWidth))));
  };

  useEffect(() => {
    const container = detailScrollRef.current;
    if (!container) return;

    let paused = false;
    let visible = false;
    const mediaQuery = window.matchMedia("(min-width: 761px)");

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      visible = entries[0]?.isIntersecting ?? false;
    };
    const observer = new IntersectionObserver(handleVisibility, { threshold: 0.2 });

    const advance = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (!paused && performance.now() >= autoAdvanceResumeAt.current && visible && mediaQuery.matches && maxScrollLeft > 0) {
        const nextScrollLeft = container.scrollLeft + container.clientWidth;
        container.scrollTo({
          left: nextScrollLeft >= maxScrollLeft - 1 ? 0 : nextScrollLeft,
          behavior: "smooth"
        });
      }
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", resume);
    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume, { passive: true });
    observer.observe(container);
    const intervalId = window.setInterval(advance, 2000);

    return () => {
      window.clearInterval(intervalId);
      observer.disconnect();
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", resume);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
    };
  }, [project.number]);

  useEffect(() => {
    setActiveDetailPage(0);
    autoAdvanceResumeAt.current = 0;
  }, [project.number]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);

    if (horizontalDistance < 56 || horizontalDistance <= verticalDistance) return;
    navigate(projectRoute(deltaX > 0 ? previousProject : nextProject));
  };

  return (
    <main className="project-detail-page" ref={projectPageRef} onWheel={handleProjectPageWheel}>
      <motion.section
        className="project-slide project-splash-slide"
        initial={{ opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className="project-splash-image" src={projectSplashImage} alt={`${project.title}项目全屏封面`} />
        <div className="project-splash-overlay" aria-hidden="true" />
        <RouteLink className="project-return project-splash-return" to="/projects" navigate={navigate}>
          <ChevronLeft size={18} />
          <span><strong>全部项目</strong><small>ALL PROJECTS</small></span>
        </RouteLink>
        <div className="project-wordmark project-splash-wordmark">Project</div>
        <div className="project-splash-content">
          <span>{project.number} / SELECTED WORK</span>
          <h1>{project.title}</h1>
          <p>{project.titleEn}</p>
          <a className="project-splash-enter" href="#project-profile">
            <span>浏览项目</span>
            <span>EXPLORE PROJECT</span>
            <ArrowDown size={18} />
          </a>
        </div>
      </motion.section>
      <div
        className="project-detail-scroll"
        ref={detailScrollRef}
        tabIndex={0}
        aria-label={`${project.title}项目详情横向浏览区域`}
        onWheel={handleDetailWheel}
        onKeyDown={handleDetailKeyDown}
        onScroll={handleDetailScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.section
          id="project-profile"
          className="project-slide project-cover-slide"
          data-detail-page="0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <RouteLink className="project-return" to="/projects" navigate={navigate}>
            <ChevronLeft size={18} />
            <span><strong>全部项目</strong><small>ALL PROJECTS</small></span>
          </RouteLink>
          <div className={`project-wordmark project-wordmark-${project.number}`}>Project</div>
          <div className={`project-cover-content project-cover-content-${project.number}`}>
            <div className="project-cover-heading">
              <span className="project-cover-index">{project.number} / PROJECT</span>
              <h1>{project.title}</h1>
              <p className="project-cover-title-en">{project.titleEn}</p>
            </div>
            <div className="project-cover-meta">
              <span className="project-cover-meta-category">{project.category}</span>
              <span className="project-cover-meta-category-en">{project.categoryEn}</span>
              <span className="project-cover-meta-year">{project.year}</span>
              {(project.credits ?? [{ label: "AUTHOR", value: "程志远" }]).map((credit) => (
                <span className="project-cover-credit" key={credit.label}>
                  <small>{credit.label}</small><span className="project-cover-credit-value">{credit.value}</span>
                </span>
              ))}
            </div>
            <div className="project-cover-description">
              <h2 className="project-cover-description-title">Project</h2>
              <p className="project-cover-summary">{project.description}</p>
              <p className="project-cover-summary-en">{project.descriptionEn}</p>
            </div>
            <div className={`project-cover-media project-cover-media-${project.number}${usesLandscapeTriptych ? " is-landscape-triptych" : ""}`} aria-label={`${project.title}项目媒体`}>
              {coverCards.map((card, index) => (
                <figure className="project-cover-media-item" key={card.label}>
                  {card.caption ? <figcaption className="project-cover-media-caption">{card.caption}{card.captionEn ? <span>{card.captionEn}</span> : null}</figcaption> : null}
                  {!card.src ? (
                    <div className={`project-cover-card project-cover-card-${card.size} is-placeholder`} aria-label={`${project.title}${card.label}占位`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ) : card.type === "video" ? (
                    <div className={`project-cover-card project-cover-card-${card.size} project-cover-card-video`} style={{ aspectRatio: card.aspectRatio }} aria-label={`${project.title}${card.label}`}>
                      <video autoPlay loop muted playsInline preload="metadata" aria-label={`${project.title}${card.label}`}>
                        <source src={card.src} type="video/mp4" />
                      </video>
                      <span className="project-cover-video-label">{card.label}</span>
                    </div>
                  ) : (
                    <a className={`project-cover-card project-cover-card-${card.size}`} style={{ aspectRatio: card.aspectRatio }} href={card.src} target="_blank" rel="noreferrer" aria-label={`在新窗口打开${project.title}${card.label}`}>
                      <img src={card.src} alt={`${project.title}${card.label}`} />
                    </a>
                  )}
                </figure>
              ))}
            </div>
          </div>
          <span className="project-scroll-hint">SCROLL FOR DRAWINGS</span>
        </motion.section>
        {project.preludeMedia?.map((media, index) => (
          <motion.section
            className="project-slide project-video-slide"
            key={media.src}
            data-detail-page={index + 1}
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.58, once: true }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header><span>VIDEO {String(index + 1).padStart(2, "0")}</span><span>{project.titleEn}</span></header>
            <ProjectReturnControl navigate={navigate} />
            <div className="project-video-stage">
              <video
                autoPlay
                loop
                muted
                controls
                playsInline
                preload="metadata"
                aria-label={`${project.title}${media.label}`}
                onTimeUpdate={media.clipEndSeconds ? (event) => {
                  if (event.currentTarget.currentTime >= media.clipEndSeconds!) {
                    event.currentTarget.currentTime = 0;
                  }
                } : undefined}
              >
                <source src={media.src} type="video/mp4" />
              </video>
              <span>{media.label}</span>
            </div>
          </motion.section>
        ))}
        {galleryImages.map((src, index) => (
          <motion.section
            className="project-slide project-drawing-slide"
            key={src}
            data-detail-page={1 + (project.preludeMedia?.length ?? 0) + index}
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.58, once: true }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header><span>{String(index + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span><span>{project.titleEn}</span></header>
            <ProjectReturnControl navigate={navigate} />
            <a href={src} target="_blank" rel="noreferrer" aria-label={`在新窗口打开${project.title}第${index + 1}张图纸`}>
              <img src={src} alt={`${project.title}图纸 ${index + 1}`} loading="lazy" />
            </a>
            <span className="project-drawing-page">{String(index + 1).padStart(2, "0")}</span>
            </motion.section>
        ))}
        {closingMedia.map((media, index) => (
          <motion.section
            className="project-slide project-closing-slide"
            key={media.src ?? media.label}
            data-detail-page={1 + (project.preludeMedia?.length ?? 0) + galleryImages.length + index}
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.58, once: true }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header><span>END / {String(index + 1).padStart(2, "0")}</span><span>{project.titleEn}</span></header>
            <ProjectReturnControl navigate={navigate} />
            <div className="project-closing-content">
              <div className="project-closing-video">
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title}${media.label}`}
                >
                  <source src={media.src} type="video/mp4" />
                </video>
                <span>{media.label}</span>
              </div>
              <div className="project-closing-copy">
                <span className="project-closing-eyebrow">SPACE WALKTHROUGH</span>
                <h2>{project.title}</h2>
                <p className="project-closing-title-en">{project.titleEn}</p>
                <p>{project.description}</p>
                <p className="project-closing-copy-en">{project.descriptionEn}</p>
                <div className="project-closing-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
      <div className="project-page-switches" aria-label="切换项目">
        <ProjectSwitchControl direction="previous" project={previousProject} navigate={navigate} />
        <ProjectSwitchControl direction="next" project={nextProject} navigate={navigate} />
      </div>
      <nav className="project-detail-pager" aria-label="项目详情页码">
        <span className="project-detail-pager-status">{String(activeDetailPage + 1).padStart(2, "0")} / {String(detailPages.length).padStart(2, "0")}</span>
        <div className="project-detail-pager-pages">
          {detailPages.map((page, index) => (
            <button
              type="button"
              className={index === activeDetailPage ? "is-active" : ""}
              key={`${page.label}-${index}`}
              onClick={() => scrollToDetailPage(index)}
              aria-label={`跳转至第${index + 1}页：${page.label}`}
              aria-current={index === activeDetailPage ? "page" : undefined}
              title={page.label}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}

function ProjectReturnControl({ navigate }: { navigate: (to: RoutePath) => void }) {
  return (
    <RouteLink className="project-return project-detail-return" to="/projects" navigate={navigate} aria-label="返回全部项目">
      <ChevronLeft size={18} />
      <span><strong>全部项目</strong><small>ALL PROJECTS</small></span>
    </RouteLink>
  );
}

function ProjectSwitchControl({
  direction,
  project,
  navigate
}: {
  direction: "previous" | "next";
  project: Project;
  navigate: (to: RoutePath) => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <RouteLink
      className={`project-switch project-switch-${direction}`}
      to={projectRoute(project)}
      navigate={navigate}
      aria-label={`切换到${isPrevious ? "上一" : "下一"}项目：${project.title}`}
    >
      {isPrevious ? <ChevronLeft size={42} /> : <ChevronRight size={42} />}
      <span>{project.number}<small>{isPrevious ? "PREV" : "NEXT"}</small></span>
    </RouteLink>
  );
}

function ResearchPaperArchive({ papers }: { papers: ResearchPaper[] }) {
  return (
    <section className="paper-archive" aria-label="研究论文全文下载">
      <div className="paper-archive-heading">
        <span>RESEARCH ARCHIVE</span>
        <strong>全文下载</strong>
      </div>
      <div className="paper-archive-list">
        {papers.map((paper, index) => (
          <article className="paper-archive-card" key={paper.title}>
            <div className="paper-archive-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="paper-archive-body">
              <small>{paper.category}</small>
              <h3>{paper.title}</h3>
              {paper.titleEn ? <p className="paper-archive-title-en">{paper.titleEn}</p> : null}
              {paper.award ? <p className="paper-archive-award">{paper.award}</p> : null}
              <p className="paper-archive-summary">{paper.summary}</p>
            </div>
            {paper.href ? (
              <a className="paper-archive-download" href={paper.href} download aria-label={`下载${paper.title}全文 PDF`}>
                <Download size={16} aria-hidden="true" />
                <span>下载全文 PDF</span>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function OtherPage({ navigate }: { navigate: (to: RoutePath) => void }) {
  const [activePractice, setActivePractice] = useState(0);
  const practice = practices[activePractice];

  const getOffset = (index: number) => {
    let offset = index - activePractice;
    if (offset > Math.floor(practices.length / 2)) offset -= practices.length;
    if (offset < -Math.floor(practices.length / 2)) offset += practices.length;
    return offset;
  };

  const movePractice = (direction: number) => {
    setActivePractice((current) => (current + direction + practices.length) % practices.length);
  };

  return (
    <main className="editorial-page other-page page-screen">
      <SiteHeader current="/other" navigate={navigate} />
      <div className="page-eyebrow">CROSS-DISCIPLINARY WORK · RESEARCH · INTERFACE</div>
      <section className="other-heading">
        <span>SELECTED DIRECTIONS</span>
        <h1>跨学科实践与<br />项目表达</h1>
        <p>把 UI 设计、科研写作、数学建模、绿色性能与实习项目整理成五个可被快速理解的主题。</p>
      </section>
      <section className="practice-stage" aria-label="Cross-disciplinary practice cards">
        <div className="practice-deck">
          {practices.map((item, index) => {
            const offset = getOffset(index);
            const isActive = index === activePractice;
            return (
              <BorderGlow
                className={`practice-card ${isActive ? "is-active" : ""}`}
                key={item.title}
                borderRadius={4}
                glowRadius={18}
                glowIntensity={0.55}
                style={{
                  "--card-x": `${offset * 218}px`,
                  "--card-rotation": `${offset * 5.2}deg`,
                  "--card-scale": offset === 0 ? "1" : String(0.84 - Math.abs(offset) * 0.035),
                  "--card-z": String(10 - Math.abs(offset))
                } as CSSProperties}
              >
                <button
                  className="practice-card-button"
                  type="button"
                  onClick={() => setActivePractice(index)}
                  aria-pressed={isActive}
                  aria-label={`查看${item.title}`}
                >
                  <img src={item.image} alt={`${item.title}能力插画卡片`} />
                  <span className="practice-card-shade" aria-hidden="true" />
                  <span className="practice-card-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong><em>{item.titleEn}</em></span>
                </button>
              </BorderGlow>
            );
          })}
        </div>
        <motion.div
          className={`practice-detail ${practice.mode === "phones" || practice.videos?.length ? "practice-detail-wide" : ""}`}
          key={practice.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="practice-detail-count">{practice.eyebrow}</div>
          <h2>{practice.title}</h2>
          <p>{practice.description}</p>
          <span>{practice.detail}</span>
          {practice.tags?.length ? (
            <div className="practice-tags" aria-label={`${practice.title}标签`}>
              {practice.tags.map((tag) => (
                <i key={tag}>{tag}</i>
              ))}
            </div>
          ) : null}
          {practice.papers?.length ? <ResearchPaperArchive papers={practice.papers} /> : null}
          {practice.mode === "phones" && practice.uiProjects?.length ? <UiProjectStack projects={practice.uiProjects} /> : null}
          {practice.videos?.length ? <PracticeVideoShowcase videos={practice.videos} /> : null}
          <div className="practice-switcher" aria-label="切换主题卡片">
            <button type="button" onClick={() => movePractice(-1)} aria-label="上一张主题卡片"><ChevronLeft size={18} /></button>
            <div>{practices.map((item, index) => <i className={index === activePractice ? "is-active" : ""} key={item.title} />)}</div>
            <button type="button" onClick={() => movePractice(1)} aria-label="下一张主题卡片"><ChevronRight size={18} /></button>
          </div>
        </motion.div>
      </section>
      <PageControls previous="/projects" next="/contact" navigate={navigate} />
      <PageRail current="/other" navigate={navigate} />
    </main>
  );
}

function ContactPage({ navigate, onPreviewPortfolio }: { navigate: (to: RoutePath) => void; onPreviewPortfolio: () => void }) {
  return (
    <main className="editorial-page contact-page-new page-screen">
      <SiteHeader current="/contact" navigate={navigate} />
      <div className="page-eyebrow">CONTACT · COLLABORATION · OPPORTUNITIES</div>
      <section className="contact-layout">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <span>LET'S TALK</span>
          <h1><span>让设计、数据与研究</span><span>在一个项目里相遇。</span></h1>
          <p className="contact-tagline-en">DESIGN, DATA AND RESEARCH.<br />UNITED IN ONE SPATIAL PRACTICE.</p>
          <p>欢迎联系建筑设计、绿色模拟、BIM、参数化与研究协作。</p>
        </motion.div>
        <div className="contact-links">
          <a href="tel:18879819661"><Phone size={22} /><span><small>PHONE</small>18879819661</span><ArrowUpRightIcon /></a>
          <a href="mailto:18879819661@163.com"><Mail size={22} /><span><small>EMAIL</small>18879819661@163.com</span><ArrowUpRightIcon /></a>
          <a href={resumePdfUrl} target="_blank" rel="noreferrer"><Download size={22} /><span><small>DOCUMENT</small>下载个人简历</span><ArrowUpRightIcon /></a>
          <button type="button" onClick={onPreviewPortfolio}><FileText size={22} /><span><small>PORTFOLIO</small>站内预览作品集</span><ArrowUpRightIcon /></button>
        </div>
      </section>
      <div className="contact-footer">© 2026 CHENG ZHIYUAN · ARCHITECTURE PORTFOLIO</div>
      <PageControls previous="/other" next="/ai" navigate={navigate} />
      <PageRail current="/contact" navigate={navigate} />
    </main>
  );
}

function AiPage({ navigate }: { navigate: (to: RoutePath) => void }) {
  return (
    <main className="editorial-page ai-page page-screen">
      <img className="ai-background" src={publicPath("assets/home-architecture-collage.png")} alt="" aria-hidden="true" />
      <SiteHeader current="/ai" navigate={navigate} dark />
      <div className="page-eyebrow ai-eyebrow">AI AVATAR · DESIGN COLLABORATION</div>
      <section className="ai-heading">
        <span><Sparkles size={15} /> PERSONAL AI AVATAR · RAG</span>
        <h1>AI 分身</h1>
        <p>先检索公开证据，再回答你的问题。30 秒了解程志远能为一个项目带来什么。</p>
      </section>
      <section className="ai-layout">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <AiChat />
        </motion.div>
        <motion.div className="ai-rag-column" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
          <RagOverview />
          <RouteLink className="ai-contact-link" to="/contact" navigate={navigate}><MessageCircle size={17} /> 直接联系我 <ArrowRight size={17} /></RouteLink>
        </motion.div>
      </section>
      <PageControls previous="/contact" navigate={navigate} dark />
      <PageRail current="/ai" navigate={navigate} dark />
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ExternalLink size={17} aria-hidden="true" />;
}

function PdfPreviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="pdf-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div
            className="pdf-modal"
            role="dialog"
            aria-modal="true"
            aria-label="作品集 PDF 预览"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div><small>PORTFOLIO PREVIEW</small><strong>程志远作品集</strong></div>
              <nav>
                <button type="button" onClick={onClose} title="关闭"><X size={19} /></button>
              </nav>
            </header>
            <iframe src={`${portfolioPdfUrl}#toolbar=0&navpanes=0&view=FitH`} title="程志远作品集 PDF" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const { route, navigate } = useRoute();
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const activeProject = projectForPath(route);

  useEffect(() => {
    const page = activeProject?.title ?? routes.find((item) => item.path === route)?.label ?? "首页";
    document.title = `${page} | 程志远建筑作品集`;
  }, [activeProject, route]);

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          {route === "/" ? <HomePage navigate={navigate} /> : null}
          {route === "/abilities" ? <AbilitiesPage navigate={navigate} /> : null}
          {route === "/about" ? <AboutPage navigate={navigate} /> : null}
          {route === "/projects" ? <ProjectsPage navigate={navigate} /> : null}
          {activeProject ? <ProjectDetailPage project={activeProject} navigate={navigate} /> : null}
          {route === "/other" ? <OtherPage navigate={navigate} /> : null}
          {route === "/contact" ? <ContactPage navigate={navigate} onPreviewPortfolio={() => setPdfPreviewOpen(true)} /> : null}
          {route === "/ai" ? <AiPage navigate={navigate} /> : null}
        </motion.div>
      </AnimatePresence>
      <PdfPreviewModal open={pdfPreviewOpen} onClose={() => setPdfPreviewOpen(false)} />
    </div>
  );
}
