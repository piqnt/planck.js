/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const shape = new Box(0.6, 0.125);

const y = 25.0;
let prevBody = ground;
for (let i = 0; i < 30; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: 0.5 + i, y: y },
  });
  body.createFixture({
    shape,
    density: 20.0,
    friction: 0.2,
  });

  const anchor = { x: i, y: y };
  world.createJoint(
    new RevoluteJoint(
      {
        collideConnected: false,
      },
      prevBody,
      body,
      anchor,
    ),
  );

  prevBody = body;
}
