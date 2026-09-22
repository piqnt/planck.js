/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// Note: even with a restitution of 1.0, there is some energy change
// due to position correction.

import { World, Circle, Edge, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
});

const restitution = [0.0, 0.1, 0.3, 0.5, 0.75, 0.9, 1.0];

const circle = new Circle(1.0);

for (let i = 0; i < restitution.length; ++i) {
  const ball = world.createBody({
    type: "dynamic",
    position: { x: -10.0 + 3.0 * i, y: 20.0 },
  });
  ball.createFixture({
    shape: circle,
    density: 1.0,
    restitution: restitution[i],
  });
}
