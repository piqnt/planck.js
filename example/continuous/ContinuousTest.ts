/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, stats, Circle, Edge, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

let bullet: Body;
let angularVelocity: number;

const ground = world.createBody({
  type: "static",
  position: { x: 0.0, y: 0.0 },
});

ground.createFixture({
  shape: new Edge({ x: -10.0, y: 0.0 }, { x: 10.0, y: 0.0 }),
  density: 0.0,
});
ground.createFixture({
  shape: new Box(0.2, 1.0, { x: 0.5, y: 1.0 }, 0.0),
  density: 0.0,
});

if (true) {
  // angle = 0.1;
  bullet = world.createBody({
    type: "dynamic",
    position: { x: 0.0, y: 20.0 },
  });
  bullet.createFixture({
    shape: new Box(2.0, 0.1),
    density: 1.0,
  });

  angularVelocity = Math.random() * 100 - 50;
  // angularVelocity = 46.661274;
  bullet.setLinearVelocity({ x: 0.0, y: -100.0 });
  bullet.setAngularVelocity(angularVelocity);
} else {
  const shape = new Circle(0.5);
  {
    const body = world.createBody({
      type: "dynamic",
      position: { x: 0.0, y: 2.0 },
    });
    body.createFixture({
      shape: shape,
      density: 1.0,
    });
  }
  {
    const body = world.createBody({
      type: "dynamic",
      bullet: true,
      position: { x: 0.0, y: 2.0 },
    });
    body.createFixture({
      shape: shape,
      density: 1.0,
    });
    body.setLinearVelocity({ x: 0.0, y: -100.0 });
  }
}

function launch() {
  stats.gjkCalls = 0;
  stats.gjkIters = 0;
  stats.gjkMaxIters = 0;

  stats.toiCalls = 0;
  stats.toiIters = 0;
  stats.toiRootIters = 0;
  stats.toiMaxRootIters = 0;
  stats.toiTime = 0.0;
  stats.toiMaxTime = 0.0;

  bullet.setTransform({ x: 0.0, y: 20.0 }, 0.0);
  angularVelocity = Math.random() * 100 - 50;
  bullet.setLinearVelocity({ x: 0.0, y: -100.0 });
  bullet.setAngularVelocity(angularVelocity);
}

launch();

let stepCount = 0;
testbed.step = function () {
  testbed.status(stats);

  if (stats.gjkCalls > 0) {
    // "gjk calls = %d, ave gjk iters = %3.1, max gjk iters = %d", stats.gjkCalls, stats.gjkIters / float32(stats.gjkCalls), stats.gjkMaxIters
  }

  if (stats.toiCalls > 0) {
    // "toi calls = %d, ave [max] toi iters = %3.1 [%d]", stats.toiCalls, stats.toiIters / float32(stats.toiCalls), stats.toiMaxRootIters
    // "ave [max] toi root iters = %3.1 [%d]", stats.toiRootIters / float32(stats.toiCalls), stats.toiMaxRootIters
    // "ave [max] toi time = %.1 [%.1] (microseconds)", 1000.0 * stats.toiTime / float32(stats.toiCalls), 1000.0 * stats.toiMaxTime
  }

  if (stepCount++ % 60 == 0) {
    launch();
  }
};
