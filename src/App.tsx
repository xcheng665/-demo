import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { portfolioPages, projects, publicPath, services } from "./portfolioData";
import type { Project, SquareSpec } from "./portfolioData";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const items = [
    ["#about", "关于", "About"],
    ["#services", "能力", "Abilities"],
    ["#projects", "作品", "Projects"],
    ["#contact", "联系", "Contact"]
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {items.map(([href, label, labelEn]) => (
        <a className="nav-link" href={href} key={href}>
          <span className="zh">{label}</span>
          <span className="en">{labelEn}</span>
        </a>
      ))}
    </motion.nav>
  );
}

function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.7 });

  return (
    <section className="hero" id="top">
      <Nav />
      <motion.div
        className="hero-title-wrap"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      >
        <h1 className="hero-title hero-heading">CHENG ZHIYUAN</h1>
      </motion.div>

      <div className="hero-orbit" aria-hidden="true" />

      <motion.div
        className="hero-portrait-wrap"
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left - rect.width / 2) / 5);
          y.set((event.clientY - rect.top - rect.height / 2) / 6);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <img className="hero-portrait" src={publicPath("assets/portfolio-pages/page-01.png")} alt="程志远建筑作品集封面" />
      </motion.div>

      <div className="hero-bottom">
        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease, delay: 0.25 }}
        >
          海南大学建筑学专业，关注地域、气候、绿色性能与数字技术之间的空间实践。
          <span className="en-line">Architecture portfolio focused on locality, climate, sustainability and computational workflows.</span>
        </motion.p>
        <motion.a
          className="contact-button"
          href="mailto:18879819661@163.com"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease, delay: 0.42 }}
        >
          CONTACT
        </motion.a>
      </div>
    </section>
  );
}

function PortfolioMarquee() {
  const rows = useMemo(() => [portfolioPages.slice(0, 12), portfolioPages.slice(8, 23)], []);

  return (
    <section className="marquee-section" aria-label="Animated project previews">
      {rows.map((row, rowIndex) => (
        <div className={`marquee-track marquee-${rowIndex === 0 ? "right" : "left"}`} key={rowIndex}>
          {[...row, ...row, ...row].map((src, index) => (
            <a
              className="marquee-tile"
              href={src}
              key={`${src}-${index}`}
              target="_blank"
              rel="noreferrer"
              style={{ "--flow-delay": `${(index % row.length) * 90}ms` } as React.CSSProperties}
              aria-label={`Open portfolio page image ${index + 1}`}
            >
              <img src={src} alt={`Project preview ${index + 1}`} loading="lazy" />
            </a>
          ))}
        </div>
      ))}
    </section>
  );
}

