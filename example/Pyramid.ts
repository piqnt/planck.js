/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Edge, Box, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 20;

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

const a = 0.5;
const box = new Box(a, a);

const x = new Vec2(-7.0, 0.75);
const y = new Vec2();
const deltaX = new Vec2(0.5625, 1.25);
const deltaY = new Vec2(1.125, 0.0);

for (let i = 0; i < COUNT; ++i) {
  y.set(x);
  for (let j = i; j < COUNT; ++j) {
    world.createDynamicBody(y).createFixture(box, 5.0);

    y.add(deltaY);
  }
  x.add(deltaX);
}

testbed.step = function () {
  // let tree = world.m_broadPhase.m_tree;
  // if (stepCount++ == 400) {
  // tree.rebuildBottomUp();
  // }
};
