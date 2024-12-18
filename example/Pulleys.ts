/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Circle, Box, PulleyJoint, Testbed } from "planck";

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let y = 16.0;
let L = 12.0;
let a = 1.0;
let b = 2.0;

let ground = world.createBody();

// ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

ground.createFixture(new Circle(new Vec2(-10.0, y + b + L), 2.0), 0.0);
ground.createFixture(new Circle(new Vec2(10.0, y + b + L), 2.0), 0.0);

let shape = new Box(a, b);

// bd.fixedRotation = true;
let box1 = world.createDynamicBody(new Vec2(-10.0, y));
box1.createFixture(shape, 5.0);

let box2 = world.createDynamicBody(new Vec2(10.0, y));
box2.createFixture(shape, 5.0);

let anchor1 = new Vec2(-10.0, y + b);
let anchor2 = new Vec2(10.0, y + b);
let groundAnchor1 = new Vec2(-10.0, y + b + L);
let groundAnchor2 = new Vec2(10.0, y + b + L);

let joint1 = world.createJoint(
  new PulleyJoint({}, box1, box2, groundAnchor1, groundAnchor2, anchor1, anchor2, 1.5),
);

testbed.step = function () {
  let ratio = joint1.getRatio();
  let L = joint1.getCurrentLengthA() + ratio * joint1.getCurrentLengthB();
  testbed.status("ratio", ratio);
  testbed.status("L (L1 * ratio + L2)", L);
};
