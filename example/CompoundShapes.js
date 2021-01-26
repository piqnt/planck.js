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

// TODO_ERIN test joints on compounds.
planck.testbed('CompoundShapes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;
  var world = new pl.World(Vec2(0, -10));

  world.createBody(Vec2(0.0, 0.0)).createFixture(pl.Edge(Vec2(50.0, 0.0), Vec2(-50.0, 0.0)), 0.0);

  var circle1 = pl.Circle(Vec2(-0.5, 0.5), 0.5);
  var circle2 = pl.Circle(Vec2(0.5, 0.5), 0.5);

  for (var i = 0; i < 10; ++i) {
    var body = world.createDynamicBody({
      position : Vec2(pl.Math.random(-0.1, 0.1) + 5.0, 1.05 + 2.5 * i),
      angle : pl.Math.random(-Math.PI, Math.PI)
    });
    body.createFixture(circle1, 2.0);
    body.createFixture(circle2, 0.0);
  }

  var polygon1 = pl.Box(0.25, 0.5);
  var polygon2 = pl.Box(0.25, 0.5, Vec2(0.0, -0.5), 0.5 * Math.PI);

  for (var i = 0; i < 10; ++i) {
    var body = world.createDynamicBody({
      position : Vec2(pl.Math.random(-0.1, 0.1) - 5.0, 1.05 + 2.5 * i),
      angle : pl.Math.random(-Math.PI, Math.PI)
    });
    body.createFixture(polygon1, 2.0);
    body.createFixture(polygon2, 2.0);
  }

  var xf1 = pl.Transform();
  xf1.q.set(0.3524 * Math.PI);
  xf1.p = xf1.q.getXAxis();

  var triangle1 = pl.Polygon([Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)].map(Transform.mulFn(xf1)));

  var xf2 = pl.Transform();
  xf2.q.set(-0.3524 * Math.PI);
  xf2.p = Vec2.neg(xf2.q.getXAxis());

  var triangle2 = pl.Polygon([Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)].map(Transform.mulFn(xf2)));

  for (var i = 0; i < 10; ++i) {
    var body = world.createDynamicBody({
      position : Vec2(pl.Math.random(-0.1, 0.1), 2.05 + 2.5 * i),
      angle : 0.0
    });
    body.createFixture(triangle1, 2.0);
    body.createFixture(triangle2, 2.0);
  }

  var bottom = pl.Box(1.5, 0.15);
  var left = pl.Box(0.15, 2.7, Vec2(-1.45, 2.35), 0.2);
  var right = pl.Box(0.15, 2.7, Vec2(1.45, 2.35), -0.2);

  var container = world.createBody(Vec2(0.0, 2.0));
  container.createFixture(bottom, 4.0);
  container.createFixture(left, 4.0);
  container.createFixture(right, 4.0);

  return world;
});
