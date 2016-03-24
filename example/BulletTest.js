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

planck.play('BulletTest', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var m_body;
  var m_x;

  {
    var body = world.createBody();
    body.createFixture(pl.Edge(Vec2(-10.0, 0.0), Vec2(10.0, 0.0)), 0.0);
    body.createFixture(pl.Box(0.2, 1.0, Vec2(0.5, 1.0), 0.0), 0.0);
  }

  {
    m_body = world.createDynamicBody(Vec2(0.0, 4.0));
    m_body.createFixture(pl.Box(2.0, 0.1), 1.0);

    // m_x = RandomFloat(-1.0, 1.0);
    m_x = 0.20352793;

    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(m_x, 10.0);
    bd.bullet = true;

    var bullet = world.createBody(bd);
    bullet.createFixture(pl.Box(0.25, 0.25), 100.0);

    bullet.setLinearVelocity(Vec2(0.0, -50.0));
  }

  function Launch() {
    m_body.setTransform(Vec2(0.0, 4.0), 0.0);
    m_body.setLinearVelocity(Vec2());
    m_body.setAngularVelocity(0.0);

    m_x = RandomFloat(-1.0, 1.0);
    bullet.setTransform(Vec2(m_x, 10.0), 0.0);
    bullet.setLinearVelocity(Vec2(0.0, -50.0));
    bullet.setAngularVelocity(0.0);

    var b2_gjkCalls, b2_gjkIters, b2_gjkMaxIters;
    var b2_toiCalls, b2_toiIters, b2_toiMaxIters;
    var b2_toiRootIters, b2_toiMaxRootIters;

    b2_gjkCalls = 0;
    b2_gjkIters = 0;
    b2_gjkMaxIters = 0;

    b2_toiCalls = 0;
    b2_toiIters = 0;
    b2_toiMaxIters = 0;
    b2_toiRootIters = 0;
    b2_toiMaxRootIters = 0;
  }

  function Step(settings) {
    var b2_gjkCalls, b2_gjkIters, b2_gjkMaxIters;
    var b2_toiCalls, b2_toiIters;
    var b2_toiRootIters, b2_toiMaxRootIters;

    if (b2_gjkCalls > 0) {
      g_debugDraw.DrawString(5, m_textLine,
          "gjk calls = %d, ave gjk iters = %3.1, max gjk iters = %d",
          b2_gjkCalls, b2_gjkIters / float32(b2_gjkCalls), b2_gjkMaxIters);
      m_textLine += DRAW_STRING_NEW_LINE;
    }

    if (b2_toiCalls > 0) {
      g_debugDraw.DrawString(5, m_textLine,
          "toi calls = %d, ave toi iters = %3.1, max toi iters = %d",
          b2_toiCalls, b2_toiIters / float32(b2_toiCalls), b2_toiMaxRootIters);
      m_textLine += DRAW_STRING_NEW_LINE;

      g_debugDraw.DrawString(5, m_textLine,
          "ave toi root iters = %3.1, max toi root iters = %d", b2_toiRootIters
              / float32(b2_toiCalls), b2_toiMaxRootIters);
      m_textLine += DRAW_STRING_NEW_LINE;
    }

    if (m_stepCount % 60 == 0) {
      Launch();
    }
  }

  return world;
});
