import * as Stage from "stage-js";
import { Vec2, World, type Body, type Vec2Value } from "../";
import { Memo, Middleware } from "polymatic";

import { WorldPointerDown, WorldPointerMove, WorldPointerUp } from "../world-view";
import { findFixture } from "../world-view/WorldPointer";
import { ToolConfig } from "../common-tool";

interface ImpulseToolContext {
  stage: Stage.Root;
  world: World;
  activeTool: ToolConfig;
}

export class ImpulseTool extends Middleware<ImpulseToolContext> {
  body: Body | null = null;
  pointer = { x: 0, y: 0 };

  component = new ImpulseToolComponent(this);
  setupMemo = Memo.init();

  constructor() {
    super();

    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("world-pointer-down", this.handlePointerDown);
    this.on("world-pointer-move", this.handlePointerMove);
    this.on("world-pointer-up", this.handlePointerUp);
    this.on("world-pointer-cancel", this.handlePointerCancel);
  }

  handleContextChange = () => {
    if (this.setupMemo.update(this.context.stage)) {
      this.context.stage?.append(this.component);
    }
  };

  handleDeactivate = () => {
    this.component?.remove();
    this.body = null;
    this.setupMemo.clear();
  };

  handlePointerDown = (ev: WorldPointerDown) => {
    if (this.body) {
      return;
    }

    // todo: should we just use event.fixture?
    const fixture = findFixture(this.context, ev.point, (f) => f.getBody().getType() === "dynamic");
    if (!fixture) {
      this.body = null;
      return;
    }

    this.body = fixture.getBody();
    this.emit("capture-pointer");

    this.pointer.x = ev.point.x;
    this.pointer.y = ev.point.y;
    this.component.touch();
  };

  handlePointerMove = (ev: WorldPointerMove) => {
    if (!this.body) return;

    this.pointer.x = ev.point.x;
    this.pointer.y = ev.point.y;
    this.component.touch();
  };

  handlePointerUp = (ev: WorldPointerUp) => {
    if (!this.body) return;

    const config = this.context.activeTool;
    const maxForce = typeof config.maxForce === "number" ? config.maxForce : 100;

    const force = Vec2.sub(ev.point, this.body.getPosition());
    force.mul(-maxForce);
    this.body.applyForceToCenter(force, true);

    this.body = null;
    this.component.touch();
  };

  handlePointerCancel = () => {
    if (!this.body) return;

    this.body = null;
  };
}

class ImpulseToolComponent extends Stage.Node {
  mw: ImpulseTool;

  static lineWidth = 3;

  constructor(mw: ImpulseTool) {
    super();
    this.mw = mw;
  }

  renderTexture(ctx: CanvasRenderingContext2D): void {
    if (!this.mw.body) return;

    const pixelRatio = this.getDevicePixelRatio();
    ctx.save();
    ctx.lineWidth = ImpulseToolComponent.lineWidth / pixelRatio;
    ctx.lineCap = "round";

    this.drawEdge(ctx, this.mw.body.getPosition(), this.mw.pointer, "rgba(255,255,255,0.2)");

    ctx.restore();
  }

  drawEdge = (ctx: CanvasRenderingContext2D, a: Vec2Value, b: Vec2Value, color: string): void => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color;
    ctx.stroke();
  };
}
