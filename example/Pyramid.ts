/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Edge, Box, Testbed } from "planck";

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let COUNT = 20;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

let a = 0.5;
let box = new Box(a, a);

let x = new Vec2(-7.0, 0.75);
let y = new Vec2();
let deltaX = new Vec2(0.5625, 1.25);
let deltaY = new Vec2(1.125, 0.0);

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
