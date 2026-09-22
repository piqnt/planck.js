import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";
import { type Mat2d, mulMat2dVec2 } from "../common/Mat2d";
import { type Vec2Value } from "planck";

interface TextOverlayLoaderContext {
  containerElement: Signal<HTMLElement>;
  textOverlay: Signal<CanvasRenderingContext2D>;
}

// The subset of context that drawWorldString() needs - narrower than TextOverlayLoaderContext
// (no containerElement) so consumer middlewares don't have to declare a dependency they don't use.
export interface DrawTextContext {
  worldMatrix: Mat2d;
  textOverlay: Signal<CanvasRenderingContext2D>;
}

// Debug-draw text has no perf or compositing requirements that would need a font atlas in the GL
// pipeline, so this uses a plain 2D-canvas overlay stacked on top of the WebGL canvas instead:
// far less code, same visual result.
// Sized/positioned entirely inline (not via host CSS like "#space canvas") so it behaves the same
// across every host (runtime-shell, runtime-page, the standalone examples app, ...).
export class TextOverlay extends Middleware<TextOverlayLoaderContext> {
  private disposers: (() => void)[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement) return;

        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.background = "transparent";
        canvas.style.pointerEvents = "none";
        containerElement.appendChild(canvas);
        this.canvas = canvas;

        this.context.textOverlay.value = canvas.getContext("2d");

        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(containerElement);
        this.handleResize();

        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.context.textOverlay.value = undefined;
          canvas.remove();
          this.canvas = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleResize = () => {
    if (!this.canvas) return;
    const containerElement = this.context.containerElement.peek();
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.round(containerElement.clientWidth * ratio));
    this.canvas.height = Math.max(1, Math.round(containerElement.clientHeight * ratio));
  };

  // Runs before any consumer's "frame-update"/"frame-render" text calls, mirroring GLLoader's
  // own clear-then-let-consumers-draw ordering.
  handleFrameBefore = () => {
    const ctx = this.context.textOverlay.peek();
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
}

const screenPoint = { x: 0, y: 0 };

// World-space text, positioned via the same worldMatrix (world -> CSS-pixel, Y-down) the WebGL
// projection is built from, so labels track shapes exactly.
export function drawWorldString(
  context: DrawTextContext,
  p: Vec2Value,
  text: string,
  color: string,
  align: CanvasTextAlign = "left",
): void {
  const ctx = context.textOverlay.value;
  if (!ctx) return;
  mulMat2dVec2(screenPoint, context.worldMatrix, p);
  ctx.font = "12px monospace";
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, screenPoint.x, screenPoint.y);
}
