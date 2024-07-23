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

const { Vec2, World, Box, RevoluteJoint, Testbed } = planck;

const world = new World(new Vec2(0, -1));

const testbed = Testbed.mount();
testbed.y = -15;
testbed.width = 20;
testbed.height = 20;
testbed.start(world);

const DEPTH = 4;
const DENSITY = 20.0;

const ground = world.createBody(new Vec2(0.0, 20.0));

const a = 0.5;
const h = new Vec2(0.0, a);

const root = addNode(ground, new Vec2(), 0, 3.0, a);

world.createJoint(
  /// NEED TO FIX THIS
  new RevoluteJoint(
    {
      bodyA: ground,
      bodyB: root,
      localAnchorA: new Vec2(0, 0),
      localAnchorB: h,
    },
    ground,
    root
  )
);

function addNode(parent, localAnchor, depth, offset, a) {
  const h = new Vec2(0.0, a);

  const node = world.createBody({
    type: "dynamic",
    position: new Vec2(parent.getPosition()).add(localAnchor).sub(h),
  });

  node.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return node;
  }

  const left = new Vec2(offset, -a);
  const right = new Vec2(-offset, -a);
  const leftChild = addNode(node, left, depth + 1, 0.5 * offset, a);
  const rightChild = addNode(node, right, depth + 1, 0.5 * offset, a);

  world.createJoint(
    /// NEED TO FIX THIS
    new RevoluteJoint(
      {
        bodyA: node,
        bodyB: leftChild,
        localAnchorA: left,
        localAnchorB: h,
      },
      node,
      leftChild
    )
  );

  world.createJoint(
    /// NEED TO FIX THIS
    new RevoluteJoint(
      {
        bodyA: node,
        bodyB: rightChild,
        localAnchorA: right,
        localAnchorB: h,
      },
      node,
      rightChild
    )
  );

  return node;
}
