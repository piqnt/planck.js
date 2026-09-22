/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This tests distance joints, body destruction, and joint destruction.

import { World, Body, Joint, Box, DistanceJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});

const bodies: Body[] = [];
const joints: Joint[] = [];

const box = new Box(0.5, 0.5);

bodies[0] = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 5.0 },
});
bodies[0].createFixture({
  shape: box,
  density: 5.0,
});

bodies[1] = world.createBody({
  type: "dynamic",
  position: { x: 5.0, y: 5.0 },
});
bodies[1].createFixture({
  shape: box,
  density: 5.0,
});

bodies[2] = world.createBody({
  type: "dynamic",
  position: { x: 5.0, y: 15.0 },
});
bodies[2].createFixture({
  shape: box,
  density: 5.0,
});

bodies[3] = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 15.0 },
});
bodies[3].createFixture({
  shape: box,
  density: 5.0,
});

const jd = {
  frequencyHz: 2.0,
  dampingRatio: 0.0,
};

joints[0] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: { x: -10.0, y: 0.0 },
  bodyB: bodies[0],
  localAnchorB: { x: -0.5, y: -0.5 },
});
world.createJoint(joints[0]);

joints[1] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: { x: 10.0, y: 0.0 },
  bodyB: bodies[1],
  localAnchorB: { x: 0.5, y: -0.5 },
});
world.createJoint(joints[1]);

joints[2] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: { x: 10.0, y: 20.0 },
  bodyB: bodies[2],
  localAnchorB: { x: 0.5, y: 0.5 },
});
world.createJoint(joints[2]);

joints[3] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: { x: -10.0, y: 20.0 },
  bodyB: bodies[3],
  localAnchorB: { x: -0.5, y: 0.5 },
});
world.createJoint(joints[3]);

joints[4] = new DistanceJoint({
  ...jd,
  bodyA: bodies[0],
  localAnchorA: { x: 0.5, y: 0.0 },
  bodyB: bodies[1],
  localAnchorB: { x: -0.5, y: 0.0 },
});
world.createJoint(joints[4]);

joints[5] = new DistanceJoint({
  ...jd,
  bodyA: bodies[1],
  localAnchorA: { x: 0.0, y: 0.5 },
  bodyB: bodies[2],
  localAnchorB: { x: 0.0, y: -0.5 },
});
world.createJoint(joints[5]);

joints[6] = new DistanceJoint({
  ...jd,
  bodyA: bodies[2],
  localAnchorA: { x: -0.5, y: 0.0 },
  bodyB: bodies[3],
  localAnchorB: { x: 0.5, y: 0.0 },
});
world.createJoint(joints[6]);

joints[7] = new DistanceJoint({
  ...jd,
  bodyA: bodies[3],
  localAnchorA: { x: 0.0, y: -0.5 },
  bodyB: bodies[0],
  localAnchorB: { x: 0.0, y: 0.5 },
});
world.createJoint(joints[7]);

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      if (bodies.length) {
        const body = bodies.pop();
        if (body) world.destroyBody(body);
      }
      break;

    case "Z":
      if (joints.length) {
        const joint = joints.pop();
        if (joint) world.destroyJoint(joint);
      }
      break;
  }
};

testbed.info("This demonstrates a soft distance joint.\nX: Delete a body, Z: Delete a joint");

world.on("remove-joint", function (joint) {
  const index = joints.indexOf(joint);
  if (index > -1) joints.splice(index, 1);
});

world.on("remove-body", function (body) {
  const index = bodies.indexOf(body);
  if (index > -1) bodies.splice(index, 1);
});
