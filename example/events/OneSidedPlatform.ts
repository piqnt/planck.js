/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const radius = 0.5;
const top = 10.0 + 0.5;
const bottom = 10.0 - 0.5;

const UNKNOWN = 0;
const ABOVE = +1;
const BELOW = -1;

const state = UNKNOWN;

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
  position: { x: 0.0, y: 10.0 },
});
const platformFix = platform.createFixture({
  shape: new Box(3.0, 0.5),
  density: 0.0,
});

// Actor
const character = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 12.0 },
});
const characterFix = character.createFixture({
  shape: new Circle(radius),
  density: 20.0,
});
character.setLinearVelocity({ x: 0.0, y: -50.0 });

world.on("pre-solve", function (contact, oldManifold) {
  const fixA = contact.getFixtureA();
  const fixB = contact.getFixtureB();

  const isCharPlatformContact =
    (fixA === platformFix && fixB === characterFix) ||
    (fixB === platformFix && fixA === characterFix);

  if (!isCharPlatformContact) {
    return;
  }

  if (false) {
    // if character is below platform
    // disable contact
    const p = character.getPosition();

    if (p.y < top + radius - 3.0 * /*linearSlop*/ 0.005) {
      contact.setEnabled(false);
    }
  } else {
    // if character is moving up
    // disable contact
    const v = character.getLinearVelocity();
    if (v.y > 0.0) {
      contact.setEnabled(false);
    }
  }
});

testbed.step = function () {
  const v = character.getLinearVelocity();
  testbed.status("Character Linear Velocity", v.y);
};
