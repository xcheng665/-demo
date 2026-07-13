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
  images: string[];
  squares: SquareSpec[];
};

export type Certificate = {
  title: string;
  titleEn: string;
  category: "design" | "technology" | "research" | "practice";
  source: string;
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

export const portfolioPages = Array.from({ length: 23 }, (_, index) => {
  return publicPath(`assets/portfolio-pages/page-${String(index + 1).padStart(2, "0")}.png`);
});

export const projects: Project[] = [
  {
    number: "01",
    title: "山海 · 绿境",
    titleEn: "Mountain, Sea and Green Realm",
    category: "高品质度假酒店设计",
    categoryEn: "Resort Hotel Design",
    year: "2024",
    images: [
      publicPath("assets/portfolio-pages/page-03.png"),
      publicPath("assets/portfolio-pages/page-04.png"),
      publicPath("assets/portfolio-pages/page-05.png")
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
    images: [
      publicPath("assets/portfolio-pages/page-07.png"),
      publicPath("assets/portfolio-pages/page-09.png"),
      publicPath("assets/portfolio-pages/page-10.png")
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
    images: [
      publicPath("assets/portfolio-pages/page-12.png"),
      publicPath("assets/portfolio-pages/page-14.png"),
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
    images: [
      publicPath("assets/portfolio-pages/page-16.png"),
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
    images: [
      publicPath("assets/portfolio-pages/page-20.png"),
      publicPath("assets/portfolio-pages/page-21.png"),
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

const certificate = (title: string, titleEn: string, category: Certificate["category"], source: string): Certificate => ({
  title,
  titleEn,
  category,
  source
});

export const certificates: Certificate[] = [
  certificate("蓝桥杯省一等奖", "Lanqiao Cup Provincial First Prize", "technology", "certification/蓝桥杯省一等奖.jpg"),
  certificate("蓝桥杯全国一等奖", "Lanqiao Cup National First Prize", "technology", "certification/蓝桥杯全国一等奖.jpg"),
  certificate("米兰设计周三等奖", "Milan Design Week Third Prize", "design", "certification/米兰设计周三等奖.png"),
  certificate("绿色建筑技能大赛创意一等奖", "Green Building Skills First Prize", "design", "certification/第八届高等院校绿色建筑技能与创意大赛 创意一等奖.jpg"),
  certificate("CACE 数字建筑创新大赛一等奖", "CACE Digital Construction First Prize", "technology", "certification/CACE数字建筑创新大赛一等奖.jpg"),
  certificate("全国数字建筑创新大赛一等奖", "National Digital Construction First Prize", "technology", "certification/全国数字建筑创新大赛一等奖.jpg"),
  certificate("亚洲大学生创意设计展二等奖", "Asian Student Design Exhibition Second Prize", "design", "certification/亚洲大学生创意设计展二等奖.jpg"),
  certificate("五一数学建模一等奖", "May Day Mathematical Modeling First Prize", "research", "certification/五一数学建模.jpg"),
  certificate("Python 知识一等奖", "Python Knowledge First Prize", "technology", "certification/python知识一等奖.jpg"),
  certificate("Python 二级良好", "Python Level 2 Certificate", "technology", "certification/python二级良好_01(1).jpg"),
  certificate("实用新型专利申请受理书", "Utility Model Patent Acceptance", "research", "certification/实用新型专利申请受理书.jpg"),
  certificate("BIM 毕业设计大赛二等奖", "BIM Graduation Design Second Prize", "technology", "certification/BIM毕业设计大赛二等奖_01.jpg"),
  certificate("3D 大赛省级特等奖", "3D Competition Provincial Grand Prize", "technology", "certification/3d大赛省级特等奖.jpg"),
  certificate("3D 大赛省级一等奖", "3D Competition Provincial First Prize", "technology", "certification/3d大赛省级一等奖.jpg"),
  certificate("学院杯 2025 银奖", "College Cup 2025 Silver Award", "design", "certification/学院杯2025银奖.jpg"),
  certificate("华灿奖证书", "Huacan Award Certificate", "design", "certification/华灿奖证书.jpg"),
  certificate("奖状与奖杯", "Awards and Trophies", "design", "certification/奖状和奖杯.jpg"),
  certificate("斯维尔大赛建模一等奖", "Swell Modeling First Prize", "technology", "certification/斯维尔大赛建模一等奖.jpg"),
  certificate("机器人与算法比赛一等奖", "Robotics and Algorithms First Prize", "technology", "certification/机器人与算法比赛一等奖.jpg"),
  certificate("农林杯数学建模一等奖", "Agriculture and Forestry Modeling First Prize", "research", "certification/农林杯数学建模一等奖.jpg"),
  certificate("灾后恢复多智能体研究", "Post-typhoon Recovery Multi-agent Planning", "research", "ID_273_Lean_Post-typhoon_Recovery_Multi-agent_Look-ahead_and_Constraints_for_the_Last_Planner_System_00.jpg"),
  certificate("摄影大赛一等奖", "Photography Competition First Prize", "design", "certification/摄影大赛一等奖.jpg"),
  certificate("海洋文化科技创新大赛", "Marine Culture Innovation Competition", "research", "certification/海洋文化科技创新大赛.jpg"),
  certificate("工程实习证明", "Engineering Internship", "practice", "certification/社会实践/程志远海大工程实习_01.jpg"),
  certificate("志愿服务证书", "Volunteer Service Certificate", "practice", "certification/社会实践/社会实践志愿服务_01.jpg"),
  certificate("指导老师奖", "Instructor Recognition", "practice", "certification/社会实践/指导老师奖.jpg"),
  certificate("志愿者证书（一）", "Volunteer Certificate I", "practice", "certification/社会实践/志愿者证书.jpg"),
  certificate("志愿者证书（二）", "Volunteer Certificate II", "practice", "certification/社会实践/志愿者证书2.jpg"),
  certificate("志愿服务 300 小时", "300 Hours of Volunteer Service", "practice", "certification/社会实践/志愿服务300h.jpg")
];
