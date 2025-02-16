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

world
  .createBody({
    type: "static",
  })
  .createFixture({
    shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  });

world
  .createBody({
    type: "static",
    position: { x: -4.0, y: 22.0 },
    angle: -0.25,
  })
  .createFixture({
    shape: new Box(13.0, 0.25),
    density: 0.0,
  });

world
  .createBody({
    type: "static",
    position: { x: 10.5, y: 19.0 },
  })
  .createFixture({
    shape: new Box(0.25, 1.0),
    density: 0.0,
  });

world
  .createBody({
    type: "static",
    position: { x: 4.0, y: 14.0 },
    angle: 0.25,
  })
  .createFixture({
    shape: new Box(13.0, 0.25),
    density: 0.0,
  });

world
  .createBody({
    type: "static",
    position: { x: -10.5, y: 11.0 },
  })
  .createFixture({
    shape: new Box(0.25, 1.0),
    density: 0.0,
  });

world
  .createBody({
    type: "static",
    position: { x: -4.0, y: 6.0 },
    angle: -0.25,
  })
  .createFixture({
    shape: new Box(13.0, 0.25),
    density: 0.0,
  });

const friction = [0.75, 0.5, 0.35, 0.1, 0.0];

const circle = new Box(0.5, 0.5);

for (let i = 0; i < friction.length; ++i) {
  const ball = world.createBody({
    type: "dynamic",
    position: { x: -15.0 + 4.0 * i, y: 28.0 },
  });
  ball.createFixture({
    shape: circle,
    density: 25.0,
    friction: friction[i],
  });
}
