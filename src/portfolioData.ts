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

export const services = [
  {
    number: "01",
    title: "建筑设计",
    titleEn: "Architectural Design",
    description: "建筑设计 1-6 均分 90+，覆盖公共建筑、居住原理、空间叙事、场地策略与建筑表达。",
    descriptionEn: "Design studio experience across public buildings, housing principles and spatial representation."
  },
  {
    number: "02",
    title: "绿色模拟",
    titleEn: "Green Simulation",
    description: "熟悉建筑物理、热工/声光环境分析与绿建模拟软件，并具备绿色建筑竞赛获奖实践。",
    descriptionEn: "Building physics, environmental analysis and green building simulation workflows."
  },
  {
    number: "03",
    title: "BIM 与可视化",
    titleEn: "BIM & Visualization",
    description: "熟悉 Revit、SketchUp 建模、渲染、施工模拟、漫游动画与竞赛级汇报表达。",
    descriptionEn: "BIM modeling, rendering, construction simulation and walkthrough presentation."
  },
  {
    number: "04",
    title: "参数化与数据",
    titleEn: "Computational Design",
    description: "运用 Rhino Grasshopper、Python、NumPy 与 Pandas 进行参数化推演、数据处理与研究建模。",
    descriptionEn: "Parametric workflows, Python data processing and research-oriented modeling."
  },
  {
    number: "05",
    title: "科研与编程",
    titleEn: "Research & Coding",
    description: "参与椰壳围护结构能耗研究、灾后恢复多智能体流程与建筑规范可视化校验系统。",
    descriptionEn: "Research on low-energy envelopes, post-disaster workflows and code-checking systems."
  }
];
