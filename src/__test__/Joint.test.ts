import { describe, it, expect } from "vitest";

import { Vec2 } from "../common/Vec2";
import { World } from "../dynamics/World";
import { Joint } from "../dynamics/Joint";
import { CircleShape } from "../collision/shape/CircleShape";
import { DistanceJoint } from "../dynamics/joint/DistanceJoint";
import { GearJoint } from "../dynamics/joint/GearJoint";
import { PrismaticJoint } from "../dynamics/joint/PrismaticJoint";
import { PulleyJoint } from "../dynamics/joint/PulleyJoint";
import { RevoluteJoint } from "../dynamics/joint/RevoluteJoint";
import { RopeJoint } from "../dynamics/joint/RopeJoint";

describe("Joint", function (): void {
  it("returns zero reaction force and torque before the first step", function (): void {
    const world = new World();
    const bodyA = world.createBody({ type: "dynamic", position: new Vec2(0, 0) });
    const bodyB = world.createBody({ type: "dynamic", position: new Vec2(2, 0) });
    bodyA.createFixture(new CircleShape(0.5), 1);
    bodyB.createFixture(new CircleShape(0.5), 1);

    const revolute = world.createJoint(new RevoluteJoint({}, bodyA, bodyB, new Vec2(1, 0)));
    const prismatic = world.createJoint(new PrismaticJoint({}, bodyA, bodyB, new Vec2(0, 0), new Vec2(1, 0)));

    const joints: Joint[] = [
      new DistanceJoint({}, bodyA, bodyB, new Vec2(0, 0), new Vec2(2, 0)),
      new RopeJoint({ maxLength: 3 }, bodyA, bodyB, new Vec2(1, 0)),
      new PulleyJoint({}, bodyA, bodyB, new Vec2(0, 5), new Vec2(2, 5), new Vec2(0, 0), new Vec2(2, 0), 1),
      new GearJoint({}, bodyA, bodyB, revolute, prismatic, 1),
    ];

    for (const joint of joints) {
      world.createJoint(joint);
      const force = joint.getReactionForce(60);
      expect(force.x).toBe(0);
      expect(force.y).toBe(0);
      expect(joint.getReactionTorque(60)).toBe(0);
    }
  });
});
