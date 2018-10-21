/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
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

  var transformA = pl.Transform();
  transformA.p.set(0.0, -0.2);

  var polygonA = pl.Box(10.0, 0.2);

  var positionB = Vec2(12.017401, 0.13678508);
  var angleB = -0.0109265;
  var transformB = pl.Transform(positionB, angleB);

  var polygonB = pl.Box(2.0, 0.1);

  var bodyA = world.createBody();
  var fixA = bodyA.createFixture(polygonA);

  var bodyB = world.createBody();
  var fixB = bodyB.createFixture(polygonB);

  testbed.step = function() {
    var input = new DistanceInput();
    input.proxyA.set(polygonA, 0);
    input.proxyB.set(polygonB, 0);
    input.transformA = transformA;
    input.transformB = transformB;
    input.useRadii = true;

    var cache = new SimplexCache();

    var output = new DistanceOutput();

    Distance(output, cache, input);

    testbed.status("Distance", output.distance);
    testbed.status("Iterations", output.iterations);

    bodyA.setTransform(transformA);
    bodyB.setTransform(transformB);

    var x1 = output.pointA;
    var x2 = output.pointB;

    testbed.drawPoint(x1, 4.0, testbed.color(1.0, 0.0, 0.0));
    testbed.drawPoint(x2, 4.0, testbed.color(1.0, 1.0, 0.0));
  };

  testbed.keydown = function() {
    if (testbed.activeKeys['left']) {
      positionB.x -= 0.1;
    }

    if (testbed.activeKeys['right']) {
      positionB.x += 0.1;
    }

    if (testbed.activeKeys['down']) {
      positionB.y -= 0.1;
    }

    if (testbed.activeKeys['up']) {
      positionB.y += 0.1;
    }

    if (testbed.activeKeys['Z']) {
      angleB += 0.1;
    }

    if (testbed.activeKeys['X']) {
      angleB -= 0.1;
    }

    transformB.set(positionB, angleB);
  };

  return world;
});
