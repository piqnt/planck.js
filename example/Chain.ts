/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Edge, Box, RevoluteJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

const shape = new Box(0.6, 0.125);

const y = 25.0;
let prevBody = ground;
for (let i = 0; i < 30; ++i) {
  const body = world.createDynamicBody(new Vec2(0.5 + i, y));
  body.createFixture(shape, {
    density: 20.0,
    friction: 0.2,
  });

  const anchor = new Vec2(i, y);
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
