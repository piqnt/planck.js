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

planck.testbed('TimeOfImpact', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;

  var Sweep = pl.internal.Sweep;
  var TimeOfImpact = pl.internal.TimeOfImpact;
  var TOIInput = TimeOfImpact.Input;
  var TOIOutput = TimeOfImpact.Output;

  var world = new pl.World();

  testbed.width = 80;
  testbed.height = 60;
  testbed.x = 0;
  testbed.y = 0;

  var shapeA = pl.Box(25.0, 5.0);
  var sweepA = new Sweep();
  sweepA.c0.set(0, 0);
  sweepA.a0 = 0.1;
  sweepA.c.set(sweepA.c0);
  sweepA.a = sweepA.a0;
  sweepA.localCenter.setZero();

  var shapeB = pl.Box(2.5, 2.5);
  var sweepB = new Sweep();
  sweepB.c0.set(20, 20);
  sweepB.a0 = 0.1; // - 162.0 * Math.PI;
  sweepB.c.set(-20, -20);
  sweepB.a = 3.1; // - 162.0 * Math.PI;
  sweepB.localCenter.setZero();

  // sweepB.a0 -= 300.0 * Math.PI;
  // sweepB.a -= 300.0 * Math.PI;

  var input = new TOIInput();
  input.proxyA.set(shapeA, 0);
  input.sweepA.set(sweepA);
  input.proxyB.set(shapeB, 0);
  input.sweepB.set(sweepB);
  input.tMax = 1.0;

  var output = new TOIOutput();

  TimeOfImpact(output, input);

  testbed.step = function() {

    // "max toi iters = %d, max root iters = %d", b2_toiMaxIters, b2_toiMaxRootIters

    testbed.status('toi', output.t);
    testbed.status(pl.internal.stats);

    var vertices = [];

    var transformB = new Transform();

    for (var t = 0.1; t < 1.0; t += 0.1) {
      sweepB.getTransform(transformB, t);
      vertices = Transform.mul(transformB, shapeB.m_vertices);
      testbed.drawPolygon(vertices, testbed.color(0.2, 0.2, 0.2));
    }

    var transformA = new Transform();
    sweepA.getTransform(transformA, 0.0);
    vertices = Transform.mul(transformA, shapeA.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(0.7, 0.7, 0.7));

    sweepB.getTransform(transformB, 0.0);
    vertices = Transform.mul(transformB, shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(1, 1, 1));

    sweepB.getTransform(transformB, output.t);
    vertices = Transform.mul(transformB, shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(1, 0, 0));

    sweepB.getTransform(transformB, 1.0);
    vertices = Transform.mul(transformB, shapeB.m_vertices);
    testbed.drawPolygon(vertices, testbed.color(1, 1, 1));

  };

  return world;
});
