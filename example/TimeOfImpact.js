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

planck.play('TimeOfImpact', function(pl, stage) {
  var Vec2 = pl.Vec2, Transform = pl.Transform;
  var world = new pl.World();

  var m_shapeA = pl.Box(25.0, 5.0);
  var m_shapeB = pl.Box(2.5, 2.5);

  function Step(settings) {

    var sweepA = new pl.internal.Sweep();
    sweepA.c0.set(24.0, -60.0);
    sweepA.a0 = 2.95;
    sweepA.c = sweepA.c0;
    sweepA.a = sweepA.a0;
    sweepA.localCenter.setZero();

    var sweepB = new pl.internal.Sweep();
    sweepB.c0.set(53.474274, -50.252514);
    sweepB.a0 = 513.36676; // - 162.0 * Math.PI;
    sweepB.c.set(54.595478, -51.083473);
    sweepB.a = 513.62781; // - 162.0 * Math.PI;
    sweepB.localCenter.setZero();

    // sweepB.a0 -= 300.0 * Math.PI;
    // sweepB.a -= 300.0 * Math.PI;

    var input = new TOIInput();
    input.proxyA.set(m_shapeA, 0);
    input.proxyB.set(m_shapeB, 0);
    input.sweepA.set(sweepA);
    input.sweepB.set(sweepB);
    input.tMax = 1.0;

    var output = new TOIOutput();

    TimeOfImpact(output, input);

    g_debugDraw.DrawString(5, m_textLine, "toi = %g", output.t);
    m_textLine += DRAW_STRING_NEW_LINE;

    var b2_toiMaxIters, b2_toiMaxRootIters;
    g_debugDraw.DrawString(5, m_textLine,
        "max toi iters = %d, max root iters = %d", b2_toiMaxIters,
        b2_toiMaxRootIters);
    m_textLine += DRAW_STRING_NEW_LINE;

    var vertices = []; // Vec2[ b2_maxPolygonVertices ];

    var transformA = new Transform();
    sweepA.getTransform(transformA, 0.0);
    for (var i = 0; i < m_shapeA.m_count; ++i) {
      vertices[i] = Mul(transformA, m_shapeA.m_vertices[i]);
    }
    g_debugDraw.DrawPolygon(vertices, m_shapeA.m_count, Color(0.9, 0.9, 0.9));

    var transformB = new Transform();
    sweepB.getTransform(transformB, 0.0);

    var localPoint = Vec2(2.0, -0.1);

    for (var i = 0; i < m_shapeB.m_count; ++i) {
      vertices[i] = Mul(transformB, m_shapeB.m_vertices[i]);
    }
    g_debugDraw.DrawPolygon(vertices, m_shapeB.m_count, Color(0.5, 0.9, 0.5));

    sweepB.getTransform(transformB, output.t);
    for (var i = 0; i < m_shapeB.m_count; ++i) {
      vertices[i] = Mul(transformB, m_shapeB.m_vertices[i]);
    }
    g_debugDraw.DrawPolygon(vertices, m_shapeB.m_count, Color(0.5, 0.7, 0.9));

    sweepB.getTransform(transformB, 1.0);
    for (var i = 0; i < m_shapeB.m_count; ++i) {
      vertices[i] = Mul(transformB, m_shapeB.m_vertices[i]);
    }
    g_debugDraw.DrawPolygon(vertices, m_shapeB.m_count, Color(0.9, 0.5, 0.5));

    if (0) {
      for (var t = 0.0; t < 1.0; t += 0.1) {
        sweepB.getTransform(transformB, t);
        for (var i = 0; i < m_shapeB.m_count; ++i) {
          vertices[i] = Mul(transformB, m_shapeB.m_vertices[i]);
        }
        g_debugDraw.DrawPolygon(vertices, m_shapeB.m_count,
            Color(0.9, 0.5, 0.5));
      }
    }
  }

  return world;
});
