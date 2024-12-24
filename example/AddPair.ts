/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Circle, Box, Testbed } from "planck";

const world = new World();

const testbed = Testbed.mount();
testbed.y = 0;
testbed.hz = 60;
testbed.speed = 1;
testbed.start(world);

const circle = new Circle(0.1);

for (let i = 0; i < 50; ++i) {
  const b = world.createBody({
    type: "dynamic",
    position: {
      x: Math.random() * -6,
      y: Math.random() * 2 - 1,
    },
  });
  b.createFixture(circle, 0.01);
}

const box = world.createBody({
  type: "dynamic",
  position: { x: -40.0, y: 0.0 },
  bullet: true,
});

box.createFixture(new Box(1.5, 1.5), 1.0);
box.setLinearVelocity({ x: 100.0, y: 0.0 });
