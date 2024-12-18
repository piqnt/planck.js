/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Circle, Box, PulleyJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const y = 16.0;
const L = 12.0;
const a = 1.0;
const b = 2.0;

const ground = world.createBody();

// ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

ground.createFixture(new Circle(new Vec2(-10.0, y + b + L), 2.0), 0.0);
ground.createFixture(new Circle(new Vec2(10.0, y + b + L), 2.0), 0.0);

const shape = new Box(a, b);

// bd.fixedRotation = true;
const box1 = world.createDynamicBody(new Vec2(-10.0, y));
box1.createFixture(shape, 5.0);

const box2 = world.createDynamicBody(new Vec2(10.0, y));
box2.createFixture(shape, 5.0);

const anchor1 = new Vec2(-10.0, y + b);
const anchor2 = new Vec2(10.0, y + b);
const groundAnchor1 = new Vec2(-10.0, y + b + L);
const groundAnchor2 = new Vec2(10.0, y + b + L);

const joint1 = world.createJoint(
  new PulleyJoint({}, box1, box2, groundAnchor1, groundAnchor2, anchor1, anchor2, 1.5),
);

testbed.step = function () {
  if (!joint1) return;
  const ratio = joint1.getRatio();
  const L = joint1.getCurrentLengthA() + ratio * joint1.getCurrentLengthB();
  testbed.status("ratio", ratio);
  testbed.status("L (L1 * ratio + L2)", L);
};
