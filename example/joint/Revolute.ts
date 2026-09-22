/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Circle, Box, Polygon, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);
testbed.info("Z: Limits, X: Motor");

const ground = world.createBody({
  type: "static",
});

ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  filterCategoryBits: 2,
  filterMaskBits: 0xffff,
  filterGroupIndex: 0,
});

const w = 100.0;
const rotator = world.createBody({
  type: "dynamic",
  position: { x: -10.0, y: 20.0 },
  angularVelocity: w,
  linearVelocity: { x: -8.0 * w, y: 0.0 },
});
rotator.createFixture({
  shape: new Circle(0.5),
  density: 5.0,
});

const joint = world.createJoint(
  new RevoluteJoint(
    {
      motorSpeed: 1.0 * Math.PI,
      maxMotorTorque: 10000.0,
      enableMotor: true,
      lowerAngle: -0.25 * Math.PI,
      upperAngle: 0.5 * Math.PI,
      enableLimit: false,
      collideConnected: true,
    },
    ground,
    rotator,
    { x: -10.0, y: 12.0 },
  ),
);

const ball = world.createBody({
  type: "dynamic",
  position: { x: 5.0, y: 30.0 },
});
ball.createFixture({
  shape: new Circle(3.0),
  density: 5.0,
  // filterMaskBits: 1,
});

const platform = world.createBody({
  type: "dynamic",
  position: { x: 20.0, y: 10.0 },
  bullet: true,
});
platform.createFixture({
  shape: new Box(10.0, 0.2, { x: -10.0, y: 0.0 }, 0.0),
  density: 2.0,
});

world.createJoint(
  new RevoluteJoint(
    {
      lowerAngle: -0.25 * Math.PI,
      upperAngle: 0.0 * Math.PI,
      enableLimit: true,
    },
    ground,
    platform,
    { x: 20.0, y: 10.0 },
  ),
);

// Tests mass computation of a small object far from the origin
const triangle = world.createBody({
  type: "dynamic",
});

triangle.createFixture(
  new Polygon([
    { x: 17.63, y: 36.31 },
    { x: 17.52, y: 36.69 },
    { x: 17.19, y: 36.36 },
  ]),
  1,
); // assertion hits inside here

testbed.keydown = function (code, char) {
  switch (char) {
    case "Z":
      joint?.enableLimit(!joint.isLimitEnabled());
      break;

    case "X":
      joint?.enableMotor(!joint.isMotorEnabled());
      break;
  }
};

testbed.step = function () {
  // if (stepCount++ == 360) {
  //   ball.setTransform(({ x: 0.0, y:  0.5 }), 0.0);
  // }

  testbed.status("Motor Torque", joint?.getMotorTorque(testbed.hz));
  // testbed.status('Motor Force', joint.getMaxForce());
};
