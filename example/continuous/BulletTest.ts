/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, stats, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -10.0, y: 0.0 }, { x: 10.0, y: 0.0 }),
  density: 0.0,
});
ground.createFixture({
  shape: new Box(0.2, 1.0, { x: 0.5, y: 1.0 }, 0.0),
  density: 0.0,
});

const body = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 4.0 },
});
body.createFixture({
  shape: new Box(2.0, 0.1),
  density: 1.0,
});

// x = Math.random(-1.0, 1.0);
let x = 0.20352793;

const bullet = world.createBody({
  type: "dynamic",
  position: { x: x, y: 10.0 },
  bullet: true,
  linearVelocity: { x: 0.0, y: -50.0 },
});
bullet.createFixture({
  shape: new Box(0.25, 0.25),
  density: 100.0,
});

function Launch() {
  body.setTransform({ x: 0.0, y: 4.0 }, 0.0);
  body.setLinearVelocity({ x: 0, y: 0 });
  body.setAngularVelocity(0.0);

  x = Math.random() * 2 - 1;
  bullet.setTransform({ x: x, y: 10.0 }, 0.0);
  bullet.setLinearVelocity({ x: 0.0, y: -50.0 });
  bullet.setAngularVelocity(0.0);

  stats.gjkCalls = 0;
  stats.gjkIters = 0;
  stats.gjkMaxIters = 0;

  stats.toiCalls = 0;
  stats.toiIters = 0;
  stats.toiMaxIters = 0;
  stats.toiRootIters = 0;
  stats.toiMaxRootIters = 0;
}

let stepCount = 0;
testbed.step = function () {
  testbed.status(stats);

  // if (stats.gjkCalls > 0) {
  //   "gjk calls = %d, ave gjk iters = %3.1, max gjk iters = %d",
  //   stats.gjkCalls, stats.gjkIters / float32(stats.gjkCalls), stats.gjkMaxIters);
  // }

  // if (stats.toiCalls > 0) {
  //   "toi calls = %d, ave toi iters = %3.1, max toi iters = %d",
  //   stats.toiCalls, stats.toiIters / float32(stats.toiCalls), stats.toiMaxRootIters);
  //
  //   "ave toi root iters = %3.1, max toi root iters = %d", stats.toiRootIters
  //       / float32(stats.toiCalls), stats.toiMaxRootIters);
  // }

  if (stepCount++ % 60 === 0) {
    Launch();
  }
};
