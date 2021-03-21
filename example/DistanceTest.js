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

planck.testbed('DistanceTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;

  var Distance = pl.Distance;
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
