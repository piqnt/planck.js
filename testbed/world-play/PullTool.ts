import { Body, MouseJoint, World } from "../";
import { Middleware } from "polymatic";
import * as Stage from "stage-js";

import { WorldPointerDown, WorldPointerMove } from "../world-view";
import { findFixture } from "../world-view/WorldPointer";
import { ToolConfig } from "../common-tool";

interface PullToolContext {
  world: World;
  stage: Stage.Root;
  activeTool: ToolConfig;
}

export class PullTool extends Middleware<PullToolContext> {
  body: Body | null = null;
  ground: Body | null = null;
  joint: MouseJoint | null = null;

  constructor() {
    super();

    this.on("deactivate", this.handleDeactivate);
    this.on("world-pointer-down", this.handlePointerDown);
    this.on("world-pointer-move", this.handlePointerMove);
    this.on("world-pointer-up", this.handlePointerUp);
    this.on("world-pointer-cancel", this.handlePointerCancel);
  }

  handleDeactivate = () => {
    this.destroyJoint();
    this.body = null;
  };

  handlePointerDown = (ev: WorldPointerDown) => {
    const world = this.context.world;

    const fixture = findFixture(this.context, ev.point, (f) => f.getBody().getType() === "dynamic");
    if (!fixture) return;

    if (fixture.getBody() !== this.body) {
      this.destroyJoint();
    }

    const config = this.context.activeTool;
    const maxForce = typeof config.maxForce === "number" ? config.maxForce : 1000;

    this.body = fixture.getBody();
    this.ground = world.createBody();
    this.joint = new MouseJoint({ maxForce }, this.ground, this.body, ev.point);

    world.createJoint(this.joint);

    this.emit("capture-pointer");
  };

  handlePointerMove = (ev: WorldPointerMove) => {
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
    const world = this.context.world;
    if (this.joint) world.destroyJoint(this.joint);
    if (this.ground) world.destroyBody(this.ground);
    this.joint = null;
    this.ground = null;
  };
}
