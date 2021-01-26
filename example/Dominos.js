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

planck.testbed('Dominos', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.width = 40;
  testbed.height = 40;

  var b1 = world.createBody();
  b1.createFixture(pl.Edge(Vec2(-40, 0), Vec2(40, 0)), 0);

  var ground = world.createBody(Vec2(-1.5, 10));
  ground.createFixture(pl.Box(6, 0.25), 0);

  var columnShape = pl.Box(0.1, 1);

  var fd = {};
  fd.density = 20;
  fd.friction = 0.1;

  for (var i = 0; i < 10; ++i) {
    var body = world.createDynamicBody(Vec2(-6 + 1 * i, 11.25));
    body.createFixture(columnShape, fd);
  }

  var ground = world.createBody(Vec2(1, 6));
  ground.createFixture(pl.Box(7, 0.25, Vec2(), 0.3), 0);

  var b2 = world.createBody(Vec2(-7, 4));
  b2.createFixture(pl.Box(0.25, 1.5), 0);

  var b3 = world.createDynamicBody(Vec2(-0.9, 1), -0.15);
  b3.createFixture(pl.Box(6, 0.125), 10);

  var jd = {};
  jd.collideConnected = true;
  world.createJoint(pl.RevoluteJoint(jd, b1, b3, Vec2(-2, 1)));

  var b4 = world.createDynamicBody(Vec2(-10, 15));
  b4.createFixture(pl.Box(0.25, 0.25), 10);

  world.createJoint(pl.RevoluteJoint(jd, b2, b4, Vec2(-7, 15)));

  var b5 = world.createDynamicBody(Vec2(6.5, 3));

  var fd = {};
  fd.density = 10;
  fd.friction = 0.1;

  b5.createFixture(pl.Box(1, 0.1, Vec2(0, -0.9), 0), fd);
  b5.createFixture(pl.Box(0.1, 1, Vec2(-0.9, 0), 0), fd);
  b5.createFixture(pl.Box(0.1, 1, Vec2(0.9, 0), 0), fd);

  world.createJoint(pl.RevoluteJoint(jd, b1, b5, Vec2(6, 2)));

  var b6 = world.createDynamicBody(Vec2(6.5, 4.1));
  b6.createFixture(pl.Box(1, 0.1), 30);

  world.createJoint(pl.RevoluteJoint(jd, b5, b6, Vec2(7.5, 4)));

  var b7 = world.createDynamicBody(Vec2(7.4, 1));
  b7.createFixture(pl.Box(0.1, 1), 10);

  world.createJoint(pl.DistanceJoint({
    bodyA: b3,
    localAnchorA: Vec2(6, 0),
    bodyB: b7,
    localAnchorB: Vec2(0, -1)
  }));

  var radius = 0.2;
  var circleShape = pl.Circle(radius);
  for (var i = 0; i < 4; ++i) {
    var body = world.createDynamicBody(Vec2(5.9 + 2 * radius * i, 2.4));
    body.createFixture(circleShape, 10);
  }

  return world;
});
