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

planck.testbed('DistanceTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;

  var Distance = pl.internal.Distance;
  var DistanceInput = Distance.Input;
  var DistanceOutput = Distance.Output;
  var SimplexCache = Distance.Cache;

  var world = pl.World();

  var m_transformA = pl.Transform();
  m_transformA.p.set(0.0, -0.2);
  var m_polygonA = pl.Box(10.0, 0.2);

  var m_positionB = Vec2(12.017401, 0.13678508);
  var m_angleB = -0.0109265;
  var m_transformB = pl.Transform(m_positionB, m_angleB);

  var m_polygonB = pl.Box(2.0, 0.1);

  var bodyA = world.createBody();
  var fixA = bodyA.createFixture(m_polygonA);

  var bodyB = world.createBody();
  var fixB = bodyB.createFixture(m_polygonB);

  testbed.step = function() {
    var input = new DistanceInput();
    input.proxyA.set(m_polygonA, 0);
    input.proxyB.set(m_polygonB, 0);
    input.transformA = m_transformA;
    input.transformB = m_transformB;
    input.useRadii = true;

    var cache = new SimplexCache();

    var output = new DistanceOutput();

    Distance(output, cache, input);

    testbed.status("Distance", output.distance);
    testbed.status("Iterations", output.iterations);

    bodyA.setTransform(m_transformA);
    bodyB.setTransform(m_transformB);

    var x1 = output.pointA;
    var x2 = output.pointB;

    testbed.drawPoint(x1, 4.0, testbed.color(1.0, 0.0, 0.0));
    testbed.drawPoint(x2, 4.0, testbed.color(1.0, 1.0, 0.0));
  };

  testbed.keydown = function() {
    if (testbed.activeKeys['left']) {
      m_positionB.x -= 0.1;
    }

    if (testbed.activeKeys['right']) {
      m_positionB.x += 0.1;
    }

    if (testbed.activeKeys['down']) {
      m_positionB.y -= 0.1;
    }

    if (testbed.activeKeys['up']) {
      m_positionB.y += 0.1;
    }

    if (testbed.activeKeys['Z']) {
      m_angleB += 0.1;
    }

    if (testbed.activeKeys['X']) {
      m_angleB -= 0.1;
    }

    m_transformB.set(m_positionB, m_angleB);
  };

  return world;
});
