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

import planck from "../src/main";

const { World, Vec2, Transform, Box, Distance, Testbed } = planck;

const DistanceInput = Distance.Input;
const DistanceOutput = Distance.Output;
const SimplexCache = Distance.Cache;

const world = new World();

const testbed = Testbed.mount();
testbed.start(world);

const transformA = new Transform(new Vec2(0.0, -0.2));

const polygonA = new Box(10.0, 0.2);

const positionB = new Vec2(12.017401, 0.13678508);
let angleB = -0.0109265;
const transformB = new Transform(positionB, angleB);

const polygonB = new Box(2.0, 0.1);

const bodyA = world.createBody();
const fixA = bodyA.createFixture(polygonA);

const bodyB = world.createBody();
const fixB = bodyB.createFixture(polygonB);

testbed.step = function () {
  const input = new DistanceInput();
  input.proxyA.set(polygonA, 0);
  input.proxyB.set(polygonB, 0);
  input.transformA.set(transformA);
  input.transformB.set(transformB);
  input.useRadii = true;

  const cache = new SimplexCache();

  const output = new DistanceOutput();

  Distance(output, cache, input);

  testbed.status("Distance", output.distance);
  testbed.status("Iterations", output.iterations);

  bodyA.setTransform(transformA.p, transformA.q.getAngle());
  bodyB.setTransform(transformB.p, transformB.q.getAngle());

  const x1 = output.pointA;
  const x2 = output.pointB;

  testbed.drawPoint(x1, 4.0, testbed.color(1.0, 0.0, 0.0));
  testbed.drawPoint(x2, 4.0, testbed.color(1.0, 1.0, 0.0));
};

testbed.keydown = function () {
  if (testbed.activeKeys["left"]) {
    positionB.x -= 0.1;
  }

  if (testbed.activeKeys["right"]) {
    positionB.x += 0.1;
  }

  if (testbed.activeKeys["down"]) {
    positionB.y -= 0.1;
  }

  if (testbed.activeKeys["up"]) {
    positionB.y += 0.1;
  }

  if (testbed.activeKeys["Z"]) {
    angleB += 0.1;
  }

  if (testbed.activeKeys["X"]) {
    angleB -= 0.1;
  }

  transformB.set(positionB, angleB);
};
