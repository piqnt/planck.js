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

planck.testbed('MobileBalanced', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.y = -15;
  testbed.width = 20;
  testbed.height = 20;
  testbed.ratio = 40;

  var DEPTH = 4;
  var DENSITY = 20.0;

  var ground = world.createBody(Vec2(0.0, 20.0));

  var a = 0.5;
  var h = Vec2(0.0, a);

  var root = addNode(ground, Vec2(), 0, 3.0, a);

  world.createJoint(pl.RevoluteJoint({
    bodyA: ground,
    bodyB: root,
    localAnchorA : Vec2(),
    localAnchorB : h
  }));

  function addNode(parent, localAnchor, depth, offset, a) {

    var h = Vec2(0.0, a);

    var p = Vec2().add(parent.getPosition()).add(localAnchor).sub(h);

    var parent = world.createDynamicBody(p);

    parent.createFixture(pl.Box(0.25 * a, a), DENSITY);

    if (depth === DEPTH) {
      return parent;
    }

    parent.createFixture(pl.Box(offset, 0.25 * a, Vec2(0, -a), 0.0), DENSITY);

    var right = Vec2(offset, -a);
    var left = Vec2(-offset, -a);
    var rightChild = addNode(parent, right, depth + 1, 0.5 * offset, a);
    var leftChild = addNode(parent, left, depth + 1, 0.5 * offset, a);

    world.createJoint(pl.RevoluteJoint({
      bodyA: parent,
      bodyB: rightChild,
      localAnchorA: right,
      localAnchorB: h,
    }));

    world.createJoint(pl.RevoluteJoint({
      bodyA: parent,
      bodyB: leftChild,
      localAnchorA: left,
      localAnchorB: h,
    }));

    return parent;
  }

  return world;
});
