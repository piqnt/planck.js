/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Edge, Box, Circle, Testbed } from "planck";

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let radius = 0.5;
let top = 10.0 + 0.5;
let bottom = 10.0 - 0.5;

let UNKNOWN = 0;
let ABOVE = +1;
let BELOW = -1;

let state = UNKNOWN;

// Ground
let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Platform
let platform = world.createBody(new Vec2(0.0, 10.0));
let platformFix = platform.createFixture(new Box(3.0, 0.5), 0.0);

// Actor
let character = world.createDynamicBody(new Vec2(0.0, 12.0));
let characterFix = character.createFixture(new Circle(radius), 20.0);
character.setLinearVelocity(new Vec2(0.0, -50.0));

world.on("pre-solve", function (contact, oldManifold) {
  let fixA = contact.getFixtureA();
  let fixB = contact.getFixtureB();

  let isCharPlatformContact =
    (fixA === platformFix && fixB === characterFix) ||
    (fixB === platformFix && fixA === characterFix);

  if (!isCharPlatformContact) {
    return;
  }

  if (false) {
    // if character is below platform
    // disable contact
    let p = character.getPosition();

    if (p.y < top + radius - 3.0 * /*linearSlop*/ 0.005) {
      contact.setEnabled(false);
    }
  } else {
    // if character is moving up
    // disable contact
    let v = character.getLinearVelocity();
    if (v.y > 0.0) {
      contact.setEnabled(false);
    }
  }
});

testbed.step = function () {
  let v = character.getLinearVelocity();
  testbed.status("Character Linear Velocity", v.y);
};
