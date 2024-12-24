/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Circle, Box, PulleyJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const y = 16.0;
const L = 12.0;
const a = 1.0;
const b = 2.0;

const ground = world.createBody({
  type: "static",
});

// ground.createFixture({
//   shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
//   density: 0.0,
// });

ground.createFixture({
  shape: new Circle({ x: -10.0, y: y + b + L }, 2.0),
  density: 0.0,
});
ground.createFixture({
  shape: new Circle({ x: 10.0, y: y + b + L }, 2.0),
  density: 0.0,
});

const shape = new Box(a, b);

// bd.fixedRotation = true;
const box1 = world.createBody({
  type: "dynamic",
  position: { x: -10.0, y: y },
});
box1.createFixture({
  shape: shape,
  density: 5.0,
});

const box2 = world.createBody({
  type: "dynamic",
  position: { x: 10.0, y: y },
});
box2.createFixture({
  shape: shape,
  density: 5.0,
});

const anchor1 = { x: -10.0, y: y + b };
const anchor2 = { x: 10.0, y: y + b };
const groundAnchor1 = { x: -10.0, y: y + b + L };
const groundAnchor2 = { x: 10.0, y: y + b + L };

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
