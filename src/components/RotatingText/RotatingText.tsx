import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import "./RotatingText.css";

type RotatingTextProps = {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  className?: string;
};

const splitGraphemes = (text: string) => {
  const Segmenter = (Intl as unknown as {
    Segmenter?: new (locale: string, options: { granularity: "grapheme" }) => {
      segment: (value: string) => Iterable<{ segment: string }>;
    };
  }).Segmenter;

  if (Segmenter) {
    const segmenter = new Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
};

export function RotatingText({
  texts,
  rotationInterval = 2000,
  staggerDuration = 0.025,
  staggerFrom = "last",
  className
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const currentText = texts[currentIndex] ?? "";
  const characters = useMemo(() => splitGraphemes(currentText), [currentText]);

  useEffect(() => {
    if (prefersReducedMotion || texts.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % texts.length);
    }, rotationInterval);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, rotationInterval, texts.length]);

  return (
    <span className={["rotating-text", className].filter(Boolean).join(" ")}>
      <span className="rotating-text-sr-only">{currentText}</span>
      <AnimatePresence initial={false} mode="wait">
        <span className="rotating-text-clip" aria-hidden="true">
          <motion.span className="rotating-text-word" key={currentText}>
            {characters.map((character, index) => {
              const distance = staggerFrom === "last"
                ? characters.length - index - 1
                : staggerFrom === "center"
                  ? Math.abs(Math.floor(characters.length / 2) - index)
                  : index;

              return (
                <motion.span
                  className="rotating-text-character"
                  key={`${character}-${index}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                    delay: distance * staggerDuration
                  }}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        </span>
      </AnimatePresence>
    </span>
  );
}
