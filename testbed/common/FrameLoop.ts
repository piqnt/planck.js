import { Middleware } from "polymatic";

export interface FrameLoopEvent {
  dt: number;
  now: number;
}

/**
 * Implements variable length game loop. Sends frame-update and frame-render event to all middlewares.
 */
export class FrameLoop extends Middleware {
  lastTime = 0;

  // reuse object
  event: FrameLoopEvent = {
    dt: 0,
    now: 0,
  };

  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate() {
    this.lastTime = performance.now();
    this.requestFrame();
  }

  handleFrame = () => {
    if (!this.activated) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    this.event.now = now;
    this.event.dt = delta;

    this.emit("frame-before", this.event);
    this.emit("frame-update", this.event);
    this.emit("frame-render", this.event);
    this.emit("frame-after", this.event);

    this.requestFrame();
  };

  requestFrame = () => {
    if (!this.activated) return;
    window.requestAnimationFrame(this.handleFrame);
  };
}
