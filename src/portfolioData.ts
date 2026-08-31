export type SquareSpec = {
  x: number;
  y: number;
  size: number;
};

export type CoverMedia = {
  src?: string;
  type: "image" | "video";
  size: "landscape" | "portrait";
  aspectRatio?: number;
  clipEndSeconds?: number;
  label: string;
  caption?: string;
  captionEn?: string;
};

export type ProjectCredit = {
  label: string;
  value: string;
};

export type ProjectStatement = {
  problem: string;
  strategy: string;
  outcome: string;
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
  thumbnail: string;
  splashImage?: string;
  images: string[];
  coverMedia?: CoverMedia[];
  preludeMedia?: CoverMedia[];
  closingMedia?: CoverMedia[];
  credits?: ProjectCredit[];
  personalInfo?: Array<{ label: string; value: string }>;
  statement: ProjectStatement;
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

export type ResearchPaper = {
  title: string;
  titleEn?: string;
  category: string;
  summary: string;
  href?: string;
  award?: string;
};

const paperPath = (file: string) => publicPath(`papers/${file}`);

export const researchPapers: ResearchPaper[] = [
  {
    title: "椰壳混凝土建筑围护结构",
    titleEn: "Coconut Concrete Building Envelope",
    category: "SCI PAPER",
    summary: "围绕椰壳废弃物在建筑围护结构中的应用，梳理材料性能、构造策略与建筑节能之间的关系。",
    href: paperPath("coconut-concrete-envelope-sci.pdf")
  },
  {
    title: "台风后恢复管理中的多智能体协同",
    titleEn: "Lean Post-typhoon Recovery Multi-agent Look-ahead and Constraints for the Last Planner System",
    category: "RESEARCH PAPER",
    summary: "研究台风灾后恢复场景中的多智能体前瞻计划与约束管理，探索 Last Planner System 的协同工作流。",
    href: paperPath("post-typhoon-recovery-last-planner.pdf")
  },
  {
    title: "海口历史建筑遗产知识图谱",
    titleEn: "Haikou Heritage Knowledge Graph",
    category: "RESEARCH PAPER",
    summary: "以海口历史建筑遗产为对象，整理建筑、历史、空间与保护信息之间的关联，形成可检索的知识图谱。",
    href: paperPath("haikou-heritage-knowledge-graph.pdf")
  }
];

export const modelingPapers: ResearchPaper[] = [
  {
    title: "嵌入式养老社区服务优化问题",
    category: "CONTENT THEME",
    summary: "从服务需求、资源配置与优化目标出发，建立嵌入式养老社区服务的数学建模与分析框架。",
    href: paperPath("embedded-elderly-community-service-optimization.pdf"),
    award: "电工杯一等奖"
  }
];

const projectCover = (file: string) => publicPath(`assets/project-covers/${file}`);

const portfolioPageFiles = Array.from({ length: 23 }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, "0");
  const jpgPages = new Set(["01", "03", "05", "07", "09", "12", "14"]);
  return `assets/portfolio-pages/page-${pageNumber}${jpgPages.has(pageNumber) ? ".jpg" : ".png"}`;
});

export const portfolioPages = [
  ...portfolioPageFiles.map(publicPath),
  publicPath("assets/portfolio-pages/page-jianli.jpg")
];

