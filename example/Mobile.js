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

const { Vec2, World, Box, RevoluteJoint } = planck;

var world = new World(new Vec2(0, -1));

const testbed = planck.testbed();
testbed.y = -15;
testbed.width = 20;
testbed.height = 20;
testbed.ratio = 40;
testbed.start(world);

var DEPTH = 4;
var DENSITY = 20.0;

var ground = world.createBody(new Vec2(0.0, 20.0));

var a = 0.5;
var h = new Vec2(0.0, a);

var root = addNode(ground, new Vec2(), 0, 3.0, a);

world.createJoint(new RevoluteJoint({
  bodyA: ground,
  bodyB: root,
  localAnchorA: new Vec2(),
  localAnchorB: h,
}, ground, root));

function addNode(parent, localAnchor, depth, offset, a) {

  var h = new Vec2(0.0, a);

  var parent = world.createBody({
    type : 'dynamic',
    position : Vec2.add(parent.getPosition(), localAnchor).sub(h)
  });

  parent.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return parent;
  }

  var left = new Vec2(offset, -a);
  var right = new Vec2(-offset, -a);
  var leftChild = addNode(parent, left, depth + 1, 0.5 * offset, a);
  var rightChild = addNode(parent, right, depth + 1, 0.5 * offset, a);

  world.createJoint(new RevoluteJoint({
    bodyA: parent,
    bodyB: leftChild,
    localAnchorA: left,
    localAnchorB: h,
  }, parent, leftChild));

  world.createJoint(new RevoluteJoint({
    bodyA: parent,
    bodyB: rightChild,
    localAnchorA: right,
    localAnchorB: h,
  }, parent, rightChild));

  return parent;
}
