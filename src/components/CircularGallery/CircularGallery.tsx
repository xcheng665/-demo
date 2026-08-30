import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, type OGLRenderingContext } from "ogl";
import { useEffect, useRef, useState } from "react";
import "./CircularGallery.css";

type GalleryItem = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

type CircularGalleryProps = {
  items: GalleryItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  bend?: number;
  borderRadius?: number;
  scrollEase?: number;
  scrollSpeed?: number;
  floatAmplitude?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const modulo = (value: number, length: number) => ((value % length) + length) % length;
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

function drawCardTexture(gl: OGLRenderingContext, image: HTMLImageElement, item: GalleryItem) {
  const canvas = document.createElement("canvas");
  canvas.width = 840;
  canvas.height = 1160;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D context is unavailable");

  const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

  const shade = context.createLinearGradient(0, canvas.height * 0.48, 0, canvas.height);
  shade.addColorStop(0, "rgba(33, 30, 25, 0)");
  shade.addColorStop(0.38, "rgba(33, 30, 25, 0.38)");
  shade.addColorStop(1, "rgba(33, 30, 25, 0.88)");
  context.fillStyle = shade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(250, 246, 235, 0.86)";
  context.font = '700 26px "Arial Narrow", "Microsoft YaHei", sans-serif';
  context.fillText(item.eyebrow, 58, canvas.height - 246);
  context.fillStyle = "#faf6eb";
  context.font = '700 76px "Microsoft YaHei", sans-serif';
  context.fillText(item.title, 58, canvas.height - 132);
  context.fillStyle = "rgba(250, 246, 235, 0.78)";
  context.font = '700 25px "Arial Narrow", "Microsoft YaHei", sans-serif';
  context.fillText(item.subtitle, 58, canvas.height - 76);

  const texture = new Texture(gl, { generateMipmaps: true });
  texture.image = canvas;
  return texture;
}

class GalleryMedia {
  extra = 0;
  x = 0;
  width = 0;
  widthTotal = 0;
  padding = 1.55;
  speed = 0;
  plane: Mesh;
  program: Program;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };

  constructor(
    private readonly gl: OGLRenderingContext,
    private readonly geometry: Plane,
    private readonly scene: Transform,
    private readonly item: GalleryItem,
    private readonly index: number,
    private readonly length: number,
    private readonly bend: number,
    private readonly borderRadius: number,
    private readonly floatAmplitude: number,
    screen: { width: number; height: number },
    viewport: { width: number; height: number }
  ) {
    this.screen = screen;
    this.viewport = viewport;
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          float wave = sin(p.x * 4.0 + uTime) + cos(p.y * 2.0 + uTime * 1.35);
          p.z = wave * uSpeed * 0.22;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          float edge = 1.0 - smoothstep(-0.002, 0.002, roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius));
          vec4 color = texture2D(tMap, uv);
          gl_FragColor = vec4(color.rgb, color.a * edge);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uImageSizes: { value: [840, 1160] },
        uPlaneSizes: { value: [0, 0] },
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uBorderRadius: { value: borderRadius }
      },
      transparent: true
    });
    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);
    this.loadTexture(texture);
    this.onResize(screen, viewport);
  }

  private loadTexture(placeholder: Texture) {
    const image = new Image();
    image.decoding = "async";
    image.src = this.item.image;
    image.onload = () => {
      const texture = drawCardTexture(this.gl, image, this.item);
      this.program.uniforms.tMap.value = texture;
      this.program.uniforms.uImageSizes.value = [840, 1160];
    };
    image.onerror = () => {
      placeholder.image = image;
    };
  }

  onResize(screen: { width: number; height: number }, viewport: { width: number; height: number }) {
    this.screen = screen;
    this.viewport = viewport;
    const scale = screen.height / 1500;
    this.plane.scale.y = (viewport.height * 900 * scale) / screen.height;
    this.plane.scale.x = (viewport.width * 700 * scale) / screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right", time: number) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;

    if (this.bend === 0) {
      this.plane.position.y = this.floatAmplitude * Math.sin(time * 0.0012 + this.index * 0.78);
      this.plane.rotation.z = 0;
    } else {
      const half = this.viewport.width / 2;
      const radius = (half * half + Math.abs(this.bend) * Math.abs(this.bend)) / (2 * Math.abs(this.bend));
      const effectiveX = Math.min(Math.abs(x), half);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);
      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = -Math.sign(this.bend) * Math.sign(x) * Math.asin(effectiveX / radius);
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value = time * 0.002;
    this.program.uniforms.uSpeed.value = clamp(Math.abs(this.speed) * 0.75, 0, 0.75);
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    const isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    const isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && isBefore) this.extra -= this.widthTotal;
    if (direction === "left" && isAfter) this.extra += this.widthTotal;
  }
}

class OglGallery {
  private renderer: Renderer;
  private gl: OGLRenderingContext;
  private camera: Camera;
  private scene = new Transform();
  private geometry: Plane;
  private media: GalleryMedia[] = [];
  private screen = { width: 0, height: 0 };
  private viewport = { width: 0, height: 0 };
  private scroll: { current: number; target: number; last: number; position: number };
  private animationFrame = 0;
  private pointer: { x: number; id: number } | null = null;
  private wheelTimer = 0;
  private reducedMotion: boolean;

