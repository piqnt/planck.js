/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, Testbed } from "planck";

const world = new World({ x: 0, y: -10 });

const testbed = Testbed.mount();
testbed.start(world);

// Ground
const ground = world.createBody();
ground.createFixture(new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }), 0.0);

// Platform
const platform = world
  .createBody({ x: -5.0, y: 5.0 })
  .createFixture(new Box(10.0, 0.5), { friction: 0.8 });

// Boxes
for (let i = 0; i < 5; ++i) {
  world.createDynamicBody({ x: -10.0 + 2.0 * i, y: 7.0 }).createFixture(new Box(0.5, 0.5), 20.0);
}

world.on("pre-solve", function (contact, oldManifold) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  if (fixtureA == platform) {
    contact.setTangentSpeed(5.0);
  }

  if (fixtureB == platform) {
    contact.setTangentSpeed(-5.0);
  }
});
