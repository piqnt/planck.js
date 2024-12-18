/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This tests distance joints, body destruction, and joint destruction.

import { World, Body, Joint, Vec2, Box, DistanceJoint, Testbed } from "planck";

const world = new World();

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody();

const bodies: Body[] = [];
let joints: Joint[] = [];

const box = new Box(0.5, 0.5);

bodies[0] = world.createDynamicBody(new Vec2(-5.0, 5.0));
bodies[0].createFixture(box, 5.0);

bodies[1] = world.createDynamicBody(new Vec2(5.0, 5.0));
bodies[1].createFixture(box, 5.0);

bodies[2] = world.createDynamicBody(new Vec2(5.0, 15.0));
bodies[2].createFixture(box, 5.0);

bodies[3] = world.createDynamicBody(new Vec2(-5.0, 15.0));
bodies[3].createFixture(box, 5.0);

const jd = {
  frequencyHz: 2.0,
  dampingRatio: 0.0,
};

world.createJoint(
  (joints[0] = new DistanceJoint({
    ...jd,
    bodyA: ground,
    localAnchorA: new Vec2(-10.0, 0.0),
    bodyB: bodies[0],
    localAnchorB: new Vec2(-0.5, -0.5),
  })),
);

world.createJoint(
  (joints[1] = new DistanceJoint({
    ...jd,
    bodyA: ground,
    localAnchorA: new Vec2(10.0, 0.0),
    bodyB: bodies[1],
    localAnchorB: new Vec2(0.5, -0.5),
  })),
);

world.createJoint(
  (joints[2] = new DistanceJoint({
    ...jd,
    bodyA: ground,
    localAnchorA: new Vec2(10.0, 20.0),
    bodyB: bodies[2],
    localAnchorB: new Vec2(0.5, 0.5),
  })),
);

world.createJoint(
  (joints[3] = new DistanceJoint({
    ...jd,
    bodyA: ground,
    localAnchorA: new Vec2(-10.0, 20.0),
    bodyB: bodies[3],
    localAnchorB: new Vec2(-0.5, 0.5),
  })),
);

world.createJoint(
  (joints[4] = new DistanceJoint({
    ...jd,
    bodyA: bodies[0],
    localAnchorA: new Vec2(0.5, 0.0),
    bodyB: bodies[1],
    localAnchorB: new Vec2(-0.5, 0.0),
  })),
);

world.createJoint(
  (joints[5] = new DistanceJoint({
    ...jd,
    bodyA: bodies[1],
    localAnchorA: new Vec2(0.0, 0.5),
    bodyB: bodies[2],
    localAnchorB: new Vec2(0.0, -0.5),
  })),
);

world.createJoint(
  (joints[6] = new DistanceJoint({
    ...jd,
    bodyA: bodies[2],
    localAnchorA: new Vec2(-0.5, 0.0),
    bodyB: bodies[3],
    localAnchorB: new Vec2(0.5, 0.0),
  })),
);

world.createJoint(
  (joints[7] = new DistanceJoint({
    ...jd,
    bodyA: bodies[3],
    localAnchorA: new Vec2(0.0, -0.5),
    bodyB: bodies[0],
    localAnchorB: new Vec2(0.0, 0.5),
  })),
);

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      if (bodies.length) {
        world.destroyBody(bodies.pop()!);
      }
      break;

    case "Z":
      if (joints.length) {
        world.destroyJoint(joints.pop()!);
      }
      break;
  }
};

testbed.info("This demonstrates a soft distance joint.\nX: Delete a body, Z: Delete a joint");

world.on("remove-joint", function (joint) {
  for (let i = 0; i < 8; ++i) {
    joints = joints.filter(function (j) {
      return j !== joint;
    });
  }
});
