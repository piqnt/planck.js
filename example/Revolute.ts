/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Edge, Circle, Box, Polygon, RevoluteJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);
testbed.info("Z: Limits, X: Motor");

const ground = world.createBody();

const groundFD = {
  filterCategoryBits: 2,
  filterMaskBits: 0xffff,
  filterGroupIndex: 0,
};
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), groundFD);

const rotator = world.createDynamicBody(new Vec2(-10.0, 20.0));
rotator.createFixture(new Circle(0.5), 5.0);

const w = 100.0;
rotator.setAngularVelocity(w);
rotator.setLinearVelocity(new Vec2(-8.0 * w, 0.0));

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
    new Vec2(-10.0, 12.0),
  ),
);

const ball = world.createDynamicBody(new Vec2(5.0, 30.0));
ball.createFixture(new Circle(3.0), {
  density: 5.0,
  // filterMaskBits: 1,
});

const platform = world.createBody({
  position: new Vec2(20.0, 10.0),
  type: "dynamic",
  bullet: true,
});
platform.createFixture(new Box(10.0, 0.2, new Vec2(-10.0, 0.0), 0.0), 2.0);

world.createJoint(
  new RevoluteJoint(
    {
      lowerAngle: -0.25 * Math.PI,
      upperAngle: 0.0 * Math.PI,
      enableLimit: true,
    },
    ground,
    platform,
    new Vec2(20.0, 10.0),
  ),
);

// Tests mass computation of a small object far from the origin
const triangle = world.createDynamicBody();

triangle.createFixture(
  new Polygon([new Vec2(17.63, 36.31), new Vec2(17.52, 36.69), new Vec2(17.19, 36.36)]),
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
  //   ball.setTransform(new Vec2(0.0, 0.5), 0.0);
  // }

  testbed.status("Motor Torque", joint?.getMotorTorque(testbed.hz));
  // testbed.status('Motor Force', joint.getMaxForce());
};
