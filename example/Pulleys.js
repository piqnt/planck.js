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

planck.testbed('Pulleys', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var y = 16.0;
  var L = 12.0;
  var a = 1.0;
  var b = 2.0;

  var ground = world.createBody();

  // ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  ground.createFixture(pl.Circle(Vec2(-10.0, y + b + L), 2.0), 0.0);
  ground.createFixture(pl.Circle(Vec2(10.0, y + b + L), 2.0), 0.0);

  var shape = pl.Box(a, b);

  // bd.fixedRotation = true;
  var box1 = world.createDynamicBody(Vec2(-10.0, y));
  box1.createFixture(shape, 5.0);

  var box2 = world.createDynamicBody(Vec2(10.0, y));
  box2.createFixture(shape, 5.0);

  var anchor1 = Vec2(-10.0, y + b);
  var anchor2 = Vec2(10.0, y + b);
  var groundAnchor1 = Vec2(-10.0, y + b + L);
  var groundAnchor2 = Vec2(10.0, y + b + L);

  var joint1 = world.createJoint(pl.PulleyJoint({}, box1, box2, groundAnchor1, groundAnchor2, anchor1, anchor2, 1.5));

  testbed.step = function() {
    var ratio = joint1.getRatio();
    var L = joint1.getCurrentLengthA() + ratio * joint1.getCurrentLengthB();
    testbed.status('ratio', ratio);
    testbed.status('L (L1 * ratio + L2)', L);
  };

  return world;
});
