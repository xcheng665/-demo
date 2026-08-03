import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const gradientKeys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  return match ? { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) } : { h: 40, s: 80, l: 80 };
}

function glowVariables(glowColor: string, intensity: number): CSSProperties {
  const { h, s, l } = parseHsl(glowColor);
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const suffixes = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${suffixes[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`
  ])) as CSSProperties;
}

function gradientVariables(colors: string[]): CSSProperties {
  const safeColors = colors.length ? colors : ["#b5c99a"];
  const values = Object.fromEntries(gradientKeys.map((key, index) => [
    key,
    `radial-gradient(at ${gradientPositions[index]}, ${safeColors[Math.min(colorMap[index], safeColors.length - 1)]} 0px, transparent 50%)`
  ]));
  return {
    ...values,
    "--gradient-base": `linear-gradient(${safeColors[0]} 0 100%)`
  } as CSSProperties;
}

function BorderGlow({
  children,
  className = "",
  style,
  edgeSensitivity = 30,
  glowColor = "70 35 55",
  backgroundColor = "transparent",
  borderRadius = 4,
  glowRadius = 26,
  glowIntensity = 0.7,
  coneSpread = 25,
  animated = false,
  colors = ["#a7b98a", "#d7bc72", "#88a19a"],
  fillOpacity = 0.22
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getCenter = useCallback((element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2] as const;
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const [cx, cy] = getCenter(card);
    const dx = x - cx;
    const dy = y - cy;
    const proximity = Math.min(Math.max(1 / Math.min(dx === 0 ? Infinity : cx / Math.abs(dx), dy === 0 ? Infinity : cy / Math.abs(dy)), 0), 1);
    const angle = dx === 0 && dy === 0 ? 0 : (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    card.style.setProperty("--edge-proximity", `${(proximity * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${(angle < 0 ? angle + 360 : angle).toFixed(3)}deg`);
  }, [getCenter]);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    card.classList.add("sweep-active");
    card.style.setProperty("--edge-proximity", "100");
    const timer = window.setTimeout(() => {
      card.style.setProperty("--edge-proximity", "0");
      card.classList.remove("sweep-active");
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [animated]);

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`}
      onPointerMove={handlePointerMove}
      style={{
        ...style,
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVariables(glowColor, glowIntensity),
        ...gradientVariables(colors)
      } as CSSProperties}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
