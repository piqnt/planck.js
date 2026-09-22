import { Middleware, Memo } from "polymatic";
import { effect, type Signal } from "@preact/signals";

interface AutoFocusContext {
  paused: Signal<boolean>;
  canvasElement: Signal<HTMLCanvasElement>;
}

/**
 * Keeps the canvas focused so keyboard input reaches it: focuses on pointer-down (canvas isn't
 * focusable by default click behavior in all browsers) and whenever play resumes from pause.
 */
export class AutoFocus extends Middleware<AutoFocusContext> {
  private disposers: (() => void)[] = [];

  pausedMemo = Memo.init();

  canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas) return;

        this.canvas = canvas;
        canvas.addEventListener("mousedown", this.focus);
        canvas.addEventListener("touchstart", this.focus);

        return () => {
          canvas.removeEventListener("mousedown", this.focus);
          canvas.removeEventListener("touchstart", this.focus);
          this.canvas = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleFrameBefore = () => {
    const paused = this.context.paused.peek();
    if (this.pausedMemo.update(paused)) {
      if (!paused) this.focus();
    }
  };

  focus = () => {
    window.focus();
    (document.activeElement as HTMLElement)?.blur?.();
    this.canvas?.focus();
  };
}
