/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// A motor driven slider crank with joint friction.

import { World, Vec2, RevoluteJoint, PrismaticJoint, Edge, Box, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);
testbed.info("Z: Toggle friction, X: Toggle motor");

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

// Define crank.
const crank = world.createDynamicBody(new Vec2(0.0, 7.0));
crank.createFixture(new Box(0.5, 2.0), 2.0);

const joint1 = world.createJoint(
  new RevoluteJoint(
    {
      motorSpeed: Math.PI,
      maxMotorTorque: 10000.0,
      enableMotor: true,
    },
    ground,
    crank,
    new Vec2(0.0, 5.0),
  ),
);

// Define follower.
const follower = world.createDynamicBody(new Vec2(0.0, 13.0));
follower.createFixture(new Box(0.5, 4.0), 2.0);

world.createJoint(new RevoluteJoint({ enableMotor: false }, crank, follower, new Vec2(0.0, 9.0)));

// Define piston
const piston = world.createBody({
  type: "dynamic",
  fixedRotation: true,
  position: new Vec2(0.0, 17.0),
});
piston.createFixture(new Box(1.5, 1.5), 2.0);

world.createJoint(new RevoluteJoint({}, follower, piston, new Vec2(0.0, 17.0)));

const joint2 = world.createJoint(
  new PrismaticJoint(
    {
      maxMotorForce: 1000.0,
      enableMotor: true,
    },
    ground,
    piston,
    new Vec2(0.0, 17.0),
    new Vec2(0.0, 1.0),
  ),
);

// Create a payload
const payload = world.createDynamicBody(new Vec2(0.0, 23.0));
payload.createFixture(new Box(1.5, 1.5), 2.0);

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
