/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Edge, Box, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

// Ground
const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Platform
const platform = world
  .createBody(new Vec2(-5.0, 5.0))
  .createFixture(new Box(10.0, 0.5), { friction: 0.8 });

// Boxes
for (let i = 0; i < 5; ++i) {
  world.createDynamicBody(new Vec2(-10.0 + 2.0 * i, 7.0)).createFixture(new Box(0.5, 0.5), 20.0);
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
