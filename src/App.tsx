import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bot,
  BrainCircuit,
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
  Send,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, CSSProperties, FormEvent, SyntheticEvent } from "react";
import { portfolioPages, projects, publicPath, services } from "./portfolioData";
import type { Project } from "./portfolioData";

type RoutePath = "/" | "/abilities" | "/about" | "/projects" | "/other" | "/contact" | "/ai";

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

const portfolioPdfUrl = publicPath("程志远作品集.pdf");
const resumePdfUrl = publicPath("简历_程志远.pdf");
const practiceCardImage = publicPath("assets/practice-cards/architecture-card.png");
const uiDesignImages = [
  { label: "总览", src: publicPath("assets/ui-design/overview.jpg") },
  { label: "环境", src: publicPath("assets/ui-design/environment.jpg") },
  { label: "告警", src: publicPath("assets/ui-design/alerts.jpg") },
  { label: "储能", src: publicPath("assets/ui-design/energy.jpg") },
  { label: "设置", src: publicPath("assets/ui-design/settings.jpg") }
] as const;

const routes: { path: RoutePath; label: string; labelEn: string }[] = [
  { path: "/", label: "首页", labelEn: "Home" },
  { path: "/about", label: "关于我", labelEn: "About" },
  { path: "/abilities", label: "能力", labelEn: "Abilities" },
  { path: "/projects", label: "作品集", labelEn: "Projects" },
  { path: "/other", label: "其他", labelEn: "Extras" },
  { path: "/contact", label: "联系方式", labelEn: "Contact" },
  { path: "/ai", label: "分身", labelEn: "AI" }
];

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
  uiImages?: { label: string; src: string }[];
};

const practices: PracticeCard[] = [
  {
    title: "vibe coding",
    titleEn: "Frontend & UI Design",
    eyebrow: "01 / 05",
    description: "把前端实现与界面视觉放在同一套展示语言中，聚焦储能应用的总览、环境、告警、储能与设置五个页面。",
    image: uiDesignImages[0].src,
    detail: "五台手机同时展示真实 APP 界面，每台设备内部独立纵向滚动，以完整呈现长页面的 UI 设计。",
    tags: ["前端实现", "UI 设计"],
    mode: "phones",
    uiImages: [...uiDesignImages]
  },
  {
    title: "数据科研",
    titleEn: "Research Papers",
    eyebrow: "02 / 05",
    description: "围绕数据整理、研究分析与成果表达，完成两篇论文的内容组织、图表整理与研究输出。",
    image: practiceCardImage,
    detail: "重点体现数据处理、研究判断、论文写作与结果可视化之间的完整链路。",
    tags: ["论文两篇", "研究分析"]
  },
  {
    title: "数学建模",
    titleEn: "Modeling Paper",
    eyebrow: "03 / 05",
    description: "从问题抽象、模型建立到结果验证和成文表达，形成完整的数学建模论文工作流。",
    image: practiceCardImage,
    detail: "重点体现建模分析、参数推导、结果解释以及数模论文的结构化表达。",
    tags: ["数模论文", "模型分析"]
  },
  {
    title: "绿色性能",
    titleEn: "Simulation & Energy",
    eyebrow: "04 / 05",
    description: "结合动画模拟、性能分析与节能大创实践，把绿色策略与技术路径转化为可读的成果展示。",
    image: practiceCardImage,
    detail: "重点体现模拟过程、节能研究、方案验证与项目成果之间的关联。",
    tags: ["动画模拟", "节能大创"]
  },
  {
    title: "实习项目",
    titleEn: "Working Drawings",
    eyebrow: "05 / 05",
    description: "在实习中参与施工图设计与表达，关注制图规范、节点细化和设计成果的工程落地。",
    image: practiceCardImage,
    detail: "重点体现施工图设计、图纸表达标准、协作流程与项目执行能力。",
    tags: ["施工图设计", "实习经历"]
  }
];

