import { ArrowUpRight, Download, ExternalLink, X } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import LiquidChrome from "./components/LiquidChrome";
import StarBorder from "./components/StarBorder";
import { portfolioPages, projects, publicPath, services } from "./portfolioData";
import type { Project, SquareSpec } from "./portfolioData";

const ease = [0.22, 1, 0.36, 1] as const;
const portfolioPdfUrl = publicPath("程志远作品集.pdf");
const heroLiquidBaseColor: [number, number, number] = [0.12, 0.13, 0.15];

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
      <div className="hero-liquid-background" aria-hidden="true">
        <LiquidChrome baseColor={heroLiquidBaseColor} speed={0.32} amplitude={0.34} frequencyX={2.6} frequencyY={3.2} interactive />
      </div>
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
            <StarBorder
              as="a"
              className="marquee-tile"
              href={src}
              key={`${src}-${index}`}
              target="_blank"
              rel="noreferrer"
              color="rgba(255, 255, 255, 0.95)"
              speed="5s"
              thickness={3}
              style={{ "--flow-delay": `${(index % row.length) * 90}ms` } as React.CSSProperties}
              aria-label={`Open portfolio page image ${index + 1}`}
            >
              <img src={src} alt={`Project preview ${index + 1}`} loading="lazy" />
            </StarBorder>
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

function PdfPreviewModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("pdf-preview-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("pdf-preview-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const previewUrl = `${portfolioPdfUrl}#toolbar=1&navpanes=0&view=FitH`;

  return (
    <motion.div
      className="pdf-preview-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio PDF preview"
      onClick={onClose}
    >
      <motion.div
        className="pdf-preview-panel"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.36, ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pdf-preview-header">
          <div>
            <span className="pdf-preview-kicker">Portfolio Preview</span>
            <h2>程志远作品集 PDF</h2>
          </div>
          <div className="pdf-preview-actions">
            <a href={portfolioPdfUrl} target="_blank" rel="noreferrer" aria-label="Open portfolio PDF in a new tab">
              <ExternalLink size={18} strokeWidth={2.2} />
            </a>
            <a href={portfolioPdfUrl} download aria-label="Download portfolio PDF">
              <Download size={18} strokeWidth={2.2} />
            </a>
            <button type="button" onClick={onClose} aria-label="Close portfolio PDF preview">
              <X size={19} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <iframe className="pdf-preview-frame" src={previewUrl} title="程志远作品集 PDF 预览" />
      </motion.div>
    </motion.div>
  );
}

function Projects({ onPreviewPortfolio }: { onPreviewPortfolio: () => void }) {
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
          <button className="work-button" type="button" onClick={onPreviewPortfolio}>
            <span>完整作品集</span>
            <span className="work-arrow">
              <ArrowUpRight size={16} strokeWidth={2.3} />
            </span>
          </button>
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = project.images[currentImageIndex] ?? project.images[0];

  useEffect(() => {
    if (active || project.images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((imageIndex) => (imageIndex + 1) % project.images.length);
    }, 3600 + index * 260);

    return () => window.clearInterval(intervalId);
  }, [active, index, project.images.length]);

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
      <StarBorder
        as="div"
        className="case-image-border"
        color="rgba(255, 255, 255, 0.96)"
        speed={`${5 + index * 0.35}s`}
        thickness={4}
      >
        <motion.img
          className="case-image"
          src={currentImage}
          alt={`${project.title} ${project.titleEn} image ${currentImageIndex + 1}`}
          loading="lazy"
          key={currentImage}
          initial={{ opacity: 0, scale: 1.045 }}
          animate={{
            opacity: 1,
            scale: active ? 1.07 : 1.015,
            filter: active ? "grayscale(0.1) contrast(1.05) brightness(0.82)" : "grayscale(0) contrast(1) brightness(1)"
          }}
          transition={{ duration: 0.65, ease }}
        />
      </StarBorder>
      <PixelOverlay />

      {project.squares.map((square) => (
        <MagneticSquare square={square} pointerX={pointerX} pointerY={pointerY} active={active} key={`${square.x}-${square.y}`} />
      ))}

      <a className="plus-button" href={currentImage} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} current image`}>
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
          <button
            className={thumbIndex === currentImageIndex ? "is-active" : ""}
            type="button"
            key={image}
            onClick={() => setCurrentImageIndex(thumbIndex)}
            aria-label={`Show ${project.title} image ${thumbIndex + 1}`}
            aria-current={thumbIndex === currentImageIndex ? "true" : undefined}
          >
            {String(thumbIndex + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </motion.article>
  );
}

function Footer({ onPreviewPortfolio }: { onPreviewPortfolio: () => void }) {
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
      <button className="footer-link" type="button" onClick={onPreviewPortfolio}>
        作品集 PDF <span className="en">Portfolio</span>
      </button>
    </footer>
  );
}

export default function App() {
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  return (
    <main className="site">
      <Hero />
      <PortfolioMarquee />
      <About />
      <Services />
      <Projects onPreviewPortfolio={() => setPdfPreviewOpen(true)} />
      <Footer onPreviewPortfolio={() => setPdfPreviewOpen(true)} />
      <PdfPreviewModal open={pdfPreviewOpen} onClose={() => setPdfPreviewOpen(false)} />
    </main>
  );
}
