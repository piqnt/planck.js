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

const { World, Vec2, Transform, Manifold, CollidePolygons, Box } = planck;

var world = new World(new Vec2(0, -10));

const testbed = planck.testbed();
testbed.info('Use arrow keys to move and Z or X to rotate.');
testbed.start(world);

var polygonA = new Box(2, 4);
var transformA = new Transform(new Vec2(0.0, 0.0), 0.0);

var polygonB = new Box(5, 5);
var positionB = new Vec2(5, 4);
var angleB = 1.9160721;
var transformB = new Transform(positionB, angleB);

testbed.step = function() {
  var manifold = new Manifold();
  new CollidePolygons(manifold, polygonA, transformA, polygonB, transformB);

  var worldManifold = manifold.getWorldManifold(null, transformA, polygonA.getRadius(), transformB, polygonB.getRadius());

  testbed.status('point count', manifold.pointCount);

  var vA = polygonA.m_vertices.map(Transform.mulFn(transformA));
  testbed.drawPolygon(vA, testbed.color(0.9, 0.9, 0.9));

  var vB = polygonB.m_vertices.map(Transform.mulFn(transformB));
  testbed.drawPolygon(vB, testbed.color(0.9, 0.9, 0.9));

  for (var i = 0; i < manifold.pointCount; ++i) {
    testbed.drawPoint(worldManifold.points[i], 4.0, testbed.color(0.9, 0.3, 0.3));
  }
};

testbed.keydown = function() {
  if (testbed.activeKeys['left']) {
    positionB.x -= 0.2;
  }

  if (testbed.activeKeys['right']) {
    positionB.x += 0.2;
  }

  if (testbed.activeKeys['down']) {
    positionB.y -= 0.2;
  }

  if (testbed.activeKeys['up']) {
    positionB.y += 0.2;
  }

  if (testbed.activeKeys['Z']) {
    angleB += 0.2;
  }

  if (testbed.activeKeys['X']) {
    angleB -= 0.2;
  }

  transformB.set(positionB, angleB);
};