function PhoneMockup({
  src,
  label,
  index
}: {
  src: string;
  label: string;
  index: number;
}) {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);
  const [duration, setDuration] = useState(14);

  const updateMotion = (imgEl: HTMLImageElement) => {
    const screen = screenRef.current;
    if (!screen || !imgEl.naturalWidth || !imgEl.naturalHeight) return;
    const renderedHeight = screen.clientWidth * (imgEl.naturalHeight / imgEl.naturalWidth);
    const nextTravel = Math.max(renderedHeight - screen.clientHeight, 0);
    setTravel(nextTravel);
    setDuration(Math.max(12, Math.round(nextTravel / 18)));
  };

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    updateMotion(event.currentTarget);
  };

  useEffect(() => {
    const handleResize = () => {
      const imgEl = screenRef.current?.querySelector("img");
      if (imgEl instanceof HTMLImageElement && imgEl.complete) updateMotion(imgEl);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [src]);

  return (
    <article className="phone-mockup" style={{ "--phone-delay": `${index * 1.25}s` } as CSSProperties}>
      <div className="phone-mockup-top">
        <span className="phone-mockup-camera" />
      </div>
      <div className="phone-screen" ref={screenRef}>
        <img
          src={src}
          alt={`${label}页面界面展示`}
          onLoad={onLoad}
          style={
            {
              "--scroll-distance": `${travel}px`,
              "--scroll-duration": `${duration}s`
            } as CSSProperties
          }
        />
      </div>
      <div className="phone-mockup-label">{label}</div>
    </article>
  );
}

function PhoneShowcase({ images }: { images: { label: string; src: string }[] }) {
  return (
    <div className="phone-showcase" aria-label="APP 页面手机展示">
      {images.map((item, index) => (
        <PhoneMockup key={item.src} src={item.src} label={item.label} index={index} />
      ))}
    </div>
  );
}

type AiMessage = {
  role: "assistant" | "user";
  text: string;
};

const aiPrompts = [
  "你擅长哪些设计工具？",
  "绿色建筑方面有哪些经验？",
  "可以参与科研或系统开发吗？",
  "适合怎样的合作项目？"
];

function getAiReply(prompt: string) {
  const value = prompt.toLowerCase();
  if (value.includes("绿色") || value.includes("性能") || value.includes("模拟")) {
    return "我会把热工、日照、通风与能耗分析纳入设计推演，并有绿色建筑竞赛和椰壳围护结构能耗研究的实践。";
  }
  if (value.includes("科研") || value.includes("系统") || value.includes("python") || value.includes("数据")) {
    return "可以。我使用 Python 完成数据整理、指标计算和研究建模，也在探索多智能体灾后恢复、规范校验与建筑知识图谱等方向。";
  }
  if (value.includes("工具") || value.includes("软件") || value.includes("bim") || value.includes("建模")) {
    return "我常用 Revit、SketchUp、Rhino、Grasshopper、Photoshop、Illustrator 与 Python，覆盖建模、参数推演、可视化和数据分析。";
  }
  if (value.includes("合作") || value.includes("项目") || value.includes("适合")) {
    return "更适合建筑方案、绿色性能分析、BIM 建模与表达、参数化推演及空间数据研究等需要设计与研究协同推进的项目。";
  }
  return "我会从建筑设计、绿色模拟、BIM、参数化和数据研究的交叉经验出发，先厘清项目目标，再匹配合适的设计与技术路径。";
}

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return routes.some((route) => route.path === clean) ? (clean as RoutePath) : "/";
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
            className={current === item.path ? "is-active" : ""}
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
          className={current === item.path ? "is-active" : ""}
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
  return (
    <main className="home-page page-screen">
      <img className="home-background" src={publicPath("assets/home-architecture-collage.png")} alt="建筑设计与表达拼贴" />
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
        <p className="home-formula"><span>ARCHITECTURE</span> + DATA = SPATIAL PRACTICE</p>
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
      <div className="home-discipline-strip">
        建筑设计 <i /> 绿色模拟 <i /> BIM 可视化 <i /> 参数化设计 <i /> Python 研究
      </div>
      <div className="availability"><Circle size={10} fill="currentColor" /> OPEN TO 2026 OPPORTUNITIES</div>
      <PageControls next="/abilities" navigate={navigate} />
      <PageRail current="/" navigate={navigate} />
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
                <Icon size={21} />
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
          <h1>建筑设计，是我理解<br />场地与人的方式。</h1>
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

function ProjectCard({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const image = project.images[activeImage];

  useEffect(() => {
    project.images.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, [project.images]);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % project.images.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused, project.images.length]);

  return (
    <article
      className="project-card-new"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <a className="project-image-link" href={image} target="_blank" rel="noreferrer" aria-label={`打开${project.title}图片`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={image}
            src={image}
            alt={`${project.title}项目展示`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36 }}
          />
        </AnimatePresence>
        <span><ExternalLink size={16} /> OPEN IMAGE</span>
      </a>
      <div className="project-card-info">
        <span className="project-number">{project.number}</span>
        <div>
          <h2>{project.title}</h2>
          <p>{project.titleEn}</p>
        </div>
        <div className="project-category"><strong>{project.category}</strong><span>{project.categoryEn} · {project.year}</span></div>
        <div className="project-thumbnails" aria-label={`${project.title}图片选择`}>
          {project.images.map((src, index) => (
            <button
              className={index === activeImage ? "is-active" : ""}
              type="button"
              key={src}
              onClick={() => setActiveImage(index)}
              aria-label={`显示第${index + 1}张图片`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="project-description">
          <small>DESIGN STATEMENT</small>
          <p>{project.description}</p>
          <span>{project.descriptionEn}</span>
        </div>
      </div>
    </article>
  );
}

function ProjectsPage({ navigate, onPreviewPortfolio }: { navigate: (to: RoutePath) => void; onPreviewPortfolio: () => void }) {
  return (
    <main className="editorial-page projects-page-new page-screen">
      <SiteHeader current="/projects" navigate={navigate} />
      <div className="page-eyebrow">SELECTED WORKS · 2022—2026</div>
      <section className="projects-title-block">
        <span>PORTFOLIO</span>
        <h1>作品集</h1>
        <p>从场地、气候、结构与公共生活出发，整理五组建筑与城市设计案例。每张项目图片都可独立打开。</p>
        <button className="outline-action" type="button" onClick={onPreviewPortfolio}><FileText size={17} /> 预览完整作品集</button>
      </section>
      <section className="projects-grid-new">
        {projects.map((project) => <ProjectCard project={project} key={project.number} />)}
      </section>
      <section className="image-index-strip" aria-label="Portfolio image index">
        {portfolioPages.slice(0, 12).map((src, index) => (
          <a href={src} target="_blank" rel="noreferrer" key={src} aria-label={`打开作品集第${index + 1}页`}>
            <img src={src} alt="" loading="lazy" />
          </a>
        ))}
      </section>
      <PageControls previous="/about" next="/other" navigate={navigate} />
      <PageRail current="/projects" navigate={navigate} />
    </main>
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
        <p>把前端界面、科研写作、数学建模、绿色性能与实习项目整理成五个可被快速理解的主题。</p>
      </section>
      <section className="practice-stage" aria-label="Cross-disciplinary practice cards">
        <div className="practice-deck">
          {practices.map((item, index) => {
            const offset = getOffset(index);
            const isActive = index === activePractice;
            return (
              <button
                className={`practice-card ${isActive ? "is-active" : ""}`}
                key={item.title}
                type="button"
                onClick={() => setActivePractice(index)}
                aria-pressed={isActive}
                aria-label={`查看${item.title}`}
                style={{
                  "--card-x": `${offset * 218}px`,
                  "--card-rotation": `${offset * 5.2}deg`,
                  "--card-scale": offset === 0 ? "1" : String(0.84 - Math.abs(offset) * 0.035),
                  "--card-z": String(10 - Math.abs(offset)),
                  "--card-tint": ["rgba(247, 241, 229, 0.02)", "rgba(198, 208, 180, 0.18)", "rgba(122, 139, 100, 0.18)", "rgba(59, 53, 47, 0.12)", "rgba(198, 208, 180, 0.1)"][index]
                } as CSSProperties}
              >
                <img src={item.image} alt={`${item.title}能力插画卡片`} />
                <span className="practice-card-tint" aria-hidden="true" />
                <span className="practice-card-shade" aria-hidden="true" />
                <span className="practice-card-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong><em>{item.titleEn}</em></span>
              </button>
            );
          })}
        </div>
        <motion.div
          className={`practice-detail ${practice.mode === "phones" ? "practice-detail-wide" : ""}`}
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
          {practice.mode === "phones" && practice.uiImages ? <PhoneShowcase images={practice.uiImages} /> : null}
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
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      role: "assistant",
      text: "你好，我是程志远的 AI 分身。可以从设计能力、绿色建筑、BIM、参数化和科研经历中，帮你快速找到合适的合作切入点。"
    }
  ]);
  const [draft, setDraft] = useState("");

  const ask = (prompt: string) => {
    const question = prompt.trim();
    if (!question) return;
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: getAiReply(question) }]);
    setDraft("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <main className="editorial-page ai-page page-screen">
      <img className="ai-background" src={publicPath("assets/home-architecture-collage.png")} alt="" aria-hidden="true" />
      <SiteHeader current="/ai" navigate={navigate} dark />
      <div className="page-eyebrow ai-eyebrow">AI AVATAR · DESIGN COLLABORATION</div>
      <section className="ai-heading">
        <span><Sparkles size={15} /> PERSONAL AI AVATAR</span>
        <h1>AI 分身</h1>
        <p>从作品集与真实经历出发，30 秒了解程志远能为一个项目带来什么。</p>
      </section>
      <section className="ai-layout">
        <motion.div className="ai-chat-panel" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <header>
            <span className="ai-avatar-icon"><Bot size={20} /></span>
            <div><small>CHENG ZHIYUAN / AI</small><strong>和我的 AI 分身聊聊</strong></div>
            <span className="ai-status"><i /> 在线</span>
          </header>
          <div className="ai-transcript" aria-live="polite">
            {messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.text}</p>)}
          </div>
          <div className="ai-prompts" aria-label="快捷提问">
            {aiPrompts.map((prompt) => <button type="button" onClick={() => ask(prompt)} key={prompt}>{prompt}</button>)}
          </div>
          <form className="ai-input" onSubmit={onSubmit}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="输入想了解的问题" aria-label="向 AI 分身提问" />
            <button type="submit" aria-label="发送问题"><Send size={17} /></button>
          </form>
        </motion.div>
        <motion.aside className="ai-intro-panel" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
          <span><BrainCircuit size={19} /> PROFILE SNAPSHOT</span>
          <h2>让设计能力<br />被更快理解。</h2>
          <p>这个 AI 分身基于本站公开的作品与经历进行回答，适合快速了解设计方向、技术路径与研究协作方式。</p>
          <dl>
            <div><dt>DESIGN</dt><dd>建筑设计 / 空间表达 / 场地策略</dd></div>
            <div><dt>TOOLS</dt><dd>Revit / Rhino / Grasshopper / Python</dd></div>
            <div><dt>FOCUS</dt><dd>绿色性能 / BIM / 数据与科研</dd></div>
          </dl>
          <RouteLink className="ai-contact-link" to="/contact" navigate={navigate}><MessageCircle size={17} /> 直接联系我 <ArrowRight size={17} /></RouteLink>
        </motion.aside>
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
                <a href={portfolioPdfUrl} target="_blank" rel="noreferrer" title="新窗口打开"><ExternalLink size={18} /></a>
                <a href={portfolioPdfUrl} download title="下载作品集"><Download size={18} /></a>
                <button type="button" onClick={onClose} title="关闭"><X size={19} /></button>
              </nav>
            </header>
            <iframe src={`${portfolioPdfUrl}#toolbar=1&navpanes=0&view=FitH`} title="程志远作品集 PDF" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const { route, navigate } = useRoute();
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  useEffect(() => {
    const page = routes.find((item) => item.path === route)?.label ?? "首页";
    document.title = `${page} | 程志远建筑作品集`;
  }, [route]);

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          {route === "/" ? <HomePage navigate={navigate} /> : null}
          {route === "/abilities" ? <AbilitiesPage navigate={navigate} /> : null}
          {route === "/about" ? <AboutPage navigate={navigate} /> : null}
          {route === "/projects" ? <ProjectsPage navigate={navigate} onPreviewPortfolio={() => setPdfPreviewOpen(true)} /> : null}
          {route === "/other" ? <OtherPage navigate={navigate} /> : null}
          {route === "/contact" ? <ContactPage navigate={navigate} onPreviewPortfolio={() => setPdfPreviewOpen(true)} /> : null}
          {route === "/ai" ? <AiPage navigate={navigate} /> : null}
        </motion.div>
      </AnimatePresence>
      <PdfPreviewModal open={pdfPreviewOpen} onClose={() => setPdfPreviewOpen(false)} />
    </div>
  );
}
