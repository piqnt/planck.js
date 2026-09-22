import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { GLDraw } from "../gl/GLDraw";
import { type GLResources } from "../gl/GLContext";
import { drawWorldString } from "../gl/TextOverlay";
import { type RenderConfig } from "../testbed/TestbedContext";
import { type Mat2d } from "../common/Mat2d";
import { getLabel } from "../common/Label";

import { type World, type Body } from "planck";

interface DrawBodyInfoContext {
  world: Signal<World>;
  renderConfig: Signal<RenderConfig>;
  gl: Signal<GLResources>;
  textOverlay: Signal<CanvasRenderingContext2D>;
  worldMatrix: Mat2d;
}

/** the bodies' labels (`lookupId`, what findOne looks up) and their mass, when asked for */
export class DrawBodyInfo extends Middleware<DrawBodyInfoContext> {
  private draw = new GLDraw();

  constructor() {
    super();
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }

  handleFrameRender = () => {
    const world = this.context.world.value;
    if (!world) return;
    const renderConfig = this.context.renderConfig.value;

    if (!renderConfig.bodyNames && !renderConfig.mass) return;

    for (let body = world.getBodyList(); body; body = body.getNext()) {
      if (renderConfig.bodyNames) {
        const label = getLabel(body);
        if (label) this.drawBodyName(body, label);
      }
      if (renderConfig.mass && body.isDynamic()) {
        this.drawMass(body);
      }
    }
  };

  private drawBodyName(body: Body, label: string) {
    const { c, s } = body.getTransform().q;
    const center = body.getWorldCenter();
    const p = { x: center.x + c * 0.1 - s * 0.1, y: center.y + s * 0.1 + c * 0.1 };
    drawWorldString(this.context, p, label, "blueviolet");
  }

  private drawMass(body: Body) {
    const { c, s } = body.getTransform().q;
    const center = body.getWorldCenter();

    this.draw.drawEdge(center, { x: center.x + c, y: center.y + s }, "red");
    this.draw.drawEdge(center, { x: center.x - s, y: center.y + c }, "green");

    const p = { x: center.x + c * 0.1 - s * 0.1, y: center.y + s * 0.1 + c * 0.1 };
    drawWorldString(this.context, p, `  ${body.getMass().toFixed(2)}`, "white");
  }
}
