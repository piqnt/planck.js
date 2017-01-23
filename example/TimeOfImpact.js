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

planck.play('TimeOfImpact', function(pl, testbed) {
  var Vec2 = pl.Vec2, Transform = pl.Transform;
  var world = new pl.World();

  testbed.width = 150;
  testbed.height = 100;
  testbed.x = 30;
  testbed.y = 60;

  var m_shapeA = pl.Box(25.0, 5.0);
  var m_shapeB = pl.Box(2.5, 2.5);

  var sweepA = new pl.internal.Sweep();
  sweepA.c0.set(24.0, -60.0);
  sweepA.a0 = 2.95;
  sweepA.c.set(sweepA.c0);
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

  var input = new pl.internal.TimeOfImpact.Input();
  input.proxyA.set(m_shapeA, 0);
  input.proxyB.set(m_shapeB, 0);
  input.sweepA.set(sweepA);
  input.sweepB.set(sweepB);
  input.tMax = 1.0;

  var output = new pl.internal.TimeOfImpact.Output();

  pl.internal.TimeOfImpact(output, input);

  var transformA = new Transform();
  sweepA.getTransform(transformA, 0.0);
  console.log(Transform.mul(transformA, m_shapeA.m_vertices));

  testbed.step = function() {

    // "toi = %g", output.t
    // "max toi iters = %d, max root iters = %d", b2_toiMaxIters, b2_toiMaxRootIters

    testbed.status('toi = ' + output.t + '\n' + pl.internal.stats.toString('\n'));

    var vertices = [];

    var transformA = new Transform();
    sweepA.getTransform(transformA, 0.0);
    vertices = Transform.mul(transformA, m_shapeA.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(0.9, 0.9, 0.9));

    var transformB = new Transform();
    sweepB.getTransform(transformB, 0.0);

    var localPoint = Vec2(2.0, -0.1);

    vertices = Transform.mul(transformB, m_shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(0.5, 0.9, 0.5));

    sweepB.getTransform(transformB, output.t);
    vertices = Transform.mul(transformB, m_shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(0.5, 0.7, 0.9));

    sweepB.getTransform(transformB, 1.0);
    vertices = Transform.mul(transformB, m_shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(0.9, 0.5, 0.5));

    if (0) {
      for (var t = 0.0; t < 1.0; t += 0.1) {
        sweepB.getTransform(transformB, t);
        vertices = Transform.mul(transformB, m_shapeB.m_vertices);
        testbed.drawPolygon(vertices, testbed.color(0.9, 0.5, 0.5));
      }
    }
  };

  return world;
});
