import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { GLDraw } from "../gl/GLDraw";
import { type GLResources } from "../gl/GLContext";
import { type RenderConfig } from "../testbed/TestbedContext";

import { type World } from "planck";

interface DrawBoundsContext {
  world: Signal<World>;
  renderConfig: Signal<RenderConfig>;
  gl: Signal<GLResources>;
}

/** the fixtures' fat AABBs, the ones in the broad-phase */
export class DrawBounds extends Middleware<DrawBoundsContext> {
  private draw = new GLDraw();

  constructor() {
    super();
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }

  handleFrameRender = () => {
    const world = this.context.world.value;
    if (!world) return;
    if (!this.context.renderConfig.value.bounds) return;
    for (let body = world.getBodyList(); body; body = body.getNext()) {
      for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        const children = fixture.getShape().getChildCount();
        for (let child = 0; child < children; child++) {
          this.draw.drawHollowAABB(fixture.getAABB(child), "gold");
        }
      }
    }
  };
}
