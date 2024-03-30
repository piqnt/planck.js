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

const { World, Vec2, Transform, Box, Distance, Testbed } = planck;

let DistanceInput = Distance.Input;
let DistanceOutput = Distance.Output;
let SimplexCache = Distance.Cache;

let world = new World();

const testbed = Testbed.mount();
testbed.start(world);    

let transformA = new Transform(new Vec2(0.0, -0.2));

let polygonA = new Box(10.0, 0.2);

let positionB = new Vec2(12.017401, 0.13678508);
let angleB = -0.0109265;
let transformB = new Transform(positionB, angleB);

let polygonB = new Box(2.0, 0.1);

let bodyA = world.createBody();
let fixA = bodyA.createFixture(polygonA);

let bodyB = world.createBody();
let fixB = bodyB.createFixture(polygonB);

testbed.step = function() {
  let input = new DistanceInput();
  input.proxyA.set(polygonA, 0);
  input.proxyB.set(polygonB, 0);
  input.transformA.set(transformA);
  input.transformB.set(transformB);
  input.useRadii = true;

  let cache = new SimplexCache();

  let output = new DistanceOutput();

  Distance(output, cache, input);

  testbed.status('Distance', output.distance);
  testbed.status('Iterations', output.iterations);

  bodyA.setTransform(transformA);
  bodyB.setTransform(transformB);

  let x1 = output.pointA;
  let x2 = output.pointB;

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
