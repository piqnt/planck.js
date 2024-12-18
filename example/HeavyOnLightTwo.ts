/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Vec2, Circle, Edge, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.info("X: Add/Remove heavy circle");
testbed.start(world);

world.createBody().createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

world.createDynamicBody(new Vec2(0.0, 2.5)).createFixture(new Circle(0.5), 10.0);

world.createDynamicBody(new Vec2(0.0, 3.5)).createFixture(new Circle(0.5), 10.0);

let heavy: Body | null = null;

function toggleHeavy() {
  if (heavy) {
    world.destroyBody(heavy);
    heavy = null;
  } else {
    heavy = world.createDynamicBody(new Vec2(0.0, 9.0));
    heavy.createFixture(new Circle(5.0), 10.0);
  }
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      toggleHeavy();
      break;
  }
};
