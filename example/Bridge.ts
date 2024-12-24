/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Edge, Box, Polygon, Circle, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -4 },
});

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 30;

let middle: Body;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const bridgeRect = new Box(0.5, 0.125);

const bridgeFD = {
  density: 20.0,
  friction: 0.2,
};

let prevBody = ground;
for (let i = 0; i < COUNT; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: -14.5 + 1.0 * i, y: 5.0 },
  });
  body.createFixture({
    shape: bridgeRect,
    ...bridgeFD,
  });

  const anchor = { x: -15.0 + 1.0 * i, y: 5.0 };
  world.createJoint(new RevoluteJoint({}, prevBody, body, anchor));

  if (i * 2 === COUNT) {
    middle = body;
  }
  prevBody = body;
}

const anchor = { x: -15.0 + 1.0 * COUNT, y: 5.0 };
world.createJoint(new RevoluteJoint({}, prevBody, ground, anchor));

for (let i = 0; i < 2; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: -8.0 + 8.0 * i, y: 12.0 },
  });

  const vertices = [
    { x: -0.5, y: 0.0 },
    { x: 0.5, y: 0.0 },
    { x: 0.0, y: 1.5 },
  ];
  body.createFixture({
    shape: new Polygon(vertices),
    density: 1.0,
  });
}

const shape = new Circle(0.5);
for (let i = 0; i < 3; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: -6.0 + 6.0 * i, y: 10.0 },
  });
  body.createFixture({
    shape: shape,
    density: 1.0,
  });
}
