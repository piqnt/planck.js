/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

planck.testbed('ContinuousTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));
  
  var stats = pl.internal.stats;

  var m_body;
  var m_angularVelocity;

  var body = world.createBody(Vec2(0.0, 0.0));

  body.createFixture(pl.Edge(Vec2(-10.0, 0.0), Vec2(10.0, 0.0)), 0.0);
  body.createFixture(pl.Box(0.2, 1.0, Vec2(0.5, 1.0), 0.0), 0.0);

  if (1) {
    var bd = {};
    bd.position = Vec2(0.0, 20.0);
    // bd.angle = 0.1;

    m_body = world.createDynamicBody(bd);
    m_body.createFixture(pl.Box(2.0, 0.1), 1.0);

    m_angularVelocity = pl.Math.random(-50.0, 50.0);
    // m_angularVelocity = 46.661274;
    m_body.setLinearVelocity(Vec2(0.0, -100.0));
    m_body.setAngularVelocity(m_angularVelocity);

  } else {
    var bd = {};
    bd.position = Vec2(0.0, 2.0);
    var body = world.createDynamicBody(bd);

    var shape = pl.Circle(0.5);
    body.createFixture(shape, 1.0);

    bd.bullet = true;
    bd.position = Vec2(0.0, 10.0);
    body = world.createBody(bd);
    body.createFixture(shape, 1.0);
    body.setLinearVelocity(Vec2(0.0, -100.0));
  }

  function Launch() {
    stats.gjkCalls = 0;
    stats.gjkIters = 0;
    stats.gjkMaxIters = 0;

    stats.toiCalls = 0;
    stats.toiIters = 0;
    stats.toiRootIters = 0;
    stats.toiMaxRootIters = 0;
    stats.toiTime = 0.0;
    stats.toiMaxTime = 0.0;

    m_body.setTransform(Vec2(0.0, 20.0), 0.0);
    m_angularVelocity = pl.Math.random(-50.0, 50.0);
    m_body.setLinearVelocity(Vec2(0.0, -100.0));
    m_body.setAngularVelocity(m_angularVelocity);
  }

  Launch();

  testbed.step = function() {
    testbed.status(stats);

    if (stats.gjkCalls > 0) {
      // "gjk calls = %d, ave gjk iters = %3.1, max gjk iters = %d", stats.gjkCalls, stats.gjkIters / float32(stats.gjkCalls), stats.gjkMaxIters
    }

    if (stats.toiCalls > 0) {
      // "toi calls = %d, ave [max] toi iters = %3.1 [%d]", stats.toiCalls, stats.toiIters / float32(stats.toiCalls), stats.toiMaxRootIters
      // "ave [max] toi root iters = %3.1 [%d]", stats.toiRootIters / float32(stats.toiCalls), stats.toiMaxRootIters
      // "ave [max] toi time = %.1 [%.1] (microseconds)", 1000.0 * stats.toiTime / float32(stats.toiCalls), 1000.0 * stats.toiMaxTime
    }

    if (world.m_stepCount % 60 == 0) {
      Launch();
    }
  };

  return world;
});
