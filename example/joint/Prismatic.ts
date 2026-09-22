/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// The motor in this test gets smoother with higher velocity iterations.

import { World, Vec2, PrismaticJoint, Edge, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const MOTOR_SPEED = 10;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const body = world.createBody({
  type: "dynamic",
  position: { x: -10.0, y: 10.0 },
  angle: 0.5 * Math.PI,
  allowSleep: false,
});
body.createFixture({
  shape: new Box(2.0, 0.5),
  density: 5.0,
});

// Bouncy limit
const axis = Vec2.normalize({ x: 2.0, y: 1.0 });
const joint = new PrismaticJoint(
  {
    motorSpeed: MOTOR_SPEED,
    maxMotorForce: 10000.0,
    enableMotor: true,
    lowerTranslation: 0.0,
    upperTranslation: 20.0,
    enableLimit: true,
  },
  ground,
  body,
  { x: 0.0, y: 0.0 },
  axis,
);

// Non-bouncy limit
// (ground, body, ({ x: -10.0, y:  10.0 }), ({ x: 1.0, y:  0.0 }));

world.createJoint(joint);

testbed.step = function () {
  if (testbed.activeKeys.right && !testbed.activeKeys.left) {
    joint.enableLimit(true);
    joint.enableMotor(true);
    joint.setMotorSpeed(+MOTOR_SPEED);
  } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
    joint.enableLimit(true);
    joint.enableMotor(true);
    joint.setMotorSpeed(-MOTOR_SPEED);
  } else if (testbed.activeKeys.up && !testbed.activeKeys.down) {
    joint.enableLimit(false);
    joint.enableMotor(true);
    joint.setMotorSpeed(+MOTOR_SPEED);
  } else if (testbed.activeKeys.down && !testbed.activeKeys.up) {
    joint.enableLimit(false);
    joint.enableMotor(true);
    joint.setMotorSpeed(-MOTOR_SPEED);
  } else {
    joint.enableLimit(true);
    joint.enableMotor(false);
  }

  const force = joint.getMotorForce(1 / 60);
  testbed.status("Motor Force", force);
};
