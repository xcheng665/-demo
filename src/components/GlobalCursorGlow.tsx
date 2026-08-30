import { useEffect, useRef, useState } from "react";
import "./GlobalCursorGlow.css";

export function GlobalCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frameId = 0;
    let latestX = -1000;
    let latestY = -1000;

    const paint = () => {
      const glow = glowRef.current;
      if (!glow) return;

      glow.style.setProperty("--cursor-glow-x", `${latestX}px`);
      glow.style.setProperty("--cursor-glow-y", `${latestY}px`);
      glow.dataset.visible = "true";
      frameId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      latestX = event.clientX;
      latestY = event.clientY;
      if (!frameId) frameId = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={glowRef} className="global-cursor-glow" aria-hidden="true" />;
}
