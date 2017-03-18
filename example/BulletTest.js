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

planck.testbed('BulletTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));
  
  var stats = pl.internal.stats;

  var m_body;
  var m_x;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-10.0, 0.0), Vec2(10.0, 0.0)), 0.0);
  ground.createFixture(pl.Box(0.2, 1.0, Vec2(0.5, 1.0), 0.0), 0.0);

  m_body = world.createDynamicBody(Vec2(0.0, 4.0));
  m_body.createFixture(pl.Box(2.0, 0.1), 1.0);

  // m_x = pl.Math.random(-1.0, 1.0);
  m_x = 0.20352793;

  var bd = {};
  bd.type = 'dynamic';
  bd.position = Vec2(m_x, 10.0);
  bd.bullet = true;

  var bullet = world.createBody(bd);
  bullet.createFixture(pl.Box(0.25, 0.25), 100.0);

  bullet.setLinearVelocity(Vec2(0.0, -50.0));

  function Launch() {
    m_body.setTransform(Vec2(0.0, 4.0), 0.0);
    m_body.setLinearVelocity(Vec2());
    m_body.setAngularVelocity(0.0);

    m_x = pl.Math.random(-1.0, 1.0);
    bullet.setTransform(Vec2(m_x, 10.0), 0.0);
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

    if (world.m_stepCount % 60 == 0) {
      Launch();
    }
  };

  return world;
});
