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

const COUNT = 20;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const a = 0.5;
const box = new Box(a, a);

const x = { x: -7.0, y: 0.75 };
const y = { x: 0, y: 0 };
const deltaX = { x: 0.5625, y: 1.25 };
const deltaY = { x: 1.125, y: 0.0 };

for (let i = 0; i < COUNT; ++i) {
  y.x = x.x;
  y.y = x.y;
  for (let j = i; j < COUNT; ++j) {
    const body = world.createBody({
      type: "dynamic",
      position: y,
    });
    body.createFixture({
      shape: box,
      density: 5.0,
    });

    y.x += deltaY.x;
    y.y += deltaY.y;
  }
  x.x += deltaX.x;
  x.y += deltaX.y;
}

testbed.step = function () {
  // let tree = world.m_broadPhase.m_tree;
  // if (stepCount++ == 400) {
  // tree.rebuildBottomUp();
  // }
};
