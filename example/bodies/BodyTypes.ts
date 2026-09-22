/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, RevoluteJoint, PrismaticJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info("Z: Dynamic, X: Static, C: Kinematic");
testbed.start(world);

const SPEED = 3.0;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }),
});

// Define attachment
const attachment = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 3.0 },
});
attachment.createFixture({
  shape: new Box(0.5, 2.0),
  density: 2.0,
});

// Define platform
const platform = world.createBody({
  type: "dynamic",
  position: { x: -4.0, y: 5.0 },
});

platform.createFixture({
  shape: new Box(0.5, 4.0, { x: 4.0, y: 0.0 }, 0.5 * Math.PI),
  friction: 0.6,
  density: 2.0,
});

world.createJoint(
  new RevoluteJoint(
    {
      maxMotorTorque: 50.0,
      enableMotor: true,
    },
    attachment,
    platform,
    { x: 0.0, y: 5.0 },
  ),
);

world.createJoint(
  new PrismaticJoint(
    {
      maxMotorForce: 1000.0,
      enableMotor: true,
      lowerTranslation: -10.0,
      upperTranslation: 10.0,
      enableLimit: true,
    },
    ground,
    platform,
    { x: 0.0, y: 5.0 },
    { x: 1.0, y: 0.0 },
  ),
);

// Create a payload
const payload = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 8.0 },
});
payload.createFixture({
  shape: new Box(0.75, 0.75),
  friction: 0.6,
  density: 2.0,
});

testbed.keydown = function (code, char) {
  if (char === "Z") {
    platform.setDynamic();
  } else if (char === "X") {
    platform.setStatic();
  } else if (char === "C") {
    platform.setKinematic();
    platform.setLinearVelocity({ x: -SPEED, y: 0.0 });
    platform.setAngularVelocity(0.0);
  }
};

testbed.step = function () {
  // Drive the kinematic body.
  if (platform.isKinematic()) {
    const p = platform.getTransform().p;
    const v = platform.getLinearVelocity();

    if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
      v.x = -v.x;
      platform.setLinearVelocity(v);
    }
  }
};
