export type SquareSpec = {
  x: number;
  y: number;
  size: number;
};

export type Project = {
  number: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  year: string;
  description: string;
  descriptionEn: string;
  images: string[];
  squares: SquareSpec[];
};

export type Service = {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  experience: string;
  experienceEn: string;
  evidence: string;
};

export const publicPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const portfolioPageFiles = Array.from({ length: 23 }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, "0");
  return `assets/portfolio-pages/page-${pageNumber}${pageNumber === "12" || pageNumber === "14" ? ".jpg" : ".png"}`;
});

export const portfolioPages = [
  ...portfolioPageFiles.map(publicPath),
  publicPath("assets/portfolio-pages/page-jianli.jpg")
];

export const projects: Project[] = [
  {
    number: "01",
    title: "山海 · 绿境",
    titleEn: "Mountain, Sea and Green Realm",
    category: "高品质度假酒店设计",
    categoryEn: "Resort Hotel Design",
    year: "2024",
    description: "项目回应三亚热带滨海气候与度假生活需求，以面向海景的公共轴线串联入口、庭院、客房与滨水活动空间。错动体量形成遮阳与通风界面，并通过灰空间和连续景观弱化建筑与自然之间的边界。",
    descriptionEn: "A climate-responsive resort organized by a public axis that links arrival, courtyards, guest rooms and the waterfront landscape.",
    images: [
      publicPath("assets/portfolio-pages/page-03.png"),
      publicPath("assets/portfolio-pages/page-04.png"),
      publicPath("assets/portfolio-pages/page-05.png"),
      publicPath("assets/portfolio-pages/page-06.png")
    ],
    squares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 }
    ]
  },
  {
    number: "02",
    title: "城市绿洲 · 邻里中心",
    titleEn: "Urban Oasis Neighborhood Center",
    category: "可持续社区空间设计",
    categoryEn: "Sustainable Community Space",
    year: "2024",
    description: "设计以社区共享和步行可达为核心，将邻里服务、休闲活动与绿色庭院叠合为开放的公共客厅。建筑首层保持通透，屋顶与退台转化为可使用的立体花园，建立全天候的社区交往网络。",
    descriptionEn: "A walkable neighborhood hub that layers community services, shared rooms and accessible green terraces.",
    images: [
      publicPath("assets/portfolio-pages/page-07.png"),
      publicPath("assets/portfolio-pages/page-08.png"),
      publicPath("assets/portfolio-pages/page-09.png"),
      publicPath("assets/portfolio-pages/page-10.png"),
      publicPath("assets/portfolio-pages/page-11.png")
    ],
    squares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 }
    ]
  },
  {
    number: "03",
    title: "大地 · 黎纹",
    titleEn: "Earth and Li Brocade",
    category: "城市友好型博物馆设计",
    categoryEn: "Urban-Friendly Museum",
    year: "2023",
    description: "项目从海南黎锦纹样与在地聚落中提取空间秩序，将展览、教育和城市公共活动编织进连续的参观路径。首层向城市开放，层层递进的庭院与天光空间营造具有地域记忆的博物馆体验。",
    descriptionEn: "A civic museum shaped by Li brocade patterns, layered courtyards and a continuous public exhibition route.",
    images: [
      publicPath("assets/portfolio-pages/page-12.jpg"),
      publicPath("assets/portfolio-pages/page-13.png"),
      publicPath("assets/portfolio-pages/page-14.jpg"),
      publicPath("assets/portfolio-pages/page-15.png")
    ],
    squares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 }
    ]
  },
  {
    number: "04",
    title: "生生不息 · 绿脉生长",
    titleEn: "Endless Renewal",
    category: "公园型综合体城市设计",
    categoryEn: "Park-Oriented Urban Design",
    year: "2023",
    description: "方案以“绿脉生长”为城市结构，将生态廊道、慢行系统和复合功能组织为可持续扩展的公园型综合体。建筑体量顺应公共绿轴展开，在不同标高连接商业、文化、办公与社区生活。",
    descriptionEn: "A park-oriented mixed-use district where ecological corridors and pedestrian networks guide phased urban growth.",
    images: [
      publicPath("assets/portfolio-pages/page-16.png"),
      publicPath("assets/portfolio-pages/page-17.png"),
      publicPath("assets/portfolio-pages/page-18.png"),
      publicPath("assets/portfolio-pages/page-19.png")
    ],
    squares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 }
    ]
  },
  {
    number: "05",
    title: "其他作品",
    titleEn: "Selected Works",
    category: "技术与艺术 / 综合作品",
    categoryEn: "Technology, Art and Mixed Works",
    year: "2022",
    description: "本组收录建筑技术、数字建模、视觉表达与艺术实践，呈现从手工观察到计算工具的多种工作方式。不同媒介共同服务于空间理解、构造研究和设计沟通。",
    descriptionEn: "A collection of technical studies, digital models and visual experiments spanning handcraft and computation.",
    images: [
      publicPath("assets/portfolio-pages/page-20.png"),
      publicPath("assets/portfolio-pages/page-21.png"),
      publicPath("assets/portfolio-pages/page-22.png"),
      publicPath("assets/portfolio-pages/page-23.png")
    ],
    squares: [
      { x: 6, y: 20, size: 14 },
      { x: 12, y: 34, size: 9 },
      { x: 78, y: 64, size: 12 },
      { x: 86, y: 78, size: 8 },
      { x: 92, y: 48, size: 6 }
    ]
  }
];

