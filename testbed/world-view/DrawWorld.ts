import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { GLDraw } from "../gl/GLDraw";
import { type GLResources } from "../gl/GLContext";
import { type RenderConfig } from "../testbed/TestbedContext";
import { type Style } from "../testbed/TestbedInterface";

import {
  type World,
  type Body,
  type Fixture,
  type CircleShape,
  type EdgeShape,
  type PolygonShape,
  type ChainShape,
} from "planck";

interface DrawWorldContext {
  world: Signal<World>;
  renderConfig: Signal<RenderConfig>;
  // not read directly here, but required transitively: GLDraw (use()'d below) needs it, and
  // `use()` requires the child's context requirements to be declared on the parent's context type
  gl: Signal<GLResources>;
}

// Walks the world's bodies and fixtures every frame and forwards each shape to its own GLDraw
// instance (see GLDraw.ts). Edges and chain segments have no dedicated shader, so they go through
// drawEdge (GLDraw's capsule-radius-0 path).
export class DrawWorld extends Middleware<DrawWorldContext> {
  private draw = new GLDraw();

  constructor() {
    super();
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }

  handleFrameRender = () => {
    const world = this.context.world.value;
    if (!world) return;
    if (!this.context.renderConfig.value.shapes) return;
    for (let body = world.getBodyList(); body; body = body.getNext()) {
      this.drawBody(body);
    }
  };

  private drawBody(body: Body) {
    const xf = body.getTransform();

    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      // stroke/fill set as `style` on the body, the fixture or the shape (`render` before v1)
      const style = getStyle(fixture.getShape()) ?? getStyle(fixture) ?? getStyle(body);
      const color = style?.stroke ?? shapeColor(body, fixture);
      const fill = style?.fill ?? DEFAULT_FILL;

      const type = fixture.getType();
      if (type === "circle") {
        const shape = fixture.getShape() as CircleShape;
        this.draw.drawCircle(shape.m_p, shape.m_radius, color, xf, fill);
      } else if (type === "polygon") {
        const shape = fixture.getShape() as PolygonShape;
        this.draw.drawPolygon(shape.m_vertices.slice(0, shape.m_count), color, xf, fill);
      } else if (type === "edge") {
        const shape = fixture.getShape() as EdgeShape;
        this.draw.drawEdge(shape.m_vertex1, shape.m_vertex2, color, xf);
      } else if (type === "chain") {
        const shape = fixture.getShape() as ChainShape;
        const vertices = shape.m_vertices;
        const count = shape.m_count;
        for (let i = 1; i < count; i++) {
          this.draw.drawEdge(vertices[i - 1], vertices[i], color, xf);
        }
        if (shape.isLoop() && count > 1) {
          this.draw.drawEdge(vertices[count - 1], vertices[0], color, xf);
        }
      }
    }
  }
}

const DEFAULT_FILL = "rgba(255,255,255,0.1)";

function getStyle(obj: object): Style | undefined {
  const render = obj["render"];
  if (typeof render === "object" && render && ("stroke" in render || "fill" in render)) {
    // this was used in planck before v1
    return render;
  }
  const style = obj["style"];
  if (typeof style === "object" && style) {
    return style;
  }
}

function shapeColor(body: Body, fixture: Fixture): string {
  if (fixture.isSensor()) {
    return "wheat";
  }
  if (body.isDynamic()) {
    return "rgba(255,255,255,0.9)";
  }
  if (body.isKinematic()) {
    return "rgba(255,255,255,0.8)";
  }
  return "rgba(255,255,255,0.7)";
}
