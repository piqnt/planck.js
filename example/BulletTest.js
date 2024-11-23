/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

const { World, Vec2, Edge, Box, stats, Testbed } = planck;

let world = new World(new Vec2(0, -10));
  
const testbed = Testbed.mount();
testbed.start(world);

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-10.0, 0.0), new Vec2(10.0, 0.0)), 0.0);
ground.createFixture(new Box(0.2, 1.0, new Vec2(0.5, 1.0), 0.0), 0.0);

let body = world.createDynamicBody(new Vec2(0.0, 4.0));
body.createFixture(new Box(2.0, 0.1), 1.0);

// x = Math.random(-1.0, 1.0);
let x = 0.20352793;

let bullet = world.createBody({
  type: 'dynamic',
  position: new Vec2(x, 10.0),
  bullet: true,
});
bullet.createFixture(new Box(0.25, 0.25), 100.0);

bullet.setLinearVelocity(new Vec2(0.0, -50.0));

function Launch() {
  body.setTransform(new Vec2(0.0, 4.0), 0.0);
  body.setLinearVelocity(new Vec2());
  body.setAngularVelocity(0.0);

  x = Math.random() * 2 - 1;
  bullet.setTransform(new Vec2(x, 10.0), 0.0);
  bullet.setLinearVelocity(new Vec2(0.0, -50.0));
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
testbed.step = function() {
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
