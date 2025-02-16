/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This test shows how to use a motor joint. A motor joint
// can be used to animate a dynamic body. With finite motor forces
// the body can be blocked by collision with other bodies.

import { World, MotorJoint, Box, Edge, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

let time = 0;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }),
});

// Define motorized body
const body = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 8.0 },
});
body.createFixture({
  shape: new Box(2.0, 0.5),
  friction: 0.6,
  density: 2.0,
});

const joint = world.createJoint(
  new MotorJoint(
    {
      maxForce: 1000.0,
      maxTorque: 1000.0,
    },
    ground,
    body,
  ),
);

testbed.step = function (dt) {
  time += Math.min(dt, 100) / 1000;

  joint?.setLinearOffset({
    x: 6.0 * Math.sin(2.0 * time),
    y: 8.0 + 4.0 * Math.sin(1.0 * time),
  });
  joint?.setAngularOffset(4.0 * time);
};
