/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This tests bullet collision and provides an example of a gameplay scenario.
// This also uses a loop shape.

import { World, Circle, Box, Chain, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

// Ground body
const ground = world.createBody({
  type: "static",
});
ground.createFixture(
  new Chain(
    [
      { x: 0.0, y: -2.0 },
      { x: 8.0, y: 6.0 },
      { x: 8.0, y: 20.0 },
      { x: -8.0, y: 20.0 },
      { x: -8.0, y: 6.0 },
    ],
    true,
  ),
  0.0,
);

// Flippers
const pLeft = { x: -2.0, y: 0.0 };
const pRight = { x: 2.0, y: 0.0 };

const leftFlipper = world.createBody({
  type: "dynamic",
  position: { x: -2.0, y: 0.0 },
});
const rightFlipper = world.createBody({
  type: "dynamic",
  position: { x: 2.0, y: 0.0 },
});

leftFlipper.createFixture({
  shape: new Box(1.75, 0.1),
  density: 1.0,
});
rightFlipper.createFixture({
  shape: new Box(1.75, 0.1),
  density: 1.0,
});

const jd = {
  enableMotor: true,
  maxMotorTorque: 1000.0,
  enableLimit: true,
  motorSpeed: 0.0,
};

const leftJoint = new RevoluteJoint(
  {
    ...jd,
    lowerAngle: (-30.0 * Math.PI) / 180.0,
    upperAngle: (5.0 * Math.PI) / 180.0,
  },
  ground,
  leftFlipper,
  leftFlipper.getPosition(),
);
world.createJoint(leftJoint);

const rightJoint = new RevoluteJoint(
  {
    ...jd,
    lowerAngle: (-5.0 * Math.PI) / 180.0,
    upperAngle: (30.0 * Math.PI) / 180.0,
  },
  ground,
  rightFlipper,
  rightFlipper.getPosition(),
);
world.createJoint(rightJoint);

// Circle character
const ball = world.createBody({
  type: "dynamic",
  position: { x: 1.0, y: 15.0 },
  bullet: true,
});
ball.createFixture({
  shape: new Circle(0.2),
  density: 1.0,
});

testbed.step = function () {
  if (testbed.activeKeys.right) {
    rightJoint.setMotorSpeed(-20.0);
  } else {
    rightJoint.setMotorSpeed(10.0);
  }

  if (testbed.activeKeys.left) {
    leftJoint.setMotorSpeed(20.0);
  } else {
    leftJoint.setMotorSpeed(-10.0);
  }
};
