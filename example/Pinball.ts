/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This tests bullet collision and provides an example of a gameplay scenario.
// This also uses a loop shape.

import { World, Vec2, Circle, Box, Chain, RevoluteJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

// Ground body
const ground = world.createBody();
ground.createFixture(
  new Chain(
    [
      new Vec2(0.0, -2.0),
      new Vec2(8.0, 6.0),
      new Vec2(8.0, 20.0),
      new Vec2(-8.0, 20.0),
      new Vec2(-8.0, 6.0),
    ],
    true,
  ),
  0.0,
);

// Flippers
const pLeft = new Vec2(-2.0, 0.0);
const pRight = new Vec2(2.0, 0.0);

const leftFlipper = world.createDynamicBody(new Vec2(-2.0, 0.0));
const rightFlipper = world.createDynamicBody(new Vec2(2.0, 0.0));

leftFlipper.createFixture(new Box(1.75, 0.1), 1.0);
rightFlipper.createFixture(new Box(1.75, 0.1), 1.0);

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
  position: new Vec2(1.0, 15.0),
  type: "dynamic",
  bullet: true,
});
ball.createFixture(new Circle(0.2), 1.0);

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
