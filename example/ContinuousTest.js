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

planck.play('ContinuousTest', function(pl) {
  {
    var /* BodyDef */bd;
    bd.position.set(0.0, 0.0);
    var /* Body */body = world.createBody(bd);

    var /* EdgeShape */edge;

    edge.set(Vec2(-10.0, 0.0), Vec2(10.0, 0.0));
    body.createFixture(edge, 0.0);

    var /* PolygonShape */shape;
    shape.setAsBox(0.2, 1.0, Vec2(0.5, 1.0), 0.0);
    body.createFixture(shape, 0.0);
  }

  if (1) {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 20.0);
    // bd.angle = 0.1;

    var /* PolygonShape */shape;
    shape.setAsBox(2.0, 0.1);

    m_body = world.createBody(bd);
    m_body.createFixture(shape, 1.0);

    m_angularVelocity = RandomFloat(-50.0, 50.0);
    // m_angularVelocity = 46.661274;
    m_body.setLinearVelocity(Vec2(0.0, -100.0));
    m_body.setAngularVelocity(m_angularVelocity);
  } else {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 2.0);
    var /* Body */body = world.createBody(bd);

    var /* CircleShape */shape;
    shape.m_p.setZero();
    shape.m_radius = 0.5;
    body.createFixture(shape, 1.0);

    bd.bullet = true;
    bd.position.set(0.0, 10.0);
    body = world.createBody(bd);
    body.createFixture(shape, 1.0);
    body.setLinearVelocity(Vec2(0.0, -100.0));
  }

  /* extern */var /* int32 */b2_gjkCalls, b2_gjkIters, b2_gjkMaxIters;
  /* extern */var /* int32 */b2_toiCalls, b2_toiIters;
  /* extern */var /* int32 */b2_toiRootIters, b2_toiMaxRootIters;
  /* extern */var /* float32 */b2_toiTime, b2_toiMaxTime;

  b2_gjkCalls = 0;
  b2_gjkIters = 0;
  b2_gjkMaxIters = 0;
  b2_toiCalls = 0;
  b2_toiIters = 0;
  b2_toiRootIters = 0;
  b2_toiMaxRootIters = 0;
  b2_toiTime = 0.0;
  b2_toiMaxTime = 0.0;

  function Launch() {
    extern
    var /* int32 */b2_gjkCalls, b2_gjkIters, b2_gjkMaxIters;
    extern
    var /* int32 */b2_toiCalls, b2_toiIters;
    extern
    var /* int32 */b2_toiRootIters, b2_toiMaxRootIters;
    extern
    var /* float32 */b2_toiTime, b2_toiMaxTime;

    b2_gjkCalls = 0;
    b2_gjkIters = 0;
    b2_gjkMaxIters = 0;
    b2_toiCalls = 0;
    b2_toiIters = 0;
    b2_toiRootIters = 0;
    b2_toiMaxRootIters = 0;
    b2_toiTime = 0.0;
    b2_toiMaxTime = 0.0;

    m_body.setTransform(Vec2(0.0, 20.0), 0.0);
    m_angularVelocity = RandomFloat(-50.0, 50.0);
    m_body.setLinearVelocity(Vec2(0.0, -100.0));
    m_body.setAngularVelocity(m_angularVelocity);
  }

  function Step(settings) {
    Test.step(settings);

    extern
    var /* int32 */b2_gjkCalls, b2_gjkIters, b2_gjkMaxIters;

    if (b2_gjkCalls > 0) {
      g_debugDraw.DrawString(5, m_textLine,
          "gjk calls = %d, ave gjk iters = %3.1, max gjk iters = %d",
          b2_gjkCalls, b2_gjkIters / float32(b2_gjkCalls), b2_gjkMaxIters);
      m_textLine += DRAW_STRING_NEW_LINE;
    }

    extern
    var /* int32 */b2_toiCalls, b2_toiIters;
    extern
    var /* int32 */b2_toiRootIters, b2_toiMaxRootIters;
    extern
    var /* float32 */b2_toiTime, b2_toiMaxTime;

    if (b2_toiCalls > 0) {
      g_debugDraw.DrawString(5, m_textLine,
          "toi calls = %d, ave [max] toi iters = %3.1 [%d]", b2_toiCalls,
          b2_toiIters / float32(b2_toiCalls), b2_toiMaxRootIters);
      m_textLine += DRAW_STRING_NEW_LINE;

      g_debugDraw.DrawString(5, m_textLine,
          "ave [max] toi root iters = %3.1 [%d]", b2_toiRootIters
              / float32(b2_toiCalls), b2_toiMaxRootIters);
      m_textLine += DRAW_STRING_NEW_LINE;

      g_debugDraw.DrawString(5, m_textLine,
          "ave [max] toi time = %.1 [%.1] (microseconds)", 1000.0 * b2_toiTime
              / float32(b2_toiCalls), 1000.0 * b2_toiMaxTime);
      m_textLine += DRAW_STRING_NEW_LINE;
    }

    if (m_stepCount % 60 == 0) {
      // Launch();
    }
  }

  var /* Body */m_body;
  var /* float32 */m_angularVelocity;

  return world;
});
