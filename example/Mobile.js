/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

const { Vec2, World, Box, RevoluteJoint, Testbed } = planck;

let world = new World(new Vec2(0, -1));

const testbed = Testbed.mount();
testbed.y = -15;
testbed.width = 20;
testbed.height = 20;
testbed.start(world);

let DEPTH = 4;
let DENSITY = 20.0;

let ground = world.createBody(new Vec2(0.0, 20.0));

let a = 0.5;
let h = new Vec2(0.0, a);

let root = addNode(ground, new Vec2(), 0, 3.0, a);

world.createJoint(new RevoluteJoint({
  bodyA: ground,
  bodyB: root,
  localAnchorA: new Vec2(0, 0),
  localAnchorB: h,
}, ground, root));

function addNode(parent, localAnchor, depth, offset, a) {

  let h = new Vec2(0.0, a);

  let node = world.createBody({
    type : 'dynamic',
    position : new Vec2(parent.getPosition()).add(localAnchor).sub(h)
  });

  node.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return node;
  }

  let left = new Vec2(offset, -a);
  let right = new Vec2(-offset, -a);
  let leftChild = addNode(node, left, depth + 1, 0.5 * offset, a);
  let rightChild = addNode(node, right, depth + 1, 0.5 * offset, a);

  world.createJoint(new RevoluteJoint({
    bodyA: node,
    bodyB: leftChild,
    localAnchorA: left,
    localAnchorB: h,
  }, node, leftChild));

  world.createJoint(new RevoluteJoint({
    bodyA: node,
    bodyB: rightChild,
    localAnchorA: right,
    localAnchorB: h,
  }, node, rightChild));

  return node;
}
