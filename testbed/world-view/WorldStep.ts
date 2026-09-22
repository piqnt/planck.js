import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

import { type World } from "planck";
import { type StepEvent } from "../testbed/TestbedInterface";

interface WorldStepContext {
  world: Signal<World>;
  paused: Signal<boolean>;
}

/**
 * Steps the world on each fixed tick ("step-physics" event) emitted by FrameLoop.
 */
export class WorldStep extends Middleware<WorldStepContext> {
  constructor() {
    super();
    this.on("step-physics", this.handleStep);
  }

  handleStep = (ev: StepEvent) => {
    const world = this.context.world.value;
    if (!world) return;
    try {
      world.step(ev.timeStep, ev.velocityIterations, ev.positionIterations);
    } catch (error) {
      console.error(error);
      // pause so FrameLoop stops emitting ticks; user can resume to retry
      this.context.paused.value = true;
    }
  };
}
