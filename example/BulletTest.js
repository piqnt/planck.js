/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

planck.testbed('BulletTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));
  
  var stats = pl.internal.stats;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-10.0, 0.0), Vec2(10.0, 0.0)), 0.0);
  ground.createFixture(pl.Box(0.2, 1.0, Vec2(0.5, 1.0), 0.0), 0.0);

  var body = world.createDynamicBody(Vec2(0.0, 4.0));
  body.createFixture(pl.Box(2.0, 0.1), 1.0);

  // x = pl.Math.random(-1.0, 1.0);
  var x = 0.20352793;

  var bullet = world.createBody({
    type: 'dynamic',
    position: Vec2(x, 10.0),
    bullet: true,
  });
  bullet.createFixture(pl.Box(0.25, 0.25), 100.0);

  bullet.setLinearVelocity(Vec2(0.0, -50.0));

  function Launch() {
    body.setTransform(Vec2(0.0, 4.0), 0.0);
    body.setLinearVelocity(Vec2());
    body.setAngularVelocity(0.0);

    x = pl.Math.random(-1.0, 1.0);
    bullet.setTransform(Vec2(x, 10.0), 0.0);
    bullet.setLinearVelocity(Vec2(0.0, -50.0));
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

  var stepCount = 0;
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

  return world;
});