  constructor(
    private readonly container: HTMLDivElement,
    private readonly items: GalleryItem[],
    private readonly options: Required<Pick<CircularGalleryProps, "bend" | "borderRadius" | "scrollEase" | "scrollSpeed" | "floatAmplitude">>,
    private readonly onActiveIndexChange: (index: number) => void
  ) {
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.scroll = { current: 0, target: 0, last: 0, position: 0 };
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    container.appendChild(this.gl.canvas as HTMLCanvasElement);
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.geometry = new Plane(this.gl, { heightSegments: 42, widthSegments: 64 });
    this.resize();
    const galleryItems = [...items, ...items];
    this.media = galleryItems.map((item, index) => new GalleryMedia(
      this.gl,
      this.geometry,
      this.scene,
      item,
      index,
      galleryItems.length,
      options.bend,
      options.borderRadius,
      this.reducedMotion ? 0 : options.floatAmplitude,
      this.screen,
      this.viewport
    ));
    this.bindEvents();
    this.render();
  }

  private get cardWidth() {
    return this.media[0]?.width || 1;
  }

  private bindEvents() {
    window.addEventListener("resize", this.resize);
    this.container.addEventListener("wheel", this.onWheel, { passive: false });
    this.container.addEventListener("pointerdown", this.onPointerDown);
    this.container.addEventListener("pointermove", this.onPointerMove);
    this.container.addEventListener("pointerup", this.onPointerUp);
    this.container.addEventListener("pointercancel", this.onPointerUp);
    this.container.addEventListener("keydown", this.onKeyDown);
  }

  private resize = () => {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    if (!this.screen.width || !this.screen.height) return;
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.media.forEach(media => media.onResize(this.screen, this.viewport));
  };

  private selectNearest = () => {
    const rawIndex = Math.round(this.scroll.target / this.cardWidth);
    this.scroll.target = rawIndex * this.cardWidth;
    this.onActiveIndexChange(modulo(rawIndex, this.items.length));
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    this.scroll.target += Math.sign(delta || 1) * this.options.scrollSpeed * 0.36;
    window.clearTimeout(this.wheelTimer);
    this.wheelTimer = window.setTimeout(this.selectNearest, 140);
  };

  private onPointerDown = (event: PointerEvent) => {
    this.pointer = { x: event.clientX, id: event.pointerId };
    this.scroll.position = this.scroll.current;
    this.container.setPointerCapture(event.pointerId);
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointer) return;
    const distance = (this.pointer.x - event.clientX) * (this.options.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  };

  private onPointerUp = () => {
    if (!this.pointer) return;
    this.pointer = null;
    this.selectNearest();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.scroll.target += (event.key === "ArrowRight" ? 1 : -1) * this.cardWidth;
      this.selectNearest();
    }
  };

  setActiveIndex(index: number) {
    if (!this.items.length) return;
    const target = modulo(index, this.items.length);
    const current = Math.round(this.scroll.target / this.cardWidth);
    let distance = target - modulo(current, this.items.length);
    if (distance > this.items.length / 2) distance -= this.items.length;
    if (distance < -this.items.length / 2) distance += this.items.length;
    this.scroll.target = (current + distance) * this.cardWidth;
  }

  private render = (time = 0) => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.reducedMotion ? 1 : this.options.scrollEase);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.media.forEach(media => media.update(this.scroll, direction, time));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.animationFrame = window.requestAnimationFrame(this.render);
  };

  destroy() {
    window.cancelAnimationFrame(this.animationFrame);
    window.clearTimeout(this.wheelTimer);
    window.removeEventListener("resize", this.resize);
    this.container.removeEventListener("wheel", this.onWheel);
    this.container.removeEventListener("pointerdown", this.onPointerDown);
    this.container.removeEventListener("pointermove", this.onPointerMove);
    this.container.removeEventListener("pointerup", this.onPointerUp);
    this.container.removeEventListener("pointercancel", this.onPointerUp);
    this.container.removeEventListener("keydown", this.onKeyDown);
    (this.gl.canvas as HTMLCanvasElement).remove();
  }
}

export default function CircularGallery({
  items,
  activeIndex,
  onActiveIndexChange,
  bend = 0,
  borderRadius = 0.05,
  scrollEase = 0.02,
  scrollSpeed = 5,
  floatAmplitude = 0.1,
  className = ""
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<OglGallery | null>(null);
  const callbackRef = useRef(onActiveIndexChange);
  const [fallback, setFallback] = useState(false);
  callbackRef.current = onActiveIndexChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;
    try {
      const gallery = new OglGallery(
        container,
        items,
        { bend, borderRadius, scrollEase, scrollSpeed, floatAmplitude },
        index => callbackRef.current(index)
      );
      galleryRef.current = gallery;
      gallery.setActiveIndex(activeIndex);
      return () => gallery.destroy();
    } catch (error) {
      console.warn("CircularGallery could not initialize", error);
      setFallback(true);
    }
  }, [items, bend, borderRadius, scrollEase, scrollSpeed, floatAmplitude]);

  useEffect(() => {
    galleryRef.current?.setActiveIndex(activeIndex);
  }, [activeIndex]);

  if (fallback) {
    return <div className="circular-gallery__fallback">{items.map((item, index) => <button type="button" key={item.title} onClick={() => onActiveIndexChange(index)}>{item.title}</button>)}</div>;
  }

  return <div ref={containerRef} className={`circular-gallery ${className}`.trim()} tabIndex={0} role="region" aria-label="实践项目横向画廊，使用左右方向键切换" />;
}
