import { Middleware } from "polymatic";

import { type World } from "../";

import { ContextSimulation } from "../testbed/TestbedContext";
import { FrameLoopEvent } from "../common/FrameLoop";

const math_abs = Math.abs;

interface WorldViewContext {
  world: World;
  simulation?: ContextSimulation;
  paused?: boolean;
}

const DEFAULTS = {
  speed: 1,
  hz: 60,
};

/**
 * Calls world.step on each frame update.
 */
export class WorldStep extends Middleware<WorldViewContext> {
  constructor() {
    super();
    this.on("frame-update", this.handleTick);
  }

  private timeBuffer = 0;
  private stepErrored = false;

  handleTick = (ev: FrameLoopEvent) => {
    if (!this.context.world) return;
    if (this.stepErrored) return;
    if (this.context.paused) return;

    const speed = this.context.simulation?.speed ?? DEFAULTS.speed;
    let hz = this.context.simulation?.hz ?? DEFAULTS.hz;
    if (math_abs(hz) < 1) {
      hz = 1 / hz;
    }

    const timeStep = 1 / hz;
    try {
      const dt = ev.dt * 0.001 * speed;
      this.timeBuffer += dt;
      while (this.timeBuffer > timeStep) {
        this.context.world.step(timeStep);
        this.timeBuffer -= timeStep;
      }
      return;
    } catch (error) {
      this.stepErrored = true;
      console.error(error);
      return;
    }
  };
}
