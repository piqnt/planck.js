/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Box, RevoluteJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

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
  new RevoluteJoint({
    bodyA: ground,
    bodyB: root,
    localAnchorA: new Vec2(),
    localAnchorB: h,
  }),
);

function addNode(parent, localAnchor, depth, offset, a) {
  const h = new Vec2(0.0, a);

  const p = new Vec2(parent.getPosition()).add(localAnchor).sub(h);

  const node = world.createDynamicBody(p);

  node.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return node;
  }

  node.createFixture(new Box(offset, 0.25 * a, new Vec2(0, -a), 0.0), DENSITY);

  const right = new Vec2(offset, -a);
  const left = new Vec2(-offset, -a);
  const rightChild = addNode(node, right, depth + 1, 0.5 * offset, a);
  const leftChild = addNode(node, left, depth + 1, 0.5 * offset, a);

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: rightChild,
      localAnchorA: right,
      localAnchorB: h,
    }),
  );

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: leftChild,
      localAnchorA: left,
      localAnchorB: h,
    }),
  );

  return node;
}
