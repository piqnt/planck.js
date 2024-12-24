/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

// Ground
const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }),
  density: 0.0,
});

// Platform
const platform = world.createBody({
  type: "static",
  position: { x: -5.0, y: 5.0 },
});
platform.createFixture({
  shape: new Box(10.0, 0.5),
  friction: 0.8,
});

// Boxes
for (let i = 0; i < 5; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: -10.0 + 2.0 * i, y: 7.0 },
  });
  body.createFixture({
    shape: new Box(0.5, 0.5),
    density: 20.0,
  });
}

world.on("pre-solve", function (contact, oldManifold) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  if (fixtureA.getBody() == platform) {
    contact.setTangentSpeed(5.0);
  }

  if (fixtureB.getBody() == platform) {
    contact.setTangentSpeed(-5.0);
  }
});