export const projects: Project[] = [
  {
    number: "01",
    title: "遮阳的十二时辰",
    titleEn: "The Twelve Hours of Shade",
    category: "高品质度假酒店设计",
    categoryEn: "Resort Hotel Design",
    year: "2024",
    description: "顺应山海地貌，以架空基座与层叠客房平台组织滨海界面，在开放城市生活与私密度假体验之间保留连续海景。",
    descriptionEn: "An elevated coastal resort balancing private stays, public life and uninterrupted sea views through terraced rooms and an open ground plane.",
    thumbnail: projectCover("项目1.jpg"),
    images: [
      publicPath("assets/project-pages/page-04.jpg"),
      publicPath("assets/project-pages/page-05.jpg"),
      publicPath("assets/project-pages/page-06.jpg"),
      publicPath("assets/project-pages/page-07.jpg"),
      publicPath("assets/project-pages/page-08.jpg")
    ],
    coverMedia: [
      { src: projectCover("项目1_0.jpg"), type: "image", size: "landscape", aspectRatio: 1.74, label: "项目 1 - 0", caption: "海滨度假酒店整体效果图，展示架空体量、层叠平台与海岸景观的关系。", captionEn: "Overall perspective showing elevated volume, terraced platforms and the coastal landscape." },
      { src: projectCover("项目1_剖面图.jpg"), type: "image", size: "landscape", aspectRatio: 1, label: "项目 1 - 2", caption: "建筑剖面图，展示客房、架空层与公共空间的竖向组织及通风采光策略。", captionEn: "Building section showing vertical organization of guest rooms, elevated level and public spaces, and daylight & ventilation strategy." },
      { src: projectCover("项目1_1.jpg"), type: "image", size: "portrait", aspectRatio: 0.82, label: "项目 1 - 1", caption: "体量模型图，呈现错落楼层、庭院节点与滨海步行空间的组合关系。", captionEn: "Mass model showing staggered floors, courtyard nodes and coastal pedestrian spaces." }
    ],
    credits: [
      { label: "AUTHOR", value: "程志远" }
    ],
    personalInfo: [
      { label: "个人设计", value: "大三学年" },
      { label: "指导老师", value: "罗致、吴旭东" },
      { label: "设计区位", value: "三亚市吉阳区大东海景区海岸" },
      { label: "完成时间", value: "2024年2月—2024年4月" }
    ],
    statement: {
      problem: "滨海酒店需要同时保障客房私密、公共空间开放与连续海景，三者容易彼此冲突。",
      strategy: "顺应山海地貌抬高建筑基座，以层叠客房平台串联庭院、步道与共享空间。",
      outcome: "建立由城市走向海岸的渐进空间，让度假体验、自然通风与公共活力相互兼容。"
    },
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
    title: "城市绿洲邻里中心",
    titleEn: "Urban Oasis Neighborhood Center",
    category: "可持续社区空间设计",
    categoryEn: "Sustainable Community Space",
    year: "2025—2026",
    description: "以黎锦船形屋的形态逻辑组织场地、建筑与遮阴廊道，让文化意象转化为兼具共享活动与生态韧性的社区日常。",
    descriptionEn: "A neighborhood center translating Li brocade boat-house logic into shaded public space, cultural activity and ecological resilience.",
    thumbnail: projectCover("项目2.jpg"),
    images: [
      publicPath("assets/project-pages/page-09.jpg"),
      publicPath("assets/project-pages/page-10.jpg"),
      publicPath("assets/project-pages/page-11.jpg"),
      publicPath("assets/project-pages/page-12.jpg"),
      publicPath("assets/project-pages/page-13.jpg"),
      publicPath("assets/project-pages/page-14.jpg")
    ],
    coverMedia: [
      { src: projectCover("项目2_0.jpg"), type: "image", size: "landscape", aspectRatio: 1.74, label: "项目 2 - 0", caption: "城市绿洲邻里中心整体表达图，展示建筑与绿地、廊道的融合关系。", captionEn: "Overall expression of the Urban Oasis Neighborhood Center, showing the integration of architecture, site and corridors." },
      { src: projectCover("项目2_2.jpg"), type: "image", size: "landscape", aspectRatio: 1, label: "项目 2 - 2", caption: "建筑空间细节图，展示黎锦形态转译后的屋面、庭院与公共界面。", captionEn: "Architectural spatial details, showing the translated roof form, courtyard and public interface." },
      { src: projectCover("项目2_1.png"), type: "image", size: "portrait", aspectRatio: 0.82, label: "项目 2 - 1", caption: "剖面表达图，展示传统船形屋意向与现代社区功能的叠合方式。", captionEn: "Sectional diagrams, illustrating the integration of traditional boat-shaped house concepts with modern community functions." }
    ],
    credits: [
      { label: "ROLE", value: "团队设计 · 主创 / 队长 · 程志远" },
      { label: "ADVISORS", value: "易法珠 · 张忆先" },
      { label: "SITE", value: "海口市琼山区历史街区附近" },
      { label: "TEAM", value: "程志远 · 岑伊林 · 林倩 · 陈华琳 · 崔溪源" }
    ],
    personalInfo: [
      { label: "团队设计", value: "主创/队长" },
      { label: "指导老师", value: "易法珠、张忆先" },
      { label: "设计区位", value: "海口市琼山区历史街区附近" },
      { label: "完成时间", value: "2025年7月—2026年3月" }
    ],
    preludeMedia: [
      { src: projectCover("项目2_生长动画.mp4"), type: "video", size: "landscape", clipEndSeconds: 15, label: "生长动画" }
    ],
    closingMedia: [
      { src: projectCover("项目2_漫游动画.mp4"), type: "video", size: "landscape", label: "空间漫游" }
    ],
    statement: {
      problem: "黎锦与船形屋意象容易停留在符号表面，难以回应社区遮阴、交往与日常使用。",
      strategy: "提取船形屋的屋面逻辑，以乡土绿荫和连续廊道串联庭院、展陈与共享活动。",
      outcome: "将地域文化转化为可参与的生活场景，形成兼具共享活力与生态韧性的邻里中心。"
    },
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
    title: "大地黎纹",
    titleEn: "Earth and Li Brocade",
    category: "城市友好型博物馆设计",
    categoryEn: "Urban-Friendly Museum",
    year: "2023",
    description: "将黎锦纹样转化为悬浮体量、采光庭院与织物感表皮，串联城市街道、台地与展陈空间的立体参观路径。",
    descriptionEn: "Li brocade patterns become a floating volume, daylight courts and a woven façade along a layered public route from street to gallery.",
    thumbnail: projectCover("项目3.jpg"),
    images: [
      publicPath("assets/project-pages/page-15.jpg"),
      publicPath("assets/project-pages/page-16.jpg"),
      publicPath("assets/project-pages/page-17.jpg"),
      publicPath("assets/project-pages/page-18.jpg")
    ],
    coverMedia: [
      { src: projectCover("项目3_0.jpg"), type: "image", size: "landscape", aspectRatio: 1.74, label: "项目 3 - 0", caption: "博物馆总体效果图，展示悬浮体量、开放基座与城市界面的关系。", captionEn: "Overall rendering of the museum, illustrating the relationship between the floating volume, open base and urban context." },
      { src: projectCover("项目3_1.jpg"), type: "image", size: "landscape", aspectRatio: 1, label: "项目 3 - 1", caption: "建筑空间透视图，呈现黎锦纹样转译出的庭院、屋顶花园与木质表皮。", captionEn: "Spatial perspective showing the courtyards, roof garden and timber façade derived from Li brocade patterns." },
      { src: projectCover("项目3_2.jpg"), type: "image", size: "portrait", aspectRatio: 0.82, label: "项目 3 - 2", caption: "构造与立面表达图，展示经纬交织的表皮肌理与台地式参观路径。", captionEn: "Detail view of the structure and façade, illustrating the interwoven façade texture and terraced circulation." }
    ],
    credits: [
      { label: "AUTHOR", value: "程志远" }
    ],
    personalInfo: [
      { label: "个人设计", value: "大三学年" },
      { label: "指导老师", value: "蔡家庆、吉伟" },
      { label: "设计区位", value: "海口市琼山区红城湖南侧历史保护街区" },
      { label: "完成时间", value: "2024年9月—2024年11月" }
    ],
    statement: {
      problem: "博物馆体量容易与城市街道疏离，黎锦文化也需要转化为可感知的空间体验。",
      strategy: "将经纬纹样转译为悬浮体量、采光庭院与织物感表皮，组织立体参观路径。",
      outcome: "建立从街道、台地到展厅连续展开的公共路径，使文化展示与城市日常自然衔接。"
    },
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
    title: "生生不息绿脉生长",
    titleEn: "Endless Renewal",
    category: "公园型综合体城市设计",
    categoryEn: "Park-Oriented Urban Design",
    year: "2023",
    description: "以红色生态廊道串联多元功能与公共空间，让公园、文化、商业和酒店共同构成可持续生长的城市片区。",
    descriptionEn: "Red ecological corridors connect park, culture, commerce and hospitality into a district designed to grow with the city.",
    thumbnail: projectCover("项目4.jpg"),
    images: [
      publicPath("assets/project-pages/page-19.jpg"),
      publicPath("assets/project-pages/page-20.jpg"),
      publicPath("assets/project-pages/page-21.jpg"),
      publicPath("assets/project-pages/page-22.jpg")
    ],
    coverMedia: [
      { src: projectCover("项目4_0.jpg"), type: "image", size: "landscape", aspectRatio: 1.74, label: "项目 4 - 0", caption: "综合体总体鸟瞰图，展示红色生态廊道串联多功能建筑群的城市结构。", captionEn: "Overall aerial view, showing the urban structure linked by red ecological corridors." },
      { src: projectCover("项目4_2.jpg"), type: "image", size: "landscape", aspectRatio: 1, label: "项目 4 - 2", caption: "城市设计关系图，呈现公园、公共空间与商业文化功能的复合布局。", captionEn: "Urban design diagram, showing the composite layout of park, public, commercial and cultural programs." },
      { src: projectCover("项目4_1.jpg"), type: "image", size: "portrait", aspectRatio: 0.82, label: "项目 4 - 1", caption: "建筑细部表达图，展示绿脉生长理念在立面、景观与步行界面中的延展。", captionEn: "Architectural detail, extending the green-vein concept through façade, landscape and pedestrian edges." }
    ],
    personalInfo: [
      { label: "团队设计", value: "程志远、岑伊林" },
      { label: "指导老师", value: "张慕馨、黎志才" },
      { label: "设计区位", value: "海口市海岸片区免税城旁" },
      { label: "完成时间", value: "2025年9月—2025年11月" }
    ],
    statement: {
      problem: "大型综合体功能复杂且边界分散，公共活力、生态连续与未来弹性难以同时满足。",
      strategy: "以红色生态廊道串联公园、文化、商业与酒店，重组步行网络和开放空间。",
      outcome: "形成公园与建筑相互渗透的城市片区，为多元活动和持续生长预留空间。"
    },
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
    description: "以低饱和水彩、线稿与统一版式串联不同媒介的建筑片段，形成从概念、场所到空间体验的连续叙事。",
    descriptionEn: "Watercolor texture, linework and a shared layout connect architectural fragments into one continuous spatial narrative.",
    thumbnail: projectCover("项目5-首页封面.png"),
    splashImage: projectCover("项目5-首页封面.png"),
    images: [
      publicPath("assets/project-pages/page-23.jpg"),
      publicPath("assets/project-pages/page-24.jpg"),
      publicPath("assets/project-pages/page-25.jpg"),
      publicPath("assets/project-pages/page-26.jpg"),
      publicPath("assets/project-pages/page-27.jpg"),
      publicPath("assets/project-pages/page-28.jpg"),
      publicPath("assets/project-pages/page-29.jpg")
    ],
    coverMedia: [
      { src: projectCover("项目5_剖面816.png"), type: "image", size: "landscape", aspectRatio: 1.69, label: "项目 5 - 1", caption: "建筑剖面图，展示空间层次、结构节点与建筑内部的连续动线。", captionEn: "Building section, showing spatial layers, structural nodes and continuous interior circulation." },
      { src: projectCover("项目5_3.jpg"), type: "image", size: "landscape", aspectRatio: 1, label: "项目 5 - 3", caption: "现代建筑立面图，展示光影、材料与尺度在连续叙事中的转译。", captionEn: "Modern façade study, translating light, material and scale into a continuous narrative." },
      { src: projectCover("项目5_2.jpg"), type: "image", size: "portrait", aspectRatio: 0.82, label: "项目 5 - 2", caption: "传统建筑剖面图，呈现历史细部与空间构造之间的对应关系。", captionEn: "Traditional section, showing the relationship between historic detail and spatial construction." }
    ],
    statement: {
      problem: "不同题材、媒介与完成时间的作品彼此分散，需要建立清晰而连续的阅读关系。",
      strategy: "以低饱和水彩、建筑线稿和统一版式协调尺度、色彩与图像叙事。",
      outcome: "将零散的建筑片段组织为从概念、场所到空间体验递进展开的综合作品集。"
    },
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
