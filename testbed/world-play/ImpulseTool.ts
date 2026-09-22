import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { type LocalPointerDownEvent, type LocalPointerMove, type LocalPointerUp } from "../testbed/Pointer";
import { GLDraw } from "../gl/GLDraw";
import { type GLResources } from "../gl/GLContext";

import { type Body, type World } from "planck";

import { WorldQuery } from "../world-view/WorldQuery";
import { toolbarTool } from "../common/globals";

interface ImpulseToolContext {
  world: Signal<World>;
  worldQuery: WorldQuery;
  mouseForce: Signal<number>;
  gl: Signal<GLResources>;
}

export class ImpulseTool extends Middleware<ImpulseToolContext> {
  body: Body | null = null;
  pointer = { x: 0, y: 0 };
  private draw = new GLDraw();

  constructor() {
    super();
    this.use(this.draw);
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
    this.on("frame-update", this.handleFrameUpdate);
  }

  handleDeactivate = () => {
    this.body = null;
  };

  handlePointerDown = (ev: LocalPointerDownEvent) => {
    if (this.body) return;

    const mouseForce = this.context.mouseForce.value;
    if (mouseForce === 0) return;

    const match = this.context.worldQuery.testPoint(ev.point, (m) => m.worldBody.isDynamic());
    if (!match) return;

    this.body = match.worldBody;
    this.pointer.x = ev.point.x;
    this.pointer.y = ev.point.y;
    this.emit("capture-pointer");
  };

  handlePointerMove = (ev: LocalPointerMove) => {
    if (!this.body) return;
    this.pointer.x = ev.point.x;
    this.pointer.y = ev.point.y;
  };

  handlePointerUp = (ev: LocalPointerUp) => {
    if (!this.body) return;

    let mouseForce = this.context.mouseForce.value as number;
    if (mouseForce === 0) return;
    if (typeof mouseForce !== "number") {
      mouseForce = -1000;
    }

    // if tool is changed but mouseForce is not changed
    if (mouseForce > 0) {
      mouseForce = -mouseForce;
    }

    const pos = this.body.getPosition();
    const force = {
      x: (ev.point.x - pos.x) * mouseForce,
      y: (ev.point.y - pos.y) * mouseForce,
    };
    this.body.applyForceToCenter(force, true);

    this.body = null;
  };

  handlePointerCancel = () => {
    this.body = null;
  };

  handleFrameUpdate = () => {
    if (!this.body) return;
    const pos = this.body.getPosition();
    this.draw.drawSegment(pos, this.pointer, "rgba(255,255,255,0.5)");
  };
}

toolbarTool.register({
  name: "impulse",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-impulse" };
  },
});