function About() {
  const text =
    "我是程志远，海南大学土木建筑工程学院建筑学专业学生。我的设计与研究关注在地性、气候适应、绿色建筑性能与数字工具的结合，具备建筑设计、BIM 建模、Grasshopper 参数化流程、Python 数据分析与韧性低能耗环境研究经验。English auxiliary: my work connects locality, climate, building performance and computational tools.";

  return (
    <section className="about" id="about">
      {[
        ["asset-moon", publicPath("assets/portfolio-pages/page-02.png")],
        ["asset-block", publicPath("assets/portfolio-pages/page-10.png")],
        ["asset-lego", publicPath("assets/portfolio-pages/page-16.png")],
        ["asset-group", publicPath("assets/portfolio-pages/page-21.png")]
      ].map(([className, src], index) => (
        <motion.img
          className={`floating-asset ${className}`}
          src={src}
          alt=""
          key={src}
          initial={{ opacity: 0, x: index < 2 ? -70 : 70 }}
          whileInView={{ opacity: 0.72, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease, delay: index * 0.08 }}
        />
      ))}

      <div className="about-inner">
        <Reveal y={42}>
          <h2 className="section-title title-en-only hero-heading">ABOUT ME</h2>
        </Reveal>
        <AnimatedText text={text} />
        <Reveal delay={0.1} y={24}>
          <a className="contact-button" href="mailto:18879819661@163.com">
            CONTACT
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 58%"]
  });

  return (
    <p className="about-copy" ref={ref}>
      {text.split("").map((char, index) => {
        const opacity = useTransform(scrollYProgress, [index / text.length, (index + 20) / text.length], [0.2, 1]);
        return (
          <motion.span style={{ opacity }} key={`${char}-${index}`}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <Reveal y={42}>
        <h2 className="section-title">
          <span className="zh">能力结构</span>
          <span className="en">Abilities</span>
        </h2>
      </Reveal>
      <div className="services-list">
        {services.map((service, index) => (
          <Reveal className="service-item" delay={index * 0.08} key={service.number}>
            <span className="service-number">{service.number}</span>
            <div>
              <h3 className="service-name">
                <span className="zh">{service.title}</span>
                <span className="en">{service.titleEn}</span>
              </h3>
              <p className="service-desc">
                {service.description}
                <span className="en-line">{service.descriptionEn}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const floatingSquares: SquareSpec[] = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 }
];

function FloatingSquare({
  square,
  index,
  progress
}: {
  square: SquareSpec;
  index: number;
  progress: MotionValue<number>;
}) {
  const rawY = useTransform(progress, [0, 1], [0, -(80 + index * 30)]);
  const y = useSpring(rawY, { stiffness: 40, damping: 20 });

  return (
    <motion.span
      className="projects-floating-square"
      style={{
        left: `${square.x}%`,
        top: `${square.y}%`,
        width: square.size,
        height: square.size,
        y
      }}
      animate={{ translateY: [0, -10, 0] }}
      transition={{ duration: 3 + index * 0.4, ease: "easeInOut", repeat: Infinity, delay: index * 0.3 }}
    />
  );
}

function Projects() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects-square-layer" aria-hidden="true">
        {floatingSquares.map((square, index) => (
          <FloatingSquare square={square} index={index} progress={scrollYProgress} key={`${square.x}-${square.y}`} />
        ))}
      </div>

      <motion.div
        className="projects-header"
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease }}
      >
        <span className="projects-badge">Projects</span>
        <h2>
          Insights from <span>Architectural</span>
          <br />
          <span>Case Studies</span>
        </h2>
      </motion.div>

      <div className="case-grid">
        {projects.map((project, index) => (
          <CaseStudyCard project={project} index={index} key={project.number} />
        ))}
      </div>

      <div className="projects-footer">
        <div className="projects-footer-copy">
          <span className="plus-mark">+</span>
          <p>
            从场地、气候、结构与公共生活出发，将每一次课程设计和研究训练整理为可浏览的案例页。
            <span className="en-line">Each card opens independent image pages, keeping the portfolio readable without forcing a full PDF view.</span>
          </p>
          <a className="work-button" href={publicPath("程志远作品集1.pdf")}>
            <span>完整作品集</span>
            <span className="work-arrow">
              <ArrowUpRight size={16} strokeWidth={2.3} />
            </span>
          </a>
        </div>

        <div className="logo-marquee" aria-label="Portfolio capabilities">
          <div className="logo-track">
            {["Architecture", "BIM", "Green Simulation", "Grasshopper", "Python", "Research", "Rendering", "Urban Design"]
              .concat(["Architecture", "BIM", "Green Simulation", "Grasshopper", "Python", "Research", "Rendering", "Urban Design"])
              .map((item, index) => (
                <span className="logo-item" key={`${item}-${index}`}>
                  <span className="logo-icon" />
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticSquare({
  square,
  pointerX,
  pointerY,
  active
}: {
  square: SquareSpec;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  active: boolean;
}) {
  const dx = useTransform(pointerX, (value) => (active ? (value - 0.5) * 40 : 0));
  const dy = useTransform(pointerY, (value) => (active ? (value - 0.5) * 40 : 0));
  const x = useSpring(dx, { stiffness: 80, damping: 18, mass: 0.6 });
  const y = useSpring(dy, { stiffness: 80, damping: 18, mass: 0.6 });

  return (
    <motion.span
      className="card-magnetic-square"
      style={{
        left: `${square.x}%`,
        top: `${square.y}%`,
        width: square.size,
        height: square.size,
        x,
        y
      }}
    />
  );
}

function PixelOverlay() {
  return (
    <div className="pixel-overlay" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((__, col) => (
          <span
            className="pixel-block"
            key={`${row}-${col}`}
            style={
              {
                "--row": row,
                "--col": col,
                left: `${(col * 100) / 12}%`,
                top: `${(row * 100) / 8}%`
              } as React.CSSProperties
            }
          />
        ))
      )}
    </div>
  );
}

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const [active, setActive] = useState(false);

  return (
    <motion.article
      className="case-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        pointerX.set(0.5);
        pointerY.set(0.5);
      }}
    >
      <img className="case-image" src={project.images[0]} alt={`${project.title} ${project.titleEn}`} loading="lazy" />
      <PixelOverlay />

      {project.squares.map((square) => (
        <MagneticSquare square={square} pointerX={pointerX} pointerY={pointerY} active={active} key={`${square.x}-${square.y}`} />
      ))}

      <a className="plus-button" href={project.images[0]} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} cover image`}>
        +
      </a>

      <div className="case-info">
        <span className="case-number">{project.number}</span>
        <h3>{project.titleEn}</h3>
        <div className="case-meta">
          <span>{project.category}</span>
          <strong>{project.year}</strong>
        </div>
      </div>

      <div className="case-thumbs">
        {project.images.map((image, thumbIndex) => (
          <a href={image} target="_blank" rel="noreferrer" key={image} aria-label={`Open ${project.title} image ${thumbIndex + 1}`}>
            {String(thumbIndex + 1).padStart(2, "0")}
          </a>
        ))}
      </div>
    </motion.article>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <span>
        <span className="zh">2026 程志远 · 海南大学建筑学</span>
        <span className="en">Architecture Portfolio</span>
      </span>
      <a href="tel:18879819661">18879819661</a>
      <a href="mailto:18879819661@163.com">18879819661@163.com</a>
      <a href={publicPath("简历6.3F.pdf")}>
        简历 PDF <span className="en">Resume</span>
      </a>
      <a href={publicPath("程志远作品集1.pdf")}>
        作品集 PDF <span className="en">Portfolio</span>
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <main className="site">
      <Hero />
      <PortfolioMarquee />
      <About />
      <Services />
      <Projects />
      <Footer />
    </main>
  );
}
