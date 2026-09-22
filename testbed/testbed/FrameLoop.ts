import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

import { type World } from "planck";

import { type StepEvent } from "./TestbedInterface";
import { type ContextSimulation } from "./TestbedContext";

export interface FrameLoopEvent {
  dt: number;
  now: number;
}

interface FrameLoopContext {
  world: Signal<World>;
  paused: Signal<boolean>;
  simulation?: ContextSimulation;
}

const DEFAULTS = {
  speed: 1,
  hz: 60,
  velocityIterations: 8,
  positionIterations: 3,
};

/**
 * Implements the game loop: a variable-length render loop with a fixed-timestep simulation loop
 * inside it. Each frame emits, in order:
 *
 *   frame-before, (step-before, step-physics, step-after)*, frame-update, frame-render, frame-after
 *
 * where the step-* sequence is repeated for each pending fixed tick of the accumulator (zero or
 * more per frame, none while paused or before a world is set). All events for a frame are emitted
 * here at the top level, never from inside a handler, so polymatic's queued (FIFO) event dispatch
 * preserves this order — middlewares must not re-emit ordered events from their handlers.
 *
 * Stepping the world is not done here; WorldStep does it on the "step-physics" event. Since fixed
 * ticks are emitted before frame-update, any frame-update handler (rendering, camera follow) sees
 * post-step positions regardless of middleware order.
 */
export class FrameLoop extends Middleware<FrameLoopContext> {
  lastTime = 0;
  timeBuffer = 0;

  event: FrameLoopEvent = {
    dt: 0,
    now: 0,
  };

  // one object reused for all ticks of a frame; safe with queued dispatch only because
  // its fields are constant within a frame — don't add per-tick fields
  stepEvent: StepEvent = {
    timeStep: 0,
    velocityIterations: 0,
    positionIterations: 0,
  };

  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate = () => {
    this.lastTime = performance.now();
    this.requestFrame();
  };

  handleFrame = () => {
    if (!this.activated) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    this.event.now = now;
    this.event.dt = delta;

    this.emit("frame-before", this.event);

    if (this.context.world?.value && !this.context.paused?.value) {
      const config = this.context.simulation;

      const speed = config?.speed ?? DEFAULTS.speed;
      let hz = config?.hz ?? DEFAULTS.hz;

      // hz below 1 is a period in seconds (see Outline), normalize to frequency
      if (Math.abs(hz) < 1) {
        hz = 1 / hz;
      }

      const timeStep = 1 / hz;

      this.stepEvent.timeStep = timeStep;
      this.stepEvent.velocityIterations = config?.velocityIterations ?? DEFAULTS.velocityIterations;
      this.stepEvent.positionIterations = config?.positionIterations ?? DEFAULTS.positionIterations;

      this.timeBuffer += delta * 0.001 * speed;
      while (this.timeBuffer > timeStep) {
        this.timeBuffer -= timeStep;
        this.emit("step-before", this.stepEvent);
        // directed at WorldStep only — don't add other listeners; if a use case
        // needs a hook at this point, emit a new event here instead
        this.emit("step-physics", this.stepEvent);
        this.emit("step-after", this.stepEvent);
      }
    }

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
