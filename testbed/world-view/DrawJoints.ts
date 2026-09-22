import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { GLDraw } from "../gl/GLDraw";
import { type GLResources } from "../gl/GLContext";
import { type RenderConfig } from "../testbed/TestbedContext";
import { type Style } from "../testbed/TestbedInterface";

import {
  type World,
  type Joint,
  type PulleyJoint,
  type PrismaticJoint,
  type WheelJoint,
  type MouseJoint,
  type Vec2Value,
  Rot,
  Transform,
} from "planck";

interface DrawJointsContext {
  world: Signal<World>;
  renderConfig: Signal<RenderConfig>;
  gl: Signal<GLResources>;
}

const DEFAULT_COLOR = "rgba(255,255,255,0.9)";

// Joints as their anchors and what connects them: a line between the anchors for most, the
// ground anchors too for a pulley, the axis for a prismatic or wheel joint.
export class DrawJoints extends Middleware<DrawJointsContext> {
  private draw = new GLDraw();

  constructor() {
    super();
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }

  handleFrameRender = () => {
    const world = this.context.world.value;
    if (!world) return;
    if (!this.context.renderConfig.value.joints) return;

    for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
      this.drawJoint(joint);
    }
  };

  private drawJoint(joint: Joint) {
    const style = joint["style"] as Style | undefined;
    const color = style?.stroke ?? DEFAULT_COLOR;

    const pA = joint.getAnchorA();
    const pB = joint.getAnchorB();

    switch (joint.getType()) {
      case "pulley-joint": {
        const pj = joint as PulleyJoint;
        const gA = pj.getGroundAnchorA();
        const gB = pj.getGroundAnchorB();
        this.draw.drawEdge(pA, gA, color);
        this.draw.drawEdge(gA, gB, color);
        this.draw.drawEdge(gB, pB, color);
        break;
      }
      case "prismatic-joint":
      case "wheel-joint": {
        const axis = (joint as PrismaticJoint | WheelJoint).getLocalAxisA();
        const xfA = joint.getBodyA().getTransform();
        const end = Transform.mulVec2(xfA, {
          x: joint["m_localAnchorA"].x + axis.x,
          y: joint["m_localAnchorA"].y + axis.y,
        });
        this.draw.drawEdge(pA, end, "gray");
        this.draw.drawEdge(pA, pB, color);
        break;
      }
      case "mouse-joint": {
        const target = (joint as MouseJoint).getTarget();
        this.draw.drawEdge(target, pB, color);
        this.draw.drawScreenPoint(target, 4, color);
        break;
      }
      case "revolute-joint": {
        this.draw.drawEdge(pA, pB, color);
        this.draw.drawScreenPoint(pB, 6, color);
        break;
      }
      default:
        this.draw.drawEdge(pA, pB, color);
        break;
    }
  }
}

// keeps the unused-import lint quiet where a joint type needs rotation math later
export const rotate = (q: { c: number; s: number }, v: Vec2Value): Vec2Value => Rot.mulVec2(q, v);
