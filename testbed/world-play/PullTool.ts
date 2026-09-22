import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { type LocalPointerDownEvent, type LocalPointerMove } from "../testbed/Pointer";

import { type Body, type World, MouseJoint } from "planck";

import { WorldQuery } from "../world-view/WorldQuery";
import { toolbarTool } from "../common/globals";

interface PullToolContext {
  world: Signal<World>;
  worldQuery: WorldQuery;
  mouseForce: Signal<number>;
}

/** drags a dynamic body with a mouse joint */
export class PullTool extends Middleware<PullToolContext> {
  body: Body | null = null;
  ground: Body | null = null;
  joint: MouseJoint | null = null;

  constructor() {
    super();
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
  }

  handleDeactivate = () => {
    this.destroyJoint();
    this.body = null;
  };

  handlePointerDown = (ev: LocalPointerDownEvent) => {
    const world = this.context.world.value;
    if (!world) return;

    let mouseForce = this.context.mouseForce.value;
    if (mouseForce === 0) return;
    if (typeof mouseForce !== "number") {
      mouseForce = 1000;
    }

    const match = this.context.worldQuery.testPoint(ev.point, (m) => m.worldBody.isDynamic());
    if (!match) return;
    const hit = match.worldBody;

    if (hit !== this.body) {
      this.destroyJoint();
    }

    this.body = hit;
    this.ground = world.createBody();
    this.joint = new MouseJoint({ maxForce: mouseForce }, this.ground, this.body, ev.point);
    world.createJoint(this.joint);

    this.emit("capture-pointer");
  };

  handlePointerMove = (ev: LocalPointerMove) => {
    if (!this.joint) return;
    this.joint.setTarget(ev.point);
  };

  handlePointerUp = () => {
    if (!this.joint) return;
    this.body = null;
    this.destroyJoint();
  };

  handlePointerCancel = () => {
    if (!this.joint) return;
    this.body = null;
    this.destroyJoint();
  };

  destroyJoint = () => {
    const world = this.context.world.value;
    if (world && this.joint) world.destroyJoint(this.joint);
    if (world && this.ground) world.destroyBody(this.ground);
    this.joint = null;
    this.ground = null;
  };
}

toolbarTool.register({
  name: "pull",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-pull" };
  },
});