export const services: Service[] = [
  {
    number: "01",
    title: "建筑设计",
    titleEn: "Architectural Design",
    description: "建筑设计 1-6 均分 90+，覆盖公共建筑、居住原理、空间叙事、场地策略与建筑表达。",
    descriptionEn: "Design studio experience across public buildings, housing principles and spatial representation.",
    experience: "从公共建筑、居住原理到城市设计，我持续将场地研究、空间叙事与建筑表达整合进完整方案。作品集中的山海绿境、城市绿洲与大地黎纹，分别对应度假酒店、邻里中心与博物馆等不同尺度的设计命题。",
    experienceEn: "I develop complete architectural proposals by combining site research, spatial narrative and architectural representation across multiple scales.",
    evidence: "代表作品：山海 · 绿境 / 城市绿洲 · 邻里中心 / 大地 · 黎纹"
  },
  {
    number: "02",
    title: "绿色模拟",
    titleEn: "Green Simulation",
    description: "熟悉建筑物理、热工/声光环境分析与绿建模拟软件，并具备绿色建筑竞赛获奖实践。",
    descriptionEn: "Building physics, environmental analysis and green building simulation workflows.",
    experience: "围绕建筑热工、声光环境与绿色策略开展分析训练，并把模拟结果转化为设计决策。参与绿色建筑技能与创意大赛相关实践，获得第八届高等院校绿色建筑技能与创意大赛创意一等奖。",
    experienceEn: "I translate building-physics analysis and simulation results into design decisions, supported by award-winning green-building competition work.",
    evidence: "获奖佐证：绿色建筑技能与创意大赛 创意一等奖"
  },
  {
    number: "03",
    title: "BIM 与可视化",
    titleEn: "BIM & Visualization",
    description: "熟悉 Revit、SketchUp 建模、渲染、施工模拟、漫游动画与竞赛级汇报表达。",
    descriptionEn: "BIM modeling, rendering, construction simulation and walkthrough presentation.",
    experience: "以 Revit、SketchUp 为基础完成模型搭建、渲染表达与施工模拟，并把技术流程转化为可读的竞赛汇报。相关实践覆盖 BIM 毕业设计、斯维尔建模与数字建筑创新赛事。",
    experienceEn: "I use BIM workflows from modeling through visualization and construction simulation, then turn the process into clear competition-ready presentations.",
    evidence: "获奖佐证：BIM 毕业设计大赛二等奖 / 斯维尔大赛建模一等奖"
  },
  {
    number: "04",
    title: "参数化与数据",
    titleEn: "Computational Design",
    description: "运用 Rhino Grasshopper、Python、NumPy 与 Pandas 进行参数化推演、数据处理与研究建模。",
    descriptionEn: "Parametric workflows, Python data processing and research-oriented modeling.",
    experience: "将 Rhino Grasshopper 的几何推演与 Python 数据处理结合，用于方案参数化、信息整理和研究辅助。通过蓝桥杯、Python 技能认证及多项建模竞赛持续检验编码与数据建模能力。",
    experienceEn: "I combine Grasshopper-based geometric exploration with Python data workflows for parametric design, information processing and research support.",
    evidence: "获奖佐证：蓝桥杯全国一等奖 / Python 知识一等奖"
  },
  {
    number: "05",
    title: "科研与编程",
    titleEn: "Research & Coding",
    description: "参与椰壳围护结构能耗研究、灾后恢复多智能体流程与建筑规范可视化校验系统。",
    descriptionEn: "Research on low-energy envelopes, post-disaster workflows and code-checking systems.",
    experience: "参与椰壳围护结构能耗、灾后恢复多智能体流程与建筑规范可视化校验等研究型工作，关注从问题定义、数据处理到技术表达的完整链路，并完成相关论文与成果存证。",
    experienceEn: "My research work spans low-energy envelopes, post-disaster multi-agent workflows and visual code-checking systems from problem framing to documented outcomes.",
    evidence: "成果佐证：多智能体灾后恢复研究 / 区块链司法存证 / 专利申请受理书"
  }
];
