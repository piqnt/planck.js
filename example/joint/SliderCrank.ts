/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// A motor driven slider crank with joint friction.

import { World, RevoluteJoint, PrismaticJoint, Edge, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);
testbed.info("Z: Toggle friction, X: Toggle motor");

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

// Define crank.
const crank = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 7.0 },
});
crank.createFixture({
  shape: new Box(0.5, 2.0),
  density: 2.0,
});

const joint1 = world.createJoint(
  new RevoluteJoint(
    {
      motorSpeed: Math.PI,
      maxMotorTorque: 10000.0,
      enableMotor: true,
    },
    ground,
    crank,
    { x: 0.0, y: 5.0 },
  ),
);

// Define follower.
const follower = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 13.0 },
});
follower.createFixture({
  shape: new Box(0.5, 4.0),
  density: 2.0,
});

world.createJoint(new RevoluteJoint({ enableMotor: false }, crank, follower, { x: 0.0, y: 9.0 }));

// Define piston
const piston = world.createBody({
  type: "dynamic",
  fixedRotation: true,
  position: { x: 0.0, y: 17.0 },
});
piston.createFixture({
  shape: new Box(1.5, 1.5),
  density: 2.0,
});

world.createJoint(new RevoluteJoint({}, follower, piston, { x: 0.0, y: 17.0 }));

const joint2 = world.createJoint(
  new PrismaticJoint(
    {
      maxMotorForce: 1000.0,
      enableMotor: true,
    },
    ground,
    piston,
    { x: 0.0, y: 17.0 },
    { x: 0.0, y: 1.0 },
  ),
);

// Create a payload
const payload = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 23.0 },
});
payload.createFixture({
  shape: new Box(1.5, 1.5),
  density: 2.0,
});

testbed.keydown = function (code, char) {
  switch (char) {
    case "Z":
      joint2?.enableMotor(!joint2.isMotorEnabled());
      joint2?.getBodyB().setAwake(true);
      break;

    case "X":
      joint1?.enableMotor(!joint1.isMotorEnabled());
      joint1?.getBodyB().setAwake(true);
      break;
  }
};

testbed.step = function () {
  const torque = joint1?.getMotorTorque(1 / 60);
  testbed.status("Motor Torque", torque);
};
