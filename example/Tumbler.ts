/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Box, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 200;

const ground = world.createBody({
  type: "static",
});

const container = world.createBody({
  type: "dynamic",
  position: { x: 0, y: 10 },
  allowSleep: false,
});

container.createFixture({
  shape: new Box(0.5, 20, { x: 20, y: 0 }, 0),
  density: 5,
});
container.createFixture({
  shape: new Box(0.5, 20, { x: -20, y: 0 }, 0),
  density: 5,
});
container.createFixture({
  shape: new Box(20, 0.5, { x: 0, y: 20 }, 0),
  density: 5,
});
container.createFixture({
  shape: new Box(20, 0.5, { x: 0, y: -20 }, 0),
  density: 5,
});

world.createJoint(
  new RevoluteJoint(
    {
      motorSpeed: 0.08 * Math.PI,
      maxMotorTorque: 1e8,
      enableMotor: true,
    },
    ground,
    container,
    { x: 0, y: 10 },
  ),
);

const shape = new Box(0.5, 0.5);
let count = 0;
while (count < COUNT) {
  const body = world.createBody({
    type: "dynamic",
    position: {
      x: Math.random() * 20 - 10,
      y: 10 + Math.random() * 20 - 10,
    },
  });
  body.createFixture({
    shape: shape,
    density: 1,
  });
  ++count;
}
